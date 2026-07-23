import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, SetPostalAddressBody } from '../../../types/alphabet.types';

export async function handleSetPostalAddress(request: FastifyRequest<{ Params: MobilityNeedParams; Body: SetPostalAddressBody }>, reply: FastifyReply) {
  const result = await services.alphabet.setPostalAddress(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
