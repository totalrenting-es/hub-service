import { proxyRequest } from './proxy.service';

type ProxyHeaders = Record<string, string | undefined>;

export const getQuote = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}`, 'GET', headers);

export const getRentalAmount = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}/rental-amount`, 'GET', headers);

export const getVehiclePriceBreakdown = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}/vehicle-price-breakdown`, 'GET', headers);

export const getProductConfiguration = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}/product-configuration`, 'GET', headers);

export const getDocuments = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}/documents`, 'GET', headers);

export const getVehicleConfiguration = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}/vehicle-configuration`, 'GET', headers);

export const getAvailableEmissionMeasurementStandards = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}/vehicle-configuration/available-emission-measurement-standards`, 'GET', headers);

export const getAvailableDocumentTypes = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}/documents/available-document-types`, 'GET', headers);

export const getAvailableGeneratedDocumentTypes = (quoteNumber: string, headers: ProxyHeaders) => proxyRequest(`/quotes/${quoteNumber}/documents/available-generated-document-types`, 'GET', headers);
