import { generateGridName } from '@/utils/gridEditor';
import { describe, it, expect } from 'vitest';

describe('generateGridName', () => {
  it('should generate a string starting with "Grid "', () => {
    const name = generateGridName();
    expect(name.startsWith('Grid-')).toBe(true);

    const numberPart = parseInt(name.replace('Grid-', ''), 10);
    expect(Number.isNaN(numberPart)).toBe(false);
    expect(numberPart).toBeGreaterThanOrEqual(10000);
    expect(numberPart).toBeLessThanOrEqual(99999);
  });
});
