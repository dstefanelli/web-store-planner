import { Product } from './product';

export interface Grid {
  id: string;
  name: string;
  rows: Row[];
}

export interface Row {
  id: string;
  products: Product[];
  selectedTemplateId: string;
}
