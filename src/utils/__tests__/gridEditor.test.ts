import { describe, it, expect } from 'vitest';
import {
  generateGridName,
  getTemplateAlignment,
  createEmptyRow,
} from '@/utils/gridEditor';
import type { Template } from '@/domain/template';

describe('generateGridName', () => {
  it('should generate a string starting with "Grid "', () => {
    const name = generateGridName();
    expect(name.startsWith('Grid-')).toBe(true);

    const numberPart = parseInt(name.replace('Grid-', ''), 10);
    expect(Number.isNaN(numberPart)).toBe(false);
    expect(numberPart).toBeGreaterThanOrEqual(10000);
    expect(numberPart).toBeLessThanOrEqual(99999);
  });

  it('generates different names on multiple calls', () => {
    const name1 = generateGridName();
    const name2 = generateGridName();
    expect(name1).not.toBe(name2);
  });
});

describe('getTemplateAlignment', () => {
  const templates: Template[] = [
    { id: 't1', name: 'T1', alignment: 'left' },
    { id: 't2', name: 'T2', alignment: 'center' },
    { id: 't3', name: 'T3', alignment: 'right' },
  ];

  it('returns correct alignment when template is found', () => {
    expect(getTemplateAlignment('t1', templates)).toBe('left');
    expect(getTemplateAlignment('t2', templates)).toBe('center');
    expect(getTemplateAlignment('t3', templates)).toBe('right');
  });

  it('returns "left" when template is not found', () => {
    expect(getTemplateAlignment('unknown', templates)).toBe('left');
  });

  it('returns "left" when alignment is undefined', () => {
    const incompleteTemplates: Template[] = [{ id: 't3', name: 'T3' }] as any;
    expect(getTemplateAlignment('t3', incompleteTemplates)).toBe('left');
  });
});

describe('createEmptyRow', () => {
  it('returns a new row with empty products and template', () => {
    const row = createEmptyRow();
    expect(row.products).toEqual([]);
    expect(row.selectedTemplateId).toBe('');
    expect(row.id).toMatch(/^row-/);
  });

  it('generates different IDs on each call', () => {
    const row1 = createEmptyRow();
    const row2 = createEmptyRow();
    expect(row1.id).not.toBe(row2.id);
  });
});
