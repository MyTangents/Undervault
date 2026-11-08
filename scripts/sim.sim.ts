import { test } from 'vitest';
import { simulate } from '../src/core/sim';

test('balance table', () => {
  const rows = [1, 2, 3, 4, 5].map((depth) => ({ depth, ...simulate({ depth, battles: 400, seed: 1234 }) }));
  const pct = (n: number) => `${(n * 100).toFixed(0)}%`.padStart(5);
  const lines = [
    '',
    'depth   win   wipe   fled  rounds  survivors',
    ...rows.map((r) => `${String(r.depth).padStart(5)} ${pct(r.winRate)} ${pct(r.wipeRate)} ${pct(r.fleeRate)} ${r.avgRounds.toFixed(1).padStart(7)} ${r.survivors.toFixed(1).padStart(10)}`),
    '',
  ];
  process.stdout.write(lines.join('\n'));
});
