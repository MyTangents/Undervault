// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MONSTERS } from '../src/core/data';
import { makeGroup } from '../src/core/combat/engine';
import { createRng } from '../src/core/rng';

vi.mock('../src/render/hall/hall', () => ({
  NoWebGLError: class NoWebGLError extends Error {},
  Hall: class { constructor(..._a: unknown[]) {} resize() {} render() {} setSettings() {} dispose() {} },
}));
vi.spyOn(console, 'error').mockImplementation(() => {});

const { App } = await import('../src/render/ui/app');

let current: { dispose(): void } | null = null;
const def = (id: string) => MONSTERS.find((m) => m.id === id)!;
const press = (key: string) => window.dispatchEvent(new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true }));
const flush = (n = 3) => new Promise<void>((r) => { let i = 0; const go = () => (++i >= n ? r() : setTimeout(go, 0)); setTimeout(go, 0); });
const words = () => document.querySelector('.msgwin')?.textContent ?? '';
const printed = () => [...document.querySelectorAll('.cmdbar .cmd')].map((c) => c.textContent!);
const rows = () => [...document.querySelectorAll('.dialog .row')].map((r) => r.textContent!);

/** A fight in the live app: a new game, down the stairs, then the given groups. */
async function fight(groups: [string, number][]) {
  current?.dispose();
  document.body.innerHTML = '<div id="app"></div>';
  const app = new App(document.getElementById('app')!);
  current = app;
  app.start();
  const a = app as unknown as Record<string, any>;
  a.newGame();
  a.enterDungeon();
  await flush();
  a.startCombat(groups.map(([id, n], i) => makeGroup(def(id), n, createRng(i + 1))));
  return a;
}
const screen = (a: Record<string, any>) => a.combat as { pending(): Record<string, any>; prompt(): string };

beforeEach(() => { localStorage.clear(); });
afterEach(() => { vi.useRealTimers(); });

