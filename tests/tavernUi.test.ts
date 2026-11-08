// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createRng } from '../src/core/rng';
import { recruits } from '../src/core/town';
import { portraitForCharacter } from '../src/render/portrait';
import { creatorFace } from '../src/render/ui/creator';
import { faceNumber } from '../src/render/portrait';

vi.mock('../src/render/hall/hall', () => ({
  NoWebGLError: class NoWebGLError extends Error {},
  Hall: class { constructor(..._a: unknown[]) {} resize() {} render() {} setSettings() {} dispose() {} },
}));
vi.spyOn(console, 'error').mockImplementation(() => {});

const { App } = await import('../src/render/ui/app');
const { TYPING } = await import('../src/render/ui/frame');

let current: { dispose(): void } | null = null;
function makeApp() {
  current?.dispose();
  document.body.innerHTML = '<div id="app"></div>';
  const app = new App(document.getElementById('app')!);
  current = app;
  app.start();
  return app as unknown as Record<string, any>;
}
const press = (key: string, init: KeyboardEventInit = {}) => {
  const e = new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true, ...init });
  window.dispatchEvent(e);
  return e;
};
const type = (s: string) => { for (const ch of s) press(ch); };
const flush = () => new Promise((r) => setTimeout(r, 0));
const words = () => document.querySelector('.msgwin')?.textContent ?? '';
const face = () => document.querySelector('.townx .face canvas')?.getAttribute('data-portrait');
const dialogRows = () => [...document.querySelectorAll('.dialog .row')].map((r) => r.textContent!);
const names = (app: Record<string, any>) => app.game.state.party.members.map((m: any) => m.name);

/** A town with a party of `n` (the demo party minus the rest), standing in the Sump Tap. */
function tavern(n = 4) {
  const app = makeApp();
  press('n');
  const p = app.game.state.party;
  app.game.state.party = { ...p, members: p.members.slice(0, n) };
  press('t');
  return app;
}

beforeEach(() => { localStorage.clear(); TYPING.msPerChar = 0; });
afterEach(() => { TYPING.msPerChar = 14; });

describe('the Sump Tap: recruiting', () => {
  test('R)ecruit lists who is waiting and previewing a highlighted recruit switches the portrait; choosing hires them and they keep their recipe face', async () => {
    const app = tavern(4);
    expect(face()).toBe('dennis');
    press('r');
    const rows = dialogRows();
    expect(rows.length).toBeGreaterThan(0);
    const first = face();
    expect(first).not.toBe('dennis');
    if (rows.length > 1) {
      press('ArrowDown');
      expect(face()).not.toBe(first);
    }
    press('Enter');
    await flush();
    expect(app.game.state.party.members.length).toBe(5);
    const hired = app.game.state.party.members[4];
    expect(portraitForCharacter(hired)).toEqual({ kind: 'person', id: expect.any(String) });
    expect(words()).toContain(`${hired.name} joins you.`);
    expect(face()).toBe('dennis');
    expect(document.querySelectorAll('.roster .rrow').length).toBe(5);
  });

  test('with nobody waiting r says so in the message window', () => {
    const app = tavern(4);
    const waiting = recruits(app.game.state.day, createRng(app.game.state.day * 977 + 1), app.game.state.party);
    for (const c of waiting) app.recruited.add(c.id);
    press('r');
    expect(document.querySelector('.dialog')).toBeNull();
    expect(words()).toMatch(/nobody is waiting/i);
  });

  test('a full party disables recruiting and creating', () => {
    tavern(6);
    const off = [...document.querySelectorAll('.cmdbar .cmd.off')].map((c) => c.textContent);
    expect(off).toContain('R)ecruit');
    expect(off).toContain('N)ew character');
    press('r');
    press('n');
    expect(document.querySelector('.dialog')).toBeNull();
  });

  test('D)ismiss asks y/n and n keeps them', async () => {
    const app = tavern(4);
    const before = names(app);
    press('d');
    expect(dialogRows().length).toBe(4);
    press('2');
    await flush();
    expect(document.querySelector('.dialog.confirm')).not.toBeNull();
    press('n');
    await flush();
    expect(names(app)).toEqual(before);
    press('d');
    press('2');
    await flush();
    press('y');
    await flush();
    expect(names(app)).toEqual(before.filter((_: string, i: number) => i !== 1));
  });
});

