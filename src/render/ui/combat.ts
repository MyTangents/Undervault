import type { App } from './app';
import { h } from './dom';
import { legalOrders, type OrderKind } from './flow';
import { className } from './party';
import { createRng, type Rng } from '../../core/rng';
import type { Character } from '../../core/types';
import { ITEMS, SPELLS } from '../../core/data';
import type { Game } from '../../core/game';
import { resolveRound, startCombat, warnings } from '../../core/combat/engine';
import type { CombatEvent, CombatState, MonsterGroup, Order } from '../../core/combat/types';
import { canAct, groupLiving, isActive } from '../../core/combat/util';
import { autoOrders } from '../../core/sim';
import { getPicture, PICTURE_H, PICTURE_W, type PictureState } from '../monster/picture';

interface Row { kind: OrderKind; group: number; spellId: string; target: number; itemId: string }

const WARN_TEXT: Record<string, string> = {
  redHp: 'Someone is badly hurt', lowCharges: 'Spells nearly spent', outnumbered: 'Outnumbered', monsterEnraged: 'They smell blood',
};
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** One fight: orders for everyone, then the round plays out while the monster's picture reacts. */
export class CombatScreen {
  readonly el: HTMLElement;
  private state: CombatState;
  private rows = new Map<string, Row>();
  private selected = 0;
  private initial: number[];
  private log: string[] = [];
  private busy = false;
  private done = false;
  // animations are driven by timestamps, so they finish on time even if the browser throttles frames
  private anim = { hitAt: -1e9, lungeAt: -1e9, dyingAt: -1e9, dyingGroup: -1 };
  private raf = 0;
  private rng: Rng = createRng(Date.now() & 0xffffff);
  private canvas: HTMLCanvasElement;
  private ordersEl = h('div', { class: 'panel orders' });
  private groupsEl = h('div', { class: 'groups' });
  private warnEl = h('div', { class: 'warn' });
  private logEl = h('div', { class: 'log' });
  private actionsEl = h('div', { class: 'row', style: 'margin-top:.6rem' });

  constructor(private app: App, private game: Game, groups: MonsterGroup[], private fixedKey?: string) {
    this.state = startCombat(structuredClone(game.state.party), groups);
    this.initial = groups.map((g) => g.hp.reduce((a, b) => a + b, 0));
    this.canvas = h('canvas', { class: 'mon', width: PICTURE_W, height: PICTURE_H }) as HTMLCanvasElement;
    this.say(groups.length === 1 ? `${this.countName(0)} come out of the dark.` : 'Several things come out of the dark at once.');
    this.fillDefaults();
    this.el = h('div', { class: 'screen combat' },
      h('div', { class: 'stage' },
        h('div', { class: 'left' }, h('div', { class: 'pic' }, this.canvas), this.groupsEl, this.warnEl, this.logEl),
        h('div', { class: 'stack', style: 'overflow:auto' }, this.ordersEl, this.actionsEl)));
    this.render();
    this.loop();
    this.app.audio.play('door');
  }

  destroy(): void { this.done = true; cancelAnimationFrame(this.raf); }

  /* ---------------------------------------------------------------- helpers */
  private name(id: string): string { return this.state.party.members.find((m) => m.id === id)?.name ?? 'Someone'; }
  private gname(i: number): string { return this.state.groups[i]?.def.name ?? 'monster'; }
  private countName(i: number): string {
    const g = this.state.groups[i];
    const n = groupLiving(g);
    return `${n} ${g.def.name}${n === 1 ? '' : 's'}`;
  }
  private say(line: string): void { this.log.push(line); if (this.log.length > 9) this.log.shift(); }

