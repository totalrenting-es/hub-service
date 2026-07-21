import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { QuoteNumberParams } from '../../../types/alphabet.types';

export async function handleGetQuote(request: FastifyRequest<{ Params: QuoteNumberParams }>, reply: FastifyReply) {
  const result = await services.alphabet.getQuote(request.params.quoteNumber, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