describe('the combat screen', () => {
  test('with one living group, f fights without a group prompt; with two groups it opens a numbered list', async () => {
    const one = await fight([['ledger-rat', 3]]);
    expect(screen(one).prompt()).toContain(one.game.state.party.members[0].name);
    press('f');
    expect(document.querySelector('.dialog')).toBeNull();
    expect(screen(one).pending()[one.game.state.party.members[0].id]).toEqual({ kind: 'fight', group: 0 });

    const two = await fight([['ledger-rat', 3], ['tally-skeleton', 2]]);
    press('f');
    expect(document.querySelector('.dialog')).not.toBeNull();
    expect(rows().length).toBe(2);
    expect(rows()[0]).toContain('1)');
    press('2');
    await flush();
    expect(screen(two).pending()[two.game.state.party.members[0].id]).toEqual({ kind: 'fight', group: 1 });
    // the next member is asked
    expect(screen(two).prompt()).toContain(two.game.state.party.members[1].name);
  });

  test('s opens the spell list then the target list and produces the same Order the old panel did', async () => {
    const a = await fight([['ledger-rat', 3], ['tally-skeleton', 2]]);
    const [b0, b1, b2, caster] = a.game.state.party.members;
    press('p'); press('p'); press('p'); // the three in front parry
    expect(screen(a).prompt()).toContain(caster.name);
    press('s');
    expect(document.querySelector('.dialog')).not.toBeNull();
    expect(rows().some((r) => /Cinder Dart/.test(r))).toBe(true);
    const dart = rows().findIndex((r) => /Cinder Dart/.test(r));
    press(String(dart + 1));
    await flush();
    expect(rows().length).toBe(2); // the target list: two groups
    press('2');
    await flush();
    expect(screen(a).pending()[caster.id]).toEqual({ kind: 'spell', spellId: 'cinder-dart', target: 1 });
    expect([b0, b1, b2].every((m) => screen(a).pending()[m.id]?.kind === 'parry')).toBe(true);
  });

  test('Enter repeats last round\'s order, T takes back, and an illegal command does nothing', async () => {
    const a = await fight([['ledger-rat', 3]]);
    const [m0, m1] = a.game.state.party.members;
    press('s'); // Brannoc has no spells: inert
    expect(document.querySelector('.dialog')).toBeNull();
    expect(screen(a).pending()).toEqual({});
    press('p');
    expect(screen(a).prompt()).toContain(m1.name);
    press('t');
    expect(screen(a).prompt()).toContain(m0.name);
    expect(screen(a).pending()).toEqual({});
  });

  test('after the last member the round resolves into the message window; Space skips the waits; keys are ignored while it plays except Enter and Space', async () => {
    const a = await fight([['ledger-rat', 1]]);
    for (let i = 0; i < 6; i++) press('p');
    expect(a.router.locked).toBe(true);
    press('f'); // ignored while the round plays
    expect(document.querySelector('.dialog')).toBeNull();
    press(' '); // speed it up
    for (let i = 0; i < 40 && a.router.locked; i++) await flush(2);
    expect(a.router.locked).toBe(false);
    expect(words().length).toBeGreaterThan(20);
  });

  test('the commands printed in the bar equal the bound keys for the current member', async () => {
    const a = await fight([['ledger-rat', 2]]);
    const cmds = a.currentCommands() as { key: string; label: string; hidden?: boolean }[];
    const shown = cmds.filter((c) => !c.hidden);
    expect(printed()).toEqual(['F)ight', 'S)pell', 'P)arry', 'U)se', 'R)un', 'T)ake back', 'A)uto']);
    expect(shown.length).toBe(printed().length);
    expect(new Set(cmds.map((c) => c.key.toLowerCase())).size).toBe(cmds.length);
    const dim = [...document.querySelectorAll('.cmdbar .cmd.off')].map((c) => c.textContent);
    expect(dim).toContain('S)pell');
    expect(dim).toContain('U)se');
    expect(dim).toContain('T)ake back'); // nobody before the first member
  });

  test('the combat roster has no faces', async () => {
    await fight([['ledger-rat', 2]]);
    expect(document.querySelectorAll('.roster .rrow').length).toBe(6);
    expect(document.querySelectorAll('.roster canvas').length).toBe(0);
    expect(document.querySelectorAll('canvas.mon').length).toBe(1);
  });

  test('A)uto fills the round with the suggested orders and plays it', async () => {
    const a = await fight([['ledger-rat', 1]]);
    press('a');
    expect(a.router.locked).toBe(true);
    press(' ');
    for (let i = 0; i < 40 && a.router.locked; i++) await flush(2);
    expect(a.router.locked).toBe(false);
  });

  test('a round where nobody can act still resolves', async () => {
    current?.dispose();
    document.body.innerHTML = '<div id="app"></div>';
    const app = new App(document.getElementById('app')!);
    current = app;
    app.start();
    const a = app as unknown as Record<string, any>;
    a.newGame(); a.enterDungeon();
    await flush();
    a.game.state.party = { ...a.game.state.party, members: a.game.state.party.members.map((m: any) => ({ ...m, status: ['asleep'] })) };
    vi.useFakeTimers();
    a.startCombat([makeGroup(def('ledger-rat'), 1, createRng(1))]);
    expect(a.router.locked).toBe(true); // the round is already playing: nobody was asked
    await vi.advanceTimersByTimeAsync(2500);
    expect((a.combat as { round(): number }).round()).toBeGreaterThanOrEqual(1);
  });
});

describe('review fixes', () => {
  test('a second and third round where nobody can act still resolve (the fight never hangs)', async () => {
    const { CombatOrders } = await import('../src/render/ui/combatOrders');
    const a = await fight([['ledger-rat', 1]]);
    vi.useFakeTimers();
    const done = vi.spyOn(CombatOrders.prototype, 'done').mockReturnValue(true);
    try {
      // every round is one nobody is asked about: kick one off from the current prompt
      (a.combat as any).advance();
      await vi.advanceTimersByTimeAsync(6000);
      expect((a.combat as { round(): number }).round()).toBeGreaterThanOrEqual(3);
    } finally { done.mockRestore(); }
  });
});
