import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { QuoteNumberParams, SetEmissionMeasurementStandardBody } from '../../../types/alphabet.types';

export async function handleSetEmissionMeasurementStandard(request: FastifyRequest<{ Params: QuoteNumberParams; Body: SetEmissionMeasurementStandardBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setEmissionMeasurementStandard(request.params.quoteNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
