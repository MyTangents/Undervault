import type { App } from './app';
import { h } from './dom';
import { CombatOrders, castable, spellAim, usable } from './combatOrders';
import { openList } from './dialog';
import { accentFor, commandBar, frame, messageWindow, rosterStrip } from './frame';
import type { MessageWindow } from './frame';
import type { KeyCommand } from './keys';
import { createRng, type Rng } from '../../core/rng';
import { ITEMS, SPELLS } from '../../core/data';
import type { Game } from '../../core/game';
import { resolveRound, startCombat, warnings } from '../../core/combat/engine';
import type { CombatEvent, CombatState, MonsterGroup, Order } from '../../core/combat/types';
import { groupLiving, isActive } from '../../core/combat/util';
import { autoOrders } from '../../core/sim';
import { getPicture, PICTURE_H, PICTURE_W, type PictureState } from '../monster/picture';

const WARN_TEXT: Record<string, string> = {
  redHp: 'Someone is badly hurt', lowCharges: 'Spells nearly spent', outnumbered: 'Outnumbered', monsterEnraged: 'They smell blood',
};
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type Phase = 'orders' | 'playing' | 'over';

/** One fight: orders asked of each member in turn, then the round plays out while the monster's picture reacts. */
export class CombatScreen {
  readonly el: HTMLElement;
  readonly messages: MessageWindow = messageWindow(9);
  private state: CombatState;
  private co: CombatOrders;
  private lastOrders: Record<string, Order> = {};
  private selected = 0;
  private initial: number[];
  private phase: Phase = 'orders';
  private done = false;
  private skip = false;
  private outcome: 'won' | 'fled' | 'wiped' | null = null;
  // animations are driven by timestamps, so they finish on time even if the browser throttles frames
  private anim = { hitAt: -1e9, lungeAt: -1e9, dyingAt: -1e9, dyingGroup: -1 };
  private raf = 0;
  private rng: Rng = createRng(Date.now() & 0xffffff);
  private canvas: HTMLCanvasElement;
  private groupsEl = h('div', { class: 'groups' });
  private promptEl = h('div', { class: 'prompt' });
  private barEl = h('div', { class: 'barslot' });
  private rosterEl = h('div', { class: 'rosterslot' });
  private sceneFrame: HTMLElement;

  constructor(private app: App, private game: Game, groups: MonsterGroup[], private fixedKey?: string) {
    this.state = startCombat(structuredClone(game.state.party), groups);
    this.initial = groups.map((g) => g.hp.reduce((a, b) => a + b, 0));
    this.canvas = h('canvas', { class: 'mon', width: PICTURE_W, height: PICTURE_H }) as HTMLCanvasElement;
    this.co = new CombatOrders(this.state);
    this.say(groups.length === 1 ? `${this.countName(0)} come out of the dark.` : 'Several things come out of the dark at once.');
    this.sceneFrame = frame(groups[0]?.def.name ?? 'The dark', accentFor('dungeon'), h('div', { class: 'pic' }, this.canvas), this.groupsEl);
    this.el = h('div', { class: 'screen combat2' },
      h('div', { class: 'scene' }, this.sceneFrame),
      h('div', { class: 'talk' }, frame('Words', accentFor('dungeon'), this.messages.el)),
      h('div', { class: 'party' }, frame('The Party', accentFor('party'), this.rosterEl)),
      h('div', { class: 'bottom' }, this.promptEl, this.barEl));
    this.loop();
    this.app.audio.play('door');
    this.beginOrders();
  }

  destroy(): void {
    this.done = true;
    cancelAnimationFrame(this.raf);
    this.app.router.locked = false;
  }

  /* ---------------------------------------------------------------- tests and the app */
  /** The orders given so far this round (for tests). */
  pending(): Record<string, Order> { return this.co.orders(); }
  prompt(): string { return this.promptEl.textContent ?? ''; }
  round(): number { return this.state.round; }

  /** What the bar prints and the keys do: the same table. */
  commands(): KeyCommand[] {
    if (this.phase === 'over') {
      const label = this.outcome === 'wiped' ? 'Face the Roll' : this.outcome === 'won' ? 'Onward' : 'Back into the dark';
      return [{ key: 'Enter', label, run: () => this.app.combatDone(this.outcome!) }];
    }
    if (this.phase === 'playing') return [];
    const m = this.co.current();
    if (!m) return [];
    const run: Record<string, () => void> = {
      f: () => void this.chooseFight(), s: () => void this.chooseSpell(), p: () => this.give({ kind: 'parry' }),
      u: () => void this.chooseUse(), r: () => this.give({ kind: 'run' }),
    };
    const cmds: KeyCommand[] = this.co.choices().map((c) => ({ key: c.key, label: c.label, enabled: c.enabled, run: run[c.key] }));
    cmds.push(
      { key: 't', label: 'Take back', enabled: Object.keys(this.co.orders()).length > 0, run: () => { this.co.takeBack(); this.refresh(); } },
      { key: 'a', label: 'Auto', run: () => { this.co.autoFill(autoOrders(this.state)); this.advance(); } },
      { key: 'Enter', label: 'Repeat', hidden: true, run: () => { if (this.co.repeat()) this.advance(); else this.say('Nothing to repeat.'); } },
      { key: 'ArrowLeft', label: 'Previous group', hidden: true, run: () => this.cycleGroup(-1) },
      { key: 'ArrowRight', label: 'Next group', hidden: true, run: () => this.cycleGroup(1) },
    );
    return cmds;
  }

