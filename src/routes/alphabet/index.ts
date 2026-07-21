import { FastifyInstance } from 'fastify';
import { proxyRoutes } from './proxy';
import { tokenRoutes } from './token';
import { quotesRoutes } from './quotes';
import { vehiclesRoutes } from './vehicles';
import { commandsRoutes } from './commands';
import { mobilityNeedsRoutes } from './mobility-needs';
import { photosRoutes } from './photos';

export async function alphabetRoutes(fastify: FastifyInstance) {
  await fastify.register(tokenRoutes);
  await fastify.register(vehiclesRoutes); 
  await fastify.register(mobilityNeedsRoutes); 
  await fastify.register(quotesRoutes);
  await fastify.register(commandsRoutes);
  await fastify.register(photosRoutes);
  await fastify.register(proxyRoutes);
}
