import { describe, expect, test } from 'vitest';
import { parseLevel } from '../src/core/dungeon/level';
import { DEFAULT_SETTINGS } from '../src/core/settings';
import { Hall, NoWebGLError } from '../src/render/hall/hall';

const level = parseLevel(['name: T', 'start: 1 1 0 E', '', '@z 0', '#####', '#...#', '#####', ''].join('\n'));

describe('Hall when the browser has no WebGL', () => {
  test('construction fails with a clear NoWebGLError the app can show, not a crash', () => {
    const fake = { getContext: () => null, addEventListener() {}, removeEventListener() {}, style: {} } as unknown as HTMLCanvasElement;
    expect(() => new Hall(fake, level, DEFAULT_SETTINGS)).toThrow(NoWebGLError);
  });
});
