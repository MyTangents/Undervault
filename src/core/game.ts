import type { Rng } from './rng';
import type { Party } from './types';
import { MONSTERS } from './data';
import type { Level, Pos } from './dungeon/level';
import { deserializeAutomap, newAutomap, reveal, serializeAutomap, type Automap } from './dungeon/automap';
import { freshLevel } from './levels';
import { addEntry, newChronicle, type Chronicle } from './chronicle';
import { triggerEvent } from './events';
import { makeGroup } from './combat/engine';
import type { MonsterGroup } from './combat/types';
import { groupLiving, isActive, roll } from './combat/util';
import { rollEncounter } from './encounters';
import { applyDiscovery, awardXp, canLevelUp, levelUp } from './progression';
import { isWiped, sinkTheDead } from './party';
import { rest } from './town';
import { DEFAULT_SETTINGS, type Settings } from './settings';
import { SAVE_VERSION, type SaveData } from './save';

export interface GameState {
  party: Party;
  chronicle: Chronicle;
  day: number;
  settings: Settings;
  levelId: string;
  pos: Pos;
  facing: number;
  automaps: Record<string, Automap>;
  /** tiles whose one-time effects are spent, as "levelId:x,y,z" (plus ":d" for a pickup) */
  triggered: string[];
  /** cells closed for good, as "levelId:x,y,z" */
  closed: string[];
  inTown: boolean;
  over: boolean;
}

export type ArriveResult =
  | { kind: 'exit'; to: string }
  | { kind: 'discovery'; id: string }
  | { kind: 'event'; text: string; closed: number }
  | { kind: 'fall'; fell: number }
  | { kind: 'pit' }
  | { kind: 'encounter'; groups: MonsterGroup[]; fixedKey?: string };

export interface CombatResult {
  outcome: 'won' | 'fled' | 'wiped';
  xp: number;
  gold: number;
  party: Party;
  groups: MonsterGroup[];
}

const FIRST_LEVEL = 'crypt';
const STEP_ENCOUNTER_CHANCE = 0.07;
const key = (levelId: string, p: Pos) => `${levelId}:${p.x},${p.y},${p.z}`;

/** The running game: where the party is, what has happened, and what each tile does when they step on it. */
export class Game {
  private levels = new Map<string, Level>();
  private cooldown = 0;

  private constructor(public state: GameState, private rng: Rng) {}

  static newGame(party: Party, rng: Rng, settings: Settings = DEFAULT_SETTINGS): Game {
    const g = new Game({
      party, chronicle: addEntry(newChronicle(), { day: 1, kind: 'town', text: 'The party signed on at the Sump Tap and was told the Vault is hungry.' }),
      day: 1, settings, levelId: FIRST_LEVEL, pos: { x: 0, y: 0, z: 0 }, facing: 0, automaps: {}, triggered: [], closed: [], inTown: true, over: false,
    }, rng);
    g.enterDungeon();
    g.state.inTown = false;
    return g;
  }

  static fromSave(data: SaveData, rng: Rng): Game {
    const automaps: Record<string, Automap> = {};
    for (const [id, text] of Object.entries(data.automaps ?? {})) automaps[id] = deserializeAutomap(text);
    const game = new Game({
      party: data.party, chronicle: data.chronicle, day: data.day, settings: data.settings,
      levelId: data.position.levelId, pos: data.position.pos, facing: data.position.facing, automaps,
      triggered: data.triggered ?? [], closed: data.closed ?? [], inTown: data.inTown ?? false, over: false,
    }, rng);
    game.level(); // fails early, with a clear message, if the save names a level this build does not have
    return game;
  }

  toSave(): SaveData {
    const automaps: Record<string, string> = {};
    for (const [id, m] of Object.entries(this.state.automaps)) automaps[id] = serializeAutomap(m);
    const s = this.state;
    return {
      game: 'undervault', version: SAVE_VERSION, party: s.party, chronicle: s.chronicle, automaps,
      position: { levelId: s.levelId, pos: s.pos, facing: s.facing }, day: s.day, settings: s.settings,
      triggered: [...s.triggered], closed: [...s.closed], inTown: s.inTown,
    };
  }

