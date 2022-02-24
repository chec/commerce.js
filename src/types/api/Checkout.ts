import { ExtraField } from './ExtraField';
import { ShippingMethod } from './ShippingMethod';
import { Gateway } from './Gateway';
import { Price } from './Price';
import { SelectedVariant } from './SelectedVariant';
import { Currency } from './Currency';
import { Meta } from './Meta';
import { CheckoutAnalytics } from './CheckoutAnalytics';

export interface Checkout<MetaType = Meta> {
  id: string;
  cart_id: string | null;
  created: number;
  updated: number;
  expires: number;
  analytics: CheckoutAnalytics;
  currency: Currency;
  subtotal: Price;
  total: Price;
  total_with_tax: Price;
  total_due: Price;
  pay_what_you_want: {
    enabled: boolean;
    minimum: Price | null;
    customer_set_price: Price | null;
  }
  conditionals: {
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    collects_billing_address: boolean;
    has_physical_delivery: boolean;
    has_digital_delivery: boolean;
    has_available_discounts: boolean;
    has_pay_what_you_want: boolean;
    collects_extra_fields: boolean;
    is_cart_free: boolean;
  };
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  has: {
    physical_delivery: boolean;
    digital_delivery: boolean;
    available_discounts: boolean;
    pay_what_you_want: boolean;
  };
  is: {
    cart_free: boolean;
  };
  meta: MetaType;
  line_items: CheckoutLineItem[];
  extra_fields: ExtraField[];
  gateways: Gateway[];
  shipping_methods: ShippingMethod[];
}

export interface CheckoutLineItem {
  id: string;
  product_id: string;
  name: string;
  image: string | null;
  description: string | null;
  quantity: number;
  price: Price;
  subtotal: Price;
  variants: SelectedVariant[];
  conditionals: {
    is_active: boolean;
    is_free: boolean;
    is_pay_what_you_want: boolean;
    is_inventory_managed: boolean;
    is_sold_out: boolean;
    has_digital_delivery: boolean;
    has_physical_delivery: boolean;
    has_images: boolean;
    has_video: boolean;
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    collects_billing_address: boolean;
    collects_extra_fields: boolean;
  };
  is: {
    active: boolean;
    free: boolean;
    pay_what_you_want: boolean;
    inventory_managed: boolean;
    sold_out: boolean;
  };
  has: {
    digital_delivery: boolean;
    physical_delivery: boolean;
    images: boolean;
    video: boolean;
  };
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
}
