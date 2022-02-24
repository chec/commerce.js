import { Meta } from './Meta';

export interface Address<MetaType = Meta> {
  id: string;
  name: string;
  street: string;
  street_2: string | null;
  town_city: string;
  postal_zip_code: string;
  county_state: string;
  country: string;
  delivery_instructions: string;
  meta: MetaType;
}