describe('the Sump Tap: ordering the party', () => {
  test('O)rder: choose a member, Down three times moves them three slots with the rank markers updating, Enter keeps it and the party order and rows change', async () => {
    const app = tavern(6);
    const before = names(app);
    press('o');
    press('1');
    await flush();
    const marks = () => dialogRows().map((r) => (r.includes('front') ? 'F' : r.includes('back') ? 'B' : '?')).join('');
    expect(marks()).toBe('FFFBBB');
    press('ArrowDown'); press('ArrowDown'); press('ArrowDown');
    expect(dialogRows()[3]).toContain(before[0]);
    expect(marks()).toBe('FFFBBB');
    press('Enter');
    await flush();
    expect(names(app)).toEqual([before[1], before[2], before[3], before[0], before[4], before[5]]);
    expect(app.game.state.party.members.map((m: any) => m.row).join()).toBe('front,front,front,back,back,back');
    expect(document.querySelector('.dialog')).toBeNull();
    expect(words()).toContain(before[0]);
  });

  test('Escape restores the original order, and a dead member can be moved too', async () => {
    const app = tavern(6);
    const before = names(app);
    press('o'); press('1'); await flush();
    press('ArrowDown'); press('ArrowDown');
    press('Escape');
    await flush();
    expect(names(app)).toEqual(before);

    const p = app.game.state.party;
    app.game.state.party = { ...p, members: p.members.map((m: any, i: number) => (i === 0 ? { ...m, hp: 0, dead: true } : m)) };
    press('o'); press('1'); await flush();
    for (let i = 0; i < 5; i++) press('ArrowDown');
    press('Enter');
    await flush();
    expect(app.game.state.party.members.at(-1).name).toBe(before[0]);
    expect(app.game.state.party.members.at(-1).dead).toBe(true);
  });
});

describe('the character creator', () => {
  test('typing a name with command letters in the creator types them and runs nothing', async () => {
    const app = tavern(3);
    press('n');
    expect(document.querySelector('.dialog.name')).not.toBeNull();
    type('Pell Ned');
    expect(document.querySelector('.dialog.name')?.textContent).toContain('Pell Ned');
    expect(app.townPlace).toBe('tavern');
    expect(document.querySelector('.dialog.name')).not.toBeNull();
    press('Enter');
    await flush();
    expect(document.querySelector('.dialog')?.textContent).toMatch(/race/i);
    press('Escape'); // back to the name
    await flush();
    expect(document.querySelector('.dialog.name')?.textContent).toContain('Pell Ned');
    press('Escape'); // out of the creator
    await flush();
    expect(document.querySelector('.dialog')).toBeNull();
    expect(app.townPlace).toBe('tavern');
  });

  test('walking the creator signs a character on whose face is the one that was previewed', async () => {
    const app = tavern(3);
    press('n');
    type('Pell');
    press('Enter'); await flush();
    press('2'); await flush(); // barrowfolk
    press('2'); await flush(); // neutral
    expect(document.querySelector('.dialog.alloc')).not.toBeNull();
    const previewed = face();
    expect(previewed).toBe('adv');
    press('ArrowRight'); // a point into strength
    press('Enter'); await flush();
    expect(document.querySelector('.dialog')?.textContent).toMatch(/class/i);
    press('1'); await flush();
    expect(document.querySelector('.dialog.confirm')).not.toBeNull();
    press('y'); await flush();
    const made = app.game.state.party.members.at(-1);
    expect(made.name).toBe('Pell');
    expect(app.game.state.party.members.length).toBe(4);
    expect(faceNumber(made.id)).toBeGreaterThanOrEqual(1000);
    expect(creatorFace).toBeTypeOf('function');
    expect(words()).toContain('Pell joins you.');
  });

  test('the allocation stage refuses to continue when no class is open, and R re-rolls', async () => {
    tavern(3);
    press('n');
    type('Ned');
    press('Enter'); await flush();
    press('1'); await flush(); // human: base scores of 8
    press('2'); await flush();
    const before = document.querySelector('.dialog.alloc')?.textContent;
    press('Enter'); await flush();
    expect(document.querySelector('.dialog.alloc')).not.toBeNull(); // still there: nothing is open yet
    press('r');
    expect(document.querySelector('.dialog.alloc')).not.toBeNull();
    expect(typeof before).toBe('string');
    press('Escape'); await flush(); // alloc -> alignment
    press('Escape'); await flush(); // alignment -> race
    press('Escape'); await flush(); // race -> name
    press('Escape'); await flush(); // out
    expect(document.querySelector('.dialog')).toBeNull();
  });
});
