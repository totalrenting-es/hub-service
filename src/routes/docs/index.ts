import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { filterDocsSpec, docsStyles, docsHandler, favicon } from '../../controllers/docs/docs.controller';
import { docsAuthorize } from '../../middlewares/docs-auth.middleware';

export { docsHandler };

export const docsRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/docs/styles.css', { schema: { hide: true } }, (_req, reply) => {
    reply.header('Content-Type', 'text/css; charset=utf-8').send(docsStyles);
  });

  fastify.get('/favicon.ico', { schema: { hide: true } }, (_req, reply) => {
    reply.header('Content-Type', 'image/x-icon').header('Cache-Control', 'public, max-age=86400').send(favicon);
  });

  fastify.get(
    '/api/docs/spec',
    // El spec se sirve solo a usuarios con permiso docs:hub (verificado en vivo contra
    // identity). El login del panel /docs es client-side; este guard es lo que realmente
    // impide bajarse el OpenAPI sin token o sin permiso.
    { schema: { hide: true }, preHandler: docsAuthorize },
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const full = fastify.swagger() as {
        paths?: Record<string, unknown>;
        tags?: { name: string }[];
        [key: string]: unknown;
      };
      return reply.header('Content-Type', 'application/json').send(filterDocsSpec(full));
    }
  );
};
