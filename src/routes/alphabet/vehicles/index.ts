import { FastifyInstance } from 'fastify';
import { handleSearchGrouped, handleSearch } from '../../../controllers/alphabet';
import { searchGroupedResponse, searchResponse, searchGroupedQuery, searchQuery } from '../../../schemas/alphabet/vehicles.schema';
import { errorResponse } from '../../../schemas/alphabet/common.schema';

const TAG = 'Alphabet';

export async function vehiclesRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/proxy/vehicles/search/grouped',
    {
      schema: {
        tags: [TAG],
        summary: 'Buscar vehículos agrupados',
        description: 'Búsqueda del cotizador: devuelve modelos agrupados con su precio de partida y foto, según los filtros aplicados.',
        querystring: searchGroupedQuery,
        response: { 200: searchGroupedResponse, 500: errorResponse }
      }
    },
    handleSearchGrouped
  );

  fastify.get(
    '/proxy/vehicles/search',
    {
      schema: {
        tags: [TAG],
        summary: 'Buscar versiones de vehículo',
        description: 'Devuelve las versiones concretas de un modelo (marca::modelRange) con sus especificaciones y precio base.',
        querystring: searchQuery,
        response: { 200: searchResponse, 500: errorResponse }
      }
    },
    handleSearch
  );
}
