import { Meta } from './Meta';

export enum ExtraFieldType {
  TEXT = 'text',
  OPTIONS = 'options',
  NUMBER = 'number',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  RADIO = 'radio',
  HIDDEN = 'hidden',
}

export interface ExtraField<MetaType = Meta> {
  id: string;
  name: string;
  type: ExtraFieldType;
  required: boolean;
  options: object;
  meta: MetaType;
  created: number;
  updated: number;
}
