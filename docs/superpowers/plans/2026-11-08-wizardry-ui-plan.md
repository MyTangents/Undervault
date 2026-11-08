# Wizardry-style keyboard UI and town portraits: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every non-dungeon screen is keyboard-driven with printed `X)word` commands and framed dialogues, and the town has code-drawn faces for the people the player meets.

**Architecture:** One pure key router owns the keyboard; each screen and dialogue pushes a layer whose command table is also what the command bar prints. Screens are rebuilt from small DOM builders (frames, command bar, message window, roster strip) and a list/confirm/name dialogue set. Portraits reuse the monster shading pipeline (lifted into a shared, size-parametrised class) with a new face painter.

**Tech Stack:** TypeScript, Vite, Vitest (jsdom for UI, `@napi-rs/canvas` for pixels), existing `src/core` rules untouched.

**Spec:** `docs/superpowers/specs/2026-11-08-wizardry-ui-design.md`. Existing code to read first: `src/render/ui/{app,town,combat,party,flow,dom,styles}.ts`, `src/render/monster/{picture,painters}.ts`, `tests/{app,picture}.test.ts`.

## Global Constraints

- Work on branch `wizardry-ui` cut from `main`. Do not push, deploy or touch the GitHub remote until the owner says so (Task 13 asks).
- `npm test` stays green after every task; `npx tsc --noEmit` stays clean. Baseline: 29 files, 243 tests.
- `src/core` changes only for party order (Task 0: `party.ts` and `Game.finishEncounter`). Save format stays v1. A character's face derives from its id; nothing new is saved. UI-only preferences (screen glow) live in `localStorage` key `undervault.glow`, never in saves.
- No party faces on the dungeon screen or in the combat roster (owner). Faces appear only in town, the creator, the recruit list and the character sheet.
- Every command shown on a screen is bound, from the same table; no two commands on one screen share a letter (case-insensitive).
- Names are original. Nothing copied from Wizardry; `tests/names.test.ts` keeps passing.
- System monospace font stack only; no downloaded fonts or images. Mouse and touch still work (every command and list row is clickable; the dungeon's on-screen movement pad stays).
- Monster pictures stay pixel-identical (golden test, Task 4).

## Review Focus

1. A name typed in the creator that contains command letters ("Pell", "Ned"): the letters are text, never commands (Tasks 2 and 9).
2. Held keys and browser shortcuts (Ctrl+R, F5, Alt+Left): repeats are ignored and modified keys are never consumed (Task 1).
3. A list with nothing in it (no fallen at the temple, empty pack, nothing to identify, nobody waiting at the tavern) never traps the player: they get a line in the message window instead (Tasks 2, 9).
4. A combat round where nobody can act (all asleep or paralysed) or members are dead or ash: no prompt for them, and the round still resolves (Task 10).
5. A loaded save whose character ids lack the numeric suffix, or whose names the recipes do not know: stable face, no crash (Tasks 5, 6).

---

### Task 0: Party order rules (core)

**Files:**
- Modify: `src/core/party.ts`, `src/core/game.ts` (`finishEncounter`)
- Test: `tests/party.test.ts`, `tests/game.test.ts` (extend; read both first)

**Interfaces:**
- Produces in `party.ts`:
  - `moveMember(p: Party, id: string, toIndex: number): Party` (moves one member to `toIndex`, clamped to `0..members.length-1`, others keep their order, rows renormalised so slots 1 to 3 are front; unknown id throws `no such member <id>`)
  - `sinkTheDead(p: Party): Party` (stable partition: members who are neither dead nor ash first, then the dead and ash, each group keeping its relative order; rows renormalised; returns an equal party when nobody is dead)
- `Game.finishEncounter` sets `s.party = sinkTheDead(r.party)` before applying rewards. `commitRound` is unchanged (ranks never change mid-fight).

- [ ] **Step 1:** Add tests:
  - `moveMember moves a member down and up, clamps the index, keeps the others in order, and renormalises rows` (move slot 1 to slot 4: rows of all six are front, front, front, back, back, back by new position)
  - `moveMember can move a dead member and throws on an unknown id`
  - `sinkTheDead puts dead and ash below the living, keeping order within each group, and renormalises rows`
  - `sinkTheDead with nobody dead changes nothing` and `with everybody dead keeps the order`
  - in `game.test.ts`: `after a won fight a front-rank member who died is last, and the next member has moved up into the front rank`; `the same after a fled fight and a wiped one`; `commitRound mid-fight leaves the order alone`
- [ ] **Step 2:** Run `npx vitest run tests/party.test.ts tests/game.test.ts`. Expected: new tests FAIL.
- [ ] **Step 3:** Implement both functions in `party.ts` (reuse `normalise`) and the one-line hook in `finishEncounter`.
- [ ] **Step 4:** Run the two files then `npm test`. Expected: pass (the sim, playthrough and combat tests still pass; if a balance table test pins an order, update it and ledger the ruling).
- [ ] **Step 5:** `git switch -c wizardry-ui` (if not already on it) and `git add -A && git commit -m "party: move members, and the dead sink to the bottom after a fight"`

### Task 1: Key router

**Files:**
- Create: `src/render/ui/keys.ts`
- Test: `tests/keys.test.ts`

**Interfaces:**
- Produces:
  - `interface KeyCommand { key: string; label: string; enabled?: boolean; run: () => void }` (`key` is one lowercase letter, digit, or a name such as `Escape`, `Enter`, `ArrowUp`)
  - `interface KeyLayer { name: string; commands(): KeyCommand[]; onKey?(key: string): boolean; modal?: boolean; typing?: boolean }`
  - `interface KeyMods { repeat?: boolean; ctrl?: boolean; alt?: boolean; meta?: boolean }`
  - `class KeyRouter { locked: boolean; onSkip?: () => void; push(l: KeyLayer): void; pop(name?: string): void; top(): KeyLayer | undefined; clear(): void; handle(key: string, mods?: KeyMods): boolean }`
  - `labelOf(c: KeyCommand): string`, `duplicateKeys(cmds: KeyCommand[]): string[]`

- [ ] **Step 1:** Write `tests/keys.test.ts` with these tests (each builds a router and layers with spy `run` functions):
  - `a letter runs the matching enabled command, in either case`
  - `a disabled command is consumed and does nothing`
  - `the top layer wins, a modal layer hides the ones below, popping restores them`
  - `while typing, letters reach onKey and never run commands, but Escape and Enter still do`
  - `repeat events are ignored` (`handle('f', { repeat: true })` returns false, nothing runs)
  - `ctrl, alt and meta combinations are never consumed` (`handle('r', { ctrl: true })` false)
  - `while locked only Enter and Space act, by calling onSkip`
  - `labelOf` gives `F)ight` for key `f` label `Fight`, `The P)arty` for key `p` label `The party`, and `X) Walk` when the key letter is not in the label
  - `duplicateKeys finds a repeated letter ignoring case` (`['f','F']` yields `['f']`)
- [ ] **Step 2:** Run `npx vitest run tests/keys.test.ts`. Expected: FAIL, cannot find `../src/render/ui/keys`.
- [ ] **Step 3:** Implement `keys.ts` as specified. `handle` lowercases single-character keys; checks modifiers and repeat first; handles `locked`; then walks layers from the top, stopping after the first modal layer; a layer's `onKey` runs first, then its command table (skipped when `typing` unless the key is `Escape` or `Enter`, which go to `onKey` only).
- [ ] **Step 4:** Run the test file. Expected: all pass.
- [ ] **Step 5:** `git add src/render/ui/keys.ts tests/keys.test.ts && git commit -m "ui: key router with layered command tables"`

### Task 2: Dialogues (list, confirm, name entry)

**Files:**
- Create: `src/render/ui/dialog.ts`
- Test: `tests/dialog.test.ts` (jsdom)

**Interfaces:**
- Consumes: `KeyRouter`, `KeyLayer` (Task 1); `h` from `dom.ts`.
- Produces:
  - `interface UiHost { router: KeyRouter; layer: HTMLElement }` (`layer` is the element dialogues mount into)
  - `interface ListRow { label: string; detail?: string; disabled?: boolean }`
  - `interface ListState { rows: ListRow[]; index: number }`
  - `type ListOutcome = { kind: 'moved' } | { kind: 'confirm'; index: number } | { kind: 'cancel' } | { kind: 'ignored' }`
  - `rowKey(i: number): string` (`'1'`..`'9'` then `'a'`..)
  - `listKey(s: ListState, key: string, pageSize?: number): { state: ListState; outcome: ListOutcome }` (pure)
  - `interface ListSpec { title: string; rows: ListRow[]; accent?: string; start?: number; onMove?: (i: number) => void }`
  - `openList(host: UiHost, spec: ListSpec): Promise<number | null>`, `confirmBox(host: UiHost, text: string, accent?: string): Promise<boolean>`, `promptName(host: UiHost, title: string, accent?: string): Promise<string | null>`

- [ ] **Step 1:** Write `tests/dialog.test.ts`:
  - `rowKey maps 0..8 to 1..9 and 9 onward to letters`
  - `listKey: Down and Up wrap, Enter confirms the highlighted row, a row key confirms that row, Escape cancels, PageDown moves by the page size`
  - `listKey ignores Enter and row keys on a disabled row`
  - `openList resolves the chosen index through the router, null on Escape, and calls onMove on each move`
  - `openList with no rows resolves null at once and pushes no layer` (router `top()` unchanged)
  - `confirmBox: y is true; n, Escape and Enter are false`
  - `promptName: letters including y, n, p and r are text; Backspace deletes; Enter accepts the trimmed name; Enter on an empty name does nothing; Escape gives null; length is capped at 24`
  - `a dialogue is modal: keys never reach the layer under it, and it is removed from the DOM and router when closed`
- [ ] **Step 2:** Run `npx vitest run tests/dialog.test.ts`. Expected: FAIL (module missing).
- [ ] **Step 3:** Implement `dialog.ts`. Rows render as `1) label   detail` with a `>` marker on the highlighted row and class `off` on disabled rows; clicking a row confirms it. The dialogue layer is `modal`; `promptName` uses a layer with `typing: true` whose `onKey` consumes printable characters.
- [ ] **Step 4:** Run the test file. Expected: pass.
- [ ] **Step 5:** `git add src/render/ui/dialog.ts tests/dialog.test.ts && git commit -m "ui: list, confirm and name dialogues"`

### Task 3: Frames, command bar, message window, roster strip, glow

**Files:**
- Create: `src/render/ui/frame.ts`
- Modify: `src/render/ui/styles.ts` (replace the parchment CSS with the framed, near-black look; keep class names the dungeon still uses until Task 11)
- Test: `tests/frame.test.ts` (jsdom)

**Interfaces:**
- Consumes: `KeyCommand`, `labelOf` (Task 1); `Party`, `Character`; `className`, `raceName` from `party.ts`.
- Produces:
  - `PLACE_ACCENT: Record<string, string>` for `tavern smith temple inn informant tales party dungeon title`; `accentFor(id: string): string` (falls back to the `title` colour)
  - `frame(title: string, accent: string, ...kids: (Node | string | null)[]): HTMLElement`
  - `commandBar(cmds: KeyCommand[]): HTMLElement` (printed with `labelOf`, disabled ones get class `off`, clicking runs the command)
  - `messageWindow(max?: number): { el: HTMLElement; say(line: string): void; clear(): void }`
  - `rosterStrip(p: Party, opts: { selectedId?: string; onPick?: (m: Character) => void; thumb?: (m: Character) => HTMLElement | null }): HTMLElement`
  - `type Glow = 'off' | 'low' | 'normal'`; `getGlow(): Glow` (default `'low'`, tolerant of blocked storage); `setGlow(g: Glow): void` (sets `document.documentElement.dataset.glow` and stores it)

- [ ] **Step 1:** Write `tests/frame.test.ts`:
  - `commandBar prints F)ight style labels, dims disabled commands, and clicking runs the command`
  - `messageWindow keeps only the last max lines and marks the newest`
  - `rosterStrip shows one row per member with name, class, hit points and status, calls thumb when given, and contains no canvas when it is not` (a dead member's row has class `dead`)
  - `rosterStrip numbers the slots and marks slots 1 to 3 front and 4 to 6 back`
  - `accentFor returns a distinct colour for each of the six places and a fallback for an unknown id`
  - `getGlow defaults to low, setGlow persists it and sets the data attribute, and a throwing localStorage does not break either`
- [ ] **Step 2:** Run `npx vitest run tests/frame.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement `frame.ts` and the new CSS. Frames: double border, corner ornaments by pseudo-elements, title in the top border, accent from a `--accent` custom property set per frame, a faint flicker animation on borders gated by `[data-glow]` (off: none; low: subtle; normal: stronger). Palette: near-black background, warm light text, restrained glow. Keep `@media (max-width: 900px)` stacking.
- [ ] **Step 4:** Run `npx vitest run tests/frame.test.ts` then `npm test`. Expected: pass; the 29 existing files still pass (old screens still render with the new CSS; fix any selector the old screens need).
- [ ] **Step 5:** `git add -A && git commit -m "ui: frames, command bar, message window, roster strip, glow setting"`

### Task 4: Lift the monster shading pipeline

**Files:**
- Modify: `src/render/monster/picture.ts`
- Create: `tests/monsterGolden.test.ts`, `tests/golden/monsters.json`

**Interfaces:**
- Produces: exported `class ShadedPicture<S extends PictureState = PictureState> implements MonsterPicture` with `constructor(painter: Painter<S>, width = PICTURE_W, height = PICTURE_H)`; `Painter<S extends PictureState = PictureState>` generic; noise tables cached per size; geometry derived from size so 192x240 is unchanged (ground at `h - 8`, horizontal centre `w / 2`, vignette centre `h * 13 / 24`, floor fade from `h * 0.8125` over `h * 0.1875`). `PICTURE_W`, `PICTURE_H`, `getPicture` unchanged.

- [ ] **Step 1:** Write `tests/monsterGolden.test.ts`: for every painter in `PAINTERS` (and the placeholder) draw at `t = 1.3` with two states (`{hit:0,lunge:0,damage:0,dying:0}` and `{hit:.5,lunge:.5,damage:.6,dying:.3}`) onto a Node canvas and compare each frame's SHA-1 of the RGBA bytes to `tests/golden/monsters.json`. When `UPDATE_GOLDEN=1` it writes the file instead of comparing.
- [ ] **Step 2:** With the current, unmodified code run `UPDATE_GOLDEN=1 npx vitest run tests/monsterGolden.test.ts`, then run it again without the variable. Expected: pass (golden captured from today's output). Commit `tests/golden/monsters.json` and the test: `git commit -m "test: golden checksums for monster pictures"`.
- [ ] **Step 3:** Refactor `picture.ts` as specified: export the class, parametrise width and height, replace the hard-coded 96/232/130/195/45 with the derived values, key the noise caches by size.
- [ ] **Step 4:** Run `npx vitest run tests/monsterGolden.test.ts tests/picture.test.ts tests/imagepicture.test.ts`. Expected: pass unchanged (checksums identical).
- [ ] **Step 5:** `git add -A && git commit -m "monster: share the shading pipeline, sized per picture"`

### Task 5: Portrait core (adventurer faces)

**Files:**
- Create: `src/render/portrait/spec.ts`, `src/render/portrait/faces.ts`, `src/render/portrait/index.ts`
- Test: `tests/portrait.test.ts`

**Interfaces:**
- Consumes: `ShadedPicture`, `Painter`, `PictureState`, `setCanvasFactory` (Task 4); `Alignment`, `Character`.
- Produces:
  - `PORTRAIT_W = 128`, `PORTRAIT_H = 160`
  - `type PersonId = string` (filled in Task 6) and `type PortraitSpec = { kind: 'person'; id: PersonId } | { kind: 'adventurer'; raceId: string; classId: string; alignment: Alignment; face: number }`
  - `type PortraitState = PictureState & { dead: boolean; speaking: boolean }`
  - `faceNumber(id: string): number` (the trailing integer of the id, 0 if none)
  - `portraitForCharacter(c: Pick<Character, 'id' | 'name' | 'raceId' | 'classId' | 'alignment'>): PortraitSpec` (adventurer only in this task)
  - `getPortrait(spec: PortraitSpec): { width: number; height: number; draw(ctx: CanvasRenderingContext2D, t: number, s: PortraitState): void }` (cached per spec)

- [ ] **Step 1:** Write `tests/portrait.test.ts` (use `@napi-rs/canvas` through `setCanvasFactory`, as `tests/picture.test.ts` does):
  - `faceNumber reads the trailing integer: gudrun-1234 is 1234, weird is 0, a-12-9999 is 9999, an empty id is 0`
  - `every race, class and alignment draws a face that is not blank` (at least 12 distinct colours), for face 1234
  - `the same spec, time and state draw identical pixels`
  - `different races differ, different classes differ, and at least 30 of 40 face numbers give distinct pictures`
  - `the picture breathes: t=0 and t=1 differ`
  - `dead differs from alive, dying 0.5 differs from alive, damage 0.8 differs from 0`
  - `ids with no numeric suffix still draw` (Review Focus 5)
- [ ] **Step 2:** Run `npx vitest run tests/portrait.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement. `faces.ts` exports the adventurer `Painter<PortraitState>`: a head-and-shoulders grayscale relief; race sets head width, jaw, ear and one marked trait for each of human, barrowfolk, lanternkin, thornborn, cinderkin (original looks); class sets gear (blade: coif or helm, spellwright: hood and circlet, votary: cowl and symbol, cutpurse: cap and scarf, oathblade: crested helm, shade: veil); alignment shifts brow and mouth; `face` seeds a small PRNG choosing nose, eye spacing, hair, scars, age lines. Idle breathing, blink (as `open(t)` in `painters.ts`), slow head tilt. `damage` pales and cracks, `dying` uses the pipeline's cinder dissolve, `dead` greys the ramp and closes the eyes. Use a warm ramp per race. `getPortrait` wraps the painter in `ShadedPicture` at 128x160.
- [ ] **Step 4:** Run the test file. Expected: pass.
- [ ] **Step 5:** `git add -A && git commit -m "portrait: adventurer faces on the shared shading pipeline"`

### Task 6: Named people

**Files:**
- Create: `src/render/portrait/people.ts`
- Modify: `src/render/portrait/spec.ts`, `src/render/portrait/faces.ts`, `src/render/portrait/index.ts`
- Test: `tests/people.test.ts`

**Interfaces:**
- Consumes: Task 5 types; `TALES` from `src/core/data`; `recruits`, `PLACES` from `src/core/town`; `emptyParty`.
- Produces:
  - `PersonId` becomes the union of: `dennis hobb ottoline wenna maud tamsin moss merrow pim joss gudrun perrin thessaly kesk jossm hedda aldous wick`
  - `personByName(name: string): PersonId | null` (Dennis Brannoch and "Brannoch the Bold" are `dennis`; "Joss the Sweeper" is `joss`; "Joss Marrow" is `jossm`; also resolves every tale speaker string and every recruit name)
  - `KEEPER_OF: Record<'tavern' | 'smith' | 'temple' | 'inn' | 'informant' | 'tales', PersonId>` (dennis, hobb, ottoline, wenna, maud, tamsin)
  - `speakerPortrait(speaker: string): PortraitSpec | null`
  - `portraitForCharacter` now returns a person spec when the character's name matches a recipe (the recipe wins over race and class)

- [ ] **Step 1:** Write `tests/people.test.ts`:
  - `all 18 people draw, are not blank, and their pictures are pairwise different`
  - `personByName covers the owner's cases` (assert the four mappings above and that unknown names give null)
  - `every speaker in TALES resolves to a person`
  - `every name recruits() can produce resolves` (union over seeds 1 to 60 with `emptyParty()`)
  - `KEEPER_OF has an entry for each place id in PLACES`
  - `a character named Hedda Vole gets the hedda recipe whatever its race; a created character named Pell gets an adventurer face; two different Joss people get different faces`
  - `a name no recipe knows still gets a stable adventurer face` (Review Focus 5)
- [ ] **Step 2:** Run `npx vitest run tests/people.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement the recipe table in `people.ts`: each recipe sets head shape, brow, eyes, nose, mouth, hair or hood, beard, scars, collar and one signature prop (Hobb: forge glow and apron strap; Maud: scale pan and coin; Tamsin: a lamp held up; Ottoline: ash-smudged cowl; Dennis: weathered grin and bar towel; Moss: cap and ledger; Wenna: candle; others as fits their tale), with its own ramp and light colour. The painter reads the recipe when the spec is a person.
- [ ] **Step 4:** Run `npx vitest run tests/people.test.ts tests/portrait.test.ts tests/names.test.ts`. Expected: pass.
- [ ] **Step 5:** `git add -A && git commit -m "portrait: the people of Crowhithe"`

### Task 7: Portrait life and thumbnails

**Files:**
- Modify: `src/render/portrait/faces.ts`, `src/render/portrait/index.ts`
- Create: `src/render/ui/portraitView.ts`
- Test: extend `tests/portrait.test.ts`; `tests/portraitView.test.ts` (jsdom)

**Interfaces:**
- Produces:
  - `portraitThumb(spec: PortraitSpec, s: PortraitState): HTMLCanvasElement` (32x40, cached by spec plus the three state flags that matter: dead, damage rounded to 0.25, dying rounded)
  - `class PortraitView { readonly el: HTMLCanvasElement; setSpec(spec: PortraitSpec): void; setSpeaking(on: boolean): void; setState(patch: Partial<PortraitState>): void; start(): void; stop(): void }`; `el.dataset.portrait` is the person id, or `adv` for an adventurer, and updates with `setSpec`

- [ ] **Step 1:** Add tests: `speaking differs from silent at the same time, and two speaking frames 0.15s apart differ`; `portraitThumb is 32x40, returns the same canvas for the same input, and a dead thumb differs from a living one`; and in `tests/portraitView.test.ts`: `PortraitView sets data-portrait, switches it on setSpec, and stop() cancels its animation frame` (spy on `cancelAnimationFrame`).
- [ ] **Step 2:** Run `npx vitest run tests/portrait.test.ts tests/portraitView.test.ts`. Expected: new tests FAIL.
- [ ] **Step 3:** Implement the mouth animation (open and close driven by `t`), the thumbnail downsample with cache, and `PortraitView` with a `requestAnimationFrame` loop that draws at the display size.
- [ ] **Step 4:** Run the same command. Expected: pass.
- [ ] **Step 5:** `git add -A && git commit -m "portrait: speaking, thumbnails, live view"`

### Task 8: App key routing, title, system dialogue, settings

**Files:**
- Modify: `src/render/ui/app.ts`, `src/render/ui/flow.ts` (no new states needed unless the system dialogue wants one)
- Create: `src/render/ui/system.ts`
- Test: `tests/app.test.ts` (update and extend; read the existing file first)

**Interfaces:**
- Consumes: Tasks 1 to 3.
- Produces on `App`: `router: KeyRouter`; `host: UiHost`; `say(line: string): void` (writes to the current screen's message window if any); `currentCommands(): KeyCommand[]` (the top screen layer's table, for tests); `openSystem(): Promise<void>` (the Esc dialogue: S)ave to file, L)oad from file, O)ptions, Q)uit to title) and `openOptions(): Promise<void>` in `system.ts`
- The window `keydown` handler calls `router.handle(e.key, { repeat: e.repeat, ctrl: e.ctrlKey, alt: e.altKey, meta: e.metaKey })` and calls `preventDefault` only if consumed. The first key press still unlocks audio and dismisses the content notice.

- [ ] **Step 1:** Update `tests/app.test.ts` and add tests:
  - `the title prints N)ew game, C)ontinue, L)oad from file, S)ettings, each bound, with no duplicate letter`
  - `C)ontinue is dimmed and inert without a save`
  - `pressing n starts a new game in the town`
  - `the first key press dismisses the content notice and a Ctrl+R is not consumed`
  - `Options: Down selects a setting, Right adjusts a slider and the value is stored, Escape closes`
  - `Screen glow cycles off, low, normal and sets the data attribute`
- [ ] **Step 2:** Run `npx vitest run tests/app.test.ts`. Expected: new tests FAIL.
- [ ] **Step 3:** Implement: create the router and host in the `App` constructor; build the title screen from a command table (`n c l s`); the options dialogue is a list of settings (Bloom, Torch flicker, Fog, Lantern, Quality, Automap, Screen glow) where Left and Right adjust and Enter flips choices; remove the old `settingsScreen` and its `Esc` handling; remove the global `onKey` code for dungeon movement later (Task 11), keeping it working for now by letting the router fall through to a dungeon layer pushed in Task 11 (until then keep the existing dungeon key handling reachable when the router did not consume the key).
- [ ] **Step 4:** Run `npx vitest run tests/app.test.ts` then `npm test`. Expected: pass.
- [ ] **Step 5:** `git add -A && git commit -m "ui: keyboard routing, title and options through the router"`

### Task 9: The town

Split into three commits; each ends with the town working end to end.

**Files:**
- Modify: `src/render/ui/town.ts` (shell), `src/render/ui/app.ts`
- Create: `src/render/ui/places/{tavern,forge,temple,inn,maud,lamp,party}.ts`, `src/render/ui/creator.ts`
- Test: `tests/townUi.test.ts`, `tests/creator.test.ts` (jsdom)

**Interfaces:**
- Consumes: Tasks 1 to 3, 6, 7; core `buy sell identifyItem equip unequip visibleStock displayName` (`items.ts`), `recruits informant raise rest tale` (`town.ts`), `addToParty setRow createCharacter eligibleClasses rollBonusPool` (`party.ts`).
- Produces:
  - Each place module exports `placeScreen(app: App): { el: HTMLElement; commands: () => KeyCommand[]; dispose?: () => void }`; `town.ts` pushes the town layer. Town commands and keys: `t` Tavern, `f` Forge, `h` House of Ash, `i` Inn, `m` Maud's, `l` Lamp, `p` Party, `e` Enter the Undervault, `Escape` system dialogue. Place screens have only their own commands plus `l`/`Escape` to leave.
  - `class Creator` in `creator.ts`: stages `'name' | 'race' | 'alignment' | 'alloc' | 'class' | 'confirm'`; `stage`, `spec` (name, raceId, alignment, classId?), `alloc: Stats`, `pool: number`, `seed: number`; `next(): void`, `back(): void`, `adjust(attr: Attr, delta: 1 | -1): boolean`, `reroll(seed: number): void` (new pool, allocation zeroed, name, race and alignment kept), `eligible(): string[]`, `build(): Character`; `creatorFace(seed: number): number`

**9a. Shell, Maud, Lamp, Inn, House of Ash**

- [ ] **Step 1:** Write `tests/townUi.test.ts`:
  - `the town prints one command per place plus P)arty and E)nter, all bound, no duplicate letter`
  - `each place shows its keeper's portrait` (`canvas.dataset.portrait` is `dennis hobb ottoline wenna maud tamsin` for `t f h i m l`) `and the place's printed commands equal its bound keys`
  - `L)eave and Escape return to the town menu`
  - `Maud: a prints the information lines into the message window`
  - `Lamp: h prints a tale with its speaker and switches the portrait to the speaker; after all 12 tales it says so`
  - `Inn: r opens the room list with prices; choosing the proper room heals, charges the gold and says so; rooms the party cannot afford are inert`
  - `House of Ash with nobody fallen opens no dialogue and says Sister Ottoline's line (Review Focus 3); with a fallen member r lists them with costs; an ash rite asks y/n first; n spends nothing`
  - `the roster strip in town shows a face thumbnail per member`
