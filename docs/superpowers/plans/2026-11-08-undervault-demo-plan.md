# Sorcery: Realm of the Undervault — Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the playable demo of *Sorcery: Realm of the Undervault*: a menu-driven town plus a few hand-built, tall-cavern levels, with Wizardry-style combat, discovery-based progression, a chronicle of each party's story, and an automap setting, running in a browser from static hosting.

**Architecture:** All game rules live in `src/core` as plain TypeScript with no DOM or Three.js, tested with Vitest and balanced by a headless simulator. `src/render` holds the Three.js vector hall, the automap view, the monster-picture layer, audio and UI screens, all consuming core types. Levels and content are data files validated by tests.

**Tech Stack:** TypeScript, Vite, Vitest, Three.js 0.160.1 (pinned; the spike used it), browser Canvas 2D and Web Audio. Node 24.22 and npm 11 are installed.

**Spec:** `docs/superpowers/specs/2026-11-08-undervault-design.md` (copied into the repo by Task 1). Throwaway visual reference: `docs/dev/spike-hall.html`. Both source files currently sit in the session scratchpad: `C:\Users\wXdSp\AppData\Local\Temp\claude\b716020ad7e55d1e\2517f327-6c5d-4e41-aace-0a3e7ac86d35\scratchpad\design\2026-11-08-undervault-design.md` and `...\scratchpad\undervault-brainstorm\.superpowers\brainstorm\1059-1794115772\content\spike-hall.html`.

## Global Constraints

- Project folder: `D:\Programs\claude\undervault` (new git repo; not inside the Dirk Launcher repo). Branch `main`.
- Title string is one constant: `"Sorcery: Realm of the Undervault"`; short name `Undervault` for folder, files and tab.
- Party of **six**; the **front three** fight in melee, the back three cast or use items.
- A fight has **up to four monster groups, each up to nine** of one kind.
- Combat is orders-then-resolve; no real-time combat. Death is permanent unless the temple succeeds (with a chance of failure).
- **A failed escape costs a turn, not the party.** Fleeing is a real option, not a coin flip that usually ends in death.
- Every name (characters, monsters, spells, places, items, story) is original; none borrowed from Wizardry.
- Dungeon look: vector, dungeon-like not cyberpunk; muted earthy palettes per area; neon reserved for magic; modest bloom; no CRT scanlines or glowing floor grid by default; HUD looks like parchment, ink and dim metal.
- Monsters never appear in the halls; a fight cuts to a raster picture (classic Western RPG style, not anime). Art is code-first; generated images acceptable if code is not good enough. The picture layer is swappable.
- Automap is a setting with two choices, `on` and `off`; **default `on`**; it shows height.
- Saves live in browser local storage **and can be saved to a file and loaded from a file** (owner request: play on any device in a browser; the save file works on any device). Audio starts only after the first click or key press. A quality setting lowers bloom.
- Static site hosting; desktop keyboard first; no phone or touch controls. No procedural world generation; no deep creature or body simulation.
- Tone: gritty, violent, crude, R-rated storytelling, not explicit; a short content notice on first load.
- All tunable numbers (flicker, bloom, fog, lamp) are settings or constants, never buried.
- Look defaults come from the owner's slider test of the spike: **lower bloom and more fog than the spike's defaults** (spike: bloom 1.05, fog 0.17) worked well. Starting defaults: bloom 0.5, fog 0.28; tune by eye from there.

## Review Focus

- Local storage unavailable, blocked, or holding a corrupt or older-version save: the game starts fresh with a visible message and never crashes (Task 13).
- A party with fewer than six members, a dead front row, or everyone dead or ash: combat, town and save still work and the wipe is handled (Tasks 3, 6, 12).
- Combat edge states: every monster group asleep, friendly or fleeing; a group at zero; a paralysed party trying to flee; a nine-strong group plus three others (Task 6).
- Malformed level data (unmatched stairs, unreachable cells, a void column with no landing): the parser rejects it with a line number instead of loading a broken level (Task 4).
- WebGL missing, a slow machine, window resize, a hidden tab, and key-repeat spam during an animation: low-quality fallback, no stuck state, no queued-move pile-up (Tasks 14, 15, 19).

---

### Task 1: Project skeleton, docs and seeded RNG

