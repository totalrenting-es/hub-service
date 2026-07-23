import { proxyRequest } from './proxy.service';

type ProxyHeaders = Record<string, string | undefined>;

// Helper: POST a Alphabet con el body serializado a JSON (siempre con content-type,
// aunque el body sea vacío, porque Alphabet responde 415 si falta).
const post = (path: string, body: unknown, headers: ProxyHeaders) => proxyRequest(path, 'POST', headers, Buffer.from(JSON.stringify(body ?? {})), 'application/json');

// --- Commands sobre el presupuesto (quote) ---
export const setVehicle = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/commands/set-vehicle`, body, headers);

export const acceptQuote = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/commands/accept-quote`, body, headers);

export const completeQuote = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/commands/complete-quote`, body, headers);

export const setMileageAndDuration = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/product-configuration/commands/set-mileage-and-duration`, body, headers);

export const addOption = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/vehicle-configuration/commands/add-option`, body, headers);

export const removeOption = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/vehicle-configuration/commands/remove-option`, body, headers);

export const addPackage = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/vehicle-configuration/commands/add-package`, body, headers);

export const removePackage = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/vehicle-configuration/commands/remove-package`, body, headers);

export const setExterior = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/vehicle-configuration/commands/set-exterior`, body, headers);

export const setUpholstery = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/vehicle-configuration/commands/set-upholstery`, body, headers);

export const setEmissionMeasurementStandard = (quoteNumber: string, body: unknown, headers: ProxyHeaders) => post(`/quotes/${quoteNumber}/vehicle-configuration/commands/set-emission-measurement-standard`, body, headers);
