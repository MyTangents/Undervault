# Sorcery: Realm of the Undervault — design

Date: 2026-11-08. Short name for files, folders and the browser tab: **Undervault**.
Status: draft for the owner's approval. Nothing but a throwaway spike has been built.

## Intent

A homage to the first Wizardry game (*Proving Grounds of the Mad Overlord*), made for the owner to enjoy and to host as a
free browser game. It is about the *essence* of that game — a party of six, a town above and a deadly maze below,
turn-by-turn combat, permadeath, the long walk home — not its names, text or art. Every name (characters, monsters, spells,
places, items, story) is original.

The owner wants the original's feel with an upgrade the 1981 hardware could not do: richer light and colour,
much larger and taller spaces, animated monsters, and combat that is exciting to win and clear about when to run.

## Goals

- Play like the original at the core: build a party, descend, fight, loot, retreat, spend, repeat; spell charges as a
  limited resource; death permanent unless the temple succeeds.
- A first-person vector dungeon that looks better than the originals could: glowing, atmospheric, colour-coded.
- Levels that are large and tall, not a flat 20×20 sheet.
- A raster monster picture for every fight, detailed and animated, in a classic Western dungeon-monster style.
- Combat where winning is exciting and a losing fight clearly pushes the player to flee.
- Runs in a browser from static hosting, with saves kept in the browser.

## Non-goals

- No real-time combat or action gameplay. Combat stays orders-then-resolve.
- No multiplayer, accounts, servers, leaderboards or in-app purchases.
- No reuse of Wizardry's names, text, spell names or art. No anime/JRPG look.
- Not a faithful clone of every Wizardry rule; the rules are adapted.
- Touch/phone controls are not part of the first version (see "My calls").
- No procedurally generated world or deep creature/body simulation in the demo (generated levels are a possible later step).
- No walkable town; the town is a menu with fast travel.

## Anti-goals (a failure even if it technically works)

- A generic neon dungeon that looks cool but plays like a different game.
- A look that reads as a computer or cyberpunk world instead of an ancient dungeon.
- Fights that end in a coin flip, or a flee option that is useless or unfair.
- Flat, same-feeling levels, or a look that never changes between areas.
- Monster art that looks like a mismatched collage of different styles.

## What the owner decided

**Name:** "Sorcery: Realm of the Undervault". The owner accepts the overlap with the existing *Sorcery!* gamebooks; the
title is a single string, so it can change before a public launch.

**Dungeon look (vector, upgraded).** Chosen from the spike: *Solid Vector* (dark solid faces with glowing edges, distance
fog) combined with *Arcane Etching* (rune glyphs on walls and floors, lantern light pooling on walls). **Correction after
playing the spike:** it leans too far into a flashy Tron / computer / cyberpunk look. Keep some vector glow and the vibe, but
it must still read as a dungeon, an ancient stone place, not a computer world. Toning-down direction (my guesses, to be
tuned by eye):
- Less bloom and neon: glow is modest and mostly comes from torches, runes and magic, not from every edge. The owner's
  slider test confirmed that lower bloom and more fog than the spike's defaults worked well.
- Muted, earthy palettes per area (for example verdigris, rust, ember, bone, deep violet), not saturated cyan and magenta.
  Pure neon colours are saved for magic and special places, so they mean something.
- Drop the glowing perspective floor grid and the CRT/scanline chrome; lines read as chiselled or etched seams in stone,
  thinner and slightly uneven, with block joints, cracks and fissures drawn as vector line-art.
- Real darkness: lighting is dominated by torches and the party's lantern, with deep shadow beyond them.
- Menus and HUD look like worn dungeon tools (parchment, ink, dim metal), not a glowing terminal.
Everything stays a tunable setting, so the look can be adjusted easily.
- Colour is per element and per area: walls, doors, runes, torches and floor lines each have their own colour, and a whole
  area (or a single room) can have its own palette, flicker level and mood.
- Torches are vector objects with animated, flickering flames that light nearby walls, so the mood moves instead of staying
  fixed like the classics.
- Runes and markings are vector line-art and carry meaning (traps, teleporters, sealed doors, places of power).

**Monsters.** They never appear in the halls. When one appears, the screen cuts to a raster picture of the monster in the
style of classic Western RPG monster art (not Japanese), more detailed and more animated than the original could manage.
The cut is a clear, dramatic moment.

**Environments.** Large and tall: levels far larger than 20×20; cavern spaces several storeys high with balconies,
bridges, ramps, ledges and stairs at different heights, visible across open space.

