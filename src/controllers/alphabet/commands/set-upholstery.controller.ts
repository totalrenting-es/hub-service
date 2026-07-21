import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { QuoteNumberParams, SetUpholsteryBody } from '../../../types/alphabet.types';

export async function handleSetUpholstery(request: FastifyRequest<{ Params: QuoteNumberParams; Body: SetUpholsteryBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setUpholstery(request.params.quoteNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
