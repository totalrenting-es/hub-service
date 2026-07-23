// Esquemas JSON (OpenAPI) reutilizables de la API de Alphabet.

export const amountView = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
    currency: { type: 'string' }
  }
} as const;

export const discountView = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
    currency: { type: 'string' },
    percentage: { type: 'number' }
  }
} as const;

export const taxView = {
  type: 'object',
  properties: {
    percentage: { type: 'number' },
    amount: { type: 'number' },
    currency: { type: 'string' },
    type: { type: 'string' }
  }
} as const;

export const rangeValueView = {
  type: 'object',
  properties: {
    value: { type: 'number' },
    minimumValue: { type: 'number' },
    maximumValue: { type: 'number' },
    stepSize: { type: 'number' }
  }
} as const;

// Parámetro de ruta común: número de presupuesto.
export const quoteNumberParam = {
  type: 'object',
  required: ['quoteNumber'],
  properties: {
    quoteNumber: { type: 'string', description: 'Número de presupuesto' }
  }
} as const;

// Respuesta de error del proxy.
export const errorResponse = {
  type: 'object',
  properties: {
    error: { type: 'string', description: 'Nombre del error' },
    message: { type: 'string', description: 'Descripción del error' }
  }
} as const;