**Files:**
- Create: `D:\Programs\claude\undervault\{package.json,tsconfig.json,vite.config.ts,index.html,.gitignore,CLAUDE.md,README.md}`, `src/core/rng.ts`, `tests/rng.test.ts`
- Create (copy): `docs/superpowers/specs/2026-11-08-undervault-design.md`, `docs/superpowers/plans/2026-11-08-undervault-demo-plan.md`, `docs/dev/spike-hall.html`

**Interfaces:**
- Produces: `interface Rng { next(): number; int(min: number, max: number): number; pick<T>(a: readonly T[]): T; chance(p: number): boolean; state(): number }` and `createRng(seed: number): Rng` in `src/core/rng.ts`.

- [ ] **Step 1:** Verify `node --version` is ≥ 24 and `D:\Programs\claude\undervault` does not exist. Create it, `git init -b main`, `npm init -y`, install `typescript vite vitest three@0.160.1 @types/three`. Scripts: `dev`, `build`, `test` (`vitest run`). Vite `base: './'`. Copy the three docs in. `CLAUDE.md` states: working agreements, Node/npm commands, "all names original", and points to the spec and plan. `.gitignore` lists `node_modules`, `dist`.
- [ ] **Step 2:** Write `tests/rng.test.ts`: same seed gives the same first 10 values; `int(3,5)` over 1000 draws only returns 3, 4, 5 and hits all three; `chance(0)` is always false and `chance(1)` always true; `createRng(s)` resumed from `state()` continues the same sequence.
- [ ] **Step 3:** Run `npx vitest run tests/rng.test.ts`; expect FAIL (module missing).
- [ ] **Step 4:** Implement `createRng` with a mulberry32-style generator (the spike's `rng` function is the model).
- [ ] **Step 5:** Run the test; expect PASS. Run `npm run build`; expect a `dist/index.html`.
- [ ] **Step 6:** Commit `chore: project skeleton, docs, seeded rng`.

### Task 2: Shared types, data schemas and the original-names guard

**Files:**
- Create: `src/core/types.ts`, `src/core/data/index.ts`, `tests/names.test.ts`, `tests/data.test.ts`

**Interfaces:**
- Produces in `types.ts`: `type Attr = 'str'|'iq'|'pie'|'vit'|'agi'|'luck'`; `type Stats = Record<Attr, number>`; `type Alignment = 'good'|'neutral'|'evil'`; `type Row = 'front'|'back'`; `interface Character { id; name; raceId; classId; alignment; level; xp; stats: Stats; hp; maxHp; charges: number[]; maxCharges: number[]; known: string[]; techniques: string[]; inventory: string[]; equipped: Record<string,string>; status: StatusId[]; dead: boolean; ash: boolean; row: Row }`; `interface Party { members: Character[]; gold: number; discoveries: string[] }`; schemas `RaceDef`, `ClassDef`, `SpellDef`, `ItemDef`, `MonsterDef`, `TaleDef`, `DiscoveryDef`; `validateData(): string[]` (list of problems, empty when valid) exported from `data/index.ts`.

- [ ] **Step 1:** `tests/names.test.ts`: read every file under `src/core/data` and `levels/` as text; assert none contains any of: `Wizardry, Werdna, Trebor, Boltac, Gilgamesh, Murphy, Halito, Mahalito, Lahalito, Dumapic, Katino, Tiltowait, Malor, Dios, Badios, Madalto, Makanito, Calfo, Latumapic, Montino, Dialma, Porfic, Kalki, Milwa` (case-insensitive). `tests/data.test.ts`: `validateData()` returns `[]`; every id referenced by another table exists.
- [ ] **Step 2:** Run both; expect FAIL.
- [ ] **Step 3:** Implement types and an empty-but-valid data registry (tables filled by later tasks).
- [ ] **Step 4:** Run; expect PASS. Commit `feat: core types, data validation, name guard`.

### Task 3: Characters and party

**Files:** Create `src/core/data/races.ts`, `src/core/data/classes.ts`, `src/core/party.ts`, `tests/party.test.ts`

**Interfaces:**
- Consumes: `Rng`, `Character`, `Party`, `Stats`.
- Produces: `rollBonusPool(rng): number` (5–9, small chance of +10 extra); `eligibleClasses(stats: Stats, alignment: Alignment): string[]`; `createCharacter(spec: {name; raceId; classId; alignment}, allocation: Stats, rng): Character` (throws when allocation exceeds the pool or the class is not eligible); `addToParty(p: Party, c: Character): Party` (throws at 7th member or on opposed alignments good+evil); `setRow(p: Party, id: string, row: Row): Party`; `isWiped(p: Party): boolean`. Demo data: 5 races, 3 alignments, 4 basic + 2 elite classes with attribute gates.

- [ ] **Step 1:** Tests: pool is always ≥5; an elite class is absent from `eligibleClasses` when its attribute gate fails and present when met; `addToParty` rejects a seventh member; good+evil party rejected, good+neutral accepted; `members[0..2]` are `front` by default; `isWiped` is true for an all-dead party and for a party of only ash; a party of 2 is valid and `isWiped` is false.
- [ ] **Step 2:** Run `npx vitest run tests/party.test.ts`; FAIL. **Step 3:** implement. **Step 4:** PASS. **Step 5:** commit `feat: characters and party rules`.

### Task 4: Level model, parser and movement rules (3D, tall caverns)

**Files:** Create `src/core/dungeon/level.ts`, `src/core/dungeon/parse.ts`, `levels/test-mini.level`, `tests/level.test.ts`

**Interfaces:**
- Produces: `interface Pos { x: number; y: number; z: number }`; `type Cell = { kind: 'solid'|'floor'|'void'|'stairsUp'|'stairsDown'|'door'|'pit'|'chute'|'teleporter'|'spinner'|'dark'|'antimagic'|'encounter'|'event'; area: string; data?: Record<string,string> }`; `interface Level { id; name; w; h; layers: number; cell(p: Pos): Cell; areaOf(p: Pos): string }`; `parseLevel(text: string): Level` (throws `LevelError` with line number); `type Move = 'fwd'|'back'|'left'|'right'|'up'|'down'`; `step(level, pos, facing, move): { pos: Pos; fell: number } | null` (null when blocked; stepping into a `void` ledge falls to the first standable cell below and reports `fell`).
- Level text: one block per storey headed `@z <n>`, a legend section mapping glyphs to cell kinds and areas; blank-separated.

- [ ] **Step 1:** Tests: parse `test-mini.level`; wall blocks `step`; stairs `up` from `stairsUp` lands on the matching `stairsDown` one storey up; stepping off a ledge into a 3-storey void returns `fell: 3`; parsing rejects (with the line number in the message) unmatched stairs, a void column with no landing, and an unreachable floor cell.
- [ ] **Step 2:** Run; FAIL. **Step 3:** implement parser and `step`. **Step 4:** PASS. **Step 5:** commit `feat: 3d level model and movement`.

### Task 5: Automap model

**Files:** Create `src/core/dungeon/automap.ts`, `tests/automap.test.ts`

**Interfaces:**
- Consumes: `Level`, `Pos`. Produces: `interface Automap { seen: Set<string> }`; `reveal(map: Automap, level: Level, pos: Pos, facing: number): Automap` (cells within line of sight up to 8, on all storeys the party can see into); `layerView(map, level, z): { x; y; kind: Cell['kind']; known: boolean; overheadVoid: boolean }[]`; `serializeAutomap/deserializeAutomap`.

- [ ] **Step 1:** Tests: standing in a corridor reveals only cells in sight, not behind walls; a cavern edge reveals the storeys below through the void; revealed state survives serialise/round-trip; trap tiles show only after `data.known` is set.
- [ ] **Step 2–5:** Run FAIL, implement, PASS, commit `feat: automap model`.

### Task 6: Combat engine

**Files:** Create `src/core/combat/types.ts`, `src/core/combat/engine.ts`, `tests/combat.test.ts`

**Interfaces:**
- Consumes: `Party`, `Rng`, `MonsterDef`. Produces: `interface MonsterGroup { monsterId: string; hp: number[]; asleep: boolean; friendly: boolean }`; `interface CombatState { party: Party; groups: MonsterGroup[]; round: number }`; `type Order = {kind:'fight';group:number}|{kind:'spell';spellId:string;target:number}|{kind:'parry'}|{kind:'use';itemId:string;target:number}|{kind:'run'}`; `startCombat(party, groups): CombatState` (throws on >4 groups or a group >9); `resolveRound(s: CombatState, orders: Record<string,Order>, rng): { state: CombatState; events: CombatEvent[]; outcome: 'ongoing'|'won'|'wiped'|'fled' }`; `fleeChance(s: CombatState): number` (0–1, agility-driven); `warnings(s: CombatState): Warning[]` where `Warning = 'lowCharges'|'redHp'|'outnumbered'|'monsterEnraged'`.
- Rules: initiative by agility; only front-row members melee; a member with no order parries; **a failed run ends that round's party actions but kills no one by itself**.

- [ ] **Step 1:** Tests: `startCombat` rejects 5 groups and a group of 10; back-row `fight` is ignored with a miss event; sleeping groups do not act; a successful `run` by the party returns `fled`; a failed run yields `ongoing` with no deaths caused by the failure alone; resolving the same seed twice gives identical events; `warnings` includes `redHp` before the party wipes in a scripted losing fight; all-friendly groups end combat without damage; a paralysed party's `fleeChance` is 0 and is reported.
- [ ] **Step 2–5:** Run FAIL, implement, PASS, commit `feat: combat engine`.

### Task 7: Magic and status effects

**Files:** Create `src/core/data/spells.ts`, `src/core/magic.ts`, `tests/magic.test.ts`

**Interfaces:**
- Consumes: `CombatState`, `Character`. Produces: `castSpell(s: CombatState, caster: string, spellId: string, target: number, rng): CombatEvent[]` (spends one charge of the spell's level; silenced casters fail); data model supports 7 spell levels and two schools; demo ships about 12 spells of levels 1–3 with original names covering group damage, single damage, sleep, silence, buff, heal, detection, identify-monster, escape.

- [ ] **Step 1:** Tests: casting spends exactly one charge of the right level; no charge → no cast and no event of damage; sleep puts a group to sleep and wakes on damage; silence blocks casting; a spell is castable only if in `known` (ties to Task 10 discoveries); heal cannot exceed `maxHp`.
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: spells and status effects`.

### Task 8: Monsters, monster intent, bestiary and simulator

**Files:** Create `src/core/data/monsters.ts`, `src/core/combat/ai.ts`, `scripts/sim.ts`, `tests/ai.test.ts`

**Interfaces:**
- Produces: `chooseMonsterAction(s: CombatState, group: number, rng): MonsterAction` (acts with intent: targets weak or wounded characters, casters cast when they have charge, hurt monsters may flee or call help); `simulate(opts: { party: Party; depth: number; battles: number; seed: number }): { winRate; wipeRate; fleeRate; avgRounds }`; `npm run sim` prints a table by depth. Demo bestiary: 10 monsters, each with a `pictureId` (Task 17), depth range, and one distinctive behaviour.

- [ ] **Step 1:** Tests: a wounded monster flees; caster monsters target the back row only when they have a ranged attack; `simulate` is deterministic for a seed; across 200 level-1 battles the wipe rate is reported and below 100%.
- [ ] **Step 2–5:** FAIL, implement, PASS. Run `npm run sim`; paste the table into the commit message. Commit `feat: monster ai, bestiary, simulator`.

### Task 9: Items, equipment and shop rules

**Files:** Create `src/core/data/items.ts`, `src/core/items.ts`, `tests/items.test.ts`

**Interfaces:**
- Produces: `equip(c: Character, itemId: string): Character` (class-restricted; cursed items cannot be removed); `unequip`; `identify(c: Character, itemId: string, by: Character): boolean` (only classes with the `identify` ability); `buy(p: Party, itemId: string, shop: ShopDef): Party`; `sell`; `ShopDef { stock: { itemId: string; requiresDiscovery?: string }[] }`.

- [ ] **Step 1:** Tests: a class-restricted item is refused; a cursed item stays equipped; unidentified items show a placeholder name until identified; `buy` fails without gold; stock gated by `requiresDiscovery` is hidden until the party has that discovery.
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: items and shop rules`.

### Task 10: Progression by discovery

**Files:** Create `src/core/data/discoveries.ts`, `src/core/progression.ts`, `tests/progression.test.ts`

**Interfaces:**
- Produces: `awardXp(p: Party, xp: number): Party`; `levelUp(c: Character, rng): Character` (HP roll, attribute swings; only callable at the inn); `applyDiscovery(p: Party, id: string): Party` (adds to `discoveries`; unlocks spells, techniques, or class paths per `DiscoveryDef.unlocks`); `availablePaths(c: Character, p: Party): string[]`. Demo: 4 discoveries (arcane knowledge, ancient weapon, a relic that opens a class path, a lore fragment).

- [ ] **Step 1:** Tests: XP raises HP and hit chance only (no new options); `applyDiscovery` grants a spell to eligible casters and not to fighters; two parties with different discoveries have different `availablePaths`; applying the same discovery twice is idempotent; level-up is refused outside the inn context.
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: discovery-based progression`.

### Task 11: Chronicle and story events

**Files:** Create `src/core/chronicle.ts`, `src/core/events.ts`, `tests/chronicle.test.ts`

**Interfaces:**
- Produces: `interface ChronicleEntry { id: string; day: number; kind: 'combat'|'death'|'discovery'|'event'|'town'; text: string; cause?: string }`; `addEntry(c: Chronicle, e: Omit<ChronicleEntry,'id'>): Chronicle`; `renderChronicle(c, limit?): string[]`; `triggerEvent(level: Level, pos: Pos, party: Party, rng): { party: Party; entries: ChronicleEntry[] }` for demo events `collapse`, `flood`, `monstersClash`, `cursedRelic`.

- [ ] **Step 1:** Tests: every `event`-kind entry that is a disaster has a `cause` pointing to an earlier entry or tile; `triggerEvent` with the same seed gives the same result; the chronicle caps at its limit and round-trips through save serialisation; a collapse can close a route but never leaves the party stuck with no exit (a guaranteed path is kept).
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: chronicle and story events`.

### Task 12: Town model

**Files:** Create `src/core/data/town.ts`, `src/core/data/tales.ts`, `src/core/town.ts`, `tests/town.test.ts`

**Interfaces:**
- Produces: `PLACES: PlaceDef[]` (recruiter tavern, smith and general shop, temple, inn, informant, tale-teller; travel between them is instant); `recruits(day: number, rng): Character[]`; `rest(p: Party, tier: number): Party` (heals, advances day, allows level-up); `raise(p: Party, id: string, rng): Party` (temple; chance of failure; failure may turn the character to ash); `informant(p: Party): string[]` (what the party can learn, gated by discoveries); `tale(p: Party, rng): TaleDef` (each tale carries `hints?: discoveryId`); demo tales (about 8) in R-rated, original prose.

- [ ] **Step 1:** Tests: every place is reachable from every other; `raise` can fail and ash is not raisable again at the same tier; `rest` never exceeds `maxHp`; a tale with `hints` is only offered once per party and every `hints` id exists; `recruits` never produces opposed alignments for a given party; town works for a party of 0 survivors (game-over path, not a crash).
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: town model, tales`.

### Task 13: Save and load

**Files:** Create `src/core/save.ts`, `tests/save.test.ts`

**Interfaces:**
- Produces: `interface SaveData { version: 1; party; chronicle; automaps: Record<string,string>; position; day; settings }`; `saveGame(s: SaveData, store?: StorageLike): { ok: boolean; message?: string }`; `loadGame(store?: StorageLike): { data: SaveData | null; message?: string }`; `exportSave(s): string` (JSON with a `game: "undervault"` marker); `importSave(text): { data: SaveData | null; message?: string }`; `saveToFile(s: SaveData): void` (downloads `undervault-<party>-day<n>.json`); `loadFromFile(file: File): Promise<{ data: SaveData | null; message?: string }>`; migration hook by `version`.

- [ ] **Step 1:** Tests: round-trip; a storage that throws on read and write yields `{ok:false, message}` and `{data:null, message}` with no thrown error; corrupt JSON and an unknown future `version` yield a fresh game with a message; import rejects a non-save file and a JSON file whose `game` marker is not `undervault`; `exportSave` then `importSave` returns identical data (so a file saved on one device loads on another).
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: save, load, export, import`.

### Task 14: Vector hall renderer

**Files:** Create `src/render/hall/{palettes.ts,geometry.ts,shader.ts,torches.ts,runes.ts,hall.ts}`, `src/render/settings.ts`, `tests/geometry.test.ts`, `tests/palettes.test.ts`

**Interfaces:**
- Consumes: `Level`, `Cell`. Produces: `buildHallGeometry(level: Level): { faces: Float32Array; lines: Float32Array; torches: TorchSpec[]; runes: RuneSpec[] }` (pure; faces only between solid and open cells; void columns produce walls on ledges; floors only on standable cells); `AreaPalette { edge; wall; floor; ceil; grid; door; rune; torch; fog; flicker: number }` with `PALETTES: Record<string, AreaPalette>` (muted earthy: verdigris, rust, ember, bone, deep violet only in magic areas); `class Hall { constructor(canvas: HTMLCanvasElement, level: Level, settings: RenderSettings); render(t: number, camera: CameraState): void; dispose(): void }`; `RenderSettings { bloom; flicker; lamp; fog; quality: 'low'|'normal' }` with `low` disabling bloom; `DEFAULT_SETTINGS.bloom` is below the spike's 1.05 and `DEFAULT_SETTINGS.fog` above its 0.17 (starting at 0.5 and 0.28), and `tests/settings.test.ts` pins that. Port the spike's shader, flickering vector torches, wall runes and floor sigils; no glowing floor grid and no scanlines by default.
- [ ] **Step 1:** Tests: geometry for `test-mini.level` has no face between two open cells and has a face on each solid/open boundary; a 3-storey void yields wall faces on every storey of the ledge; every palette's `wall`, `edge`, `grid`, `floor` colour has HSL saturation ≤ 0.65 (neon saturation only allowed in `rune` and `torch`).
- [ ] **Step 2–5:** FAIL, implement, PASS. **Step 6:** run `npm run dev`, walk `test-mini.level` and compare with the "toning-down direction" bullets in the spec; note findings in the commit. WebGL missing: `Hall` constructor throws `NoWebGLError` that the app shows as a message. Commit `feat: vector hall renderer`.

### Task 15: Camera controller and input

**Files:** Create `src/render/hall/controller.ts`, `src/render/input.ts`, `tests/controller.test.ts`

**Interfaces:**
- Produces: `createController(level: Level, start: Pos, facing: number): Controller` with `command(move: Move | 'turnLeft'|'turnRight'): void`, `update(nowMs: number): CameraState` (smooth steps; stair climbs; falls play as a drop), `pending: Move | null` (**at most one queued command**), `onArrive: (pos: Pos) => void`; key map: W/↑ forward, S/↓ back, A/← and D/→ turn, Q/E strafe, R/F up/down stairs.
- [ ] **Step 1:** Tests: hammering `command('fwd')` 20 times during one animation leaves one queued move, not 20; a blocked move plays a bump and calls no `onArrive`; a fall reports the correct drop and ends on a standable cell; `update` called with a backwards time never produces NaN.
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: camera controller and input`.

### Task 16: Automap view and setting

**Files:** Create `src/render/automapView.ts`, add `automap: 'on'|'off'` to `RenderSettings`, `tests/automapView.test.ts`

**Interfaces:**
- Produces: `class AutomapView { constructor(canvas: HTMLCanvasElement); draw(map: Automap, level: Level, pos: Pos, facing: number, z: number): void; setLayer(z: number): void }`; shows the party arrow, known special tiles, and storeys above and below with height shading; `DEFAULT_SETTINGS.automap === 'on'`.
- [ ] **Step 1:** Tests: default setting is `on`; with `off` the view draws nothing but reveals are still recorded in the model; `layerView` data for a tall cavern marks open-above cells.
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: automap view and setting`.

### Task 17: Monster picture layer (code-first, swappable)

**Files:** Create `src/render/monster/{picture.ts,recipes.ts,wraith.ts,image.ts,transition.ts}`, `tests/picture.test.ts`

**Interfaces:**
- Produces: `interface PictureState { hit: number; lunge: number; damage: number; dying: number }` (0–1 each); `interface MonsterPicture { width: number; height: number; draw(ctx: CanvasRenderingContext2D, t: number, s: PictureState): void }`; `registerPicture(id: string, p: MonsterPicture): void`; `getPicture(id: string): MonsterPicture` (placeholder for unknown ids); `ImagePicture` backend for generated art with animation layers; `glitchCut(from: HTMLElement, to: HTMLElement): Promise<void>`. Port the spike's wraith (relief lighting, ordered dithering, breathing, blinking, lunge, hit-flash, shake, cinder dissolve); `damage` visibly weakens the picture (paler, cracked). Recipes for the 10 demo monsters.
- [ ] **Step 1:** Tests (using `@napi-rs/canvas` or `jsdom` canvas stub): `draw` fills 192×240; `hit: 1` differs from `hit: 0`; `damage: 0.8` differs from `damage: 0`; an unknown id returns the placeholder without throwing.
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: monster picture layer`.

### Task 18: UI screens and game flow

**Files:** Create `src/render/ui/{flow.ts,title.ts,town.ts,roster.ts,hud.ts,combat.ts,settings.ts}`, `src/main.ts`, `tests/flow.test.ts`

**Interfaces:**
- Produces: `type Screen = 'title'|'town'|'roster'|'dungeon'|'combat'|'settings'|'gameover'`; `reduce(state: AppState, action: AppAction): AppState` (pure flow; `title` requires the first click to unlock audio and shows the content notice); title and settings screens have **Save to file** and **Load from file** buttons (title also offers Load); combat screen: order phase for each character, then a resolve playback of `CombatEvent`s with the monster picture reacting, `warnings` shown as colour and text, run always available; HUD in parchment and ink style.
- [ ] **Step 1:** Tests: title → town → dungeon → combat → town transitions; a wiped party goes to `gameover`; `run` is always a valid combat action; opening settings preserves the underlying screen; the content notice appears once per browser.
- [ ] **Step 2–5:** FAIL, implement, PASS. Manually click through the flow in the dev server. Commit `feat: screens and game flow`.

### Task 19: Procedural audio

**Files:** Create `src/render/audio.ts`, `tests/audio.test.ts`

**Interfaces:**
- Produces: `createAudio(win: { AudioContext?: unknown }): Audio` with `unlock(): void` (first gesture), `play(name: 'step'|'door'|'torch'|'hit'|'cast'|'death'|'drone'): void`, `setMuted(m: boolean): void`; suspends when the tab is hidden.
- [ ] **Step 1:** Tests: with no `AudioContext` every call is a silent no-op; `play` before `unlock` does nothing; `setMuted(true)` silences; hidden tab suspends the context.
- [ ] **Step 2–5:** FAIL, implement, PASS, commit `feat: procedural audio`.

### Task 20: Demo content (town, three levels, bestiary, tales)

**Files:** Create `levels/{crypt.level,caverns.level,deep.level}`, fill `src/core/data/*.ts`, `tests/content.test.ts`

**Interfaces:** Level files in the Task 4 format. Content: three levels with distinct area palettes; at least one level with a void column of **≥3 storeys**, ledges, a bridge and a drop; 10 monsters; 4 discoveries; about 8 tales; event tiles for the four demo events.
- [ ] **Step 1:** `tests/content.test.ts`: every level parses; every cell is reachable from the start; stairs are paired; every `DiscoveryDef` is found on some tile and is hinted by at least one tale; every monster has a registered picture; no forbidden names (Task 2); `npm run sim` completes for each level's depth.
- [ ] **Step 2–5:** FAIL, author content, PASS. Play the demo end to end; fix balance using `npm run sim`. Commit `feat: demo content`.

### Task 21: Build and publish

**Files:** Create `.github/workflows/pages.yml` (not enabled until the owner agrees), update `README.md`, `src/title.ts` (`export const TITLE = 'Sorcery: Realm of the Undervault'`)

- [ ] **Step 1:** `npm run build`; assert `dist/index.html` exists and references only relative asset paths (`tests/build.test.ts`). `README.md` says what the game is, how to run and build it, and notes a trademark check on the title before any public launch.
- [ ] **Step 2:** **Ask the owner before creating any GitHub remote or enabling Pages**; both are outward-facing. Commit `chore: build and publish setup`.

---

## Self-Review (done)

- **Spec coverage:** look and toned-down direction (T14), flicker torches and runes (T14), per-area colour (T14), raster monster cut (T17–18), tall caverns (T4, T14, T20), combat and flee (T6–8), discovery progression (T10), chronicle and events (T11), town (T12), tone and notice (T12, T18, T20), automap setting (T5, T16), hosting, save, audio, quality (T13, T14, T19, T21), headless sim (T8), swappable art layer (T17), original names (T2), single title string (T21), desktop-first (T15). No gaps.
- **Types:** `Pos`, `Level`, `Cell`, `Automap`, `CombatState`, `Order`, `Character`, `Party`, `PictureState` are defined once and used with the same names later.
- **Proportion:** about 3,000 words against a 2,800-word spec, with signatures and test assertions in place of bodies.
