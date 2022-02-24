import { Price } from './Price';
import { ProductVariantGroup } from './ProductVariantGroup';
import { Asset } from './Asset';
import { ProductAttribute } from './ProductAttribute';
import { Meta } from './Meta';

export interface Product<ProductMeta = Meta,
  AttributeMeta = Meta,
  AssetMeta = Meta,
  VariantGroupMeta = Meta,
  VariantOptionMeta = Meta,
  > {
  id: string;
  created: number;
  updated: number;
  active: boolean;
  permalink: string;
  name: string;
  description: string;
  price: Price;
  inventory: {
    managed: boolean;
    available: number;
  };
  media: {
    type: string;
    source: string;
  };
  sku: string | null;
  sort_order: number;
  seo: {
    title: string | null;
    description: string | null;
  };
  thank_you_url: string | null;
  meta: ProductMeta;
  conditionals: {
    is_active: boolean;
    is_tax_exempt: boolean;
    is_pay_what_you_want: boolean;
    is_inventory_managed: boolean;
    is_sold_out: boolean;
    has_digital_delivery: boolean;
    has_physical_delivery: boolean;
    has_images: boolean;
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    collects_billing_address: boolean;
    collects_extra_fields: boolean;
  };
  is: {
    active: boolean;
    tax_exempt: boolean;
    pay_what_you_want: boolean;
    inventory_managed: boolean;
    sold_out: boolean;
  };
  has: {
    digital_delivery: boolean;
    physical_delivery: boolean;
    images: boolean;
    video: boolean;
    rich_embed: boolean;
  };
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  checkout_url: {
    checkout: string;
    display: string;
  };
  extra_fields: any[];
  variant_groups: ProductVariantGroup<VariantGroupMeta, VariantOptionMeta>[];
  categories: Array<{
    id: string;
    slug: string;
    name: string;
  }>;
  assets: Asset<AssetMeta>[];
  image: Asset | null;
  attributes: ProductAttribute<AttributeMeta>[];
  related_products: Product<ProductMeta, AttributeMeta>[];
}
