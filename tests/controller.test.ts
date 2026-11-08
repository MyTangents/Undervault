import { describe, expect, test } from 'vitest';
import { parseLevel } from '../src/core/dungeon/level';
import { createController } from '../src/render/hall/controller';
import { STOREY_H } from '../src/render/hall/geometry';

const level = (storeys: string[][], start: string) =>
  parseLevel(['name: T', `start: ${start}`, '', ...storeys.flatMap((r, z) => [`@z ${z}`, ...r, ''])].join('\n'));
const corridor = () => level([['##############', '#............#', '##############']], '1 1 0 E');
const drop = () => level(
  [['#####', '#...#', '#####'], ['#####', '##~##', '#####'], ['#####', '##~##', '#####'], ['#####', '#.~##', '#####']], '1 1 3 E');
const stairs = () => level([['#####', '#..<#', '#####'], ['#####', '#..>#', '#####']], '1 1 0 E');

/** Run the clock forward in small steps so animations can finish and queued commands start. */
function run(c: ReturnType<typeof createController>, from: number, to: number, stepMs = 16) {
  for (let t = from; t <= to; t += stepMs) c.update(t);
}

describe('createController', () => {
  test('starts on the start cell, at eye height above that storey', () => {
    const c = createController(corridor(), { x: 1, y: 1, z: 0 }, 1);
    const cam = c.update(0);
    expect(cam.x).toBeCloseTo(1.5);
    expect(cam.z).toBeCloseTo(1.5);
    expect(cam.y).toBeGreaterThan(0);
    expect(cam.y).toBeLessThan(STOREY_H);
    expect(c.pos).toEqual({ x: 1, y: 1, z: 0 });
  });

  test('hammering forward during one step leaves one queued move, not twenty', () => {
    const c = createController(corridor(), { x: 1, y: 1, z: 0 }, 1);
    c.update(0);
    for (let i = 0; i < 20; i++) c.command('fwd');
    expect(c.pending).toBe('fwd');
    run(c, 0, 2000);
    expect(c.pos.x).toBe(3); // the first step plus exactly one queued step
    expect(c.pending).toBeNull();
  });

  test('walking into a wall bumps without arriving anywhere', () => {
    const c = createController(corridor(), { x: 1, y: 1, z: 0 }, 0); // facing north, into the wall
    const arrivals: unknown[] = [];
    c.onArrive = (p, fell) => arrivals.push([p, fell]);
    c.command('fwd');
    run(c, 0, 600);
    expect(c.pos).toEqual({ x: 1, y: 1, z: 0 });
    expect(arrivals).toEqual([]);
    expect(c.busy).toBe(false);
  });

  test('a step reports where the party arrived', () => {
    const c = createController(corridor(), { x: 1, y: 1, z: 0 }, 1);
    const arrivals: unknown[] = [];
    c.onArrive = (p, fell) => arrivals.push([p, fell]);
    c.command('fwd');
    run(c, 0, 600);
    expect(arrivals).toEqual([[{ x: 2, y: 1, z: 0 }, 0]]);
  });

  test('turning changes the facing and the yaw, one quarter turn at a time', () => {
    const c = createController(corridor(), { x: 1, y: 1, z: 0 }, 1);
    const yaw0 = c.update(0).yaw;
    c.command('turnRight');
    run(c, 0, 600);
    expect(c.facing).toBe(2);
    expect(Math.abs(c.update(700).yaw - yaw0)).toBeCloseTo(Math.PI / 2, 4);
    c.command('turnLeft'); c.command('turnLeft');
    run(c, 700, 1500);
    expect(c.facing).toBe(0);
  });

  test('stepping off a ledge falls to the floor below and reports how far', () => {
    const c = createController(drop(), { x: 1, y: 1, z: 3 }, 1);
    const arrivals: [unknown, number][] = [];
    c.onArrive = (p, fell) => arrivals.push([p, fell]);
    c.command('fwd');
    run(c, 0, 3000);
    expect(c.pos).toEqual({ x: 2, y: 1, z: 0 });
    expect(arrivals).toEqual([[{ x: 2, y: 1, z: 0 }, 3]]);
    expect(c.update(3100).y).toBeLessThan(STOREY_H); // the camera really did come down
  });

  test('stairs take the party up one storey and back', () => {
    const c = createController(stairs(), { x: 3, y: 1, z: 0 }, 1);
    c.command('up');
    run(c, 0, 1500);
    expect(c.pos.z).toBe(1);
    c.command('down');
    run(c, 1500, 3000);
    expect(c.pos.z).toBe(0);
  });

  test('time running backwards never produces NaN', () => {
    const c = createController(corridor(), { x: 1, y: 1, z: 0 }, 1);
    c.command('fwd');
    c.update(1000);
    const cam = c.update(500);
    for (const v of Object.values(cam)) expect(Number.isFinite(v)).toBe(true);
  });
});
