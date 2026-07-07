import { FastifyRequest, FastifyReply } from 'fastify';
import { isAxiosError } from 'axios';
import { identityClient } from '../config/http-clients';

const DOCS_PERMISSION = 'docs:hub';

/**
 * Autoriza el acceso al spec de la documentación.
 *
 * No verificamos el token localmente: lo reenviamos a identity-service
 * (`/api/my-permissions`), que es quien lo emite y quien custodia los permisos.
 * Así identity valida la firma/expiración y nos devuelve los permisos en vivo
 * (una revocación tiene efecto de inmediato, no hay que esperar a que caduque el token).
 */
export const docsAuthorize = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const authHeader = request.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.status(401).send({ statusCode: 401, error: 'Unauthorized', message: 'Token requerido' });
  }

  try {
    const { data } = await identityClient.get<{ permissions: string[] }>('/api/my-permissions', {
      headers: { authorization: authHeader }
    });

    const permissions = data.permissions ?? [];
    if (!permissions.includes('*') && !permissions.includes(DOCS_PERMISSION)) {
      return reply.status(403).send({ statusCode: 403, error: 'Forbidden', message: 'No tienes permiso para acceder a esta documentación' });
    }
  } catch (err) {
    // identity responde 401 si el token es inválido/expirado: lo propagamos tal cual.
    if (isAxiosError(err) && err.response?.status === 401) {
      return reply.status(401).send({ statusCode: 401, error: 'Unauthorized', message: 'Token inválido o expirado' });
    }
    return reply.status(502).send({ statusCode: 502, error: 'Bad Gateway', message: 'Error al verificar permisos' });
  }
};
