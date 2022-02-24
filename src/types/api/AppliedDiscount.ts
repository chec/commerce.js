import { Price } from './Price';
import { DiscountType } from './Discount';

export interface AppliedDiscount {
  type: DiscountType;
  code: string;
  value: number;
  amount_saved: Price;
  product_ids: string[];
}
