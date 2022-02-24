import { Price } from './Price';

export enum DiscountType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export interface Discount {
  valid: boolean;
  type: DiscountType;
  code: string;
  value: number;
  amount_saved: Price;
}
