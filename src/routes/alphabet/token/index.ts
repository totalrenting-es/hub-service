import { FastifyInstance } from 'fastify';
import config from '../../../config';

export async function tokenRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/token',
    {
      schema: {
        tags: ['Alphabet'],
        summary: 'Obtener token de acceso a la API de Alphabet',
        description: 'Obtiene un nuevo access_token usando las credenciales configuradas en el servidor',
        response: {
          200: {
            type: 'object',
            properties: {
              access_token: { type: 'string' },
              expires_in: { type: 'number' },
              token_type: { type: 'string' }
            }
          },
          500: {
            type: 'object',
            properties: { error: { type: 'string' } }
          }
        }
      }
    },
    async (_request, reply) => {
      const { tokenUrl, clientId, clientSecret, grantType } = config.alphabet;

      const body = new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: grantType });

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: body.toString()
      });

      if (!response.ok) {
        const text = await response.text();
        return reply.status(500).send({ error: `Error obteniendo token: ${response.status} — ${text}` });
      }

      const data = (await response.json()) as { access_token: string; expires_in: number; token_type: string };
      return reply.send({ access_token: data.access_token, expires_in: data.expires_in, token_type: data.token_type });
    }
  );
}
