import { amountView, discountView, taxView, rangeValueView } from './common.schema';

export const quoteView = {
  type: 'object',
  properties: {
    quoteNumber: { type: 'string' },
    expiryDate: { type: 'string' },
    status: { type: 'string', enum: ['DRAFT', 'OFFERED', 'ACCEPTED', 'COMPLETED'] },
    commissionPercentage: { type: 'number' },
    commissionAmount: amountView,
    commissionEditable: { type: 'boolean' },
    capitalContribution: {
      type: 'object',
      properties: {
        amountExclVAT: amountView,
        amountInclVAT: amountView,
        includingVAT: { type: 'boolean' }
      }
    },
    validProformaInvoiceState: { type: 'boolean' },
    dealerEditable: { type: 'boolean' },
    validDealerState: { type: 'boolean' },
    stockVehicle: { type: 'boolean' },
    searchable: { type: 'boolean' },
    alias: { type: 'string' },
    created: { type: 'string' },
    dealerSelectionAvailable: { type: 'boolean' }
  }
} as const;

export const rentalAmountView = {
  type: 'object',
  properties: {
    rentalAmountExclVAT: amountView,
    rentalAmountInclVAT: amountView,
    excessMileageChargeExclVAT: { type: 'number' },
    excessMileageChargeInclVAT: { type: 'number' },
    underMileageRefundExclVAT: { type: 'number' },
    underMileageRefundInclVAT: { type: 'number' }
  }
} as const;

export const productConfigurationView = {
  type: 'object',
  properties: {
    allowedTotalContractMileage: { type: 'number' },
    contractMileage: rangeValueView,
    duration: rangeValueView,
    mileage: rangeValueView,
    serviceBundles: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          name: { type: 'string' },
          state: { type: 'string' }
        }
      }
    }
  }
} as const;

export const vehiclePriceBreakdownView = {
  type: 'object',
  properties: {
    vehicleBasePriceEx: amountView,
    totalOptionsPriceEx: amountView,
    totalAccessoriesPriceEx: amountView,
    totalVehicleBasePriceEx: amountView,
    appliedDiscount: discountView,
    deliveryPriceEx: amountView,
    catalogueDeliveryPriceEx: { type: 'number' },
    totalBeforeTaxes: amountView,
    registrationTax: taxView,
    valueAddedTax: taxView,
    totalAfterTaxes: amountView,
    defaultDiscountApplicable: { type: 'boolean' },
    totalAfterTaxesWithoutDelivery: amountView
  }
} as const;

export const documentsView = {
  type: 'object',
  additionalProperties: {
    type: 'object',
    properties: {
      documentContentNumber: { type: 'string' }
    }
  }
} as const;

const codeDescription = {
  type: 'object',
  properties: { code: { type: 'string' }, description: { type: 'string' } }
} as const;

// Configuración del vehículo seleccionado (vista amplia; se puede ampliar por sección).
export const vehicleConfigurationView = {
  type: 'object',
  properties: {
    state: { type: 'string', description: 'Estado de la configuración (p.ej. COMPLETE)' },
    vehicle: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        brand: { type: 'string' },
        modelRange: { type: 'string' },
        modelDisplayName: { type: 'string' },
        bodyType: codeDescription,
        photos: {
          type: 'array',
          items: {
            type: 'object',
            properties: { thumbnailPath: { type: 'string' }, largePhotoPath: { type: 'string' } }
          }
        },
        technicalSpecification: {
          type: 'object',
          properties: {
            fuelType: codeDescription,
            transmission: codeDescription,
            numberOfSeats: { type: 'number' }
          }
        }
      }
    },
    exteriorConfiguration: { type: 'object', additionalProperties: true },
    upholsteryConfiguration: { type: 'object', additionalProperties: true },
    optionConfiguration: { type: 'object', additionalProperties: true },
    packConfiguration: { type: 'object', additionalProperties: true }
  }
} as const;

export const availableEmissionMeasurementStandardsView = {
  type: 'object',
  additionalProperties: true,
  description: 'Estándares de medición de emisiones disponibles.'
} as const;

export const availableDocumentTypesView = {
  type: 'array',
  items: { type: 'string' },
  description: 'Tipos de documento que se pueden aportar.'
} as const;

export const availableGeneratedDocumentTypesView = {
  type: 'array',
  items: { type: 'string' },
  description: 'Tipos de documento generables.'
} as const;
