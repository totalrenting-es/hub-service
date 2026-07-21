import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { QuoteNumberParams, SetVehicleBody } from '../../../types/alphabet.types';

export async function handleSetVehicle(request: FastifyRequest<{ Params: QuoteNumberParams; Body: SetVehicleBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setVehicle(request.params.quoteNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
