import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, SetPersonalIdentificationBody } from '../../../types/alphabet.types';

export async function handleSetPersonalIdentification(request: FastifyRequest<{ Params: MobilityNeedParams; Body: SetPersonalIdentificationBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setPersonalIdentification(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