  private describe(e: CombatEvent): string | null {
    switch (e.t) {
      case 'hit': return `${this.name(e.actor)} hits the ${this.gname(e.group)} for ${e.dmg}${e.killed ? ' and it falls' : ''}.`;
      case 'miss': return e.reason ? `${this.name(e.actor)} cannot reach anything from the back row.` : `${this.name(e.actor)} misses.`;
      case 'monsterHit': return `A ${this.gname(e.group)} hits ${this.name(e.target)} for ${e.dmg}.${e.killed ? ` ${this.name(e.target)} dies.` : ''}`;
      case 'monsterMiss': return `A ${this.gname(e.group)} swings at ${this.name(e.target)} and misses.`;
      case 'monsterFlees': return `A ${this.gname(e.group)} loses its nerve and runs.`;
      case 'monsterCalls': return `A ${this.gname(e.group)} howls for help. Something answers.`;
      case 'monsterCasts': {
        const sp = SPELLS.find((x) => x.id === e.spellId)?.name ?? e.spellId;
        return e.dmg ? `A ${this.gname(e.group)} casts ${sp}: ${e.dmg} to ${this.name(e.target ?? '')}.` : `A ${this.gname(e.group)} casts ${sp} at ${this.name(e.target ?? '')}${e.effect ? ` (${e.effect})` : ''}.`;
      }
      case 'parry': return null;
      case 'cast': {
        const sp = SPELLS.find((x) => x.id === e.spellId)?.name ?? e.spellId;
        const bits = [e.dmg ? `${e.dmg} damage` : '', e.killed ? `${e.killed} fall` : '', e.healed ? `heals ${e.healed}` : '', e.effect ?? ''].filter(Boolean).join(', ');
        return `${this.name(e.actor)} casts ${sp}${bits ? `: ${bits}` : ''}.`;
      }
      case 'fizzle': return `${this.name(e.actor)}'s spell fizzles (${e.reason}).`;
      case 'runOk': return 'The party scrambles clear.';
      case 'runFail': return e.reason === 'paralysed' ? 'The party is frozen and cannot run.' : 'The party tries to run and cannot get away. The round is lost.';
      case 'peace': return 'The creatures look you over and let you pass.';
      case 'death': return null;
      case 'note': return e.text;
    }
  }

  /* ----------------------------------------------------------------- orders */
  private active(): Character[] { return this.state.party.members.filter(canAct); }

  private fillDefaults(): void {
    const auto = autoOrders(this.state);
    for (const m of this.active()) {
      const o = auto[m.id] ?? { kind: 'parry' as const };
      this.rows.set(m.id, {
        kind: o.kind, group: o.kind === 'fight' ? o.group : this.firstLiving(),
        spellId: o.kind === 'spell' ? o.spellId : '', target: o.kind === 'spell' ? o.target : 0, itemId: '',
      });
    }
  }
  private firstLiving(): number { return Math.max(0, this.state.groups.findIndex((g) => groupLiving(g) > 0)); }

  private toOrder(m: Character): Order {
    const r = this.rows.get(m.id);
    if (!r) return { kind: 'parry' };
    switch (r.kind) {
      case 'fight': return { kind: 'fight', group: r.group };
      case 'spell': return { kind: 'spell', spellId: r.spellId, target: r.target };
      case 'use': return { kind: 'use', itemId: r.itemId, target: r.target };
      case 'run': return { kind: 'run' };
      default: return { kind: 'parry' };
    }
  }

  /** Spell choices for a caster: each spell paired with each sensible target. */
  private spellOptions(m: Character): { value: string; label: string; spellId: string; target: number }[] {
    const out: { value: string; label: string; spellId: string; target: number }[] = [];
    for (const id of m.known) {
      const sp = SPELLS.find((x) => x.id === id);
      if (!sp || (m.charges[sp.level - 1] ?? 0) <= 0) continue;
      if (sp.discoveryId && !this.state.party.discoveries.includes(sp.discoveryId)) continue;
      if (['damage', 'sleep', 'silence', 'identify'].includes(sp.kind)) {
        this.state.groups.forEach((g, gi) => { if (groupLiving(g) > 0) out.push({ value: `${id}|${gi}`, label: `${sp.name} → ${this.countName(gi)}`, spellId: id, target: gi }); });
      } else if (sp.kind === 'heal' && sp.target === 'ally') {
        this.state.party.members.forEach((a, ai) => { if (isActive(a)) out.push({ value: `${id}|${ai}`, label: `${sp.name} → ${a.name} (${a.hp}/${a.maxHp})`, spellId: id, target: ai }); });
      } else out.push({ value: `${id}|0`, label: `${sp.name} (the party)`, spellId: id, target: 0 });
    }
    return out;
  }

  private itemOptions(m: Character): { value: string; label: string; itemId: string; target: number }[] {
    const out: { value: string; label: string; itemId: string; target: number }[] = [];
    for (const id of new Set(m.inventory)) {
      const it = ITEMS.find((i) => i.id === id);
      if (it?.kind !== 'consumable') continue;
      this.state.party.members.forEach((a, ai) => { if (isActive(a)) out.push({ value: `${id}|${ai}`, label: `${it.name} → ${a.name}`, itemId: id, target: ai }); });
    }
    return out;
  }

