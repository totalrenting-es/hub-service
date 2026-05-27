import { FastifyInstance } from 'fastify';
import { proxyRoutes } from './proxy';
import { tokenRoutes } from './token';

export async function alphabetRoutes(fastify: FastifyInstance) {
  await fastify.register(tokenRoutes);
  await fastify.register(proxyRoutes);
}