- [ ] **Step 2:** Run `npx vitest run tests/townUi.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement the town shell (frame per place with accent, `PortraitView` in the scene frame, message window, command bar, roster strip with `portraitThumb`) and the five places, porting the rule calls from the old `town.ts` unchanged (same messages). Dispose views when leaving.
- [ ] **Step 4:** Run `npx vitest run tests/townUi.test.ts`. Expected: pass.
- [ ] **Step 5:** `git add -A && git commit -m "town: shell, Maud, Lamp, Inn and House of Ash by keyboard"`

**9b. Tavern and character creator**

- [ ] **Step 1:** Write `tests/creator.test.ts` and extend `tests/townUi.test.ts`:
  - `Creator walks name, race, alignment, alloc, class, confirm; back() steps one stage; back to race resets the allocation`
  - `adjust respects the pool, never goes below zero allocation, and never lifts a stat above 18`
  - `reroll gives a new pool, zeroes the allocation and keeps name, race and alignment`
  - `eligible() matches eligibleClasses; with none, next() from alloc refuses`
  - `creatorFace(seed) equals faceNumber(build().id) for every class` (this pins the preview to the final face)
  - `build() creates a character whose portraitForCharacter is stable for the same seed`
  - In the town UI: `typing a name with command letters in the creator types them and runs nothing` (Review Focus 1); `R)ecruit lists who is waiting and previewing a highlighted recruit switches the portrait; choosing hires them and they keep their recipe face`; `with nobody waiting r says so in the message window` (Review Focus 3); `O)rder: choose a member, Down twice moves them two slots with the rank markers updating, Enter keeps it and the party order and rows change; Escape restores the original order; a dead member can be moved too` (owner's request); `D)ismiss asks y/n and n keeps them`; `a full party disables recruiting and creating`
- [ ] **Step 2:** Run both files. Expected: FAIL.
- [ ] **Step 3:** Implement `reorderParty(app: App): Promise<void>` in `src/render/ui/reorder.ts` (a list to pick the member, then a moving mode where Up and Down call `moveMember` on a working copy, Enter commits it to `game.state.party`, Escape discards; shared with camp in Task 11), then `Creator` and `tavern.ts`; the creator dialogue sequence uses `promptName`, `openList` for race, alignment and class, and a small allocation layer (Up/Down attribute, Left/Right or `-`/`+` change, `r` re-roll, Enter continues, Escape back) with the live portrait. Sign-on calls `createCharacter(spec, alloc, createRng(seed))` with the creator's fixed `seed` so the final face equals the previewed one.
- [ ] **Step 4:** Run both files. Expected: pass.
- [ ] **Step 5:** `git add -A && git commit -m "town: tavern and keyboard character creator"`

**9c. Forge and Party and packs**

- [ ] **Step 1:** Extend `tests/townUi.test.ts`:
  - `Forge: keys 1 to 6 and Left/Right choose who; b opens the stock with prices, unaffordable rows inert; buying adds the item and takes the gold`
  - `Forge: s lists the chosen member's items with sale prices and selling pays half; with an empty pack it says so`
  - `Forge: i lists unidentified items and uses the existing Study rule; nothing to identify says so`
  - `Party: choose a member, e equips from a list, u removes from the worn slots, s studies an item; the sheet shows the face, attributes, hit points, spells, techniques and slots`