  /** The level the party is in. Closures from earlier collapses are applied the first time it is loaded. */
  level(id = this.state.levelId): Level {
    let l = this.levels.get(id);
    if (!l) {
      l = freshLevel(id);
      for (const c of this.state.closed) {
        const [lid, cell] = c.split(':');
        if (lid !== id) continue;
        const [x, y, z] = cell.split(',').map(Number);
        const target = l.cell({ x, y, z });
        if (target) target.kind = 'solid';
      }
      this.levels.set(id, l);
    }
    return l;
  }

  automap(): Automap {
    return (this.state.automaps[this.state.levelId] ??= newAutomap());
  }

  isOver(): boolean {
    return this.state.over || isWiped(this.state.party);
  }

  returnToTown(): void { this.state.inTown = true; }

  enterDungeon(): void {
    if (this.isOver() || !this.state.party.members.some(isActive)) throw new Error('Nobody alive is fit to go down. The dead stay dead.');
    const l = this.level(FIRST_LEVEL);
    this.state.inTown = false;
    this.enterLevel(FIRST_LEVEL, { ...l.start });
  }

  enterLevel(id: string, to: { x: number; y: number; z: number; facing: number }): void {
    this.state.levelId = id;
    this.state.pos = { x: to.x, y: to.y, z: to.z };
    this.state.facing = to.facing;
    const lvl = this.level(id);
    this.state.automaps[id] = reveal(this.state.automaps[id] ?? newAutomap(), lvl, this.state.pos, to.facing);
  }

  /** Follows the exit mark on the tile the party is standing on. */
  followExit(levelId: string): void {
    const data = this.level().cell(this.state.pos).data;
    const [x, y, z, f] = (data?.to ?? '').split(',');
    this.enterLevel(levelId, { x: Number(x), y: Number(y), z: Number(z), facing: Math.max(0, 'NESW'.indexOf(f)) });
  }

  private note(kind: 'combat' | 'death' | 'discovery' | 'event' | 'town', text: string, cause?: string): void {
    this.state.chronicle = addEntry(this.state.chronicle, { day: this.state.day, kind, text, cause });
  }

  /** Records the party as it stands mid-fight, so a death is in the save the moment it happens. */
  commitRound(party: Party): void { this.state.party = party; }

  /** The party stepped onto `pos` (having fallen `fell` storeys to get there). Returns what happens there, in order. */
  onArrive(pos: Pos, fell: number, facing: number): ArriveResult[] {
    if (this.isOver()) return [];
    const s = this.state;
    s.pos = { ...pos };
    s.facing = facing;
    const level = this.level();
    s.automaps[s.levelId] = reveal(this.automap(), level, pos, facing);
    const cell = level.cell(pos);
    const data = cell.data ?? {};
    const k = key(s.levelId, pos);
    const out: ArriveResult[] = [];

    if (fell > 0) {
      this.hurtAll(() => roll([fell, 4], this.rng));
      this.note('event', `The party dropped ${fell} storeys into ${level.name}. Everyone agreed it was quicker.`, `tile:${pos.x},${pos.y},${pos.z}`);
      out.push({ kind: 'fall', fell });
    }
    if (cell.kind === 'pit') {
      this.hurtAll(() => this.rng.int(1, 6));
      this.note('event', `Someone found the pit at ${level.name} with a foot.`, `tile:${pos.x},${pos.y},${pos.z}`);
      out.push({ kind: 'pit' });
    }
    if (data.discovery && !s.triggered.includes(`${k}:d`)) {
      s.triggered.push(`${k}:d`);
      s.party = applyDiscovery(s.party, data.discovery);
      this.note('discovery', `On day ${s.day} the party discovered ${data.discovery.replace(/-/g, ' ')}. It had been waiting.`, `tile:${pos.x},${pos.y},${pos.z}`);
      out.push({ kind: 'discovery', id: data.discovery });
    }
    if (cell.kind === 'event' && !s.triggered.includes(k)) {
      s.triggered.push(k);
      const res = triggerEvent(level, pos, s.party, this.rng, { day: s.day, chronicle: s.chronicle });
      s.party = res.party;
      for (const c of res.closed) {
        level.cell(c).kind = 'solid';
        s.closed.push(key(s.levelId, c));
      }
      for (const e of res.entries) { this.note(e.kind, e.text, e.cause); out.push({ kind: 'event', text: e.text, closed: res.closed.length }); }
    }
    if (data.exit) out.push({ kind: 'exit', to: data.exit });

    if (cell.kind === 'encounter' && !s.triggered.includes(k)) {
      const groups = (data.monsters ?? '').split(',').filter(Boolean).flatMap((part) => {
        const [id, n] = part.split(':');
        const def = MONSTERS.find((m) => m.id === id);
        return def ? [makeGroup(def, Number(n) || 1, this.rng)] : [];
      });
      if (groups.length) out.push({ kind: 'encounter', groups, fixedKey: k });
    } else if (!data.exit && !data.discovery && cell.kind !== 'event' && (cell.kind === 'floor' || cell.kind === 'door')) {
      if (this.cooldown > 0) this.cooldown--;
      else if (this.rng.chance(STEP_ENCOUNTER_CHANCE)) {
        const groups = rollEncounter(level.depth, this.rng);
        if (groups.length) out.push({ kind: 'encounter', groups });
      }
    }
    return out;
  }

