import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams } from '../../../types/alphabet.types';

export async function handleGetMobilityNeed(request: FastifyRequest<{ Params: MobilityNeedParams }>, reply: FastifyReply) {
  const result = await services.alphabet.getMobilityNeed(request.params.mobilityNeedNumber, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