- [ ] **Step 2:** Run `npx vitest run tests/townUi.test.ts`. Expected: new tests FAIL.
- [ ] **Step 3:** Implement `forge.ts` and `party.ts` (places) using the same core calls and messages as the old screens; Sell lives at the forge only; `i` and `s` Study are the same rule.
- [ ] **Step 4:** Run `npx vitest run tests/townUi.test.ts` then `npm test`. Expected: pass; delete the old town markup from `town.ts` and any now-unused code in `party.ts` (keep `className` and `raceName`).
- [ ] **Step 5:** `git add -A && git commit -m "town: forge and party sheets by keyboard"`

### Task 10: Combat orders and screen

**Files:**
- Create: `src/render/ui/combatOrders.ts`
- Modify: `src/render/ui/combat.ts`
- Test: `tests/combatOrders.test.ts`, `tests/combatUi.test.ts` (jsdom)

**Interfaces:**
- Consumes: `legalOrders`, `OrderKind` (`flow.ts`); `CombatState`, `Order` (`core/combat/types`); `canAct`, `groupLiving` (`core/combat/util`); `autoOrders` (`core/sim`); router, dialogues, frames.
- Produces: `class CombatOrders { constructor(state: CombatState, previous?: Record<string, Order>); current(): Character | null; choices(): { kind: OrderKind; key: string; label: string; enabled: boolean }[]; answer(order: Order): void; takeBack(): void; repeat(): boolean; autoFill(auto: Record<string, Order>): void; done(): boolean; orders(): Record<string, Order> }`. Keys: `f` Fight, `s` Spell, `p` Parry, `u` Use, `r` Run, `t` Take back. Members who cannot act are skipped.

