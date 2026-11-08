# Sorcery: Realm of the Undervault

A first-person dungeon crawler in the spirit of the first Wizardry, played in the browser. A party of six, a town above,
and beneath it an ancient, unexplored place that goes down in tall caverns and many storeys. Turn-by-turn combat, permadeath,
discoveries that open new ways to play, and a chronicle of every party's story.

**Status: playable demo.** The town of Crowhithe, three hand-built levels (the Crypt of the Gate, the Rope Cathedral, the
Drop of Names), ten monsters, five discoveries, twelve tales, and an ending.

Content is R-rated storytelling (violence, crude language, dark humour; nothing explicit). The game shows a short notice on
first load.

## Playing

- **Town** (Crowhithe) is a menu: recruit or create party members at the Sump Tap, buy gear at the forge, raise the dead at
  the House of Ash, sleep and level up at the Last Mattress, ask Maud for information, and hear tales from Old Tamsin. The tales
  point at things worth finding below.
- **The dungeon** is first person. `W`/`S` walk, `A`/`D` turn, `Q`/`E` sidestep, `R`/`F` climb or descend stairs, `Z`/`X` look
  up or down (useful in the tall caverns), `[` `]` change the map's storey, `Esc` opens settings. On-screen buttons do the same.
- **The automap** fills in as you explore and shows height. It is on by default; turn it off in Settings to draw your own.
- **Combat** is orders first, then the round plays out. Parrying and running are always available. Warning chips tell you
  when a fight is turning, and running away is a real option: a failed escape costs the round, not the party.
- **Growth** comes from experience (at the inn) and from discoveries: arcane knowledge, ancient weapons and relics open new
  spells, techniques and build paths.
- **Saving.** The game autosaves in your browser. **Save to file** downloads a save you can load in any browser on any device
  (Title screen, Settings or Town: *Load from file*).

## Running it

```bash
npm install
npm run dev     # play locally (http://localhost:5173)
npm test        # the rules and content tests
npm run sim     # balance tables: random encounters by depth, and the set-piece fights by party level
npm run build   # a static site in dist/, ready for any web host
```

Node 24 or newer. The built site uses relative paths, so `dist/` works from any folder or host. A sample GitHub Pages
workflow is in `docs/dev/pages.yml.example`.

## How it is built

TypeScript, Vite and Three.js. All the rules (`src/core`) are plain code with no graphics, so they can be tested and
simulated headlessly; the dungeon view, monster pictures, audio and screens (`src/render`) sit on top.
Everything is drawn or generated in code: the glowing vector dungeon, the flickering torches, the raster monster pictures
(relief-lit and dithered), and the sound. The monster picture layer is swappable, so generated art can replace any of them
(`src/render/monster/image.ts`).

Levels are plain text files in `levels/`. See `levels/test-mini.level` for the format. Each level is a stack of storeys, with
header lines for areas, exits, discoveries, events and encounters.

All names (people, places, monsters, spells, items) are original, and `tests/names.test.ts` guards that.

## Design

`docs/superpowers/specs/2026-11-08-undervault-design.md` is the design, and
`docs/superpowers/plans/2026-11-08-undervault-demo-plan.md` is the plan this demo was built from. `docs/dev/spike-hall.html`
is the throwaway prototype the look came from. `docs/story/story-kit.md` is the writer's kit of reworkable story elements (tables, recipes, tales, event seeds, chronicle lines, discovery hooks) that the town tales, events and discoveries were drawn from; most of it is still to be mined.

## Before a public launch

The title overlaps the existing *Sorcery!* gamebooks (it lives in one place, `src/title.ts`). Check it, and the rest of the
names, before publishing.
