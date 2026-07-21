import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, SetPersonalNameBody } from '../../../types/alphabet.types';

export async function handleSetPersonalName(request: FastifyRequest<{ Params: MobilityNeedParams; Body: SetPersonalNameBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setPersonalName(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
