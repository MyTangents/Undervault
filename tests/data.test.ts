import { describe, expect, test } from 'vitest';
import { validateData, SPELLS, MONSTERS, CLASSES, ITEMS, DISCOVERIES, TALES, RACES } from '../src/core/data';

describe('data tables', () => {
  test('validateData reports no problems', () => {
    expect(validateData()).toEqual([]);
  });

  test('ids are unique within each table', () => {
    for (const table of [RACES, CLASSES, SPELLS, ITEMS, MONSTERS, DISCOVERIES, TALES]) {
      const ids = table.map((r) => r.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  test('validateData catches a spell pointing at a missing discovery', () => {
    const problems = validateData({
      spells: [{ id: 'x', name: 'X', school: 'arcane', level: 1, kind: 'damage', target: 'single', power: [1, 6], discoveryId: 'nope' }],
    });
    expect(problems.some((p) => p.includes('nope'))).toBe(true);
  });
});
