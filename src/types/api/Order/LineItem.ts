import { Price } from '../Price';

export interface LineItem {
  id: string;
  product_id: string;
  product_name: string;
  product_sku: string | null;
  quantity: number;
  price: Price;
  line_total: Price;
  line_total_with_tax: Price;
  variant: {
    id: string;
    sku: string;
    description: string;
    price: Price | null;
  };
  selected_options: Array<{
    group_id: string;
    group_name: string;
    option_id: string;
    option_name: string;
  }>;
  tax: {
    is_taxable: boolean;
    amount: Price;
    taxable_amount: Price;
    rate: number;
    rate_percentage: string;
  };
}
