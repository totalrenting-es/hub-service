// Tipos de las respuestas de la API de Alphabet.
// Traducidos de astro-totalrenting/src/entities/models/alphabet.

// --- Tipos base reutilizables ---
export type AmountView = {
  amount?: number;
  currency?: string;
};

export type DiscountView = {
  amount?: number;
  currency?: string;
  percentage?: number;
};

export type TaxView = {
  percentage?: number;
  amount?: number;
  currency?: string;
  type?: string;
};

export type RangeValueView = {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
  stepSize?: number;
};

// --- Quotes ---
export type QuoteStatus = 'DRAFT' | 'OFFERED' | 'ACCEPTED' | 'COMPLETED';

export type QuoteView = {
  quoteNumber?: string;
  expiryDate?: string;
  status?: QuoteStatus;
  commissionPercentage?: number;
  commissionAmount?: AmountView;
  commissionEditable?: boolean;
  capitalContribution?: {
    amountExclVAT?: AmountView;
    amountInclVAT?: AmountView;
    includingVAT?: boolean;
  };
  validProformaInvoiceState?: boolean;
  dealerEditable?: boolean;
  validDealerState?: boolean;
  stockVehicle?: boolean;
  searchable?: boolean;
  alias?: string;
  created?: string;
  dealerSelectionAvailable?: boolean;
};

export type RentalAmountView = {
  rentalAmountExclVAT?: AmountView;
  rentalAmountInclVAT?: AmountView;
  excessMileageChargeExclVAT?: number;
  excessMileageChargeInclVAT?: number;
  underMileageRefundExclVAT?: number;
  underMileageRefundInclVAT?: number;
};

export type ServiceBundleView = {
  code?: string;
  name?: string;
  state?: string;
};

export type ProductConfigurationView = {
  allowedTotalContractMileage?: number;
  contractMileage?: RangeValueView;
  duration?: RangeValueView;
  mileage?: RangeValueView;
  serviceBundles?: ServiceBundleView[];
};

export type VehiclePriceBreakdownView = {
  vehicleBasePriceEx?: AmountView;
  totalOptionsPriceEx?: AmountView;
  totalAccessoriesPriceEx?: AmountView;
  totalVehicleBasePriceEx?: AmountView;
  appliedDiscount?: DiscountView;
  deliveryPriceEx?: AmountView;
  catalogueDeliveryPriceEx?: number;
  totalBeforeTaxes?: AmountView;
  registrationTax?: TaxView;
  valueAddedTax?: TaxView;
  totalAfterTaxes?: AmountView;
  defaultDiscountApplicable?: boolean;
  totalAfterTaxesWithoutDelivery?: AmountView;
};

export type DocumentsView = Record<string, { documentContentNumber?: string }>;

// --- Vehicles ---
export type CodeDescription = {
  code?: string;
  description?: string;
};

export type PhotoView = {
  thumbnailPath?: string;
  largePhotoPath?: string;
};

// Grupo de vehículos (respuesta de /vehicles/search/grouped).
export type VehicleGroup = {
  brand?: string;
  modelRange?: string;
  bodyType?: CodeDescription;
  startingPrice?: AmountView;
  idCheapestVehicle?: string;
  nrOfVehicles?: number;
  photo?: PhotoView;
};

export type SearchGroupedResponse = {
  vehicles?: VehicleGroup[];
  paging?: PagingView;
  filters?: unknown[];
  productConfiguration?: ProductConfigurationView;
};

// Versión concreta de vehículo (respuesta de /vehicles/search).
export type Vehicle = {
  id?: string;
  brand?: string;
  modelRange?: string;
  modelDisplayName?: string;
  modelYear?: number;
  numberOfDoors?: number;
  bodyType?: CodeDescription;
  vehicleBasicPrice?: AmountView;
  technicalSpecification?: {
    fuelType?: CodeDescription;
    transmission?: CodeDescription;
    numberOfSeats?: number;
  };
};

export type SearchResponse = {
  vehicles?: Vehicle[];
};

export type PagingView = {
  page?: number;
  pageSize?: number;
  moreResults?: boolean;
};

// --- Params de ruta ---
export type QuoteNumberParams = {
  quoteNumber: string;
};

export type MobilityNeedParams = {
  mobilityNeedNumber: string;
};

// --- Bodies de commands (quotes) ---
export type SetVehicleBody = { vehicleId: string };
export type OptionBody = { optionId: string };
export type SetExteriorBody = { id: string };
export type SetUpholsteryBody = { id: string };
export type SetMileageAndDurationBody = { mileage: number; duration: number };
export type SetEmissionMeasurementStandardBody = { emissionMeasurementStandard: string };

// --- Bodies de commands (mobility-needs) ---
export type CreateQuoteBody = { vehicleId: string; annualMileage?: number; duration?: number };
export type CreateOfferBody = { quoteNumbers: string[] };
export type SetCompanyIdentificationBody = { companyRegistrationNumber: string; companyRegistrationDocumentType?: string };
export type SetContactInformationBody = { contactEmailAddress: string; contactTelephoneNumber: string; contactFirstName?: string; contactLastName?: string };
export type SetLegalEntityNameBody = { legalEntityName: string };
export type SetPersonalIdentificationBody = { personalRegistrationDocumentType: string; personalRegistrationNumber: string };
export type SetPersonalNameBody = { firstName: string; lastName: string };
export type SetPostalAddressBody = { city: string; stateOrProvince: string; street: string; zipOrPostalCode: string; country?: string };
export type SetIbanBody = { iban: string };
