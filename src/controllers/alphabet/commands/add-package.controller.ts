import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { QuoteNumberParams, OptionBody } from '../../../types/alphabet.types';

export async function handleAddPackage(request: FastifyRequest<{ Params: QuoteNumberParams; Body: OptionBody }>, reply: FastifyReply) {
  const result = await services.alphabet.addPackage(request.params.quoteNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
