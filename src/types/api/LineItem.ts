import { Price } from './Price';
import { SelectedVariant } from './SelectedVariant';
import { Variant } from './Variant';
import { Asset } from './Asset';
import { Meta } from './Meta';
import { Tax } from './Tax';

export interface LineItem<ProductMeta = Meta> {
  id: string;
  product_id: string;
  name: string;
  product_name: string;
  sku: string;
  permalink: string;
  quantity: number;
  price: Price;
  line_total: Price;
  is_valid: boolean,
  product_meta: ProductMeta;
  selected_options: SelectedVariant[];
  variant: Variant | null;
  image: Asset | null;
  tax: Tax,
}
