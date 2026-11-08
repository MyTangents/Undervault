import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import { Game, type ArriveResult } from '../src/core/game';
import { demoParty, autoOrders } from '../src/core/sim';
import { levelUp, xpForLevel } from '../src/core/progression';
import { resolveRound, startCombat } from '../src/core/combat/engine';
import type { MonsterGroup } from '../src/core/combat/types';
import { DIRS, step, type Level, type Pos } from '../src/core/dungeon/level';
import { DISCOVERIES } from '../src/core/data';
import type { Party } from '../src/core/types';

const key = (p: Pos) => `${p.x},${p.y},${p.z}`;

/** A party at level 5, fully rested: strong enough that this test is about the route, not the dice. */
function strongParty(): Party {
  const rng = createRng(5);
  const p = demoParty();
  return {
    ...p,
    members: p.members.map((m) => {
      let c = m;
      while (c.level < 5) c = levelUp({ ...c, xp: xpForLevel(c.level + 1) }, rng, { atInn: true });
      return { ...c, hp: c.maxHp, charges: [...c.maxCharges] };
    }),
  };
}

type Step = { facing: number; move: 'fwd' | 'up' | 'down' };

/** Shortest walk from `from` to `to` on the live level (collapses included); falls only if there is no other way. */
function route(level: Level, from: Pos, to: Pos): Step[] | null {
  for (const allowFalls of [false, true]) {
    const prev = new Map<string, { from: string; step: Step; pos: Pos }>();
    const seen = new Set([key(from)]);
    const queue: Pos[] = [from];
    while (queue.length) {
      const p = queue.shift()!;
      if (key(p) === key(to)) {
        const out: Step[] = [];
        let k = key(p);
        while (k !== key(from)) { const e = prev.get(k)!; out.unshift(e.step); k = e.from; }
        return out;
      }
      const options: Step[] = [0, 1, 2, 3].map((f) => ({ facing: f, move: 'fwd' as const }));
      options.push({ facing: 0, move: 'up' }, { facing: 0, move: 'down' });
      for (const s of options) {
        const r = step(level, p, s.facing, s.move);
        if (!r || (r.fell > 0 && !allowFalls) || seen.has(key(r.pos))) continue;
        seen.add(key(r.pos));
        prev.set(key(r.pos), { from: key(p), step: s, pos: r.pos });
        queue.push(r.pos);
      }
    }
  }
  return null;
}

class Bot {
  game = Game.newGame(strongParty(), createRng(42));
  rng = createRng(99);
  fights = 0;
  ended = false;
  visited = new Set<string>(['crypt']);

  private heal() {
    this.game.state.party = {
      ...this.game.state.party,
      members: this.game.state.party.members.map((m) => (m.dead ? m : { ...m, hp: m.maxHp, charges: [...m.maxCharges], status: [] })),
    };
  }

  private fight(groups: MonsterGroup[], fixedKey?: string) {
    for (let attempt = 0; attempt < 6; attempt++) {
      let s = startCombat(structuredClone(this.game.state.party), structuredClone(groups));
      let out = 'ongoing';
      for (let r = 0; r < 80 && out === 'ongoing'; r++) {
        const res = resolveRound(s, autoOrders(s), this.rng);
        s = res.state; out = res.outcome;
      }
      this.fights++;
      if (out === 'wiped') throw new Error('the strong party was wiped, so the route is not fair');
      if (out === 'won') {
        this.game.finishEncounter({ outcome: 'won', xp: s.xpPool, gold: s.goldPool, party: s.party, groups: s.groups }, fixedKey);
        this.heal();
        return;
      }
      this.game.finishEncounter({ outcome: 'fled', xp: 0, gold: 0, party: s.party, groups: s.groups }, fixedKey);
      this.heal();
    }
    throw new Error('could not win a fight in six tries');
  }

  private react(results: ArriveResult[], takeExit: boolean) {
    for (const r of results) {
      if (r.kind === 'encounter') this.fight(r.groups, r.fixedKey);
      else if (r.kind === 'exit' && r.to === 'ending') this.ended = true;
      else if (r.kind === 'exit' && r.to !== 'town' && takeExit) { this.game.followExit(r.to); this.visited.add(r.to); }
    }
  }

  /** Walk to a cell on the current level, re-planning after every step in case a collapse changed the map. */
  walkTo(to: Pos, takeExit = false) {
    for (let guard = 0; guard < 600; guard++) {
      const here = this.game.state.pos;
      if (key(here) === key(to)) return;
      const path = route(this.game.level(), here, to);
      if (!path) throw new Error(`no route from ${key(here)} to ${key(to)} on ${this.game.state.levelId}`);
      const s = path[0];
      const r = step(this.game.level(), here, s.facing, s.move)!;
      const facing = s.move === 'fwd' ? s.facing : this.game.state.facing;
      const arrivedAtGoal = key(r.pos) === key(to);
      this.react(this.game.onArrive(r.pos, r.fell, facing), arrivedAtGoal && takeExit);
      if (this.game.state.levelId !== 'crypt' && !this.visited.has(this.game.state.levelId)) this.visited.add(this.game.state.levelId);
      if (arrivedAtGoal && takeExit) return;
    }
    throw new Error('walked 600 steps without arriving');
  }
}

describe('a full playthrough by a bot', () => {
  test('the whole demo can be walked from the Gullet to the ending, with every discovery found', () => {
    const bot = new Bot();
    // level 1: the Receiving Hall's discovery, then down
    bot.walkTo({ x: 27, y: 3, z: 0 });
    bot.walkTo({ x: 29, y: 3, z: 0 }, true);
    expect(bot.game.state.levelId).toBe('caverns');
    // level 2: the blade on the east ledge (crossing, and perhaps breaking, the rope bridge), then the cavern floor exit
    bot.walkTo({ x: 20, y: 10, z: 2 });
    bot.walkTo({ x: 11, y: 17, z: 0 }, true);
    expect(bot.game.state.levelId).toBe('deep');
    // level 3: the ledge, the shrine's hymnal, then the Repossessor and the receipt
    bot.walkTo({ x: 17, y: 8, z: 2 });
    bot.walkTo({ x: 3, y: 13, z: 0 });
    bot.walkTo({ x: 9, y: 12, z: 0 });
    expect(bot.ended).toBe(true);
    for (const d of DISCOVERIES) expect(bot.game.state.party.discoveries, d.id).toContain(d.id);
    expect(bot.fights).toBeGreaterThanOrEqual(4);
    expect(bot.game.state.chronicle.entries.length).toBeGreaterThan(8);
  });

  test('after the rope bridge gives way the party can still get home', () => {
    const bot = new Bot();
    bot.walkTo({ x: 29, y: 3, z: 0 }, true);
    bot.game.enterLevel('caverns', { x: 11, y: 8, z: 3, facing: 2 });
    bot.walkTo({ x: 12, y: 9, z: 3 }); // the loose plank
    expect(bot.game.level().cell({ x: 8, y: 9, z: 3 }).kind).toBe('solid');
    expect(route(bot.game.level(), bot.game.state.pos, bot.game.level().start)).not.toBeNull();
  });
});
