import { FastifyReply } from 'fastify';

type ProxyResult = { status: number; data: unknown; headers: Record<string, string> };

// Replica en la respuesta el status y las cabeceras que devolvió Alphabet.
export function sendProxyResult(reply: FastifyReply, result: ProxyResult) {
  Object.entries(result.headers).forEach(([key, value]) => reply.header(key, value));
  return reply.status(result.status).send(result.data);
}

// Extrae el query string crudo de la URL (conserva params repetidos tal cual).
export function rawQuery(url: string): string {
  return url.includes('?') ? url.split('?').slice(1).join('?') : '';
}
