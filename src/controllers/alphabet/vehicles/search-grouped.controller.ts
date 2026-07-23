import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult, rawQuery } from '../helpers';

export async function handleSearchGrouped(request: FastifyRequest, reply: FastifyReply) {
  const result = await services.alphabet.searchGrouped(rawQuery(request.url), request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
