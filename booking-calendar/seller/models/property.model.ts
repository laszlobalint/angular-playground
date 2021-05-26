import { Currency } from '../../shared/models/currency.model';
import { Appointment } from '../../appointment/models';

export interface CreatePropertyResponse {
  sellerId: string;
  address: Address;
  thumbnailPictureUrl: string;
  targetPrice: TargetPrice;
  bedrooms: number;
  floorArea: number;
  adEndDate: string;
  offers: Offers;
  appointments: Appointment;
  id: string;
  documentType: string;
  partitionKey: string;
}

export interface GetPropertyResponse {
  id: string;
  address: Address;
  thumbnailPictureUrl: string;
  targetPrice: TargetPrice;
  bedrooms: number;
  floorArea: number;
  adEndDate: string;
  offerCount: number;
}

export interface Address {
  country: string;
  city: string;
  district: string;
  street: string;
}

export interface TargetPrice {
  amount: number;
  currency: Currency;
}

export interface Offers {
  buyerId: string;
  price: number;
}
