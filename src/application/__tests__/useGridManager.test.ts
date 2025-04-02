import { describe, it, expect } from 'vitest';
import { distributeProductsInRows } from '../useGridManager';
import type { Product } from '@/domain/product';

describe('distributeProductsInRows', () => {
  const mockProducts = (count: number): Product[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `product-${i}`,
      name: `Product ${i}`,
    })) as Product[];
  };

  it('distributes products in rows of max 3 items', () => {
    const products = mockProducts(7);
    const rows = distributeProductsInRows(products);

    expect(rows.length).toBe(3);
    expect(rows[0].products.length).toBe(3);
    expect(rows[1].products.length).toBe(3);
    expect(rows[2].products.length).toBe(1);
  });

  it('generates unique ids for each row', () => {
    const products = mockProducts(6);
    const rows = distributeProductsInRows(products);
    const ids = rows.map((row) => row.id);

    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(rows.length);
    expect(ids.every((id) => id.startsWith('row-'))).toBe(true);
  });
});
