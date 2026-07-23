import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, SetIbanBody } from '../../../types/alphabet.types';

export async function handleSetIban(request: FastifyRequest<{ Params: MobilityNeedParams; Body: SetIbanBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setIban(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
