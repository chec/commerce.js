import { Address } from './Address';
import { Currency } from './Currency';
import { Customer } from './Customer';
import { LineItem } from './Order/LineItem';
import { Tax } from './Tax';
import { Price } from './Price';
import { Discount } from './Discount';
import { Meta } from './Meta';
import Transaction from './Order/Transaction';

export enum PaymentStatus {
  REFUNDED = 'refunded',
  PENDING = 'pending',
  PAID = 'paid',
  NOT_PAID = 'not_paid',
  PARTIALLY_PAID = 'partially_paid',
}

export enum FulfillmentStatus {
  OPEN = 'open',
  FULFILLED = 'fulfilled',
  NOT_FULFILLED = 'not_fulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  RETURNED = 'returned',
}

export interface OrderConditionals {
  collected_fullname: boolean;
  collected_shipping_address: boolean;
  collected_billing_address: boolean;
  collected_extra_fields: boolean;
  collected_tax: boolean;
  collected_eu_vat_moss_evidence: boolean;
  has_physical_fulfillment: boolean;
  has_digital_fulfillment: boolean;
  has_extend_fulfillment: boolean;
  has_extend_apps: boolean;
  has_webhook_fulfillment: boolean;
  has_pay_what_you_want: boolean;
  has_discounts: boolean;
  has_subscription_items: boolean;
  is_free: boolean;
  is_fulfilled: boolean;
}

export interface Order<MetaType = Meta> {
  version: string;
  sandbox: boolean;
  id: string;
  checkout_token_id: string;
  cart_id: string;
  customer_reference: string;
  created: number;
  status_payment: PaymentStatus;
  status_fulfillment: FulfillmentStatus;
  currency: Currency;
  order_value: Price;
  conditionals: OrderConditionals;
  meta: MetaType;
  redirect: boolean;
  has: {
    digital_fulfillment: boolean;
    discounts: boolean;
    extend_apps: boolean;
    extend_fulfillment: boolean;
    pay_what_you_want: boolean;
    physical_fulfillment: boolean;
    subscription_items: boolean;
    webhook_fulfillment: boolean;
  };
  is: {
    free: boolean;
    fulfilled: boolean;
  };
  order: {
    subtotal: Price;
    total: Price;
    total_with_tax: Price;
    total_paid: Price;
    adjustments: {
      taxable: Price;
      untaxable: Price;
      total: Price;
    },
    pay_what_you_want: {
      enabled: boolean;
      minimum: Price | null;
      customer_set_price: Price | null;
    };
    shipping: {
      id: string;
      description: string;
      provider: string;
      price: Price;
    };
    line_items: LineItem[];
    discount: Omit<Discount, 'valid'> | [];
    giftcard: {
      id: string;
      code: string;
      credit: Price;
    };
  };
  shipping: Address;
  billing: Address;
  transactions: Transaction[];
  fulfillment: any;
  customer: Customer;
  extra_fields: Array<{
    id: string;
    name: string;
    type: string;
    required: boolean;
    value: string;
  }>;
  client_details: any;
  tax: Tax;
}
