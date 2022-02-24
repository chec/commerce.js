import { Currency } from './Currency';

export enum MerchantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface Merchant {
  id: number;
  name: string;
  description: string;
  status: MerchantStatus;
  country: string;
  currency: Currency;
  support_email: string;
  intercom: boolean;
  has: {
    analytics: boolean;
    description: boolean;
    enabled_hosted_checkouts: boolean;
    enabled_hosted_storefront: boolean;
  };
  analytics: {
    google: {
      settings: {
        tracking_id: string | null;
        linked_domains: string[];
      };
    };
  };
}
