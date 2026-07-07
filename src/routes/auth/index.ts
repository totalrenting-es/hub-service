import { FastifyInstance } from 'fastify';
import { loginController, loginGoogleController, refreshController } from '../../controllers/auth/auth.controller';

export const adminAuthRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Login con email y contraseña',
        security: [],
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
          }
        }
      }
    },
    loginController
  );

  fastify.post(
    '/google',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Login con Google ID token (credential del botón GSI)',
        security: [],
        body: {
          type: 'object',
          required: ['token'],
          properties: {
            token: { type: 'string' }
          }
        }
      }
    },
    loginGoogleController
  );

  fastify.post(
    '/refresh',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Renovar access token',
        security: [],
        body: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string' }
          }
        }
      }
    },
    refreshController
  );
};
