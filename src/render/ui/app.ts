import { CSS } from './styles';
import { SUBTITLE, TITLE_WORD } from '../../title';
import { h } from './dom';
import { initialState, reduce, type AppAction, type AppState } from './flow';
import { townScreen } from './town';
import { CombatScreen } from './combat';
import { partyPanel } from './party';
import { Game, type ArriveResult } from '../../core/game';
import { createRng } from '../../core/rng';
import { demoParty } from '../../core/sim';
import { DEFAULT_SETTINGS, type Settings } from '../../core/settings';
import { clearSave, loadGame, saveGame, defaultStore, SAVE_KEY, type SaveData } from '../../core/save';
import { renderChronicle } from '../../core/chronicle';
import { DISCOVERIES } from '../../core/data';
import type { TaleDef, Stats, Alignment } from '../../core/types';
import type { MonsterGroup } from '../../core/combat/types';
import { Hall, NoWebGLError } from '../hall/hall';
import { Controller, type Command } from '../hall/controller';
import { AutomapView } from '../automapView';
import { paletteFor } from '../hall/palettes';
import { createAudio, type AudioSystem } from '../audio';
import { downloadSave, loadFromFile, pickFile } from '../saveFile';

const NOTICE_KEY = 'undervault.notice';
const SETTINGS_KEY = 'undervault.settings';

interface Creator { pool: number; alloc: Stats; name: string; raceId: string; alignment: Alignment; classId?: string }

/** The whole game in the browser: owns the screens, the running Game, and the dungeon view. */
export class App {
  game: Game | null = null;
  flow: AppState;
  audio: AudioSystem;
  // town state
  townPlace = 'tavern';
  townMsg = '';
  townMsgBad = false;
  selectedId: string | null = null;
  recruited = new Set<string>();
  creator: Creator | null = null;
  lastTale: TaleDef | null = null;
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
  private sideEl: HTMLElement | null = null;

