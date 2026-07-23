import { amountView } from './common.schema';

const codeDescription = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    description: { type: 'string' }
  }
} as const;

const photoView = {
  type: 'object',
  properties: {
    thumbnailPath: { type: 'string' },
    largePhotoPath: { type: 'string' }
  }
} as const;

export const vehicleGroup = {
  type: 'object',
  properties: {
    brand: { type: 'string' },
    modelRange: { type: 'string' },
    bodyType: codeDescription,
    startingPrice: amountView,
    idCheapestVehicle: { type: 'string' },
    nrOfVehicles: { type: 'number' },
    photo: photoView
  }
} as const;

export const searchGroupedResponse = {
  type: 'object',
  properties: {
    vehicles: { type: 'array', items: vehicleGroup },
    paging: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        pageSize: { type: 'number' },
        moreResults: { type: 'boolean' }
      }
    },
    filters: { type: 'array', items: {} }
  }
} as const;

export const vehicleView = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    brand: { type: 'string' },
    modelRange: { type: 'string' },
    modelDisplayName: { type: 'string' },
    modelYear: { type: 'number' },
    numberOfDoors: { type: 'number' },
    bodyType: codeDescription,
    vehicleBasicPrice: amountView,
    technicalSpecification: {
      type: 'object',
      properties: {
        fuelType: codeDescription,
        transmission: codeDescription,
        numberOfSeats: { type: 'number' }
      }
    }
  }
} as const;

export const searchResponse = {
  type: 'object',
  properties: {
    vehicles: { type: 'array', items: vehicleView }
  }
} as const;

// Querystring de /vehicles/search/grouped (filtros del cotizador).
export const searchGroupedQuery = {
  type: 'object',
  properties: {
    bodyType: { type: 'array', items: { type: 'string' }, description: 'Códigos de carrocería (repetible)' },
    fuelType: { type: 'array', items: { type: 'string' }, description: 'Tipos de combustible (repetible)' },
    nrOfDoors: { type: 'array', items: { type: 'string' } },
    transmissionType: { type: 'array', items: { type: 'string' } },
    brand: { type: 'array', items: { type: 'string' } },
    pricing: { type: 'string', description: 'Rango de precio' },
    page: { type: 'integer', minimum: 1, description: 'Número de página' },
    duration: { type: 'integer', description: 'Duración del contrato (meses)' },
    annualMileage: { type: 'integer', description: 'Kilometraje anual' }
  }
} as const;

// Querystring de /vehicles/search (versiones de un modelo).
export const searchQuery = {
  type: 'object',
  properties: {
    brand: { type: 'string', description: 'Filtro "Marca::ModelRange"' },
    pageSize: { type: 'string' },
    status: { type: 'string', description: 'Estado del vehículo (p.ej. CURRENT)' }
  }
} as const;
