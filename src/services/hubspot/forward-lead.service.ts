import axios from 'axios';
import config from '../../config';

export type ForwardResult = { status: number; data: unknown };

// Reenvía (proxy síncrono) el webhook de HubSpot al integrations-service interno. Devuelve el
// status real de integrations para que el hub lo replique a HubSpot (si es 5xx, HubSpot
// reintentará el webhook).
export async function forwardLeadToIntegrations(body: Record<string, unknown>): Promise<ForwardResult> {
  const url = `${config.integrations.url}${config.integrations.leadWebhookPath}`;
  const response = await axios.post(url, body, {
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
    // No lanzamos por status: replicamos el código real de integrations tal cual.
    validateStatus: () => true
  });
  return { status: response.status, data: response.data };
}
