# Wizardry-style keyboard UI and town portraits: design

Status: draft for the owner's approval. Supersedes the "parchment, ink and dim metal" menu look in the main design
(`2026-11-08-undervault-design.md`, line 61); everything else in that document stands.

## Intent

The demo plays, but its screens look like a web app: buttons, dropdowns, a mouse-first town. The owner wants the way the
first Wizardry *felt*: every screen shows its commands as lettered options (`F)ight`, `P)arry`, `B)uy`, `S)ell`), you press the
letter and it happens, and anything that needs a choice opens a framed dialogue box where you pick by number, or with Up/Down
and Enter. The whole game, apart from the 3D walk, should be playable without touching the mouse. The owner's words: "vibe of
the old style, but upgraded."

The second wish: the town is full of people, and the old game never showed them. Everyone the player deals with in a
meaningful way gets a face, drawn in code the way the monsters are.

## Goals

- Every non-dungeon screen is keyboard-driven, with its commands printed on screen as `X)word`.
- One consistent dialogue system for choices: number keys, Up/Down + Enter, Esc to back out.
- Combat orders are given the way the original gave them: member by member, one command each.
- A look that is recognisably the old game's (framed text windows, a message window, a roster strip) and clearly upgraded
  (per-place colour, soft glow, animated faces, candle flicker on borders).
- Faces for: the people who run each place and the tale-tellers; every tavern recruit; every party member; Corporal Moss on the
  Roll of the Gone.
- The mouse still works everywhere (every command and list row is clickable), so a phone or tablet is not locked out.

## Non-goals and anti-goals

- Not a terminal emulator: no fixed 40x24 grid, no ASCII art, no enforced character-cell layout.
- Not neon or "computer cyberpunk": the owner has already asked for that to be toned down. Glow is faint and warm.
- No new game rules. `src/core` is untouched except where a screen needs a read-only helper. Save format stays v1: a
  character's face is derived from its id, so nothing new is saved.
- No party faces on the dungeon screen (owner: "in dungeon the party doesn't really need a picture on screen"). The dungeon
  roster is text only. My call: combat's roster is text only as well, so faces are a town and character-sheet thing.
- Nothing copied from Wizardry: no names, no text. `tests/names.test.ts` keeps guarding that.

## Constraints

- TypeScript, DOM UI in `src/render/ui`, tests in `tests/`; Node 24; `npm test` stays green (243 tests today).
- Portrait drawing is plain canvas 2D code, no image files, and testable headlessly with the `@napi-rs/canvas` setup the
  monster pictures already use (`setCanvasFactory`).
- Works offline and from any static host: no web-font downloads. Use the system monospace stack.
- The content notice, saving to browser and file, and settings keep working.

## The screen system (owner decided the feel; the structure is my call)

**Frame.** A bordered window drawn with a double line and small corner ornaments, near-black background, warm light text.
Every screen is a few frames: a *scene* frame (portrait or the dungeon view), a *message* window (scrolling lines), a *command
bar* and, where the party matters, a *roster strip*. Each place has an accent colour for its borders and command letters, as
dungeon areas have palettes: tavern amber, forge ember, House of Ash cold grey-blue, inn candle gold, pawnshop verdigris,
lamp-and-lung dusk violet. Borders flicker very slightly, like candles. A `Screen glow` setting (off, low, normal; default
low) controls glow and flicker.

**Command bar.** Commands print as `F)ight  S)pell  P)arry`, the letter in the accent colour. A command that is not
available is dimmed and does nothing. Pressing a letter (either case) runs it. Clicking it runs it too.

**Dialogues.** Opened over the screen with the backdrop dimmed. Rows are numbered `1)` to `9)` and then `A)` onward if a list is
longer; the highlighted row has a `>` marker and an inverse bar. Keys: a number or letter selects and confirms, Up/Down move,
PageUp/PageDown page, Enter confirms, Esc cancels. Anything destructive (Dismiss, raise the ash) asks `Y)es / N)o` first.
Text entry exists only for naming a character: Enter accepts, Esc cancels, and no letter is a command while typing.

**Input handling.** One central key router. Each screen publishes its current command table; the router owns the keyboard,
matches keys against the top dialogue first and the screen second, and ignores keys while a round is animating (except Enter or
Space, which speed it up). A screen's printed commands and its bound keys come from the same table, so they cannot disagree.

## Screens and their commands (my layout, owner's command style)

