import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';

export async function handleCreateMobilityNeed(request: FastifyRequest, reply: FastifyReply) {
  const result = await services.alphabet.createMobilityNeed(request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
