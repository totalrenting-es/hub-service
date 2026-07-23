import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';

export async function handleGetFilePhoto(request: FastifyRequest, reply: FastifyReply) {
  const photoPath = (request.params as { '*': string })['*'];
  const result = await services.alphabet.getFilePhoto(photoPath, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