**Combat.** Wizardry-style rhythm: give orders to every character, then the round plays out. The owner wants it studied
and adapted (see below). Excitement when winning; losing should make the player want to flee.

**How it is built.** Browser game with Three.js; hosted as a static website; "maybe it should all be code" (the spike
tested that — see below). Generated images are acceptable for monster art "if code isn't good enough".

**Scope: a smaller demo first.** The first build is a compact, playable demo, not the full ten-level game. Procedural
(generated) levels would be "cool" but are a later step, not part of the demo.

**Elements from Dwarf Fortress** (the owner's list; creatures do *not* need that game's depth of simulation):
1. *Depth and z-levels* — the place goes down in layers (the tall, multi-storey caverns).
2. *The unknown* — an ancient, unexplored place; nobody knows what is below, and that dread is part of the pull.
3. *"Losing is fun"* — disasters and strange events that become "can you believe that!?" stories.

**Progression by discovery.** Leveling up relies partly on finding arcane knowledge and ancient weapons (the owner's
examples), which open new character-build possibilities. Exploring is how the party gets stronger and how builds diverge.

**The town** has more places and more to do than Wizardry's, but stays menu-driven: no sprawling streets, fast travel from
place to place, in the spirit of Wizardry's castle menu. Wanted: equipping (shops), finding party members, getting
information, hearing tales.

**Tone.** R-rated in places, not watered down: grim, violent, crude, morally grey.

## Reference: what Wizardry 1 does (carried over, adapted, renamed)

Written from memory; verify details when designing each system.
- **Loop:** town (tavern to recruit, inn to rest and level up, temple to heal and raise the dead, shop) then the maze (10
  levels), then back out.
- **Party:** six characters; the front three fight in melee, the back three cast or use items.
- **Characters:** five races, three alignments, six attributes, a random bonus pool at creation, four basic classes and four
  elite classes that need high attributes; aging, stat changes on level-up, class change.
- **Spells:** two schools, seven spell levels, about fifty spells, each spell level with its own charge pool. Roles:
  damage (single target and whole group), sleep and silence, buffs, detection, teleport, heals, resurrection, recall, a late
  mass kill.
- **Equipment:** class-restricted weapons and armour, unidentified and cursed items, a few legendary items, a fixed shop
  stock.
- **Dungeon:** teleporters, spinners, pits, chutes, darkness and anti-magic zones, fixed encounters, trapped chests, key
  items gating progress, wandering monsters scaled by depth.
- **Combat:** up to four monster groups (each up to nine of one kind); every character picks Fight, Spell, Parry, Use or
  Run, and targets a group; resolution in agility order; sleep, paralysis, poison, level drain, breath attacks, rare instant
  kills; running can fail; gold and XP afterward; trapped chests.
- **Story:** a mad ruler betrayed by his wizard, who hid a stolen relic in the maze beneath the castle. Thin; atmosphere
  carries it.

## Combat (adapted)

- Keep order-then-resolve for all six characters, and the front/back row split.
- Winning is exciting: impactful hits, spell effects, critical moments; the monster's raster picture visibly staggers,
  flashes and falls apart; momentum builds across a fight.
- Losing is legible: warning signs appear early (low charges, red HP, the monster's behaviour changes), so the player can
  see the fight turning in time to act.
- Fleeing is a real, tense option, not a coin flip that usually ends in death. A failed escape costs a turn rather than
  the party. Escaping is rewarded as a survived close call.
- Death stays permanent unless the temple succeeds, so the choice to flee has weight.
- Monsters act with some intent rather than purely at random.
- *Exact rules, numbers, monster behaviour and the new things the richer picture and position add are left to the builder
  to propose, using the spike and these principles.*

## Environment model

- A level is a connected 3D grid of cells with varying heights, not a single 20×20 sheet.
- Movement stays grid-step: forward, back, strafe, turn.
- Large open spaces are mixed with tight corridors so entering a big space feels like an event.
- A level may contain several vertical routes: stairs, ramps, drops, ledges visible before they are reachable.
- Still to design: how the map and automap present height; whether levels remain discrete "floors" at all.

## Technical direction (largely the author's call)

- Three.js and TypeScript in the browser, built with Vite into a static folder.
- Game rules (combat, spells, party, dungeon grid, saving) are plain code with no graphics, so thousands of fights can be
  simulated headlessly to balance the game.
- Vector rendering: the spike's approach (solid dark faces plus glowing line geometry, a shader with distance fog and
  torch lighting, bloom) is the starting point.
