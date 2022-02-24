import { GatewayCode } from '../Gateway';
import { Price } from '../Price';
import { Meta } from '../Meta';

enum Type {
  REFUND = 'refund',
  CHARGE = 'charge',
}

enum Status {
  PENDING = 'pending',
  COMPLETE = 'complete',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

enum StatusReason {
  AWAITING_CHARGE_DATE = 'awaiting_charge_date',
  AWAITING_FULFILLMENT = 'awaiting_fulfillment',
  AWAITING_CAPTURE = 'awaiting_capture',
  AWAITING_AUTHORIZATION = 'awaiting_authorization',
  ORDER_CANCELLED = 'order_cancelled',
  CANCELLED = 'cancelled',
  COMPLETE = 'complete',
  GATEWAY_FAILURE = 'gateway_failure',
  CARD_DECLINED = 'card_declined',
  CARD_EXPIRED = 'card_expired',
}

export default interface Transaction<MetaType = Meta> {
  id: string;
  type: Type;
  status: Status;
  status_reason: StatusReason;
  charge_date: number | null;
  gateway: GatewayCode;
  gateway_name: string;
  gateway_transaction_id: string;
  gateway_customer_id: string;
  gateway_reference: string;
  notes: string;
  amount: Price;
  payment_source_type: string;
  // Payment source is provided by the connector verbatim. This will depend on the current version of payment
  // gateway APIs
  payment_source: unknown;
  meta: MetaType;
  created: number;
  updated: number;
}
