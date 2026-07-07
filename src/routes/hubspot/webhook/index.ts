import { FastifyInstance } from 'fastify';
import { leadPerdidoAvantiRoute } from './lead-perdido-avanti';

export async function webhookRoutes(fastify: FastifyInstance) {
  await fastify.register(leadPerdidoAvantiRoute);
}
