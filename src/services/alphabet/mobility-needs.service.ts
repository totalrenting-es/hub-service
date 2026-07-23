import { proxyRequest } from './proxy.service';

type ProxyHeaders = Record<string, string | undefined>;

const post = (path: string, body: unknown, headers: ProxyHeaders) => proxyRequest(path, 'POST', headers, Buffer.from(JSON.stringify(body ?? {})), 'application/json');

// --- Mobility needs ---
export const createMobilityNeed = (body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/commands/create-mobility-need`, body, headers);

export const getMobilityNeed = (mobilityNeedNumber: string, headers: ProxyHeaders) => proxyRequest(`/mobility-needs/${mobilityNeedNumber}`, 'GET', headers);

export const getCustomerDetails = (mobilityNeedNumber: string, headers: ProxyHeaders) => proxyRequest(`/mobility-needs/${mobilityNeedNumber}/customer-details`, 'GET', headers);

export const createQuote = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/create-quote`, body, headers);

export const createOffer = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/create-offer`, body, headers);

export const setCompanyIdentification = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/customer-details/set-company-identification`, body, headers);

export const setContactInformation = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/customer-details/set-contact-information`, body, headers);

export const setLegalEntityName = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/customer-details/set-legal-entity-name`, body, headers);

export const setPersonalIdentification = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/customer-details/set-personal-identification`, body, headers);

export const setPersonalName = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/customer-details/set-personal-name`, body, headers);

export const setPostalAddress = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/customer-details/set-postal-address`, body, headers);

export const setIban = (mobilityNeedNumber: string, body: unknown, headers: ProxyHeaders) => post(`/mobility-needs/${mobilityNeedNumber}/commands/payment-details/bank-account/set-iban`, body, headers);
