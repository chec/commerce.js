import { Meta } from './Meta';
import { Address } from './Address';

export interface Customer<MetaType = Meta> {
  id: string;
  external_id: string | null;
  firstname: string;
  lastname: string;
  email: string;
  phone: string | null;
  meta: MetaType;
  created: number;
  updated: number;
  default_shipping: null | Address;
  default_billing: null | Address;
}