| Screen | Commands |
|---|---|
| Title | N)ew game, C)ontinue, L)oad from file, S)ettings. First key press or click starts sound and dismisses the notice. |
| Town | One command per place, each with its own letter (Sump Tap, Forge, House of Ash, Last Mattress, Maud's, Lamp and Lung), P)arty and packs, E)nter the Undervault, and Esc for a system dialogue: S)ave to file, L)oad from file, O)ptions, Q)uit to title. Travel is instant, as now. |
| Sump Tap (tavern) | R)ecruit (list of who is waiting, face of the highlighted one shown), N)ew character, D)ismiss, W) swap rows, L)eave. |
| Character creator | A dialogue sequence: name, race (list), alignment (list), then attribute allocation (Up/Down picks an attribute, Left/Right or `-`/`+` changes it, bonus points shown), then class (list of eligible classes), then accept. Esc steps back one stage; stepping back to race resets the allocation, as changing race does today. `R)e-roll` the bonus points stays on the allocation stage, free as it is now (no new rule). The face updates live and matches the final face exactly (see Portraits). |
| Forge | Pick who (1-6, or Left/Right) then B)uy, S)ell, I)dentify, L)eave. Buy and sell open item lists with prices; unaffordable rows are dimmed. Sell moves here from the Party and packs screen, as in the original shop. I)dentify is the existing Study rule (`identifyItem`, "only a Shade can"), not a paid service; it is reachable here and also from Party and packs. |
| House of Ash | R)aise (list of the fallen with costs; ash needs the ash rite and a `Y)es` confirmation), L)eave. |
| Last Mattress | R)est (list of rooms with prices), L)eave. |
| Maud's | A)sk for news, L)eave. |
| Lamp and Lung | H)ear a tale (buys a round), L)eave. The portrait shown is whoever is speaking the tale. |
| Party and packs | Pick who (1-6 or Left/Right) then E)quip, U)nequip, S)tudy, L)eave (selling stays at the forge). The character sheet shows the face, attributes, hit points, spells, techniques and slots. |
| Combat | See below. |
| Dungeon | The 3D view keeps W/A/S/D, Q/E, R/F, Z/X, `[`/`]` and the arrows. New: C)amp opens a dialogue (I)nspect a member, S)ave to file, O)ptions, L)eave camp). Esc opens the same system dialogue as the town. Inspect is read-only. Layout (my call): the 3D view in a frame whose border takes the current area's palette colour; the automap in its own frame beside it with the storey keys; a message window under the view, which takes over from toasts (discoveries, events, falls, level changes, and the "dungeon view could not start" notice); a text-only roster strip along the bottom; and a printed command bar (`W/S walk  A/D turn  Q/E step  R/F stairs  Z/X look  C)amp`). The on-screen movement pad stays, so touch devices can still move. |
| Settings | A list: Up/Down picks a setting, Left/Right adjusts a slider or flips a choice, Esc closes. Adds the Screen glow setting. |
| Roll of the Gone, ending | Corporal Moss's face on the Roll. Any key continues; commands B)egin again / L)oad / T)itle on the Roll; B)ack to Crowhithe / S)ave / T)itle at the ending. |

### Combat orders

Each round, each member who can act is asked in turn, in roster order, the way the original did:
`Gudrun's options: F)ight  S)pell  P)arry  U)se  R)un  T)ake back`. Fight picks a monster group from a numbered list (skipped
when only one group is alive); Spell picks a spell then a target; Use picks an item then a target. Only legal commands are
shown bright (the existing `legalOrders` rule). `T)ake back` steps to the previous member. After the last member the round
resolves, and the message window plays out the events as it does now. Space or Enter skips the wait between lines.

My calls: Enter repeats the member's order from last round if it is still legal; `A)uto` fills every remaining member with
the engine's suggested orders (the current "Suggest" button), which the original never had.

### Message window

Replaces the toast overlay, the town message line and the chronicle side panel as the place where things are said. It scrolls,
keeps the last several lines, and the newest line is brightest. The chronicle stays a separate list in the Party and packs
screen and on the Roll and ending.

## Portraits

**Who.** Named townspeople: Dennis Brannoch (Sump Tap), Hobb Ferrule (Forge), Sister Ottoline of the House of Ash, Wenna Ashby
(Last Mattress), Maud the Lender (pawnshop), Old Tamsin Quell (Lamp and Lung), and the other tale-tellers: Corporal Moss,
Merrow Dunn, Pim the tavern boy, Joss the Sweeper, Gudrun Sixfingers. Moss also faces the Roll of the Gone. Then every tavern
recruit (eight today, one hand-tuned recipe each so they read as individuals) and every created or hired party member.

**Not shown.** The dungeon screen and combat roster show no faces (see anti-goals). Monsters keep their own pictures.

