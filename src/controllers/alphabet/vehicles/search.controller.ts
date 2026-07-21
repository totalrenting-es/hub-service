import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult, rawQuery } from '../helpers';

export async function handleSearch(request: FastifyRequest, reply: FastifyReply) {
  const result = await services.alphabet.search(rawQuery(request.url), request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
