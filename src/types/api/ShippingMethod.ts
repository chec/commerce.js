import { Price } from './Price';

export interface ShippingMethod {
  id: string;
  description: string;
  price: Price;
  countries: string[];
}
