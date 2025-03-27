import { Product } from './product';

export interface Template {
  id: string;
  name: string;
  products: Product[];
  alignment: 'LEFT' | 'CENTER' | 'RIGHT';
}