  private orderRow(m: Character): HTMLElement {
    const row = this.rows.get(m.id) ?? { kind: 'parry' as OrderKind, group: 0, spellId: '', target: 0, itemId: '' };
    this.rows.set(m.id, row);
    const legal = legalOrders(m);
    const labels: Record<OrderKind, string> = { fight: 'Fight', spell: 'Cast', parry: 'Guard', use: 'Use item', run: 'Run' };
    if (!legal.includes(row.kind)) row.kind = 'parry';
    const kindSel = h('select', { disabled: this.busy, onchange: (e: Event) => { row.kind = (e.target as HTMLSelectElement).value as OrderKind; this.render(); } },
      ...legal.map((k) => h('option', { value: k, selected: k === row.kind }, labels[k])));
    let detail: HTMLElement | null = null;
    if (row.kind === 'fight') {
      detail = h('select', { disabled: this.busy, onchange: (e: Event) => { row.group = Number((e.target as HTMLSelectElement).value); } },
        ...this.state.groups.map((g, i) => (groupLiving(g) > 0 ? h('option', { value: i, selected: i === row.group }, this.countName(i)) : null)));
    } else if (row.kind === 'spell') {
      const opts = this.spellOptions(m);
      if (!opts.some((o) => o.value === `${row.spellId}|${row.target}`) && opts[0]) { row.spellId = opts[0].spellId; row.target = opts[0].target; }
      detail = h('select', { disabled: this.busy, onchange: (e: Event) => { const o = opts.find((x) => x.value === (e.target as HTMLSelectElement).value)!; row.spellId = o.spellId; row.target = o.target; } },
        ...opts.map((o) => h('option', { value: o.value, selected: o.value === `${row.spellId}|${row.target}` }, o.label)));
    } else if (row.kind === 'use') {
      const opts = this.itemOptions(m);
      if (!opts.some((o) => o.value === `${row.itemId}|${row.target}`) && opts[0]) { row.itemId = opts[0].itemId; row.target = opts[0].target; }
      detail = h('select', { disabled: this.busy, onchange: (e: Event) => { const o = opts.find((x) => x.value === (e.target as HTMLSelectElement).value)!; row.itemId = o.itemId; row.target = o.target; } },
        ...opts.map((o) => h('option', { value: o.value, selected: o.value === `${row.itemId}|${row.target}` }, o.label)));
    }
    return h('div', { class: 'o' },
      h('div', null, h('b', null, m.name), h('div', { class: 'dim', style: 'font-size:.75rem' }, `${className(m.classId)} · ${m.hp}/${m.maxHp}`)),
      h('div', null, kindSel, detail));
  }

  /* ----------------------------------------------------------------- render */
  private render(): void {
    const s = this.state;
    this.groupsEl.replaceChildren(...s.groups.flatMap((g, i) => (groupLiving(g) > 0 || i === this.selected
      ? [h('button', { class: `quiet${i === this.selected ? ' sel' : ''}`, onclick: () => { this.selected = i; this.anim.dyingGroup = -1; this.render(); } },
        groupLiving(g) > 0 ? `${this.countName(i)}${g.asleep ? ' (asleep)' : ''}${g.silenced ? ' (silenced)' : ''}` : `${g.def.name} (gone)`)]
      : [])));
    this.warnEl.replaceChildren(...warnings(s).map((w) => h('span', { class: 'chip' }, WARN_TEXT[w] ?? w)));
    this.logEl.replaceChildren(...this.log.map((l) => h('div', null, l)));
    this.ordersEl.style.display = this.done ? 'none' : '';
    if (this.done) { this.ordersEl.replaceChildren(); return; }
    this.ordersEl.replaceChildren(
      h('h3', null, this.busy ? 'The round plays out…' : `Round ${s.round + 1}: orders`),
      ...this.active().map((m) => this.orderRow(m)),
      ...s.party.members.filter((m) => isActive(m) && !canAct(m)).map((m) => h('div', { class: 'dim' }, `${m.name} cannot act.`)),
    );
    this.actionsEl.replaceChildren(
      h('button', { disabled: this.busy, onclick: () => void this.resolve() }, 'Resolve the round (Enter)'),
      h('button', { class: 'quiet', disabled: this.busy, onclick: () => { this.fillDefaults(); this.render(); } }, 'Suggest'),
      h('button', { class: 'quiet', disabled: this.busy, onclick: () => { for (const r of this.rows.values()) r.kind = 'run'; this.render(); } }, 'Everyone runs'),
    );
  }

