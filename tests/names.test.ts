import { describe, expect, test } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Names that belong to Wizardry (or are protected terms). The game must use original names only.
const FORBIDDEN = [
  'Wizardry', 'Werdna', 'Trebor', 'Boltac', 'Gilgamesh', 'Murphy', 'Halito', 'Mahalito', 'Lahalito',
  'Dumapic', 'Katino', 'Tiltowait', 'Malor', 'Dios', 'Badios', 'Madalto', 'Makanito', 'Calfo',
  'Latumapic', 'Montino', 'Dialma', 'Porfic', 'Kalki', 'Milwa',
];

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe('original names only', () => {
  const files = [...walk('src/core/data'), ...walk('levels')];

  test('the guard actually scans some files', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  test.each(FORBIDDEN)('no file contains %s', (word) => {
    const re = new RegExp(`\\b${word}\\b`, 'i');
    const offenders = files.filter((f) => re.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
  });
});
