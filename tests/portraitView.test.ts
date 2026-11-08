// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from 'vitest';
import { PortraitView } from '../src/render/ui/portraitView';

afterEach(() => vi.restoreAllMocks());

describe('PortraitView', () => {
  test('PortraitView sets data-portrait, switches it on setSpec, and stop() cancels its animation frame', () => {
    const view = new PortraitView();
    view.setSpec({ kind: 'person', id: 'hobb' });
    expect(view.el.dataset.portrait).toBe('hobb');
    view.setSpec({ kind: 'adventurer', raceId: 'human', classId: 'blade', alignment: 'neutral', face: 7 });
    expect(view.el.dataset.portrait).toBe('adv');
    view.setSpec({ kind: 'person', id: 'maud' });
    expect(view.el.dataset.portrait).toBe('maud');

    const cancel = vi.spyOn(globalThis, 'cancelAnimationFrame');
    view.start();
    view.stop();
    expect(cancel).toHaveBeenCalled();
  });

  test('a canvas that cannot draw (no 2d context) never throws', () => {
    const view = new PortraitView();
    view.setSpec({ kind: 'person', id: 'dennis' });
    expect(() => { view.setSpeaking(true); view.setState({ dead: true }); }).not.toThrow();
  });
});
