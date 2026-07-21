// Bodies y respuestas de los endpoints de mobility-needs.

export const createQuoteBody = {
  type: 'object',
  required: ['vehicleId'],
  properties: {
    vehicleId: { type: 'string', description: 'ID de la versión de vehículo' },
    annualMileage: { type: 'number', description: 'Kilometraje anual' },
    duration: { type: 'number', description: 'Duración del contrato (meses)' }
  }
} as const;

export const createOfferBody = {
  type: 'object',
  required: ['quoteNumbers'],
  properties: {
    quoteNumbers: { type: 'array', items: { type: 'string' }, description: 'Presupuestos a incluir en la oferta' }
  }
} as const;

export const setCompanyIdentificationBody = {
  type: 'object',
  required: ['companyRegistrationNumber'],
  properties: {
    companyRegistrationNumber: { type: 'string' },
    companyRegistrationDocumentType: { type: 'string' }
  }
} as const;

export const setContactInformationBody = {
  type: 'object',
  properties: {
    contactEmailAddress: { type: 'string' },
    contactTelephoneNumber: { type: 'string' },
    contactFirstName: { type: 'string' },
    contactLastName: { type: 'string' }
  }
} as const;

export const setLegalEntityNameBody = {
  type: 'object',
  required: ['legalEntityName'],
  properties: { legalEntityName: { type: 'string' } }
} as const;

export const setPersonalIdentificationBody = {
  type: 'object',
  properties: {
    personalRegistrationDocumentType: { type: 'string' },
    personalRegistrationNumber: { type: 'string' }
  }
} as const;

export const setPersonalNameBody = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' }
  }
} as const;

export const setPostalAddressBody = {
  type: 'object',
  properties: {
    city: { type: 'string' },
    stateOrProvince: { type: 'string' },
    street: { type: 'string' },
    zipOrPostalCode: { type: 'string' },
    country: { type: 'string' }
  }
} as const;

export const setIbanBody = {
  type: 'object',
  required: ['iban'],
  properties: { iban: { type: 'string', description: 'IBAN en mayúsculas' } }
} as const;

// --- Respuestas ---
export const createMobilityNeedResponse = {
  type: 'object',
  properties: { mobilityNeedNumber: { type: 'string' } }
} as const;

export const createQuoteResponse = {
  type: 'object',
  properties: {
    quoteNumber: { type: 'string' },
    productConfigurationGroupId: { type: 'string' }
  }
} as const;

// Respuesta amplia (mobility-need / customer-details / commands): estructura variable.
export const mobilityNeedView = {
  type: 'object',
  additionalProperties: true
} as const;

export const mnParam = {
  type: 'object',
  required: ['mobilityNeedNumber'],
  properties: { mobilityNeedNumber: { type: 'string', description: 'Número de mobility need' } }
} as const;
