import { Price } from './Price';
import { TaxLine } from './TaxLine';

export enum TaxProvider {
  CHEC = 'chec',
  CUSTOM = 'custom',
}

export enum TaxProviderType {
  NATIVE = 'native',
  EXTERNAL = 'external',
}

export interface Tax {
  amount: Price;
  included_in_price: boolean;
  provider: TaxProvider;
  provider_type?: TaxProviderType;
  breakdown: TaxLine[];
  zone: {
    country: string;
    region: string;
    postal_zip_code: string;
    ip_address: string | null;
  };
}
