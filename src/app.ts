import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import { alphabetRoutes } from './routes/alphabet';
import { settingsRoutes } from './routes/settings';
import { vixieesRoutes } from './routes/vixiees';
import { hubspotRoutes } from './routes/hubspot';
import { adminAuthRoutes } from './routes/auth';
import { docsRoutes, docsHandler } from './routes/docs';

export const buildApp = async () => {
  const fastify = Fastify({ logger: false });

  // CORS
  await fastify.register(cors, {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
  });

  console.log('process.env.NODE_ENV', process.env.NODE_ENV);

  // OpenAPI spec
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Hub Totalrenting',
        description: 'Hub central de integraciones: proxy Alphabet, webhooks Vixiees (Totalrenting y Twipo) y automatizaciones',
        version: '1.0.0'
      },
      tags: [
        { name: 'Alphabet', description: 'Proxy a la API de Alphabet' },
        { name: 'Vixiees', description: 'Webhooks de Vixiees (fan-out a múltiples destinos)' },
        { name: 'HubSpot', description: 'Webhooks de HubSpot reenviados a integrations-service' },
        { name: 'Settings', description: 'Configuración y utilidades globales' },
        { name: 'Health', description: 'Estado del servidor' }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Token de acceso de Alphabet. Obtén uno llamando a GET /api/alphabet/token'
          }
        }
      },
      security: [{ bearerAuth: [] }]
    }
  });

  // Docs — panel de login (Google/identity) + spec protegido con permiso docs:hub
  fastify.get('/docs', { schema: { hide: true } }, docsHandler);
  fastify.get('/docs/', { schema: { hide: true } }, docsHandler);
  await fastify.register(docsRoutes);

  // Health check
  fastify.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        summary: 'Verificar estado del servidor',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              timestamp: { type: 'string' }
            }
          }
        }
      }
    },
    async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    }
  );

  const apiPrefix = process.env.API_PREFIX || '/api';

  // Auth del panel de docs: login proxeado a identity-service (exige permiso docs:hub).
  await fastify.register(adminAuthRoutes, { prefix: `${apiPrefix}/admin/auth` });

  // Rutas
  await fastify.register(alphabetRoutes, { prefix: `${apiPrefix}/alphabet` });
  await fastify.register(settingsRoutes, { prefix: `${apiPrefix}/settings` });
  await fastify.register(vixieesRoutes, { prefix: `${apiPrefix}/vixiees` });
  await fastify.register(hubspotRoutes, { prefix: `${apiPrefix}/hubspot` });

  return fastify;
};