- Monsters: raster, shaded and animated. The spike drew one entirely in code (layered shapes, relief lighting, ordered
  dithering to a small palette, procedural breathing, blinking, lunging, hit-flash, shake, dissolve). It looked convincing
  and gave the owner a real fright. A varied bestiary this way is a large amount of drawing code with limited detail.
  Generated images with code-driven animation would give more detail. **The art method for the full bestiary is not yet
  decided.**
- Sound: generated in code (browser audio), including bleeps, torch crackle and drones.
- Hosting: a static host (GitHub Pages, Netlify or Cloudflare Pages). Saves go in browser local storage and can also be saved to a file and loaded from a file, so a game can move between devices (the owner's decision: play on any device in a browser). A quality setting lowers bloom for weaker computers. Audio starts after the first click or key press.

## The spike (throwaway, not part of the game)

`spike-hall.html` was built to feel out the look. It shows two areas (cyan crypt, gold sorcerer's wing), a doorway, wall
runes and floor sigils, flickering vector torches, grid-step movement, a glitch cut, and one code-drawn raster monster
with a simple strike and flee. The owner's reaction: liked the environment, style and colours; the wraith almost caused a
jump-scare, which is the intent. Findings: the look works; the flat map is the limitation (hence the tall caverns); the
combat in it is a stub.

## My calls (not yet agreed with the owner)

- Desktop browser with keyboard first; phone and touch controls later if wanted.
- Permadeath stays; the temple can raise the dead with a chance of failure, as in the original.
- Party of six, with new class, race, spell and monster names and a rebalanced version of the rules.
- Build order: skeleton and rules core, dungeon engine with vertical space, combat, magic, economy, then a vertical slice
  of the town plus two levels and about ten monster types, then content, story and polish.
- The story is original and short: a ruler, a betrayer, a relic, a maze beneath a castle, with names not borrowed from
  Wizardry.
- A project folder under `D:\Programs\claude\` once building starts; it is not in the Dirk Launcher repository.
- **Free and non-commercial.** It is a hobby game hosted free; no budget for commissioned art. Art is code-first, and
  generated images are acceptable if code falls short. The choice for the full bestiary is made after the first playable
  slice, so the slice is planned around code-drawn monsters and a swappable monster-picture layer.
- **Mapping (the owner's decision):** a setting with two choices, automap or no automap. The automap is on by default
  because the owner has no time to draw maps; players who want the original experience can switch it off. The automap fills
  in as the party explores (the original had none) and shows height. Spinners, teleporters, darkness and
  anti-magic zones, chutes and pits all still work in 3D spaces. Whether levels stay discrete "floors" is left to the
  builder.
- **Difficulty:** old-school hard but fair. A careless party can be wiped out, and permadeath, level drain and rare
  instant-kill effects exist. Losses are telegraphed so the player can flee. "Not a coin flip" means outcomes are driven by
  readable state, not that the game is easy. The headless simulator is tuned to this target.
- **Title:** the working title stays; the title is one configurable string, and a trademark check is done before any
  public launch.

## Progression, town and demo scope (my reading of the owner's wishes; mark anything wrong)

- **Progression:** XP still raises the basics (HP, hit chance) so a party stays alive. Discoveries open new *options*
  rather than raw numbers: arcane knowledge unlocks spells and techniques, ancient weapons unlock fighting styles, and
  relics open class paths unavailable at the start. No two parties end up the same.
- **Stories:** the Undervault produces strange, unscripted-feeling events, good and bad (a collapse, a flood, monsters
  fighting each other, a cursed relic misbehaving). They are surprising but traceable afterward, never arbitrary. The game
  keeps a short chronicle of each party's story so these moments are remembered. The details of how events are produced are
  left to the builder.
- **Town:** a menu of places with instant travel between them. Each place does more than Wizardry's: shops (some stock
  only unlocked by what the party has found), a recruiter for new members, informants, and a place to hear tales. The tales
  and information point at the arcane knowledge and ancient weapons that drive progression, so listening has mechanical value.
- **Tone:** gritty, violent, crude and dark in humour — R-rated storytelling, not explicit content. A short content notice
  is shown on the public site.
- **Demo scope (my guess):** the town plus a few levels of the Undervault, hand-built and deep enough to show tall
  caverns, combat, discovery-based growth, and a handful of tales. Procedural levels are later.

## Decided since the reviewer's check

- Scale: a smaller demo first (above).
- Art: code first; generated images acceptable for monsters if code-drawn art is not good enough for a varied bestiary.

## Left to the builder

Exact numbers (stats, damage, XP, costs), the full class/race/spell/item/monster lists, map layouts, UI layout and menus,
automap design for tall spaces, audio, the save format, the visual transition details, and how combat feedback is staged.
