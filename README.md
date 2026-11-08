# Sorcery: Realm of the Undervault

A first-person dungeon crawler in the spirit of the first Wizardry, played in the browser. A party of six, a town above,
and beneath it an ancient, unexplored place that goes down in tall caverns and many storeys. Turn-by-turn combat, permadeath,
discoveries that open new ways to play, and a chronicle of every party's story.

**Status: playable demo.** The town of Crowhithe, three hand-built levels (the Crypt of the Gate, the Rope Cathedral, the
Drop of Names), ten monsters, five discoveries, twelve tales, and an ending.

Content is R-rated storytelling (violence, crude language, dark humour; nothing explicit). The game shows a short notice on
first load.

## Playing

The whole game is played from the keyboard, in the manner of the old crawlers: every screen prints its commands as `F)ight`,
`B)uy`, `S)ell`, and the letter in the brackets is the key. Lists open in a box: press the row's number (or letter), or use
Up and Down and Enter. Escape backs out. Everything can also be clicked or tapped.

- **Title.** N)ew game, C)ontinue, L)oad from file, S)ettings. The first key press also starts the sound.
- **Town** (Crowhithe) is a menu of places, each with its own colour and a face you can talk to: T)avern, F)orge,
  H)ouse of Ash, I)nn, M)aud's, L)amp and Lung, P)arty and packs, and E)nter the Undervault. Esc opens the system box
  (save, load, options, quit to title).
  - At the Sump Tap you R)ecruit (the highlighted recruit's face is shown), make a N)ew character (name, race, alignment,
    attributes, class, with the face shown live, exactly as the character will look), O)rder the party, or D)ismiss.
  - The forge sells (B)uy), buys (S)ell) and I)dentifies. The House of Ash raises the dead (the ash rite asks first), the inn
    rests the party, Maud sells news, and old Tamsin at the Lamp and Lung tells tales (the face on the wall is whoever is telling).
  - The faces are drawn in code, like the monsters: every named person, every recruit and every character has one.
- **Party order.** Slots 1 to 3 are the front rank and 4 to 6 the back. Move members with O)rder the party at the tavern or
  R)eorder in the dungeon camp: pick someone, move them with Up and Down, Enter keeps it and Esc puts it back. When a fight
  ends, the fallen drop to the bottom of the order, and the living move up.
- **The dungeon** is first person. `W`/`S` walk, `A`/`D` turn, `Q`/`E` sidestep, `R`/`F` climb or descend stairs, `Z`/`X`
  look up or down (useful in the tall caverns), `[` `]` change the map's storey. C)amp opens the camp (inspect a member,
  reorder the party, save, options) and Esc the system box. On-screen buttons walk too. Things that happen are written in the
  message window under the view.
- **The automap** fills in as you explore and shows height. It is on by default; turn it off in Options to draw your own.
- **Combat** asks each member in turn: `Gudrun's options: F)ight S)pell P)arry U)se R)un T)ake back`. Fight and spell
  targets are picked from numbered lists; Enter repeats a member's last order, and A)uto plays the suggested round. Warnings
  tell you when a fight is turning, and running away is a real option: a failed escape costs the round, not the party.
- **Growth** comes from experience (at the inn) and from discoveries: arcane knowledge, ancient weapons and relics open new
  spells, techniques and build paths.
- **Options** (Esc, then O, or S at the title): bloom, torch flicker, fog, lantern, quality, automap, and the screen glow of the
  menu borders (off, low, normal).
- **Saving.** The game autosaves in your browser. **Save to file** downloads a save you can load in any browser on any device
  (Title screen, system box, camp or ending: *Load from file*).

## Running it

```bash
npm install
npm run dev     # play locally (http://localhost:5173)
npm test        # the rules and content tests
npm run sim     # balance tables: random encounters by depth, and the set-piece fights by party level
npm run build   # a static site in dist/, ready for any web host
npm run deploy  # build and publish to the gh-pages branch (GitHub Pages)
```

Node 24 or newer. The built site uses relative paths, so `dist/` works from any folder or host. The game is published at
https://mytangents.github.io/Undervault/ from the `gh-pages` branch; `npm run deploy` rebuilds it and replaces that branch
(it never touches `main`). `docs/dev/pages.yml.example` is a workflow that would do the same on every push, for when the
GitHub login has permission to add workflows.

## How it is built

TypeScript, Vite and Three.js. All the rules (`src/core`) are plain code with no graphics, so they can be tested and
simulated headlessly; the dungeon view, monster pictures, audio and screens (`src/render`) sit on top.
Everything is drawn or generated in code: the glowing vector dungeon, the flickering torches, the raster monster pictures and
the faces of the town (relief-lit and dithered, on one shared shading pipeline), the framed menus, and the sound. The monster picture layer is swappable, so generated art can replace any of them
(`src/render/monster/image.ts`).

Levels are plain text files in `levels/`. See `levels/test-mini.level` for the format. Each level is a stack of storeys, with
header lines for areas, exits, discoveries, events and encounters.

All names (people, places, monsters, spells, items) are original, and `tests/names.test.ts` guards that.

## Design

`docs/superpowers/specs/2026-11-08-undervault-design.md` is the design, and
`docs/superpowers/plans/2026-11-08-undervault-demo-plan.md` is the plan this demo was built from. `docs/superpowers/specs/2026-11-08-wizardry-ui-design.md` and
`docs/superpowers/plans/2026-11-08-wizardry-ui-plan.md` are the design and plan of the keyboard-driven menus and the town faces.
`docs/dev/spike-hall.html` is the throwaway prototype the look came from. `docs/story/story-kit.md` is the writer's kit of reworkable story elements (tables, recipes, tales, event seeds, chronicle lines, discovery hooks) that the town tales, events and discoveries were drawn from; most of it is still to be mined.

## Before a public launch

The title overlaps the existing *Sorcery!* gamebooks (it lives in one place, `src/title.ts`). Check it, and the rest of the
names, before publishing.
