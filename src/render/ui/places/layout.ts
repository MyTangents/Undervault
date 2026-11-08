/** The frame every town screen shares: scene (face and blurb), a message window, the printed commands and the roster strip. */
import type { App } from '../app';
import { h } from '../dom';
import { accentFor, commandBar, frame, messageWindow, rosterStrip } from '../frame';
import type { MessageWindow } from '../frame';
import type { KeyCommand } from '../keys';
import { PortraitView, thumbCopy } from '../portraitView';
import { portraitForCharacter, portraitThumb } from '../../portrait';
import type { PortraitSpec } from '../../portrait';
import type { Character } from '../../../core/types';

export interface PlaceScreen {
  el: HTMLElement;
  commands: () => KeyCommand[];
  dispose?: () => void;
}

export interface PlaceOpts {
  /** town place id; picks the accent colour */
  id: string;
  title: string;
  blurb: string;
  spec: PortraitSpec | null;
  commands: () => KeyCommand[];
  /** extra elements under the blurb in the scene frame (a character sheet, the creator's stats) */
  scene?: () => (Node | null)[];
  /** the member picked in the roster strip, if any */
  selectedId?: () => string | undefined;
  onPick?: (m: Character) => void;
}

export interface PlaceLayout {
  el: HTMLElement;
  view: PortraitView | null;
  msg: MessageWindow;
  /** Redraws the printed commands, the roster, the gold and the scene extras after something changed. */
  update(): void;
  setPortrait(spec: PortraitSpec): void;
  setSpeaking(on: boolean): void;
  dispose(): void;
}

/** A small still of each member for the roster strip; the dead are greyed. */
export function memberThumb(m: Character): HTMLElement {
  return thumbCopy(portraitThumb(portraitForCharacter(m), { hit: 0, lunge: 0, damage: 0, dying: 0, dead: m.dead || m.ash, speaking: false }));
}

export function placeLayout(app: App, o: PlaceOpts): PlaceLayout {
  const accent = accentFor(o.id);
  const view = o.spec ? new PortraitView() : null;
  if (view && o.spec) { view.setSpec(o.spec); view.start(); }
  const msg = messageWindow(7);
  app.msg = msg;

  const head = h('div', { class: 'thead' });
  const sceneBody = h('div', { class: 'scene' });
  const bar = h('div', { class: 'barslot' });
  const roster = h('div', { class: 'rosterslot' });
  const extra = h('div', { class: 'sceneextra' });

  const scene = frame(o.title, accent, view ? h('div', { class: 'face' }, view.el) : null, h('p', { class: 'blurb' }, o.blurb), extra);
  const talk = frame('Words', accent, msg.el);
  const party = frame('The Party', accentFor('party'), roster);
  const el = h('div', { class: 'screen townx', style: `--accent:${accent}` },
    head,
    h('div', { class: 'left' }, scene),
    h('div', { class: 'mid' }, talk),
    h('div', { class: 'right' }, party),
    bar);
  void sceneBody;

  const update = () => {
    const g = app.game!;
    head.replaceChildren(h('h2', null, 'Crowhithe'), h('span', { class: 'dim' }, `Day ${g.state.day} · ${g.state.party.gold} gold`));
    bar.replaceChildren(commandBar(o.commands()));
    roster.replaceChildren(rosterStrip(g.state.party, { selectedId: o.selectedId?.(), onPick: o.onPick, thumb: memberThumb }));
    extra.replaceChildren(...(o.scene?.() ?? []).filter((n): n is Node => n !== null));
  };
  update();

  return {
    el, view, msg, update,
    setPortrait: (spec) => view?.setSpec(spec),
    setSpeaking: (on) => view?.setSpeaking(on),
    dispose: () => view?.stop(),
  };
}