  /* ---------------------------------------------------------------- helpers */
  private name(id: string): string { return this.state.party.members.find((m) => m.id === id)?.name ?? 'Someone'; }
  private gname(i: number): string { return this.state.groups[i]?.def.name ?? 'monster'; }
  private countName(i: number): string {
    const g = this.state.groups[i];
    const n = groupLiving(g);
    return `${n} ${g.def.name}${n === 1 ? '' : 's'}`;
  }
  private say(line: string): void { this.messages.say(line); }
  private livingGroups(): number[] { return this.state.groups.flatMap((g, i) => (groupLiving(g) > 0 ? [i] : [])); }

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
  /** Starts asking for orders (or, when nobody can act, goes straight to the round). */
  private beginOrders(): void {
    for (const w of warnings(this.state)) this.say(`! ${WARN_TEXT[w] ?? w}`);
    this.advance();
  }

  /** After an order: ask the next member, or play the round once everyone has answered. */
  private advance(): void {
    if (this.co.done()) { void this.resolve(); return; }
    this.phase = 'orders';
    this.refresh();
  }

  private give(o: Order): void { this.co.answer(o); this.advance(); }

  private async chooseFight(): Promise<void> {
    const living = this.livingGroups();
    if (living.length === 0) return;
    let group = living[0];
    if (living.length > 1) {
      const i = await openList(this.app.host, {
        title: 'Fight which?', accent: accentFor('dungeon'), start: Math.max(0, living.indexOf(this.selected)),
        rows: living.map((gi) => ({ label: this.countName(gi), detail: this.state.groups[gi].asleep ? 'asleep' : '' })),
        onMove: (n) => { this.selected = living[n]; this.refresh(); },
      });
      if (i === null) return;
      group = living[i];
    }
    this.give({ kind: 'fight', group });
  }

  private async chooseTarget(title: string): Promise<number | null> {
    const allies = this.state.party.members.map((a, i) => ({ a, i })).filter(({ a }) => isActive(a));
    if (allies.length <= 1) return allies[0]?.i ?? 0;
    const k = await openList(this.app.host, {
      title, accent: accentFor('dungeon'),
      rows: allies.map(({ a }) => ({ label: a.name, detail: `${a.hp}/${a.maxHp}` })),
    });
    return k === null ? null : allies[k].i;
  }

  private async chooseSpell(): Promise<void> {
    const m = this.co.current();
    if (!m) return;
    const spells = castable(this.state, m);
    const si = await openList(this.app.host, {
      title: `${m.name} casts`, accent: accentFor('dungeon'),
      rows: spells.map((sp) => ({ label: sp.name, detail: `level ${sp.level} · ${m.charges[sp.level - 1] ?? 0} left` })),
    });
    if (si === null) return;
    const sp = spells[si];
    const aim = spellAim(sp);
    let target = 0;
    if (aim === 'group') {
      const living = this.livingGroups();
      if (living.length > 1) {
        const gi = await openList(this.app.host, {
          title: `${sp.name} at which?`, accent: accentFor('dungeon'),
          rows: living.map((g) => ({ label: this.countName(g), detail: this.state.groups[g].asleep ? 'asleep' : '' })),
        });
        if (gi === null) return;
        target = living[gi];
      } else target = living[0] ?? 0;
    } else if (aim === 'ally') {
      const t = await this.chooseTarget(`${sp.name} on whom?`);
      if (t === null) return;
      target = t;
    }
    this.give({ kind: 'spell', spellId: sp.id, target });
  }

  private async chooseUse(): Promise<void> {
    const m = this.co.current();
    if (!m) return;
    const items = usable(m);
    const ii = await openList(this.app.host, {
      title: `${m.name} uses`, accent: accentFor('dungeon'),
      rows: items.map((id) => ({ label: ITEMS.find((i) => i.id === id)?.name ?? id })),
    });
    if (ii === null) return;
    const t = await this.chooseTarget('On whom?');
    if (t === null) return;
    this.give({ kind: 'use', itemId: items[ii], target: t });
  }

