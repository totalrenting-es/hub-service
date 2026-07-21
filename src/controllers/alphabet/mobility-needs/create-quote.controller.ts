import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, CreateQuoteBody } from '../../../types/alphabet.types';

export async function handleCreateQuote(request: FastifyRequest<{ Params: MobilityNeedParams; Body: CreateQuoteBody }>, reply: FastifyReply) {
  const result = await services.alphabet.createQuote(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