**How they are drawn.** A new portrait painter in `src/render/portrait/`, built on the same pipeline as the monsters: draw a
grayscale relief of a head and shoulders, light it from a flickering source, dither to a small colour ramp. The shading code in
`monster/picture.ts` is private and sized for monsters; the builder should lift the shared part so both use it, keeping the
monster pictures pixel-identical (the existing picture tests are the guard). A portrait is described by a small spec:

- Named person: an id into a table of hand-made recipes (head shape, brow, eyes, nose, mouth, hair or hood, beard, scars,
  collar, one signature prop: Hobb's forge glow and apron, Maud's scale pan and coin, Tamsin's lamp, the Sisters' ash-smudged
  cowl, Dennis's lie-weathered grin, Moss's ledger and cap, and so on).
- Hand-made recipes are keyed by name, because recruit ids carry a random suffix. A character whose name matches a recipe
  uses it, and keeps it after being hired. Each named person is one person with one face wherever they appear: Gudrun
  Sixfingers (recruit, tale-teller and demo-party member), and Dennis Brannoch, who is also "Brannoch the Bold" in the tales.
  Joss Marrow (recruit) and Joss the Sweeper (tale-teller) are two different people, with two faces. A tale's speaker string
  maps to a recipe through that same name table.
- Adventurer: race, class, alignment and a face number taken from the character id's numeric suffix (nothing is saved). The
  creator reuses one fixed seed for the preview and for signing on, so the preview face is exactly the face the character gets,
  with no change to `src/core`; the typed name does not affect the face, so it does not reshuffle while typing. Race sets proportions and a few marked traits
  (the five races are human, barrowfolk, lanternkin, thornborn, cinderkin; the builder invents the looks, keeping them
  original), class sets gear (helm, hood, circlet, cowl, collar), alignment shifts expression, the seed picks the rest. The same
  character always gets the same face.

**Life in them.** Idle breathing, blinking and a slow tilt; the light on the face flickers like the monsters'; a speaking person's
mouth moves while their line is typed out. State maps onto the existing picture state: `hit` flinches, `damage` pales and cracks the
face (used on the character sheet for wounded members), and `dying` dissolves a face to cinders, used for ash and for the moment a
fallen member is raised. A dead member's face is greyed with closed eyes.

**Where.** A portrait sits in the scene frame of each town place; the recruit list previews the highlighted recruit; the creator
shows the face live; the character sheet shows the member; the roster strip in town and on the party screen shows small
thumbnails (redrawn only when a member's state changes, not every frame).

## Testing

- Key router and menu controller as pure state machines tested with jsdom: a letter runs the matching command; a disabled one
  does nothing; Esc backs out one level; Up/Down/Enter and number keys in dialogues; typing in the name box does not trigger
  commands; keys ignored while a round animates; each screen's printed commands equal its bound keys, with no duplicate letter
  on one screen.
- Combat orders: member-by-member prompting yields the same `Order` objects the engine takes today; `T)ake back` restores the
  previous member's choice; Enter repeats; skipping the group prompt when one group is alive.
- Portraits: every named person, every recruit and a sweep of race by class by alignment by seed draw without throwing; output
  is not blank; the same spec draws the same pixels; different specs differ; alive, dead and ash differ; the monster picture
  tests still pass unchanged.
- The existing `app.test.ts` (jsdom) is updated to drive the new screens by keyboard; the playthrough bot test is unchanged.
- A manual pass in the browser: play from title to first fight to town and back using only the keyboard, and check each
  place's colour and portrait.

## Calls I made (owner to check)

- Sequential, member-by-member combat orders replace the all-at-once panel, with Enter-to-repeat and A)uto as upgrades.
- A small C)amp in the dungeon (inspect, save, options); no equipping or item use there, because that would be new rules.
- Combat shows no party faces.
- Per-place accent colours, a `Screen glow` setting (default low), and faint border flicker.
- System monospace font, no downloads.
- Speaking mouth animation tied to typed-out lines.
- Hand-made faces are keyed by name; one named person, one face; the creator preview equals the final face exactly.
- The dungeon gets a framed layout with a message window in place of toasts; the movement pad and automap stay.
- Sell moves to the forge; I)dentify is the existing Study rule, available at the forge and on Party and packs.
- The creator keeps its free bonus-point re-roll.

## Left to the builder

Exact ornament and border drawing (CSS or canvas), font sizes and layout metrics at different window sizes, command letters
for each place (they must be unique per screen and printed), the visual design of each named face, thumbnail size, how the
shared shading code is split out, and the file layout under `src/render/ui` and `src/render/portrait`.
