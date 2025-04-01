import { buildGridPayload } from '@/application/useSaveGrid';
import { describe, it, expect } from 'vitest';
import { Row } from '@/domain/grid';

describe('buildGridPayload', () => {
  it('should generate correct payload from valid rows', () => {
    const rows: Row[] = [
      {
        id: 'row-1',
        products: [
          { id: '1', name: 'Product 1', price: 10, image: 'img.jpg' },
          { id: '2', name: 'Product 2', price: 15, image: 'img.jpg' },
        ],
        selectedTemplateId: 'template_01',
      },
    ];

    const payload = buildGridPayload('My Grid', rows);

    expect(payload).toEqual({
      name: 'My Grid',
      rows: [
        {
          templateId: 'template_01',
          productIds: ['1', '2'],
        },
      ],
    });
  });

  it('should throw if a row with products has no template', () => {
    const rows: Row[] = [
      {
        id: 'row-1',
        products: [{ id: '1', name: 'Product 1', price: 10, image: 'img.jpg' }],
        selectedTemplateId: '',
      },
    ];

    expect(() => buildGridPayload('My Grid', rows)).toThrow(
      'All rows with products must have a selected template.',
    );
  });
});
