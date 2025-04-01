import { Row } from '@/domain/grid';
import { Product } from '@/domain/product';

export function distributeProductsInRows(products: Product[]): Row[] {
  const rows: Row[] = [];
  const MAX_ITEMS_PER_ROW = 3;

  for (let i = 0; i < products.length; i += MAX_ITEMS_PER_ROW) {
    rows.push({
      id: `row-${crypto.randomUUID()}`,
      products: products.slice(i, i + MAX_ITEMS_PER_ROW),
      selectedTemplateId: '',
    });
  }

  return rows;
}
