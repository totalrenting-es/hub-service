import { FastifyInstance } from 'fastify';
import { handleLeadPerdidoAvantiWebhook } from '../../../controllers/hubspot';

const schema = {
  tags: ['HubSpot'],
  summary: 'Webhook Lead Perdido → Avanti',
  description:
    '**`WEBHOOK`**\n\nRecibe un lead perdido desde el workflow de HubSpot de Totalrenting y lo reenvía al integrations-service, que crea el lead en Avanti (etapa "Nuevo Lead SDR").'
};

export async function leadPerdidoAvantiRoute(fastify: FastifyInstance) {
  fastify.post('/lead-perdido-avanti', { schema }, handleLeadPerdidoAvantiWebhook);
}
