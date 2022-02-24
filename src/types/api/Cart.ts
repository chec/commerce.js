import { Price } from './Price';
import { LineItem } from './LineItem';
import { Meta } from './Meta';
import { AppliedDiscount } from './AppliedDiscount';
import { Currency } from './Currency';

export interface Cart<MetaType = Meta> {
  id: string;
  created: number;
  updated: number;
  expires: number;
  total_items: number;
  total_unique_items: number;
  subtotal: Price;
  currency: Currency;
  discount_code: AppliedDiscount | Record<string, never>;
  hosted_checkout_url: string;
  line_items: LineItem[];
  meta: MetaType;
}
