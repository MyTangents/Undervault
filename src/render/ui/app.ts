import { CSS } from './styles';
import { SUBTITLE, TITLE_WORD } from '../../title';
import { h } from './dom';
import { initialState, reduce, type AppAction, type AppState } from './flow';
import { townScreen } from './town';
import { KeyRouter } from './keys';
import type { KeyCommand } from './keys';
import type { UiHost } from './dialog';
import { accentFor, commandBar, frame, getGlow, messageWindow, rosterStrip, setGlow } from './frame';
import type { MessageWindow } from './frame';
import { openCamp } from './camp';
import { endingScreen, rollScreen } from './endings';
import { openOptions, openSystem } from './system';
import { CombatScreen } from './combat';
import { Game, type ArriveResult } from '../../core/game';
import { createRng } from '../../core/rng';
import { demoParty } from '../../core/sim';
import { DEFAULT_SETTINGS, type Settings } from '../../core/settings';
import { clearSave, loadGame, saveGame, defaultStore, SAVE_KEY, type SaveData } from '../../core/save';
import { renderChronicle } from '../../core/chronicle';
import { DISCOVERIES } from '../../core/data';
import type { MonsterGroup } from '../../core/combat/types';
import { Hall, NoWebGLError } from '../hall/hall';
import { Controller, type Command } from '../hall/controller';
import { AutomapView } from '../automapView';
import { paletteFor } from '../hall/palettes';
import { createAudio, type AudioSystem } from '../audio';
import { downloadSave, loadFromFile, pickFile } from '../saveFile';

const NOTICE_KEY = 'undervault.notice';
const SETTINGS_KEY = 'undervault.settings';

/** The whole game in the browser: owns the screens, the running Game, and the dungeon view. */
export class App {
  game: Game | null = null;
  flow: AppState;
  audio: AudioSystem;
  // town state
  townPlace = 'menu';
  townMsg = '';
  selectedId: string | null = null;
  recruited = new Set<string>();
  // dungeon state
  private hall: Hall | null = null;
  private controller: Controller | null = null;
  private mapView: AutomapView | null = null;
  private mapZ = 0;
  private viewEl: HTMLElement | null = null;
  private raf = 0;
  private steps = 0;
  private combat: CombatScreen | null = null;
  private defaultSettings: Settings = DEFAULT_SETTINGS;
  private toastEl: HTMLElement | null = null;
  private toastTimer = 0;
  private hudEl: HTMLElement | null = null;
  private viewFrame: HTMLElement | null = null;
  private dungeonFrames: HTMLElement[] = [];
  private rosterEl: HTMLElement | null = null;
  private barEl: HTMLElement | null = null;
  // keyboard
  readonly router = new KeyRouter();
  readonly host: UiHost;
  /** the current screen's message window, if it has one */
  msg: MessageWindow | null = null;
  private screenCommands: () => KeyCommand[] = () => [];
  private screenDispose: (() => void) | null = null;
  private listeners: [EventTarget, string, EventListener, AddEventListenerOptions?][] = [];