- [ ] **Step 1:** Write `tests/combatOrders.test.ts`:
  - `members are asked in roster order and dead, ash and unable members are skipped`
  - `choices mark only legalOrders as enabled` (a back-row member cannot fight)
  - `answer advances, takeBack restores the previous member's slot, done() is true after the last`
  - `repeat reuses last round's order only when still legal, otherwise returns false`
  - `autoFill answers every remaining member with the supplied orders`
  - `when nobody can act done() is true at once and orders() is empty` (Review Focus 4)
  and `tests/combatUi.test.ts` (build a `CombatScreen` over a small fight with fake timers):
  - `with one living group, f fights without a group prompt; with two groups it opens a numbered list`
  - `s opens the spell list then the target list and produces the same Order the old panel did`
  - `after the last member the round resolves into the message window; Space skips the waits; keys are ignored while it plays except Enter and Space`
  - `the commands printed in the bar equal the bound keys for the current member`
  - `the combat roster has no canvas` (no faces)
- [ ] **Step 2:** Run both files. Expected: FAIL.
- [ ] **Step 3:** Implement `CombatOrders` as a pure class and rebuild `CombatScreen` around it: monster picture in a frame, group switcher on Left and Right, message window for the log and warning chips as lines, text roster strip, per-member prompt `Name's options:` plus the printed commands, `Enter` repeats, `a` auto, round resolution with `router.locked` and `onSkip` making the waits zero.
- [ ] **Step 4:** Run both files and `npm test`. Expected: pass (including the playthrough bot test, which does not touch the UI).
- [ ] **Step 5:** `git add -A && git commit -m "combat: member-by-member orders by keyboard"`

