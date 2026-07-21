import { FastifyInstance } from 'fastify';
import { handleGetFilePhoto } from '../../../controllers/alphabet';
import { errorResponse } from '../../../schemas/alphabet/common.schema';

const TAG = 'Alphabet';

export async function photosRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/proxy/file/photos/*',
    {
      schema: {
        tags: [TAG],
        summary: 'Foto de vehículo (binario)',
        description: 'Devuelve la imagen del vehículo (image/*). La ruta tras `/file/photos/` es el identificador de la foto (base64).',
        params: {
          type: 'object',
          properties: { '*': { type: 'string', description: 'Ruta/identificador de la foto' } }
        },
        response: {
          200: { description: 'Imagen binaria (image/png, image/jpeg…)', type: 'string', format: 'binary' },
          500: errorResponse
        }
      }
    },
    handleGetFilePhoto
  );
}
