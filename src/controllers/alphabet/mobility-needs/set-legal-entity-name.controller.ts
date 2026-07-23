import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, SetLegalEntityNameBody } from '../../../types/alphabet.types';

export async function handleSetLegalEntityName(request: FastifyRequest<{ Params: MobilityNeedParams; Body: SetLegalEntityNameBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setLegalEntityName(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
