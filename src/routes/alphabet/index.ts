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
  // Endpoints concretos documentados (ganan al comodín en el enrutado).
  await fastify.register(quotesRoutes);
  await fastify.register(vehiclesRoutes);
  await fastify.register(commandsRoutes);
  await fastify.register(mobilityNeedsRoutes);
  await fastify.register(photosRoutes);
  // Comodín de fallback: cualquier ruta no documentada sigue funcionando.
  await fastify.register(proxyRoutes);
}
