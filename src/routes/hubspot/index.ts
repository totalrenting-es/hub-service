import { FastifyInstance } from 'fastify';
import { webhookRoutes } from './webhook';

export async function hubspotRoutes(fastify: FastifyInstance) {
  await fastify.register(webhookRoutes, { prefix: '/webhook' });
}
