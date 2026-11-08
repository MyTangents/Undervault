import { test } from 'vitest';
import { createRng } from '../src/core/rng';
import { demoParty, autoOrders } from '../src/core/sim';
import { levelUp, xpForLevel } from '../src/core/progression';
import { makeGroup, resolveRound, startCombat } from '../src/core/combat/engine';
import { MONSTERS } from '../src/core/data';
import type { Party } from '../src/core/types';

/** The party at a given level, rested and at full strength, as it would be after sleeping at the inn. */
function levelled(level: number): Party {
  const rng = createRng(5);
  const p = demoParty();
  return {
    ...p,
    members: p.members.map((m) => {
      let c = m;
      while (c.level < level) c = levelUp({ ...c, xp: xpForLevel(c.level + 1) }, rng, { atInn: true });
      return { ...c, hp: c.maxHp, charges: [...c.maxCharges] };
    }),
  };
}

const FIGHTS: [string, number, string][] = [
  ['crypt: tally room', 1, 'tally-skeleton:4,drum-orc:2'],
  ['crypt: west room', 1, 'ledger-rat:6'],
  ['cathedral: lower walkway', 2, 'hollow-wraith:3,cellar-ghoul:2'],
  ['cathedral: cavern floor', 2, 'bone-wolf:7'],
  ['drop of names: ledge', 3, 'still-gargoyle:3'],
  ['drop of names: the Repossessor', 3, 'repossessor:1,singing-cultist:3'],
];

test('fixed fights by party level', () => {
  const rows: string[] = ['', 'fight                              party lvl   win  wipe  fled'];
  for (const [name, firstLevel, spec] of FIGHTS) {
    for (const lvl of [firstLevel, firstLevel + 1, firstLevel + 2]) {
      const party = levelled(lvl);
      let win = 0, wipe = 0, fled = 0;
      const N = 300;
      for (let i = 0; i < N; i++) {
        const rng = createRng(1000 + i);
        const groups = spec.split(',').map((part) => { const [id, n] = part.split(':'); return makeGroup(MONSTERS.find((m) => m.id === id)!, Number(n), rng); });
        let s = startCombat(structuredClone(party), groups);
        let out = 'ongoing';
        for (let r = 0; r < 60 && out === 'ongoing'; r++) { const res = resolveRound(s, autoOrders(s), rng); s = res.state; out = res.outcome; }
        if (out === 'won') win++; else if (out === 'wiped') wipe++; else fled++;
      }
      const pct = (n: number) => `${Math.round((n / N) * 100)}%`.padStart(5);
      rows.push(`${name.padEnd(34)} ${String(lvl).padStart(8)} ${pct(win)} ${pct(wipe)} ${pct(fled)}`);
    }
  }
  process.stdout.write(rows.join('\n') + '\n');
});