### Task 11: Dungeon layout, messages and camp

**Files:**
- Modify: `src/render/ui/app.ts` (dungeon shell, `handle`, key handling), `src/render/ui/styles.ts`
- Test: extend `tests/app.test.ts`

**Interfaces:**
- Consumes: Tasks 1 to 3, 8.
- Produces: the dungeon pushes a layer with movement commands (`w s a d q e r f z x`, arrows, `[` `]`, `c` Camp, `Escape` system dialogue) calling the existing `Controller`; `openCamp(): Promise<void>` (list: I)nspect a member read-only, R)eorder the party via `reorderParty`, S)ave to file, O)ptions, L)eave camp).

- [ ] **Step 1:** Add tests:
  - `in the dungeon c opens the camp list with five rows (Inspect, Reorder, Save, Options, Leave) and Escape closes it, even when the 3D view could not start`
  - `camp Reorder moves a member with Up and Down, Enter commits it and Escape restores the order`
  - `app.say writes into the dungeon message window and the old toast element is no longer created`
  - `the dungeon roster has no canvas` (no faces) `and the on-screen movement pad is still present`
  - `the dungeon frame's accent follows the current area's palette`
  - `Inspect shows a member's sheet and changes nothing in the party`
- [ ] **Step 2:** Run `npx vitest run tests/app.test.ts`. Expected: new tests FAIL.
- [ ] **Step 3:** Implement the framed layout: view frame with area-coloured border, automap frame with storey keys, message window under the view, text roster strip along the bottom, printed command bar. Route toasts (`toast`, discoveries, events, falls, level changes, and the WebGL failure notice) through `say`. Remove the old key `switch`.
- [ ] **Step 4:** Run `npx vitest run tests/app.test.ts` then `npm test`. Expected: pass.
- [ ] **Step 5:** `git add -A && git commit -m "dungeon: framed layout, message window, camp"`

