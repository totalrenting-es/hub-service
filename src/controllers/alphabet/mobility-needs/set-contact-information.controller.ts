import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, SetContactInformationBody } from '../../../types/alphabet.types';

export async function handleSetContactInformation(request: FastifyRequest<{ Params: MobilityNeedParams; Body: SetContactInformationBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setContactInformation(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
