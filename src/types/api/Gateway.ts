export enum GatewayCode {
  BRAINTREE = 'braintree',
  MANUAL = 'manual',
  OMISE = 'omise',
  PAYPAL = 'paypal',
  PAYSTACK = 'paystack',
  RAZORPAY = 'razorpay',
  SQUARE = 'square',
  STRIPE = 'stripe',
}

interface BraintreeConfig {
  client_token: string;
}

interface ManualConfig {
  name: string;
  details: string;
}

interface OmiseConfig {
  public_key: string;
}

interface PayPalConfig {
  email: string;
}

interface PaystackConfig {
  public_key: string;
}

interface RazorpayConfig {
  key_id: string;
}

interface SquareConfig {
  application_id: string;
  merchant_id: string;
  location_id: string|null;
}

interface StripeConfig {
  publishable_key: string;
}

type GatewayConfig =
  BraintreeConfig
  | ManualConfig
  | OmiseConfig
  | PayPalConfig
  | PaystackConfig
  | RazorpayConfig
  | SquareConfig
  | StripeConfig;

export interface Gateway {
  id: string;
  code: GatewayCode;
  sandbox: boolean;
  config: Array<never>|GatewayConfig;
}
