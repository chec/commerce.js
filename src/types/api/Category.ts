import { Meta } from './Meta';

export interface Category<MetaType = Meta> {
  id: string;
  parent_id: string;
  slug: string;
  name: string;
  description: string;
  products: number;
  created: number;
  updated: number;
  meta: MetaType;
}