  private cycleGroup(dir: 1 | -1): void {
    const living = this.livingGroups();
    if (living.length < 2) return;
    const at = Math.max(0, living.indexOf(this.selected));
    this.selected = living[(at + dir + living.length) % living.length];
    this.anim.dyingGroup = -1;
    this.refresh();
  }

  /* ----------------------------------------------------------------- render */
  private refresh(): void {
    const s = this.state;
    this.sceneFrame.querySelector('.ftitle')!.textContent = this.gname(this.selected);
    this.groupsEl.replaceChildren(...s.groups.flatMap((g, i) => (groupLiving(g) > 0 || i === this.selected
      ? [h('button', { class: `quiet${i === this.selected ? ' sel' : ''}`, type: 'button', onclick: () => { this.selected = i; this.anim.dyingGroup = -1; this.refresh(); } },
        groupLiving(g) > 0 ? `${this.countName(i)}${g.asleep ? ' (asleep)' : ''}${g.silenced ? ' (silenced)' : ''}` : `${g.def.name} (gone)`)]
      : [])));
    const m = this.phase === 'orders' ? this.co.current() : null;
    this.rosterEl.replaceChildren(rosterStrip(s.party, { selectedId: m?.id }));
    this.promptEl.textContent = this.phase === 'over' ? '' : this.phase === 'playing' ? 'The round plays out. Space) hurry it' : m ? `${m.name}'s options:` : '';
    this.barEl.replaceChildren(commandBar(this.commands()));
  }

  /* ------------------------------------------------------------- the round */
  private async resolve(): Promise<void> {
    if (this.phase === 'playing' || this.done) return;
    this.phase = 'playing';
    this.skip = false;
    this.app.router.locked = true;
    this.app.router.onSkip = () => { this.skip = true; };
    this.lastOrders = this.co.orders();
    const res = resolveRound(this.state, this.lastOrders, this.rng);
    this.state = res.state;
    this.refresh();
    for (const e of res.events) {
      this.apply(e);
      this.refresh();
      await sleep(this.done || this.skip ? 0 : 340);
      if (this.done) return;
    }
    for (let i = 0; i < this.state.groups.length; i++) {
      if (groupLiving(this.state.groups[i]) === 0 && this.initial[i] > 0 && this.anim.dyingGroup !== i && i === this.selected) { this.anim.dyingAt = performance.now(); this.anim.dyingGroup = i; }
    }
    if (res.outcome === 'ongoing') {
      // save the party as it stands now: a death is permanent the moment it happens, even if the tab is closed
      this.game.commitRound(this.state.party);
      this.app.autosave();
      if (groupLiving(this.state.groups[this.selected]) === 0) this.selected = Math.max(0, this.livingGroups()[0] ?? 0);
      this.app.router.locked = false;
      this.co = new CombatOrders(this.state, this.lastOrders);
      this.phase = 'orders'; // the round is over; a next round with nobody able to act must be allowed to start
      this.beginOrders();
      return;
    }
    await sleep(this.skip ? 0 : 700);
    if (this.done) return;
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
    this.phase = 'over';
    this.outcome = outcome;
    this.app.router.locked = false;
    this.game.finishEncounter({ outcome, xp: this.state.xpPool, gold: this.state.goldPool, party: this.state.party, groups: this.state.groups }, this.fixedKey);
    if (outcome === 'won') this.say(`Victory. ${this.state.xpPool} experience and ${this.state.goldPool} gold, shared out.`);
    else if (outcome === 'fled') this.say('The party gets away, breathing hard.');
    else this.say('That was the last of them. The Wardens will read the names at dawn.');
    this.state = { ...this.state, party: this.game.state.party };
    this.refresh();
  }

  /* ------------------------------------------------------------- the picture */
  private loop = (): void => {
    const now = performance.now();
    const t = now / 1000;
    const hit = Math.max(0, 1 - (now - this.anim.hitAt) / 380);
    const lunge = Math.max(0, 1 - (now - this.anim.lungeAt) / 600);
    const dying = Math.min(1, Math.max(0, (now - this.anim.dyingAt) / 1500));
    const g = this.state.groups[this.selected];
    const ctx = this.canvas.getContext('2d');
    if (g && ctx) {
      const left = g.hp.reduce((a, b) => a + b, 0), total = Math.max(1, this.initial[this.selected]);
      const ps: PictureState = {
        hit, lunge, damage: Math.max(0, Math.min(1, 1 - left / total)),
        dying: this.anim.dyingGroup === this.selected ? dying : groupLiving(g) === 0 ? 1 : 0,
      };
      try { getPicture(g.def.pictureId).draw(ctx, t, ps); } catch { /* a picture that cannot draw never ends a fight */ }
      const shake = hit > 0 ? (Math.random() - 0.5) * 9 * hit : 0;
      this.canvas.style.transform = `translate(${shake}px,${shake * 0.5}px)`;
    }
    this.raf = requestAnimationFrame(this.loop);
  };
}
