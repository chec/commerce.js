import { Meta } from './Meta';

export interface Asset<MetaType = Meta> {
  id: string;
  url: string;
  description: string | null;
  is_image: boolean;
  filename: string;
  file_extension: string;
  image_dimensions: {
    width: number;
    height: number;
  };
  file_size?: number | undefined;
  meta: MetaType;
  created_at: number;
  updated_at: number;
}
