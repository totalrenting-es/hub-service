import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, SetCompanyIdentificationBody } from '../../../types/alphabet.types';

export async function handleSetCompanyIdentification(request: FastifyRequest<{ Params: MobilityNeedParams; Body: SetCompanyIdentificationBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setCompanyIdentification(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
