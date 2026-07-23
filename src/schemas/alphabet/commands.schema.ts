// Bodies de los commands (POST) y respuesta genérica.

export const setVehicleBody = {
  type: 'object',
  required: ['vehicleId'],
  properties: { vehicleId: { type: 'string', description: 'ID de la versión de vehículo' } }
} as const;

export const optionBody = {
  type: 'object',
  required: ['optionId'],
  properties: { optionId: { type: 'string', description: 'ID de la opción o paquete' } }
} as const;

export const setExteriorBody = {
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'string', description: 'ID del color/exterior' } }
} as const;

export const setUpholsteryBody = {
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'string', description: 'ID de la tapicería' } }
} as const;

export const setMileageAndDurationBody = {
  type: 'object',
  required: ['mileage', 'duration'],
  properties: {
    mileage: { type: 'number', description: 'Kilometraje anual' },
    duration: { type: 'number', description: 'Duración del contrato (meses)' }
  }
} as const;

export const setEmissionMeasurementStandardBody = {
  type: 'object',
  required: ['emissionMeasurementStandard'],
  properties: { emissionMeasurementStandard: { type: 'string' } }
} as const;

// Respuesta genérica de un command (el resultado concreto varía; el flujo del
// cotizador recarga las vistas con GETs posteriores).
export const commandAccepted = {
  type: 'object',
  additionalProperties: true,
  description: 'Command procesado por Alphabet.'
} as const;