  /* ------------------------------------------------------------- the round */
  key(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !this.busy && !this.done) { e.preventDefault(); void this.resolve(); }
  }

  private async resolve(): Promise<void> {
    if (this.busy || this.done) return;
    this.busy = true;
    const orders: Record<string, Order> = {};
    for (const m of this.active()) orders[m.id] = this.toOrder(m);
    const res = resolveRound(this.state, orders, this.rng);
    this.state = res.state;
    this.render();
    for (const e of res.events) {
      this.apply(e);
      this.render();
      await sleep(this.done ? 0 : 340);
      if (this.done) return;
    }
    for (let i = 0; i < this.state.groups.length; i++) {
      if (groupLiving(this.state.groups[i]) === 0 && this.initial[i] > 0 && this.anim.dyingGroup !== i && i === this.selected) { this.anim.dyingAt = performance.now(); this.anim.dyingGroup = i; }
    }
    if (res.outcome === 'ongoing') {
      if (groupLiving(this.state.groups[this.selected]) === 0) this.selected = this.firstLiving();
      this.fillDefaults();
      this.busy = false;
      this.render();
      return;
    }
    await sleep(700);
    this.finish(res.outcome);
  }

  private apply(e: CombatEvent): void {
    const line = this.describe(e);
    if (line) this.say(line);
    const a = this.app.audio;
    if (e.t === 'hit' && e.group === this.selected) { this.anim.hitAt = performance.now(); a.play('hit'); }
    else if (e.t === 'hit') a.play('hit');
    else if (e.t === 'cast') { a.play('cast'); if ((e.dmg ?? 0) > 0 && e.target === this.selected) this.anim.hitAt = performance.now(); }
    else if (e.t === 'monsterHit' || e.t === 'monsterCasts' || e.t === 'monsterCalls') { this.anim.lungeAt = performance.now(); a.play('hit'); }
    else if (e.t === 'death') a.play('death');
  }

  private finish(outcome: 'won' | 'fled' | 'wiped'): void {
    this.busy = true;
    this.done = true;
    this.game.finishEncounter({ outcome, xp: this.state.xpPool, gold: this.state.goldPool, party: this.state.party, groups: this.state.groups }, this.fixedKey);
    if (outcome === 'won') this.say(`Victory. ${this.state.xpPool} experience and ${this.state.goldPool} gold, shared out.`);
    else if (outcome === 'fled') this.say('The party gets away, breathing hard.');
    else this.say('That was the last of them. The Wardens will read the names at dawn.');
    this.render();
    this.actionsEl.replaceChildren(h('button', { onclick: () => this.app.combatDone(outcome) },
      outcome === 'wiped' ? 'Face the Roll' : outcome === 'won' ? 'Onward' : 'Back into the dark'));
  }

  /* ------------------------------------------------------------- the picture */
  private loop = (): void => {
    const now = performance.now();
    const t = now / 1000;
    const hit = Math.max(0, 1 - (now - this.anim.hitAt) / 380);
    const lunge = Math.max(0, 1 - (now - this.anim.lungeAt) / 600);
    const dying = Math.min(1, Math.max(0, (now - this.anim.dyingAt) / 1500));
    const g = this.state.groups[this.selected];
    if (g) {
      const left = g.hp.reduce((a, b) => a + b, 0), total = Math.max(1, this.initial[this.selected]);
      const ps: PictureState = {
        hit, lunge, damage: Math.max(0, Math.min(1, 1 - left / total)),
        dying: this.anim.dyingGroup === this.selected ? dying : groupLiving(g) === 0 ? 1 : 0,
      };
      const ctx = this.canvas.getContext('2d')!;
      getPicture(g.def.pictureId).draw(ctx, t, ps);
      const shake = hit > 0 ? (Math.random() - 0.5) * 9 * hit : 0;
      this.canvas.style.transform = `translate(${shake}px,${shake * 0.5}px)`;
    }
    this.raf = requestAnimationFrame(this.loop);
  };
}