  /** Hurts every living member, never below 1 hit point. */
  private hurtAll(dmg: (m: { hp: number }) => number): void {
    this.state.party = {
      ...this.state.party,
      members: this.state.party.members.map((m) => (isActive(m) ? { ...m, hp: Math.max(1, m.hp - Math.max(1, dmg(m))) } : m)),
    };
  }

  /** Records the outcome of a fight: rewards for a win, nothing for a flight, a record of the dead. */
  finishEncounter(r: CombatResult, fixedKey?: string): void {
    const s = this.state;
    const level = this.level();
    const names = r.groups.map((g) => `${g.hp.length} ${g.def.name}${g.hp.length === 1 ? '' : 's'}`).join(' and ');
    const killer = r.groups.find((g) => groupLiving(g) > 0)?.def.name ?? r.groups[0]?.def.name ?? 'something';
    const was = new Map(s.party.members.map((m) => [m.id, m]));
    for (const m of r.party.members) {
      if ((m.dead || m.ash) && !(was.get(m.id)?.dead || was.get(m.id)?.ash)) {
        this.note('death', `${m.name} died at ${level.name}, killed by a ${killer}. The ${killer} was reportedly sorry.`);
      }
    }
    s.party = sinkTheDead(r.party);
    this.cooldown = 2;
    if (r.outcome === 'won') {
      s.party = { ...awardXp(s.party, r.xp), gold: s.party.gold + r.gold };
      if (fixedKey) s.triggered.push(fixedKey);
      this.note('combat', `The party beat ${names} at ${level.name} and took ${r.gold} gold. Nobody knew what to do with their hands.`);
    } else if (r.outcome === 'fled') {
      this.note('combat', `The party ran from ${names} at ${level.name}. The Wardens approved of the running.`);
    } else {
      s.over = true;
      this.note('combat', `${names} were the last thing the party saw at ${level.name}. The Wardens added six names to the Roll.`);
    }
  }

  /** A night at the Last Mattress: a day passes, anyone who has earned it levels up, and the room heals. */
  restAtInn(tier: number): { leveled: string[] } {
    const s = this.state;
    const leveled: string[] = [];
    const members = s.party.members.map((m) => {
      if (!canLevelUp(m)) return m;
      leveled.push(m.name);
      return levelUp(m, this.rng, { atInn: true });
    });
    s.party = rest({ ...s.party, members }, tier);
    s.day += 1;
    this.note('town', leveled.length > 0 ? `Slept at the Last Mattress. ${leveled.join(', ')} grew stronger overnight.` : 'Slept at the Last Mattress. Wenna remembered everyone\'s last words anyway.');
    return { leveled };
  }
}