  constructor(private root: HTMLElement) {
    let seen = false;
    try { seen = localStorage.getItem(NOTICE_KEY) === '1'; } catch { /* blocked storage: show the notice each time */ }
    try { const s = localStorage.getItem(SETTINGS_KEY); if (s) this.defaultSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(s) }; } catch { /* use defaults */ }
    this.flow = initialState(seen);
    this.audio = createAudio(window as never);
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.append(style);
    window.addEventListener('keydown', (e) => this.onKey(e));
    window.addEventListener('pointerdown', () => this.firstGesture(), { once: true });
    document.addEventListener('visibilitychange', () => this.audio.onVisibilityChange(document.hidden));
    window.addEventListener('resize', () => this.hall?.resize(this.glCanvas()?.clientWidth ?? 800, this.glCanvas()?.clientHeight ?? 600));
  }

  start(): void { this.render(); }

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
    this.townPlace = 'tavern';
    this.townMsg = '';
    this.recruited = new Set();
    if (g.isOver()) { // a wiped party goes to the Roll, not into a dungeon where nothing can happen
      this.flow = { ...this.flow, screen: 'gameover', under: null, hasGame: true };
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
    this.townPlace = 'tavern';
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
      this.townMsgBad = true;
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
    if (s.screen !== 'dungeon' && s.screen !== 'settings') this.teardownDungeon();
    if (s.screen === 'settings' && s.under !== 'dungeon') this.teardownDungeon();
    if (s.screen !== 'combat' && this.combat) { this.combat.destroy(); this.combat = null; }

    if (s.screen === 'dungeon') {
      if (this.hall && this.viewEl) { this.root.replaceChildren(this.dungeonShell(true)); this.updateSide(); return; }
      this.root.replaceChildren(this.dungeonShell(false));
      requestAnimationFrame(() => this.startView());
      return;
    }
    if (s.screen === 'settings') {
      if (s.under === 'dungeon' && this.viewEl) { this.root.append(this.settingsScreen()); return; }
      this.root.replaceChildren(this.settingsScreen());
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
    return h('div', { class: 'screen title' },
      h('h1', null, TITLE_WORD),
      h('h2', null, SUBTITLE),
      h('p', { class: 'blurb' }, 'Beneath the town of Crowhithe there is a hole that was dug on purpose, nine hundred years ago, by people who kept ledgers. Six go down. Most do not come up.'),
      h('div', { class: 'menu' },
        h('button', { onclick: () => this.newGame() }, 'New game'),
        h('button', { disabled: !hasSave, onclick: () => this.continueGame() }, 'Continue'),
        h('button', { class: 'quiet', onclick: () => void this.loadFromFile() }, 'Load from file'),
        h('button', { class: 'quiet', onclick: () => this.dispatch({ type: 'openSettings' }) }, 'Settings')),
      this.flow.noticeSeen ? null : h('p', { class: 'notice' },
        'Content notice: this is a grim game with violence, crude language and dark humour (R-rated storytelling, nothing explicit). Click anywhere to begin; sound starts on your first click.'));
  }

  /* ------------------------------------------------------------- settings */
  private settingsScreen(): HTMLElement {
    const cur = this.settings();
    const set = (patch: Partial<Settings>) => this.setSettings({ ...this.settings(), ...patch });
    const slider = (label: string, key: 'bloom' | 'flicker' | 'fog' | 'lamp', min: number, max: number, step: number) => {
      const out = h('span', { class: 'mono' }, String(cur[key]));
      return [h('span', null, label),
        h('input', { type: 'range', min, max, step, value: cur[key], oninput: (e: Event) => { const v = Number((e.target as HTMLInputElement).value); out.textContent = String(v); set({ [key]: v } as Partial<Settings>); } }),
        out];
    };
    return h('div', { class: 'screen overlay' }, h('div', { class: 'panel stack' },
      h('h3', null, 'Settings'),
      h('div', { class: 'set' }, ...slider('Bloom', 'bloom', 0, 2, 0.05), ...slider('Torch flicker', 'flicker', 0, 2, 0.05), ...slider('Fog', 'fog', 0.03, 0.6, 0.01), ...slider('Lantern', 'lamp', 0, 2, 0.05)),
      h('div', { class: 'row' }, 'Quality ',
        h('select', { onchange: (e: Event) => set({ quality: (e.target as HTMLSelectElement).value as Settings['quality'] }) },
          h('option', { value: 'normal', selected: cur.quality === 'normal' }, 'Normal'), h('option', { value: 'low', selected: cur.quality === 'low' }, 'Low (no bloom, for slower machines)'))),
      h('div', { class: 'row' }, 'Automap ',
        h('select', { onchange: (e: Event) => set({ automap: (e.target as HTMLSelectElement).value as Settings['automap'] }) },
          h('option', { value: 'on', selected: cur.automap === 'on' }, 'On (fills in as you explore)'), h('option', { value: 'off', selected: cur.automap === 'off' }, 'Off (draw your own)'))),
      h('div', { class: 'row' },
        h('button', { class: 'quiet', disabled: !this.game, onclick: () => this.saveToFile() }, 'Save to file'),
        h('button', { class: 'quiet', onclick: () => void this.loadFromFile() }, 'Load from file')),
      h('div', { class: 'row' }, h('button', { onclick: () => { this.root.querySelector('.overlay')?.remove(); this.dispatch({ type: 'closeSettings' }); } }, 'Close'))));
  }

  /* ----------------------------------------------------------- game over */
  private gameOverScreen(): HTMLElement {
    const lines = this.game ? renderChronicle(this.game.state.chronicle, 6) : [];
    return h('div', { class: 'screen end' }, h('div', { class: 'panel stack' },
      h('h2', null, 'The Roll of the Gone'),
      h('div', null, 'Corporal Moss reads the names at dawn, one more than yesterday. Yours are in the book now.'),
      h('h3', null, 'What was written'), ...lines.map((l) => h('div', { class: 'tale' }, l)),
      h('div', { class: 'row' },
        h('button', { onclick: () => this.newGame() }, 'Begin again'),
        h('button', { class: 'quiet', onclick: () => void this.loadFromFile() }, 'Load from file'),
        h('button', { class: 'quiet', onclick: () => this.dispatch({ type: 'toTitle' }) }, 'Title'))));
  }

  private endingScreen(): HTMLElement {
    const found = this.game ? DISCOVERIES.filter((d) => this.game!.state.party.discoveries.includes(d.id)).length : 0;
    const lines = this.game ? renderChronicle(this.game.state.chronicle, 8) : [];
    return h('div', { class: 'screen end' }, h('div', { class: 'panel stack' },
      h('h2', null, 'Settled, for now'),
      h('div', null, 'The Quiet Below asks whether you have come about the account. You say yes, and mean it. A receipt, warm as a hand, is pressed into yours. The walls go quiet. Somewhere far above, a clerk puts down his pen.'),
      h('div', { class: 'dim' }, `This is the end of the demo. You found ${found} of ${DISCOVERIES.length} things the Vault was keeping.`),
      h('h3', null, 'The chronicle'), ...lines.map((l) => h('div', { class: 'tale' }, l)),
      h('div', { class: 'row' },
        h('button', { onclick: () => { this.game?.returnToTown(); this.flow = { ...this.flow, screen: 'town' }; this.render(); } }, 'Back to Crowhithe'),
        h('button', { class: 'quiet', onclick: () => this.saveToFile() }, 'Save to file'),
        h('button', { class: 'quiet', onclick: () => this.dispatch({ type: 'toTitle' }) }, 'Title'))));
  }

  /* --------------------------------------------------------------- combat */
  private combatScreen(): HTMLElement {
    return this.combat ? this.combat.el : h('div', { class: 'screen' });
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
    if (existing && this.viewEl) {
      // coming back from the settings overlay: reuse the live view
      return h('div', { class: 'screen dungeon' }, this.viewEl, this.sideBar());
    }
    this.viewEl = h('div', { class: 'view' });
    this.hudEl = h('div', { class: 'hud' });
    this.viewEl.append(h('canvas', { class: 'gl' }), this.hudEl,
      h('div', { class: 'hints' }, 'W/S walk · A/D turn · Q/E sidestep · R/F stairs · Z/X look · [ ] map storey · Esc settings'));
    this.mapZ = g.state.pos.z;
    return h('div', { class: 'screen dungeon' }, this.viewEl, this.sideBar());
  }

  private sideBar(): HTMLElement {
    const g = this.game!;
    const cmd = (c: Command, label: string, title: string) => h('button', { class: 'quiet', title, onclick: () => this.controller?.command(c) }, label);
    const map = h('canvas', { class: 'map', width: 320, height: 320 }) as HTMLCanvasElement;
    this.mapView = new AutomapView(map);
    this.sideEl = h('aside', null,
      h('div', { class: 'panel' }, h('h3', { id: 'leveltitle' }, g.level().name), map,
        h('div', { class: 'row', style: 'margin-top:.4rem' },
          h('button', { class: 'quiet', onclick: () => this.setMapZ(this.mapZ + 1) }, 'Storey ▲'),
          h('button', { class: 'quiet', onclick: () => this.setMapZ(this.mapZ - 1) }, 'Storey ▼'))),
      h('div', { class: 'panel' }, h('div', { class: 'row', style: 'flex-wrap:wrap' },
        cmd('turnLeft', '⟲', 'Turn left'), cmd('fwd', '▲', 'Forward'), cmd('turnRight', '⟳', 'Turn right'),
        cmd('left', '◄', 'Sidestep left'), cmd('back', '▼', 'Back'), cmd('right', '►', 'Sidestep right'),
        cmd('up', 'Up', 'Climb stairs'), cmd('down', 'Down', 'Descend stairs'))),
      h('div', { id: 'partybox' }),
      h('div', { class: 'panel' }, h('h3', null, 'Chronicle'), h('div', { class: 'chron', id: 'chronbox' })),
      h('div', { class: 'row' },
        h('button', { class: 'quiet', onclick: () => this.saveToFile() }, 'Save to file'),
        h('button', { class: 'quiet', onclick: () => this.dispatch({ type: 'openSettings' }) }, 'Settings')));
    return this.sideEl;
  }

  private setMapZ(z: number): void {
    const lv = this.game!.level();
    this.mapZ = Math.max(0, Math.min(lv.layers - 1, z));
    this.drawMap();
  }

  private drawMap(): void {
    const g = this.game;
    if (!g || !this.mapView || this.flow.screen === 'town') return;
    this.mapView.draw(g.automap(), g.level(), g.state.pos, g.state.facing, this.mapZ, this.settings().automap);
  }

  private updateSide(): void {
    const g = this.game!;
    const party = this.sideEl?.querySelector('#partybox');
    if (party) party.replaceChildren(partyPanel(g.state.party));
    const chron = this.sideEl?.querySelector('#chronbox');
    if (chron) chron.replaceChildren(...renderChronicle(g.state.chronicle, 6).map((l) => h('div', null, l)));
    const title = this.sideEl?.querySelector('#leveltitle');
    if (title) title.textContent = g.level().name;
    const here = g.level().areaOf(g.state.pos);
    if (this.hudEl) {
      this.hudEl.replaceChildren(h('b', null, g.level().name.toUpperCase()),
        h('div', { class: 'dim' }, `${here} · storey ${g.state.pos.z + 1} of ${g.level().layers} · facing ${'NESW'[g.state.facing]}`));
    }
    document.documentElement.style.setProperty('--accent', paletteFor(here).edge);
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
      view.append(h('div', { class: 'toast', style: 'position:absolute;top:40%;left:50%;pointer-events:auto' },
        e instanceof NoWebGLError ? e.message : 'The dungeon view could not start.'));
    }
  }

  private startView(): void {
    const g = this.game;
    if (!g || this.flow.screen !== 'dungeon' || !this.viewEl) return;
    this.mountHall();
    this.controller = new Controller(g.level(), g.state.pos, g.state.facing);
    this.controller.onArrive = (pos, fell) => this.arrived(pos, fell);
    this.updateSide();
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
    this.updateSide();
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
        this.updateSide();
        return false;
      }
      case 'event':
        this.toast(r.text, 8000);
        this.audio.play('door');
        if (r.closed > 0) { this.mountHall(); }
        this.updateSide();
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
    const s = this.flow.screen;
    if (s === 'combat') { this.combat?.key(e); return; }
    if (s === 'settings' && e.key === 'Escape') { this.root.querySelector('.overlay')?.remove(); this.dispatch({ type: 'closeSettings' }); return; }
    if (s !== 'dungeon' || !this.controller) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
    const map: Record<string, Command> = {
      ArrowUp: 'fwd', w: 'fwd', W: 'fwd', ArrowDown: 'back', s: 'back', S: 'back', ArrowLeft: 'turnLeft', a: 'turnLeft', A: 'turnLeft',
      ArrowRight: 'turnRight', d: 'turnRight', D: 'turnRight', q: 'left', Q: 'left', e: 'right', E: 'right', r: 'up', R: 'up', f: 'down', F: 'down',
    };
    if (map[e.key]) { e.preventDefault(); this.controller.command(map[e.key]); return; }
    if (e.key === 'z' || e.key === 'Z') this.controller.look(0.15);
    else if (e.key === 'x' || e.key === 'X') this.controller.look(-0.15);
    else if (e.key === '[') this.setMapZ(this.mapZ - 1);
    else if (e.key === ']') this.setMapZ(this.mapZ + 1);
    else if (e.key === 'Escape') this.dispatch({ type: 'openSettings' });
  }
}
