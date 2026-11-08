import type { Rng } from './rng';
import type { Party } from './types';
import { ITEMS, MONSTERS } from './data';
import type { Level, Pos } from './dungeon/level';
import { step } from './dungeon/level';
import type { Chronicle, ChronicleEntry } from './chronicle';
import { isActive } from './combat/util';

export interface EventContext { day: number; chronicle?: Chronicle }
export interface EventResult {
  party: Party;
  entries: Omit<ChronicleEntry, 'id'>[];
  /** cells that are now blocked for good */
  closed: Pos[];
}

const key = (p: Pos) => `${p.x},${p.y},${p.z}`;
const parseCells = (s: string | undefined): Pos[] =>
  (s ?? '').split(';').filter(Boolean).map((c) => { const [x, y, z] = c.split(',').map(Number); return { x, y, z }; });

/** Can the party still walk from `from` back to the level's start if these cells are blocked? */
function stillConnected(level: Level, closed: Pos[], from: Pos): boolean {
  const blocked = new Set(closed.map(key));
  const patched: Level = { ...level, cell: (p) => (blocked.has(key(p)) ? { kind: 'solid', area: level.areaOf(p) } : level.cell(p)) };
  const goal = key(level.start);
  const seen = new Set([key(from)]);
  const queue = [from];
  while (queue.length) {
    const p = queue.pop()!;
    if (key(p) === goal) return true;
    const next: Pos[] = [];
    for (let f = 0; f < 4; f++) { const r = step(patched, p, f, 'fwd'); if (r) next.push(r.pos); }
    for (const m of ['up', 'down'] as const) { const r = step(patched, p, 0, m); if (r) next.push(r.pos); }
    for (const n of next) if (!seen.has(key(n))) { seen.add(key(n)); queue.push(n); }
  }
  return false;
}

/**
 * Runs the story event on the party's tile, if any. Events are set in the level file with
 * `mark x y z event=<kind> place=<Name_With_Underscores> closes=x,y,z;x,y,z`.
 * Every event records a cause the player can trace, and a closure is refused if it would trap the party.
 */
export function triggerEvent(level: Level, pos: Pos, party: Party, rng: Rng, ctx: EventContext): EventResult {
  const data = level.cell(pos).data;
  const kind = data?.event;
  if (!kind) return { party, entries: [], closed: [] };
  const place = (data?.place ?? level.name).replace(/_/g, ' ');
  const alive = party.members.filter(isActive);
  const who = alive.length ? rng.pick(alive).name : 'Nobody';
  const lastDiscovery = [...(ctx.chronicle?.entries ?? [])].reverse().find((e) => e.kind === 'discovery');
  const tileCause = `tile:${key(pos)}`;
  const entry = (text: string, cause = tileCause): Omit<ChronicleEntry, 'id'> => ({ day: ctx.day, kind: 'event', text, cause });

  const wanted = parseCells(data?.closes);
  const canClose = wanted.length > 0 && stillConnected(level, wanted, pos);

  switch (kind) {
    case 'collapse': {
      if (!canClose) {
        return { party, entries: [entry(`The ceiling at ${place} shook and held. ${who} did not stop looking up.`)], closed: [] };
      }
      const members = party.members.map((m) => (isActive(m) ? { ...m, hp: Math.max(1, m.hp - rng.int(1, 4)) } : m));
      return {
        party: { ...party, members },
        entries: [entry(`The ceiling at ${place} came down. The cracks had been there on the way in, and ${who} had looked at them.`)],
        closed: wanted,
      };
    }
    case 'flood': {
      const members = party.members.map((m) =>
        isActive(m) && m.maxCharges[0] > 0 ? { ...m, charges: [Math.max(0, m.charges[0] - 1), ...m.charges.slice(1)] } : m);
      return {
        party: { ...party, members },
        entries: [entry(`At ${place}, the party rang a bell and the water answered. ${who}'s powder did not survive it.`)],
        closed: canClose ? wanted : [],
      };
    }
    case 'monstersClash': {
      const i = rng.int(0, MONSTERS.length - 1);
      const j = (i + 1 + rng.int(0, MONSTERS.length - 2)) % MONSTERS.length; // a different monster
      const [a, b] = [MONSTERS[i], MONSTERS[j]];
      return {
        party: { ...party, gold: party.gold + 25 + rng.int(0, 15) },
        entries: [entry(`${a.name}s and ${b.name}s killed each other at ${place}. The party took the credit and the boots.`)],
        closed: [],
      };
    }
    case 'cursedRelic': {
      const carriers = party.members.filter((m) => isActive(m) && m.inventory.length > 0);
      const cause = lastDiscovery?.id ?? tileCause;
      if (carriers.length === 0) {
        return { party, entries: [entry(`The relic at ${place} sulked. There was nothing left in the packs to eat.`, cause)], closed: [] };
      }
      const victim = rng.pick(carriers);
      const idx = rng.int(0, victim.inventory.length - 1);
      const eaten = victim.inventory[idx];
      const members = party.members.map((m) => (m.id === victim.id ? { ...m, inventory: m.inventory.filter((_, i) => i !== idx) } : m));
      const name = ITEMS.find((i) => i.id === eaten)?.name ?? eaten;
      return {
        party: { ...party, members },
        entries: [entry(`The relic at ${place} ate ${victim.name}'s ${name} in the night. ${victim.name} swears it said grace first.`, cause)],
        closed: [],
      };
    }
    default:
      return { party, entries: [], closed: [] };
  }
}
