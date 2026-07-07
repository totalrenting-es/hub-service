import { FastifyRequest, FastifyReply } from 'fastify';
import { isAxiosError } from 'axios';
import config from '../../config';
import { identityClient } from '../../config/http-clients';

const DOCS_PERMISSION = 'docs:hub';

export const proxyToIdentity = (path: string, requirePermission?: string) => async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { data, status } = await identityClient.post(path, request.body, {
      headers: {
        'user-agent': request.headers['user-agent'] ?? '',
        'x-forwarded-for': request.ip,
        ...(requirePermission ? { 'x-require-permission': requirePermission, 'x-internal-secret': config.identityInternalSecret, 'x-service-name': 'hub-service' } : {})
      }
    });
    return reply.status(status).send(data);
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      return reply.status(err.response.status).send(err.response.data);
    }
    return reply.status(502).send({ error: 'Error al conectar con el servicio de autenticación' });
  }
};

export const loginController = proxyToIdentity('/api/auth/login', DOCS_PERMISSION);
// El panel de /docs usa el botón GSI (Sign In With Google), que devuelve un ID token
// (credential). Por eso se proxya a /api/auth/google (valida el ID token), no a
// /google/access-token (que espera un access token OAuth).
export const loginGoogleController = proxyToIdentity('/api/auth/google', DOCS_PERMISSION);
export const refreshController = proxyToIdentity('/api/auth/refresh');
