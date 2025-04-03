import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { useEditorData } from '../useEditorData';
import { createQueryWrapper } from '@/testUtils/createQueryWrapper';

vi.mock('@/infraestructure/server/api', () => ({
  getProducts: vi.fn().mockResolvedValue([{ id: '1', name: 'Product 1' }]),
  getTemplates: vi.fn().mockResolvedValue([{ id: 't1', name: 'Template 1' }]),
}));

describe('useEditorData', () => {
  it('fetches products and templates', async () => {
    const { result } = renderHook(() => useEditorData(['1', '2']), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.products.length > 0);
    await waitFor(() => result.current.templates.length > 0);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.products[0].id).toBe('1');
    expect(result.current.templates[0].id).toBe('t1');
  });
});
