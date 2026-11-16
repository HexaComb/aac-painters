export type FinishType = 'paint' | 'stain' | 'none';

export interface QuoteService {
  value: string;
  label: string;
  finishType: FinishType;
  propertyTypes: string[];
}

const homeProperties = ['Residential — Home Interior', 'Residential — Home Exterior', 'Residential — Interior & Exterior', 'Residential — Other'];

export const quoteServices: QuoteService[] = [
  { value: 'Interior & Exterior Residential Painting', label: 'Interior & Exterior Home Painting', finishType: 'paint', propertyTypes: homeProperties },
  { value: 'Commercial Painting & Stucco Restoration', label: 'Commercial Building / Facade Painting', finishType: 'paint', propertyTypes: ['Commercial — Office / Storefront', 'Commercial — Warehouse', 'Commercial — HOA / Hotel / Apartments', 'Commercial — Other'] },
  { value: 'Cabinets, Trim & Interior Repaint', label: 'Cabinets, Trim & Interior Repaint', finishType: 'paint', propertyTypes: ['Residential — Home Interior', 'Commercial — Interior', 'Other'] },
  { value: 'Stairwell & Railing Painting', label: 'Stairwell & Railing Painting', finishType: 'paint', propertyTypes: ['Residential — Home Interior', 'Commercial — Interior', 'Other'] },
  { value: 'Popcorn Ceiling Removal & Re-Texturing', label: 'Popcorn Ceiling Removal & Re-Texturing', finishType: 'none', propertyTypes: ['Residential — Home', 'Residential — Apartment / Condo', 'Commercial — Interior', 'Other'] },
  { value: 'Pressure Washing', label: 'Pressure Washing', finishType: 'none', propertyTypes: ['Residential — Home Exterior', 'Commercial — Building Exterior', 'Outdoor — Driveway / Patio / Walkway', 'Outdoor — Fence / Deck', 'Other'] },
  { value: 'Fence & Deck Staining', label: 'Fence & Deck Staining', finishType: 'stain', propertyTypes: ['Residential — Fence', 'Residential — Deck', 'Residential — Fence & Deck', 'Commercial — Fence / Deck', 'Other'] },
];

export function getQuoteService(value: string) {
  const aliases: Record<string, string> = {
    'Cabinets, Trim & Drywall Finishing': 'Cabinets, Trim & Interior Repaint',
  };
  const currentValue = aliases[value] || value;
  return quoteServices.find((service) => service.value === currentValue);
}

export function isValidPhone(value: string) {
  if (!/^[\d\s+().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return /^\d{10}$/.test(digits) || /^1\d{10}$/.test(digits);
}