### Task 12: Roll of the Gone, ending, cleanup, docs

**Files:**
- Modify: `src/render/ui/app.ts`, `src/render/ui/styles.ts`, `README.md`, `CLAUDE.md`
- Test: extend `tests/app.test.ts`

- [ ] **Step 1:** Add tests: `the Roll of the Gone shows Corporal Moss (data-portrait is moss) with B)egin again, L)oad from file, T)itle, all bound`; `the ending offers B)ack to Crowhithe, S)ave to file, T)itle and ignores other keys`; `a keyboard-only run: n, t, r, Enter (hire), Escape, then e enters the dungeon` (the dungeon view may report no WebGL in jsdom; assert the screen state is dungeon).
- [ ] **Step 2:** Run `npx vitest run tests/app.test.ts`. Expected: new tests FAIL.
- [ ] **Step 3:** Implement the Roll and ending screens; delete unused CSS, old button builders and dead code; update `README.md` "Playing" to describe the keys, commands and portraits; add to `CLAUDE.md`: "UI: every screen's printed commands come from one `KeyCommand` table; use `KeyRouter` and the dialogues in `src/render/ui`; faces are in `src/render/portrait`; no party faces in the dungeon or combat."
- [ ] **Step 4:** Run `npx tsc --noEmit && npm test && npm run build`. Expected: clean, all tests pass, build succeeds.
- [ ] **Step 5:** `git add -A && git commit -m "ui: Roll and ending by keyboard, cleanup, docs"`

### Task 13: Play it, review, and hand over

- [ ] **Step 1:** `npm run dev`; in the browser pane play title, new game, each town place, a recruit and a created character (check the preview face equals the final face), the forge, the inn, the House of Ash, the dungeon down to a fight, a fight with a spell, the camp, save to file and load, settings, and the Roll of the Gone. Check at 1280x720 and a 375-wide phone viewport that nothing overflows and every command is tappable. Fix anything found with a test first.
- [ ] **Step 2:** Run the whole-branch review (`superpowers:requesting-code-review`, most capable model); fix Critical and Important findings in one pass, each with a failing test first; ledger the rest.
- [ ] **Step 3:** Report to the owner with the rulings and deferred minors, and ask before: merging `wizardry-ui` into `main`, pushing, and running `npm run deploy` (which updates the public site).
