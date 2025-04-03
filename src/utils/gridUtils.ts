import { Row } from '@/domain/grid';

export function reorder<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function moveProductWithinRow(
  row: Row,
  fromProductId: string,
  toProductId: string,
): Row {
  const products = [...row.products];
  const oldIndex = products.findIndex((p) => p.id === fromProductId);
  const newIndex = products.findIndex((p) => p.id === toProductId);

  if (oldIndex === -1 || newIndex === -1) return row;

  const [moved] = products.splice(oldIndex, 1);
  products.splice(newIndex, 0, moved);

  return { ...row, products };
}

export function moveProductBetweenRows(
  rows: Row[],
  fromRowId: string,
  toRowId: string,
  productId: string,
): Row[] {
  const fromRow = rows.find((r) => r.id === fromRowId);
  const toRow = rows.find((r) => r.id === toRowId);
  if (!fromRow || !toRow) return rows;

  const movingProduct = fromRow.products.find((p) => p.id === productId);
  if (!movingProduct) return rows;

  if (toRow.products.some((p) => p.id === productId)) return rows;

  return rows.map((row) => {
    if (row.id === fromRowId) {
      return {
        ...row,
        products: row.products.filter((p) => p.id !== productId),
      };
    }
    if (row.id === toRowId) {
      return {
        ...row,
        products: [...row.products, movingProduct],
      };
    }
    return row;
  });
}

export function swapProductsBetweenFullRows(
  rows: Row[],
  fromRowId: string,
  toRowId: string,
  productId: string,
  targetProductId: string,
): Row[] {
  const fromRow = rows.find((r) => r.id === fromRowId);
  const toRow = rows.find((r) => r.id === toRowId);
  if (!fromRow || !toRow) return rows;

  const movingProduct = fromRow.products.find((p) => p.id === productId);
  const productToReplace = toRow.products.find((p) => p.id === targetProductId);
  if (!movingProduct || !productToReplace) return rows;

  return rows.map((row) => {
    if (row.id === fromRowId) {
      return {
        ...row,
        products: [
          ...row.products.filter((p) => p.id !== productId),
          productToReplace,
        ],
      };
    }
    if (row.id === toRowId) {
      return {
        ...row,
        products: [
          ...row.products.filter((p) => p.id !== targetProductId),
          movingProduct,
        ],
      };
    }
    return row;
  });
}
