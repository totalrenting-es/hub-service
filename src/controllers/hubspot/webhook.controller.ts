import { FastifyRequest, FastifyReply } from 'fastify';
import services from '../../services';

const LOG = '[HubSpot Webhook]';

// Recibe el webhook del workflow de HubSpot (Totalrenting) y lo reenvía al integrations-service
// (que crea el lead en Avanti). El hub actúa como puerta pública: espera la respuesta de
// integrations y replica su código de estado.
export async function handleLeadPerdidoAvantiWebhook(request: FastifyRequest, reply: FastifyReply) {
  const payload = (request.body ?? {}) as Record<string, unknown>;

  console.log(`${LOG} ───────── Webhook recibido de HubSpot ─────────`);
  console.log(`${LOG} IP origen: ${request.headers['x-forwarded-for'] ?? request.ip}`);
  console.log(`${LOG} Body:`, JSON.stringify(payload));
  console.log(`${LOG} deal_id=${(payload as { deal_id?: unknown })?.deal_id}. Reenviando a integrations-service...`);

  try {
    const { status, data } = await services.hubspot.forwardLeadToIntegrations(payload);
    console.log(`${LOG} ← integrations respondió ${status}:`, JSON.stringify(data));
    console.log(`${LOG} ───────── Fin (replicando ${status} a HubSpot) ─────────`);
    return reply.status(status).send(data);
  } catch (error) {
    const err = error as { code?: string; message?: string };
    console.error(`${LOG} ✗ Error reenviando a integrations-service: ${err.code ?? ''} ${err.message}`);
    // El hub no pudo contactar con integrations (caído/timeout) → 502 para que HubSpot reintente.
    return reply.status(502).send({ ok: false, error: 'No se pudo contactar con integrations-service' });
  }
}
