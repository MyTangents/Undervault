import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { beforeAll, describe, expect, test } from 'vitest';
import { createCanvas } from '@napi-rs/canvas';
import { PICTURE_H, PICTURE_W, getPicture, setCanvasFactory, type PictureState } from '../src/render/monster/picture';
import { PAINTERS } from '../src/render/monster/painters';

const FILE = new URL('./golden/monsters.json', import.meta.url);
const STATES: Record<string, PictureState> = {
  calm: { hit: 0, lunge: 0, damage: 0, dying: 0 },
  hurt: { hit: 0.5, lunge: 0.5, damage: 0.6, dying: 0.3 },
};

beforeAll(() => { setCanvasFactory((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement); });

function checksum(id: string, s: PictureState): string {
  const c = createCanvas(PICTURE_W, PICTURE_H);
  const ctx = c.getContext('2d') as unknown as CanvasRenderingContext2D;
  getPicture(id).draw(ctx, 1.3, s);
  return createHash('sha1').update(Buffer.from(ctx.getImageData(0, 0, PICTURE_W, PICTURE_H).data)).digest('hex');
}

describe('monster pictures stay pixel-identical', () => {
  test('every painter and the placeholder match the recorded checksums', () => {
    const got: Record<string, string> = {};
    for (const id of [...PAINTERS.map((p) => p.id), 'no-such-monster']) {
      for (const [name, s] of Object.entries(STATES)) got[`${id}/${name}`] = checksum(id, s);
    }
    if (process.env.UPDATE_GOLDEN === '1' || !existsSync(FILE)) {
      writeFileSync(FILE, JSON.stringify(got, null, 2) + '\n');
      return;
    }
    expect(got).toEqual(JSON.parse(readFileSync(FILE, 'utf8')));
  });
});
