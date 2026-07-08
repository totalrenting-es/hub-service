import { FastifyReply } from 'fastify';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import config from '../../config';

const docsHtmlTemplate = readFileSync(join(__dirname, '../../assets/templates/docs/docs.html'), 'utf-8');
export const docsStyles = readFileSync(join(__dirname, '../../assets/templates/docs/docs.css'), 'utf-8');
export const favicon = readFileSync(join(__dirname, '../../assets/favicon.ico'));

type SwaggerSpec = {
  paths?: Record<string, unknown>;
  tags?: { name: string }[];
  [key: string]: unknown;
};

// La documentación es interna: el usuario autorizado ve toda la API funcional del hub.
// Solo ocultamos las rutas internas de login (/api/admin/auth) y su tag 'Auth'.
export function filterDocsSpec(full: SwaggerSpec): SwaggerSpec {
  const filteredPaths: Record<string, unknown> = {};
  for (const [path, methods] of Object.entries(full.paths ?? {})) {
    if (path.startsWith('/api/admin')) continue;
    filteredPaths[path] = methods;
  }

  const filteredTags = (full.tags ?? []).filter((t) => t.name !== 'Auth');

  return { ...full, paths: filteredPaths, tags: filteredTags };
}

// CSP de la página de docs. Acota de qué orígenes se carga código (Scalar via jsDelivr
// + Google GSI) y a dónde puede conectar/exfiltrar el navegador, de forma que un script
// inyectado no pueda traer código de hosts arbitrarios ni mandar el JWT fuera. Se
// mantienen 'unsafe-inline'/'unsafe-eval' porque tanto el script inline de la página
// como Scalar los necesitan (Scalar usa eval).
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://accounts.google.com https://apis.google.com",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com https://accounts.google.com",
  "font-src 'self' data: https://cdn.jsdelivr.net https://fonts.gstatic.com https://fonts.scalar.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://cdn.jsdelivr.net https://accounts.google.com",
  "frame-src https://accounts.google.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'"
].join('; ');

export function docsHandler(_req: unknown, reply: FastifyReply) {
  const html = docsHtmlTemplate.replace('{{googleClientId}}', config.google.clientId);
  reply
    .header('Content-Type', 'text/html; charset=utf-8')
    .header('Content-Security-Policy', CONTENT_SECURITY_POLICY)
    .header('X-Content-Type-Options', 'nosniff')
    .header('X-Frame-Options', 'DENY')
    .header('Referrer-Policy', 'no-referrer')
    .send(html);
}
