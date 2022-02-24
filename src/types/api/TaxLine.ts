import { Price } from './Price';

export interface TaxLine {
  amount: Price;
  rate?: number | undefined;
  rate_percentage?: string | undefined;
  type: string;
}
