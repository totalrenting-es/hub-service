import { FastifyInstance } from 'fastify';
import {
  handleSetVehicle,
  handleAcceptQuote,
  handleCompleteQuote,
  handleSetMileageAndDuration,
  handleAddOption,
  handleRemoveOption,
  handleAddPackage,
  handleRemovePackage,
  handleSetExterior,
  handleSetUpholstery,
  handleSetEmissionMeasurementStandard
} from '../../../controllers/alphabet';
import { setVehicleBody, optionBody, setExteriorBody, setUpholsteryBody, setMileageAndDurationBody, setEmissionMeasurementStandardBody, commandAccepted } from '../../../schemas/alphabet/commands.schema';
import { quoteNumberParam, errorResponse } from '../../../schemas/alphabet/common.schema';

const TAG = 'Alphabet';

const cmd = (summary: string, body?: object) => ({
  tags: [TAG],
  summary,
  params: quoteNumberParam,
  ...(body ? { body } : {}),
  response: { 200: commandAccepted, 500: errorResponse }
});

export async function commandsRoutes(fastify: FastifyInstance) {
  fastify.post('/proxy/quotes/:quoteNumber/commands/set-vehicle', { schema: cmd('Seleccionar versión de vehículo', setVehicleBody) }, handleSetVehicle);
  fastify.post('/proxy/quotes/:quoteNumber/commands/accept-quote', { schema: cmd('Aceptar presupuesto') }, handleAcceptQuote);
  fastify.post('/proxy/quotes/:quoteNumber/commands/complete-quote', { schema: cmd('Completar presupuesto') }, handleCompleteQuote);
  fastify.post('/proxy/quotes/:quoteNumber/product-configuration/commands/set-mileage-and-duration', { schema: cmd('Fijar kilometraje y duración', setMileageAndDurationBody) }, handleSetMileageAndDuration);
  fastify.post('/proxy/quotes/:quoteNumber/vehicle-configuration/commands/add-option', { schema: cmd('Añadir opción', optionBody) }, handleAddOption);
  fastify.post('/proxy/quotes/:quoteNumber/vehicle-configuration/commands/remove-option', { schema: cmd('Quitar opción', optionBody) }, handleRemoveOption);
  fastify.post('/proxy/quotes/:quoteNumber/vehicle-configuration/commands/add-package', { schema: cmd('Añadir paquete', optionBody) }, handleAddPackage);
  fastify.post('/proxy/quotes/:quoteNumber/vehicle-configuration/commands/remove-package', { schema: cmd('Quitar paquete', optionBody) }, handleRemovePackage);
  fastify.post('/proxy/quotes/:quoteNumber/vehicle-configuration/commands/set-exterior', { schema: cmd('Fijar color/exterior', setExteriorBody) }, handleSetExterior);
  fastify.post('/proxy/quotes/:quoteNumber/vehicle-configuration/commands/set-upholstery', { schema: cmd('Fijar tapicería', setUpholsteryBody) }, handleSetUpholstery);
  fastify.post('/proxy/quotes/:quoteNumber/vehicle-configuration/commands/set-emission-measurement-standard', { schema: cmd('Fijar estándar de emisiones', setEmissionMeasurementStandardBody) }, handleSetEmissionMeasurementStandard);
}
