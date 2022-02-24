import { ProductAttributeOption } from './ProductAttributeOption';
import { Meta } from './Meta';

export interface ProductAttribute<MetaType = Meta> {
  id: string;
  meta: MetaType;
  name: string;
  value: string | number | ProductAttributeOption[] | null;
}
