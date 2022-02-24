import { Price } from './Price';
import { Meta } from './Meta';

export interface ProductVariantGroup<MetaType = Meta, OptionMetaType = Meta> {
  id: string;
  name: string;
  meta?: MetaType;
  created: number | null;
  updated: number | null;
  options: ProductVariantOption<OptionMetaType>[];
}

export interface ProductVariantOption<MetaType = Meta> {
  id: string;
  name: string;
  price: Price;
  assets: string[] | null;
  meta: MetaType;
  created: number | null;
  updated: number | null;
}
