import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { QuoteNumberParams, SetMileageAndDurationBody } from '../../../types/alphabet.types';

export async function handleSetMileageAndDuration(request: FastifyRequest<{ Params: QuoteNumberParams; Body: SetMileageAndDurationBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setMileageAndDuration(request.params.quoteNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
