import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { QuoteNumberParams, SetExteriorBody } from '../../../types/alphabet.types';

export async function handleSetExterior(request: FastifyRequest<{ Params: QuoteNumberParams; Body: SetExteriorBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setExterior(request.params.quoteNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
