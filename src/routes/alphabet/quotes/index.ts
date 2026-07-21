import { FastifyInstance } from 'fastify';
import {
  handleGetQuote,
  handleGetRentalAmount,
  handleGetVehiclePriceBreakdown,
  handleGetProductConfiguration,
  handleGetDocuments,
  handleGetVehicleConfiguration,
  handleGetAvailableEmissionMeasurementStandards,
  handleGetAvailableDocumentTypes,
  handleGetAvailableGeneratedDocumentTypes
} from '../../../controllers/alphabet';
import {
  quoteView,
  rentalAmountView,
  vehiclePriceBreakdownView,
  productConfigurationView,
  documentsView,
  vehicleConfigurationView,
  availableEmissionMeasurementStandardsView,
  availableDocumentTypesView,
  availableGeneratedDocumentTypesView
} from '../../../schemas/alphabet/quotes.schema';
import { quoteNumberParam, errorResponse } from '../../../schemas/alphabet/common.schema';

const TAG = 'Alphabet';

export async function quotesRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/proxy/quotes/:quoteNumber',
    {
      schema: {
        tags: [TAG],
        summary: 'Obtener presupuesto',
        description: 'Devuelve los datos del presupuesto (quote) indicado.',
        params: quoteNumberParam,
        response: { 200: quoteView, 500: errorResponse }
      }
    },
    handleGetQuote
  );

  fastify.get(
    '/proxy/quotes/:quoteNumber/rental-amount',
    {
      schema: {
        tags: [TAG],
        summary: 'Cuota mensual del presupuesto',
        description: 'Importe de la cuota (con y sin IVA) y cargos por exceso/defecto de kilometraje.',
        params: quoteNumberParam,
        response: { 200: rentalAmountView, 500: errorResponse }
      }
    },
    handleGetRentalAmount
  );

  fastify.get(
    '/proxy/quotes/:quoteNumber/vehicle-price-breakdown',
    {
      schema: {
        tags: [TAG],
        summary: 'Desglose de precio del vehículo',
        description: 'Desglose de precios: base, opciones, accesorios, descuentos, impuestos y totales.',
        params: quoteNumberParam,
        response: { 200: vehiclePriceBreakdownView, 500: errorResponse }
      }
    },
    handleGetVehiclePriceBreakdown
  );

  fastify.get(
    '/proxy/quotes/:quoteNumber/product-configuration',
    {
      schema: {
        tags: [TAG],
        summary: 'Configuración de producto',
        description: 'Rangos de duración y kilometraje disponibles y paquetes de servicios.',
        params: quoteNumberParam,
        response: { 200: productConfigurationView, 500: errorResponse }
      }
    },
    handleGetProductConfiguration
  );

  fastify.get(
    '/proxy/quotes/:quoteNumber/documents',
    {
      schema: {
        tags: [TAG],
        summary: 'Documentos del presupuesto',
        description: 'Mapa de documentos asociados al presupuesto.',
        params: quoteNumberParam,
        response: { 200: documentsView, 500: errorResponse }
      }
    },
    handleGetDocuments
  );

  fastify.get(
    '/proxy/quotes/:quoteNumber/vehicle-configuration',
    {
      schema: {
        tags: [TAG],
        summary: 'Configuración del vehículo',
        description: 'Estado de la configuración, datos del vehículo y secciones (exterior, tapicería, opciones, paquetes).',
        params: quoteNumberParam,
        response: { 200: vehicleConfigurationView, 500: errorResponse }
      }
    },
    handleGetVehicleConfiguration
  );

  fastify.get(
    '/proxy/quotes/:quoteNumber/vehicle-configuration/available-emission-measurement-standards',
    {
      schema: {
        tags: [TAG],
        summary: 'Estándares de emisiones disponibles',
        description: 'Estándares de medición de emisiones disponibles para la configuración.',
        params: quoteNumberParam,
        response: { 200: availableEmissionMeasurementStandardsView, 500: errorResponse }
      }
    },
    handleGetAvailableEmissionMeasurementStandards
  );

  fastify.get(
    '/proxy/quotes/:quoteNumber/documents/available-document-types',
    {
      schema: {
        tags: [TAG],
        summary: 'Tipos de documento aportables',
        description: 'Lista de tipos de documento que el cliente puede aportar.',
        params: quoteNumberParam,
        response: { 200: availableDocumentTypesView, 500: errorResponse }
      }
    },
    handleGetAvailableDocumentTypes
  );

  fastify.get(
    '/proxy/quotes/:quoteNumber/documents/available-generated-document-types',
    {
      schema: {
        tags: [TAG],
        summary: 'Tipos de documento generables',
        description: 'Lista de tipos de documento que el sistema puede generar.',
        params: quoteNumberParam,
        response: { 200: availableGeneratedDocumentTypesView, 500: errorResponse }
      }
    },
    handleGetAvailableGeneratedDocumentTypes
  );
}
