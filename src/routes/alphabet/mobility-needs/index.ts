import { FastifyInstance } from 'fastify';
import {
  handleCreateMobilityNeed,
  handleGetMobilityNeed,
  handleGetCustomerDetails,
  handleCreateQuote,
  handleCreateOffer,
  handleSetCompanyIdentification,
  handleSetContactInformation,
  handleSetLegalEntityName,
  handleSetPersonalIdentification,
  handleSetPersonalName,
  handleSetPostalAddress,
  handleSetIban
} from '../../../controllers/alphabet';
import {
  createQuoteBody,
  createOfferBody,
  setCompanyIdentificationBody,
  setContactInformationBody,
  setLegalEntityNameBody,
  setPersonalIdentificationBody,
  setPersonalNameBody,
  setPostalAddressBody,
  setIbanBody,
  createMobilityNeedResponse,
  createQuoteResponse,
  mobilityNeedView,
  mnParam
} from '../../../schemas/alphabet/mobility-needs.schema';
import { errorResponse } from '../../../schemas/alphabet/common.schema';

const TAG = 'Alphabet';

// Helper para los setters de customer-details (mismo param, body propio, respuesta genérica).
const setter = (summary: string, body: object) => ({
  tags: [TAG],
  summary,
  params: mnParam,
  body,
  response: { 200: mobilityNeedView, 500: errorResponse }
});

export async function mobilityNeedsRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/proxy/mobility-needs/commands/create-mobility-need',
    { schema: { tags: [TAG], summary: 'Crear mobility need', description: 'Inicia una necesidad de movilidad (paso previo al presupuesto).', response: { 200: createMobilityNeedResponse, 500: errorResponse } } },
    handleCreateMobilityNeed
  );

  fastify.get(
    '/proxy/mobility-needs/:mobilityNeedNumber',
    { schema: { tags: [TAG], summary: 'Obtener mobility need', params: mnParam, response: { 200: mobilityNeedView, 500: errorResponse } } },
    handleGetMobilityNeed
  );

  fastify.get(
    '/proxy/mobility-needs/:mobilityNeedNumber/customer-details',
    { schema: { tags: [TAG], summary: 'Datos del cliente', params: mnParam, response: { 200: mobilityNeedView, 500: errorResponse } } },
    handleGetCustomerDetails
  );

  fastify.post(
    '/proxy/mobility-needs/:mobilityNeedNumber/commands/create-quote',
    { schema: { tags: [TAG], summary: 'Crear presupuesto', params: mnParam, body: createQuoteBody, response: { 200: createQuoteResponse, 500: errorResponse } } },
    handleCreateQuote
  );

  fastify.post(
    '/proxy/mobility-needs/:mobilityNeedNumber/commands/create-offer',
    { schema: { tags: [TAG], summary: 'Crear oferta', params: mnParam, body: createOfferBody, response: { 200: mobilityNeedView, 500: errorResponse } } },
    handleCreateOffer
  );

  fastify.post('/proxy/mobility-needs/:mobilityNeedNumber/commands/customer-details/set-company-identification', { schema: setter('Fijar identificación de empresa', setCompanyIdentificationBody) }, handleSetCompanyIdentification);
  fastify.post('/proxy/mobility-needs/:mobilityNeedNumber/commands/customer-details/set-contact-information', { schema: setter('Fijar información de contacto', setContactInformationBody) }, handleSetContactInformation);
  fastify.post('/proxy/mobility-needs/:mobilityNeedNumber/commands/customer-details/set-legal-entity-name', { schema: setter('Fijar razón social', setLegalEntityNameBody) }, handleSetLegalEntityName);
  fastify.post('/proxy/mobility-needs/:mobilityNeedNumber/commands/customer-details/set-personal-identification', { schema: setter('Fijar identificación personal', setPersonalIdentificationBody) }, handleSetPersonalIdentification);
  fastify.post('/proxy/mobility-needs/:mobilityNeedNumber/commands/customer-details/set-personal-name', { schema: setter('Fijar nombre personal', setPersonalNameBody) }, handleSetPersonalName);
  fastify.post('/proxy/mobility-needs/:mobilityNeedNumber/commands/customer-details/set-postal-address', { schema: setter('Fijar dirección postal', setPostalAddressBody) }, handleSetPostalAddress);
  fastify.post('/proxy/mobility-needs/:mobilityNeedNumber/commands/payment-details/bank-account/set-iban', { schema: setter('Fijar IBAN', setIbanBody) }, handleSetIban);
}
