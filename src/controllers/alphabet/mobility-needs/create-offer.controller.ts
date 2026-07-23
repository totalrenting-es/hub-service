import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../../services';
import { sendProxyResult } from '../helpers';
import type { MobilityNeedParams, CreateOfferBody } from '../../../types/alphabet.types';

export async function handleCreateOffer(request: FastifyRequest<{ Params: MobilityNeedParams; Body: CreateOfferBody }>, reply: FastifyReply) {
  const result = await services.alphabet.createOffer(request.params.mobilityNeedNumber, request.body, request.headers as Record<string, string | undefined>);
  return sendProxyResult(reply, result);
}