  constructor(private root: HTMLElement) {
    let seen = false;
    try { seen = localStorage.getItem(NOTICE_KEY) === '1'; } catch { /* blocked storage: show the notice each time */ }
    try { const s = localStorage.getItem(SETTINGS_KEY); if (s) this.defaultSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(s) }; } catch { /* use defaults */ }
    this.flow = initialState(seen);
    this.audio = createAudio(window as never);
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.append(style);
    setGlow(getGlow());
    const layer = h('div', { id: 'ui-layer' });
    document.body.append(layer);
    this.host = { router: this.router, layer };
    this.router.push({ name: 'screen', commands: () => this.screenCommands() });
    // while a dialogue is open the screen beneath is out of reach of the pointer too
    this.root.addEventListener('click', (e) => { if (this.host.layer.childElementCount > 0) { e.stopPropagation(); e.preventDefault(); } }, true);
    this.listeners = [
      [window, 'keydown', (e) => this.onKey(e as KeyboardEvent)],
      [window, 'pointerdown', () => this.firstGesture(), { once: true }],
      [document, 'visibilitychange', () => this.audio.onVisibilityChange(document.hidden)],
      [window, 'resize', () => this.hall?.resize(this.glCanvas()?.clientWidth ?? 800, this.glCanvas()?.clientHeight ?? 600)],
    ];
    for (const [t, type, fn, opts] of this.listeners) t.addEventListener(type, fn, opts);
  }

  start(): void { this.render(); }

  /** Detaches the app from the page: its key handlers and dialogue layer. (Tests make many apps in one page.) */
  dispose(): void {
    for (const [t, type, fn] of this.listeners) t.removeEventListener(type, fn);
    this.listeners = [];
    this.teardownDungeon();
    this.combat?.destroy();
    this.host.layer.remove();
  }

  /** What the current screen prints and binds: one table. */
  currentCommands(): KeyCommand[] { return this.screenCommands(); }
  setCommands(f: () => KeyCommand[]): void { this.screenCommands = f; }
  /** The screen being built wants this called when it is replaced (stop its animations). */
  onScreenDispose(f?: () => void): void { this.screenDispose = f ?? null; }

  /** Says a line in the current screen's message window; screens without one still get a toast. */
  say(line: string): void { if (this.msg) this.msg.say(line); else this.toast(line); }
  openSystem(): Promise<void> { return openSystem(this); }
  openOptions(): Promise<void> { return openOptions(this); }

  /* ------------------------------------------------------------- settings */
  settings(): Settings { return this.game?.state.settings ?? this.defaultSettings; }
  setSettings(s: Settings): void {
    if (this.game) this.game.state.settings = s;
    this.defaultSettings = s;
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
    this.hall?.setSettings(s);
    this.audio.setMuted(false);
    this.drawMap();
  }

  /* ----------------------------------------------------------------- flow */
  private firstGesture(): void {
    this.audio.unlock();
    this.flow = reduce(this.flow, { type: 'begin' });
    try { localStorage.setItem(NOTICE_KEY, '1'); } catch { /* ignore */ }
    // Remove the notice in place. Re-rendering here would replace the buttons between pointer-down and click,
    // and the player's first click would be lost.
    this.root.querySelector('.notice')?.remove();
  }

  dispatch(a: AppAction): void {
    this.flow = reduce(this.flow, a);
    this.render();
  }
  refresh(): void { this.render(); }

  toast(msg: string, ms = 5200): void {
    if (this.msg) { this.msg.say(msg); return; }
    this.toastEl?.remove();
    this.toastEl = h('div', { class: 'toast' }, msg);
    document.body.append(this.toastEl);
    clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => this.toastEl?.remove(), ms);
  }

  autosave(): void {
    if (!this.game) return;
    const r = saveGame(this.game.toSave());
    if (!r.ok && r.message) this.toast(r.message);
  }

  saveToFile(): void {
    if (!this.game) return;
    downloadSave(this.game.toSave());
    this.toast('Saved to a file. It will load on any device, in any browser.');
  }

  async loadFromFile(): Promise<void> {
    const file = await pickFile();
    if (!file) return;
    const r = await loadFromFile(file);
    if (!r.data) { this.toast(r.message ?? 'That file could not be loaded.'); return; }
    if (this.tryLoad(r.data)) this.toast('Loaded. Welcome back.');
  }

  /** Loads a save into a running game. Never throws: a save this build cannot use gives a message instead. */
  tryLoad(data: SaveData): boolean {
    try {
      this.adopt(Game.fromSave(data, createRng(Date.now() & 0xffffff)));
      return true;
    } catch (e) {
      this.toast(`That save could not be used (${e instanceof Error ? e.message : 'unknown problem'}).`);
      return false;
    }
  }

  private adopt(g: Game): void {
    // drop any live view built for the previous game, so the new one gets its own level and position
    this.teardownDungeon();
    this.combat?.destroy();
    this.combat = null;
    this.root.querySelector('.overlay')?.remove();
    this.game = g;
    this.townPlace = 'menu';
    this.townMsg = '';
    this.recruited = new Set();
    if (g.isOver()) { // a wiped party goes to the Roll, not into a dungeon where nothing can happen
      this.flow = { ...this.flow, screen: 'gameover', hasGame: true };
      this.render();
      return;
    }
    this.dispatch({ type: 'continue', inTown: g.state.inTown });
    if (!g.state.inTown) this.autosave();
  }

  newGame(): void {
    const g = Game.newGame(demoParty(), createRng(Date.now() & 0xffffff), this.defaultSettings);
    g.returnToTown();
    this.game = g;
    this.townPlace = 'menu';
    this.townMsg = '';
    this.recruited = new Set();
    this.dispatch({ type: 'newGame' });
  }

  continueGame(): void {
    const r = loadGame();
    if (!r.data) { this.toast(r.message ?? 'There is no saved game in this browser.'); return; }
    this.tryLoad(r.data);
  }

  enterDungeon(): void {
    const g = this.game!;
    try { g.enterDungeon(); } catch (e) {
      this.townMsg = e instanceof Error ? e.message : 'The party cannot go down.';
      this.render();
      return;
    }
    this.audio.play('door');
    this.audio.play('drone');
    this.dispatch({ type: 'enterDungeon' });
    this.autosave();
  }

  combatDone(outcome: 'won' | 'fled' | 'wiped'): void {
    this.combat?.destroy();
    this.combat = null;
    if (outcome === 'wiped') clearSave(); // the dead stay dead: no saved game to reload them from
    else this.autosave();
    this.dispatch({ type: 'combatEnd', outcome });
  }

  /* --------------------------------------------------------------- render */
  private teardownDungeon(): void {
    cancelAnimationFrame(this.raf);
    this.hall?.dispose();
    this.hall = null;
    this.controller = null;
    this.viewEl = null;
  }

  private render(): void {
    const s = this.flow;
    this.screenDispose?.();
    this.screenDispose = null;
    // a dialogue left open over the old screen would sit on top of the new one with a keyboard layer nobody owns
    this.host.layer.replaceChildren();
    this.router.trimTo('screen');
    if (s.screen !== 'dungeon') this.teardownDungeon();
    this.msg = null;
    const system: KeyCommand[] = [{ key: 'Escape', label: 'System', run: () => void this.openSystem() }];
    this.screenCommands = () => (s.screen === 'town' || s.screen === 'dungeon' ? system : []);
    if (s.screen !== 'combat' && this.combat) { this.combat.destroy(); this.combat = null; }

    if (s.screen === 'dungeon') {
      if (this.hall && this.viewEl) { this.root.replaceChildren(this.dungeonShell(true)); this.updateDungeon(); return; }
      this.root.replaceChildren(this.dungeonShell(false));
      requestAnimationFrame(() => this.startView());
      return;
    }
    const el = s.screen === 'title' ? this.titleScreen()
      : s.screen === 'town' ? townScreen(this)
      : s.screen === 'combat' ? this.combatScreen()
      : s.screen === 'gameover' ? this.gameOverScreen()
      : this.endingScreen();
    this.root.replaceChildren(el);
  }

  /* ---------------------------------------------------------------- title */
  private titleScreen(): HTMLElement {
    const hasSave = (() => { try { return !!defaultStore().getItem(SAVE_KEY); } catch { return false; } })();
    const cmds: KeyCommand[] = [
      { key: 'n', label: 'New game', run: () => this.newGame() },
      { key: 'c', label: 'Continue', enabled: hasSave, run: () => this.continueGame() },
      { key: 'l', label: 'Load from file', run: () => void this.loadFromFile() },
      { key: 's', label: 'Settings', run: () => void this.openOptions() },
    ];
    this.screenCommands = () => cmds;
    return h('div', { class: 'screen title' },
      h('h1', null, TITLE_WORD),
      h('h2', null, SUBTITLE),
      h('p', { class: 'blurb' }, 'Beneath the town of Crowhithe there is a hole that was dug on purpose, nine hundred years ago, by people who kept ledgers. Six go down. Most do not come up.'),
      h('div', { class: 'menu' }, commandBar(cmds)),
      this.flow.noticeSeen ? null : h('p', { class: 'notice' },
        'Content notice: this is a grim game with violence, crude language and dark humour (R-rated storytelling, nothing explicit). Press any key or click to begin; sound starts on your first key press or click.'));
  }

  /* ----------------------------------------------------------- game over */
  private gameOverScreen(): HTMLElement { return rollScreen(this); }
  private endingScreen(): HTMLElement { return endingScreen(this); }

  /** From the ending back to the town: the demo is not the end of the save. */
  backToTown(): void {
    this.game?.returnToTown();
    this.flow = { ...this.flow, screen: 'town' };
    this.render();
  }

  /* --------------------------------------------------------------- combat */
  private combatScreen(): HTMLElement {
    const c = this.combat;
    if (!c) return h('div', { class: 'screen' });
    this.setCommands(() => c.commands());
    this.msg = c.messages;
    return c.el;
  }

  private startCombat(groups: MonsterGroup[], fixedKey?: string): void {
    this.hall?.dispose(); // the dungeon view is rebuilt after the fight
    this.hall = null;
    cancelAnimationFrame(this.raf);
    this.viewEl = null;
    this.combat = new CombatScreen(this, this.game!, groups, fixedKey);
    this.dispatch({ type: 'encounter' });
  }

  /* -------------------------------------------------------------- dungeon */
  private glCanvas(): HTMLCanvasElement | null { return this.viewEl?.querySelector('canvas.gl') ?? null; }

  private dungeonShell(existing: boolean): HTMLElement {
    const g = this.game!;
    if (!(existing && this.viewEl)) {
      this.viewEl = h('div', { class: 'view' });
      this.hudEl = h('div', { class: 'hud' });
      this.viewEl.append(h('canvas', { class: 'gl' }), this.hudEl);
      this.mapZ = g.state.pos.z;
    }
    this.msg = messageWindow(6);
    const mapCanvas = h('canvas', { class: 'map', width: 320, height: 320 }) as HTMLCanvasElement;
    this.mapView = new AutomapView(mapCanvas);
    const accent = accentFor('dungeon');
    const cmd = (c: Command, label: string, title: string) => h('button', { class: 'quiet', type: 'button', title, onclick: () => this.controller?.command(c) }, label);
    this.viewFrame = frame(g.level().name, accent, this.viewEl);
    this.viewFrame.classList.add('viewframe');
    const mapFrame = frame('Map', accent, mapCanvas,
      h('div', { class: 'row', style: 'margin-top:.4rem' },
        h('button', { class: 'quiet', type: 'button', onclick: () => this.setMapZ(this.mapZ + 1) }, '] Storey ▲'),
        h('button', { class: 'quiet', type: 'button', onclick: () => this.setMapZ(this.mapZ - 1) }, '[ Storey ▼')));
    const padFrame = frame('Move', accent, h('div', { class: 'pad' },
      cmd('turnLeft', '⟲', 'Turn left'), cmd('fwd', '▲', 'Forward'), cmd('turnRight', '⟳', 'Turn right'),
      cmd('left', '◄', 'Sidestep left'), cmd('back', '▼', 'Back'), cmd('right', '►', 'Sidestep right'),
      cmd('up', 'Up', 'Climb stairs'), cmd('down', 'Down', 'Descend stairs')));
    this.dungeonFrames = [this.viewFrame, mapFrame, padFrame];
    const wordsFrame = frame('Words', accent, this.msg.el);
    this.dungeonFrames.push(wordsFrame);
    this.rosterEl = h('div', { class: 'rosterslot' });
    this.barEl = h('div', { class: 'barslot' });
    this.setCommands(() => this.dungeonCommands());
    this.msg.say(existing ? 'The party presses on.' : 'The air changes. Somewhere below, a ledger closes.');
    const shell = h('div', { class: 'screen dungeon2' },
      h('div', { class: 'vf' }, this.viewFrame),
      h('aside', null, mapFrame, padFrame),
      h('div', { class: 'wf' }, wordsFrame),
      h('div', { class: 'rf' }, frame('The Party', accentFor('party'), this.rosterEl)),
      h('div', { class: 'dbar' }, this.barEl));
    this.updateDungeon();
    return shell;
  }

  /** Keys in the dungeon: walking (held keys repeat), looking, the map storey, the camp and the system dialogue. */
  private dungeonCommands(): KeyCommand[] {
    const move = (keys: string[], c: Command): KeyCommand[] =>
      keys.map((key) => ({ key, label: c, hidden: true, repeat: true, run: () => this.controller?.command(c) }));
    return [
      ...move(['w', 'ArrowUp'], 'fwd'), ...move(['s', 'ArrowDown'], 'back'),
      ...move(['a', 'ArrowLeft'], 'turnLeft'), ...move(['d', 'ArrowRight'], 'turnRight'),
      ...move(['q'], 'left'), ...move(['e'], 'right'), ...move(['r'], 'up'), ...move(['f'], 'down'),
      { key: 'z', label: 'Look up', hidden: true, repeat: true, run: () => this.controller?.look(0.15) },
      { key: 'x', label: 'Look down', hidden: true, repeat: true, run: () => this.controller?.look(-0.15) },
      { key: '[', label: 'Storey down', hidden: true, run: () => this.setMapZ(this.mapZ - 1) },
      { key: ']', label: 'Storey up', hidden: true, run: () => this.setMapZ(this.mapZ + 1) },
      { key: 'c', label: 'Camp', run: () => void this.openCamp() },
      { key: 'Escape', label: 'System', run: () => void this.openSystem() },
    ];
  }

  openCamp(): Promise<void> { return openCamp(this); }

  private setMapZ(z: number): void {
    const lv = this.game!.level();
    this.mapZ = Math.max(0, Math.min(lv.layers - 1, z));
    this.drawMap();
  }

  private drawMap(): void {
    const g = this.game;
    if (!g || !this.mapView || this.flow.screen === 'town') return;
    try { this.mapView.draw(g.automap(), g.level(), g.state.pos, g.state.facing, this.mapZ, this.settings().automap); } catch { /* a map that cannot draw never breaks the screen */ }
  }

  /** Redraws everything on the dungeon screen that follows the game: roster, title, hud, accent, bar, map. */
  updateDungeon(): void {
    const g = this.game;
    if (!g || this.flow.screen !== 'dungeon') return;
    this.rosterEl?.replaceChildren(rosterStrip(g.state.party, {}));
    this.barEl?.replaceChildren(
      h('div', { class: 'legend' }, 'W/S walk · A/D turn · Q/E step · R/F stairs · Z/X look · [ ] map'),
      commandBar(this.dungeonCommands()));
    const here = g.level().areaOf(g.state.pos);
    this.viewFrame?.querySelector('.ftitle')?.replaceChildren(g.level().name);
    if (this.hudEl) {
      this.hudEl.replaceChildren(h('b', null, g.level().name.toUpperCase()),
        h('div', { class: 'dim' }, `${here} · storey ${g.state.pos.z + 1} of ${g.level().layers} · facing ${'NESW'[g.state.facing]}`));
    }
    const edge = paletteFor(here).edge;
    for (const f of this.dungeonFrames) f.style.setProperty('--accent', edge);
    this.drawMap();
  }

  private mountHall(): void {
    const g = this.game!;
    const view = this.viewEl;
    if (!view) return;
    this.hall?.dispose();
    view.querySelector('canvas.gl')?.remove();
    const canvas = h('canvas', { class: 'gl' }) as HTMLCanvasElement;
    view.prepend(canvas);
    try {
      this.hall = new Hall(canvas, g.level(), this.settings());
      this.hall.resize(canvas.clientWidth || 800, canvas.clientHeight || 600);
    } catch (e) {
      this.hall = null;
      this.say(e instanceof NoWebGLError ? e.message : 'The dungeon view could not start.');
    }
  }

  private startView(): void {
    const g = this.game;
    if (!g || this.flow.screen !== 'dungeon' || !this.viewEl) return;
    this.mountHall();
    this.controller = new Controller(g.level(), g.state.pos, g.state.facing);
    this.controller.onArrive = (pos, fell) => this.arrived(pos, fell);
    this.updateDungeon();
    cancelAnimationFrame(this.raf);
    const loop = (now: number): void => {
      this.raf = requestAnimationFrame(loop);
      if (!this.controller) return;
      const cam = this.controller.update(now);
      this.hall?.render(now, cam);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private arrived(pos: { x: number; y: number; z: number }, fell: number): void {
    const g = this.game!;
    const c = this.controller!;
    this.audio.play(fell > 0 ? 'hit' : 'step');
    this.steps++;
    if (this.steps % 6 === 0) this.autosave();
    const results = g.onArrive(pos, fell, c.facing);
    this.mapZ = pos.z;
    this.updateDungeon();
    for (const r of results) if (this.handle(r)) return;
  }

  /** Reacts to one thing that happened on a tile. Returns true if the screen changed and we should stop. */
  private handle(r: ArriveResult): boolean {
    const g = this.game!;
    switch (r.kind) {
      case 'fall': this.toast(`You fall ${r.fell} storeys. Everyone is hurt, and nobody is dead. Yet.`); return false;
      case 'pit': this.toast('The floor gives way under someone. Not far, but far enough.'); return false;
      case 'discovery': {
        const d = DISCOVERIES.find((x) => x.id === r.id);
        this.audio.play('cast');
        this.toast(`${d?.name ?? r.id}. ${d?.text ?? ''}`, 9000);
        this.updateDungeon();
        return false;
      }
      case 'event':
        this.toast(r.text, 8000);
        this.audio.play('door');
        if (r.closed > 0) { this.mountHall(); }
        this.updateDungeon();
        return false;
      case 'exit':
        if (r.to === 'town') { g.returnToTown(); this.autosave(); this.dispatch({ type: 'returnToTown' }); return true; }
        if (r.to === 'ending') { this.autosave(); this.dispatch({ type: 'ending' }); return true; }
        g.followExit(r.to);
        this.audio.play('door');
        this.toast(`You go ${r.to === 'deep' ? 'deeper, to' : 'on to'} ${g.level().name}.`);
        this.autosave();
        this.mapZ = g.state.pos.z;
        this.startView();
        return true;
      case 'encounter':
        this.audio.play('death');
        this.autosave();
        this.startCombat(r.groups, r.fixedKey);
        return true;
    }
  }

  /* ----------------------------------------------------------------- keys */
  private onKey(e: KeyboardEvent): void {
    if (!this.flow.audioUnlocked) this.firstGesture();
    // a focused text field keeps its letters; only Enter and Escape still go to the dialogue around it
    const inField = e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.target instanceof HTMLTextAreaElement;
    if (inField && e.key !== 'Enter' && e.key !== 'Escape') return;
    if (this.router.handle(e.key, { repeat: e.repeat, ctrl: e.ctrlKey, alt: e.altKey, meta: e.metaKey })) { e.preventDefault(); return; }
    if (this.router.top()?.name !== 'screen') return; // a dialogue is open: the dungeon must not walk behind it
    if (e.repeat && this.flow.screen !== 'dungeon') return;
    // Screens not yet moved onto the router keep their own key handling for now.
    const s = this.flow.screen;
    if (s !== 'dungeon' || !this.controller) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const map: Record<string, Command> = {
      ArrowUp: 'fwd', w: 'fwd', W: 'fwd', ArrowDown: 'back', s: 'back', S: 'back', ArrowLeft: 'turnLeft', a: 'turnLeft', A: 'turnLeft',
      ArrowRight: 'turnRight', d: 'turnRight', D: 'turnRight', q: 'left', Q: 'left', e: 'right', E: 'right', r: 'up', R: 'up', f: 'down', F: 'down',
    };
    if (map[e.key]) { e.preventDefault(); this.controller.command(map[e.key]); return; }
    if (e.key === 'z' || e.key === 'Z') this.controller.look(0.15);
    else if (e.key === 'x' || e.key === 'X') this.controller.look(-0.15);
    else if (e.key === '[') this.setMapZ(this.mapZ - 1);
    else if (e.key === ']') this.setMapZ(this.mapZ + 1);
  }
}
