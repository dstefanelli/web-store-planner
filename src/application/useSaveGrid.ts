import { Row } from '@/domain/grid';

export function buildGridPayload(name: string, rows: Row[]) {
  const hasEmptyTemplate = rows.some(
    (row) => row.products.length > 0 && !row.selectedTemplateId,
  );

  if (hasEmptyTemplate) {
    throw new Error('All rows with products must have a selected template.');
  }

  const hasEmptyRow = rows.some((row) => row.products.length === 0);

  if (hasEmptyRow) {
    throw new Error('There are rows without any products.');
  }

  return {
    name,
    rows: rows
      .filter((row) => row.products.length > 0)
      .map((row) => ({
        templateId: row.selectedTemplateId,
        productIds: row.products.map((p) => p.id),
      })),
  };
}
