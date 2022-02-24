import { Asset } from './Asset';
import { Price } from './Price';
import { Meta } from './Meta';

export interface Variant<MetaType = Meta> {
  id: string;
  sku: string | null;
  description: string | null;
  inventory: number | null;
  price: Price | null;
  is_valid: boolean;
  invalid_reason_code: string | null;
  meta: MetaType;
  created?: number | undefined;
  updated?: number | undefined;
  options: { [name: string]: string };
  assets: Asset[];
}
