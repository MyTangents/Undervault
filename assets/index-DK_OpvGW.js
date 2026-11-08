(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`
:root{--bg:#07060a;--bg2:#100d12;--text:#e6d9b8;--dim:#9a8f78;--accent:#c9b787;--ok:#7fa05f;--bad:#c4503a;--gold:#d9b25a;--line:#2a2418}
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:var(--bg);color:var(--text);font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',Menlo,'Courier New',monospace;overflow:hidden}
button{font:inherit;color:var(--text);background:transparent;border:1px solid var(--accent);border-radius:0;padding:.3em .8em;cursor:pointer}
button:hover:not(:disabled){background:color-mix(in srgb,var(--accent) 22%,transparent)}
button:disabled{opacity:.4;cursor:default}
button.quiet{border-color:var(--line);color:var(--dim)}
select,input[type=text],input[type=number]{font:inherit;background:var(--bg2);color:var(--text);border:1px solid var(--accent);border-radius:0;padding:.25em .4em}
input[type=range]{accent-color:var(--accent)}
h1,h2,h3{margin:.2em 0;font-weight:normal;letter-spacing:.06em}
.mono{font-family:inherit}
.dim{opacity:.6}
.bad{color:var(--bad)}.good{color:#9ab87a}
#app{position:fixed;inset:0}
.screen{position:absolute;inset:0;display:flex;flex-direction:column}
.panel{background:var(--bg2);color:var(--text);border:3px double var(--accent);padding:.7em .9em;box-shadow:0 0 0 1px #000,0 6px 18px #000c}
.panel h3{border-bottom:1px solid var(--line);padding-bottom:.2em;margin-bottom:.5em;color:var(--accent)}
.row{display:flex;gap:.6em;align-items:center}
.grow{flex:1}
.stack>*+*{margin-top:.5em}
.toast{position:fixed;left:50%;top:14px;transform:translateX(-50%);background:#0b090cf0;color:var(--text);border:1px solid var(--accent);padding:.5em 1em;max-width:70ch;z-index:50;box-shadow:0 4px 14px #000a;pointer-events:none}

/* frames, command bar, message window, roster strip, dialogues */
.frame{position:relative;border:3px double var(--accent);background:var(--bg2);padding:1.1em .8em .7em;min-width:0;min-height:0}
.frame>.c{position:absolute;width:9px;height:9px;background:var(--accent)}
.frame>.c.tl{left:-6px;top:-6px}.frame>.c.tr{right:-6px;top:-6px}.frame>.c.bl{left:-6px;bottom:-6px}.frame>.c.br{right:-6px;bottom:-6px}
.frame>.ftitle{position:absolute;left:1.1em;top:-.75em;background:var(--bg);color:var(--accent);padding:0 .6em;letter-spacing:.08em}
.frame>.fbody{min-height:0;height:100%}
html[data-glow=low] .frame{box-shadow:0 0 10px color-mix(in srgb,var(--accent) 22%,transparent);animation:flick 5s infinite steps(1)}
html[data-glow=normal] .frame{box-shadow:0 0 20px color-mix(in srgb,var(--accent) 45%,transparent);animation:flick 3.4s infinite steps(1)}
html:not([data-glow]) .frame{box-shadow:0 0 10px color-mix(in srgb,var(--accent) 22%,transparent)}
@keyframes flick{0%{opacity:1}43%{opacity:.93}46%{opacity:1}81%{opacity:.95}84%{opacity:1}}
@media (prefers-reduced-motion:reduce){.frame{animation:none!important}}
.cmdbar{display:flex;flex-wrap:wrap;gap:.2em 1.2em;padding:.3em .2em}
.cmdbar .cmd{border:none;padding:.15em .2em;background:none}
.cmdbar .cmd .k{color:var(--accent);font-weight:bold}
.cmdbar .cmd.off{opacity:.35;cursor:default}
.msgwin{min-height:6.5em;max-height:9em;overflow:hidden;line-height:1.45;padding:.1em .3em}
.msgwin .line{opacity:.6}.msgwin .line.new{opacity:1}
.roster{display:flex;flex-direction:column;gap:1px;font-size:.88rem}
.roster .rrow{display:grid;grid-template-columns:1.4em auto 1fr auto auto auto;gap:.6em;align-items:center;padding:.1em .3em;cursor:default}
.roster .rrow:not(:has(.thumb)){grid-template-columns:1.4em 1fr auto auto auto}
.roster .rrow.back .slot{color:var(--dim)}
.roster .rrow.front .slot{color:var(--accent)}
.roster .rrow.sel{background:color-mix(in srgb,var(--accent) 25%,transparent)}
.roster .rrow.dead .nm{text-decoration:line-through;opacity:.55}
.roster .rrow .cls,.roster .rrow .st{opacity:.7}
.roster .thumb canvas{display:block;width:32px;height:40px;image-rendering:pixelated}
#ui-layer:not(:empty){position:fixed;inset:0;z-index:55}
.dialog{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;min-width:min(26rem,92vw);max-width:92vw;max-height:84vh;overflow:auto;background:var(--bg2);border:3px double var(--accent);padding:1em 1.2em;box-shadow:0 0 0 100vmax #000a,0 0 30px #000}
.dialog .dlg-title{color:var(--accent);letter-spacing:.08em;margin-bottom:.6em;border-bottom:1px solid var(--line);padding-bottom:.3em}
.dialog .row{display:flex;gap:.6em;padding:.15em .3em;cursor:pointer;justify-content:flex-start}
.dialog .row .mark{width:1ch}
.dialog .row .det{margin-left:auto;opacity:.75;padding-left:1.5em}
.dialog .row.sel{background:var(--accent);color:var(--bg)}
.dialog .row.off{opacity:.4}
.dialog .dlg-text{margin-bottom:.8em;line-height:1.45}
.dialog .cmds{display:flex;gap:1.5em}
.dialog.options .meter{letter-spacing:.05em;color:var(--accent);margin-right:.6em}
.dialog.options .step{padding:0 .5em;margin-left:.4em}
.title .cmdbar{flex-direction:column;align-items:center;gap:.5rem}
.title .cmdbar .cmd{font-size:1.1rem;padding:.3em 1em;border:1px solid var(--accent)}
.title .cmdbar .cmd.off{border-color:var(--line)}
.dialog .field{font-size:1.2rem;padding:.4em 0}.dialog .cursor{animation:blink 1s steps(1) infinite}
.dialog .field{position:relative}
.dialog input.namefield{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;border:0;background:transparent;color:transparent;caret-color:transparent;font-size:16px}
@keyframes blink{50%{opacity:0}}
.dialog .hint{opacity:.6;font-size:.82rem}
.cmd.off{opacity:.35}

/* the town screens */
.townx{padding:12px;gap:10px;display:grid;grid-template-columns:minmax(15rem,21rem) 1fr minmax(16rem,24rem);grid-template-rows:auto minmax(0,1fr) auto;grid-template-areas:"head head head" "left mid right" "bar bar bar"}
.townx .thead{grid-area:head;display:flex;justify-content:space-between;align-items:baseline;padding:0 .3em}
.townx .left,.townx .mid,.townx .right{min-height:0;padding:14px 9px 8px;overflow-x:hidden;overflow-y:auto}
.townx .left{grid-area:left}.townx .mid{grid-area:mid}.townx .right{grid-area:right}
.townx .mid>.frame{height:100%}
.townx .barslot{grid-area:bar}
.townx .mid .msgwin{max-height:none;height:100%;min-height:10em;overflow:auto;font-size:1.02rem}
.townx .face{display:flex;justify-content:center;padding:.2em 0 .6em}
.townx .face canvas{width:256px;max-width:100%;aspect-ratio:128/160;image-rendering:pixelated;border:1px solid var(--line);background:#000}
.townx .blurb{margin:.2em .2em;opacity:.85;line-height:1.4;font-size:.9rem}
.townx .sceneextra{font-size:.88rem;line-height:1.45;padding:.3em .2em}
.townx .cmdbar{border-top:1px solid var(--line);padding-top:.5em;font-size:1.05rem;gap:.3em 1.6em}
@media (max-width:900px){
  .townx{grid-template-columns:minmax(0,1fr);grid-template-rows:none;grid-auto-rows:auto;grid-template-areas:"head" "left" "mid" "right" "bar";overflow:auto}
  .townx .face canvas{width:160px}
  .townx .barslot,.dungeon2 .dbar,.combat2 .bottom{position:sticky;bottom:0;background:var(--bg);z-index:5;padding-top:.3em}
  .townx .left,.townx .mid,.townx .right{overflow:visible;min-height:auto}
  .townx .mid .msgwin{height:auto;min-height:6em;max-height:14em;overflow:auto}
}

/* the dungeon */
.dungeon2{padding:12px;gap:10px;display:grid;grid-template-columns:1fr minmax(15rem,21rem);grid-template-rows:minmax(0,1fr) auto auto auto;grid-template-areas:"vf aside" "wf wf" "rf rf" "bar bar"}
.dungeon2 .vf{grid-area:vf;min-height:0;min-width:0;padding:14px 9px 8px}.dungeon2 .vf>.frame{height:100%}.dungeon2 .vf .fbody{padding:0}
.dungeon2 aside{grid-area:aside;display:flex;flex-direction:column;gap:14px;padding:14px 9px 8px;overflow:auto;min-height:0}
.dungeon2 .wf{grid-area:wf;padding:6px 9px}.dungeon2 .rf{grid-area:rf;padding:6px 9px}.dungeon2 .dbar{grid-area:bar}
.dungeon2 .view{position:relative;width:100%;height:100%;min-height:12rem;background:#000}
.dungeon2 canvas.gl{position:absolute;inset:0;width:100%;height:100%;display:block}
.dungeon2 .vf{overflow:hidden}
.dungeon2 .hud{position:absolute;left:12px;top:10px;font-size:.9rem;text-shadow:0 1px 3px #000;pointer-events:none;color:var(--text)}
.dungeon2 canvas.map{width:100%;max-height:30vh;object-fit:contain;aspect-ratio:1;background:#0a0806;border:1px solid var(--line);image-rendering:pixelated;display:block}
.dungeon2 .pad{display:grid;grid-template-columns:repeat(3,1fr);gap:.3rem}
.dungeon2 .msgwin{min-height:3.2em;max-height:4.8em;font-size:.95rem}
.dungeon2 .frame{padding:1em .6em .5em}
.dungeon2 .wf,.dungeon2 .rf{padding:4px 9px}
.dungeon2 .roster{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-flow:row;gap:0 .8rem;font-size:.82rem}
.dungeon2 .roster .rrow{grid-template-columns:1.4em 1fr auto auto}.dungeon2 .roster .rrow .st{display:none}
.dungeon2 .pad button{padding:.15em 0}
.dungeon2 .legend{opacity:.7;font-size:.85rem;padding:.1em .2em}
@media (max-width:900px){
  .dungeon2{grid-template-columns:minmax(0,1fr);grid-template-rows:none;grid-auto-rows:auto;grid-template-areas:"vf" "aside" "wf" "rf" "bar";overflow:auto}
  .dungeon2 .view{height:46vh}
  .dungeon2 .vf{overflow:visible;min-height:auto}.dungeon2 aside{min-height:auto}
  .dungeon2 aside{flex-direction:column;overflow:visible}
  .dungeon2 aside>.frame:nth-child(2){order:-1}
  .dungeon2 .pad button{padding:.7em 0}
  .dungeon2 .roster{grid-template-columns:repeat(2,1fr)}
}

/* combat */
.combat2{padding:12px;gap:10px;display:grid;grid-template-columns:minmax(16rem,26rem) 1fr minmax(15rem,22rem);grid-template-rows:minmax(0,1fr) auto;grid-template-areas:"scene talk party" "bottom bottom bottom";background:radial-gradient(ellipse at 50% 20%,#1a140e 0,#07060a 70%)}
.combat2 .scene{grid-area:scene}.combat2 .talk{grid-area:talk}.combat2 .party{grid-area:party}.combat2 .bottom{grid-area:bottom}
.combat2 .scene,.combat2 .talk,.combat2 .party{min-height:0;padding:14px 9px 8px;overflow-x:hidden;overflow-y:auto}
.combat2 .talk>.frame{height:100%}.combat2 .talk .msgwin{max-height:none;height:100%;font-size:1.02rem}
.combat2 .pic{display:flex;justify-content:center;background:#000;border:1px solid var(--line)}
.combat2 canvas.mon{width:100%;max-width:340px;aspect-ratio:192/240;image-rendering:pixelated;display:block}
.combat2 .groups{display:flex;gap:.4rem;flex-wrap:wrap;justify-content:center;margin-top:.6rem}
.combat2 .groups button.sel{outline:2px solid var(--gold)}
.combat2 .prompt{padding:.2em .3em;color:var(--accent);min-height:1.5em}
.combat2 .cmdbar{font-size:1.1rem;gap:.3em 1.6em}
@media (max-width:900px){.combat2{grid-template-columns:minmax(0,1fr);grid-template-rows:none;grid-auto-rows:auto;grid-template-areas:"scene" "talk" "party" "bottom";overflow:auto}
  .combat2 .scene,.combat2 .talk,.combat2 .party{overflow:visible;min-height:auto}.combat2 canvas.mon{max-width:240px}.combat2 .talk .msgwin{height:auto;min-height:6em;max-height:14em;overflow:auto}}

/* the Roll and the ending */
.endx{align-items:center;justify-content:center;padding:14px;background:radial-gradient(ellipse at 50% 38%,#1c1612 0,#07060a 72%);overflow:auto}
.endx>.frame{width:min(46rem,94vw);max-height:94vh;overflow:auto;padding:1.4em 1.2em 1em}
.endx .face{display:flex;justify-content:center;padding-bottom:.6em}
.endx .face canvas{width:200px;aspect-ratio:128/160;image-rendering:pixelated;border:1px solid var(--line);background:#000}
.endx .msgwin{max-height:none}

/* title */
.title{align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse at 50% 38%,#1c1710 0,#09070a 62%,#050406 100%)}
.title h1{font-size:clamp(2.2rem,8vw,5rem);color:#e9d9ae;text-shadow:0 0 14px #b8923e55,0 3px 0 #000;letter-spacing:.14em;margin:0}
.title h2{font-size:clamp(1rem,3vw,1.6rem);color:var(--dim);margin-bottom:1.4rem;font-style:italic}
.title .blurb{max-width:46ch;opacity:.8;margin:0 auto 1.6rem}
.title .menu{display:flex;flex-direction:column;gap:.6rem;width:min(18rem,80vw)}
.title .notice{position:absolute;bottom:14px;left:0;right:0;font-size:.8rem;opacity:.55;padding:0 1rem}

/* tales (the chronicle on the ending screens) */
.tale{border-left:3px solid var(--gold);padding-left:.8em;margin:.6em 0;font-style:italic}

`,t=`SORCERY`,n=`Realm of the Undervault`,r=`Sorcery: Realm of the Undervault`;function i(e,t=null,...n){let r=document.createElement(e);for(let[e,n]of Object.entries(t??{}))n!=null&&n!==!1&&(e.startsWith(`on`)&&typeof n==`function`?r.addEventListener(e.slice(2),n):e===`class`?r.className=String(n):e===`style`?r.setAttribute(`style`,String(n)):e===`value`||e===`checked`||e===`disabled`||e===`selected`?r[e]=n:r.setAttribute(e,String(n)));for(let e of n.flat())e!==null&&e!==!1&&e!==void 0&&r.append(typeof e==`object`?e:document.createTextNode(String(e)));return r}var a=[`str`,`iq`,`pie`,`vit`,`agi`,`luck`],o=[{id:`human`,name:`Human`,base:{str:8,iq:8,pie:8,vit:8,agi:8,luck:8}},{id:`barrowfolk`,name:`Barrowfolk`,base:{str:10,iq:6,pie:7,vit:10,agi:6,luck:7}},{id:`lanternkin`,name:`Lanternkin`,base:{str:6,iq:8,pie:9,vit:7,agi:10,luck:10}},{id:`thornborn`,name:`Thornborn`,base:{str:7,iq:10,pie:10,vit:6,agi:9,luck:6}},{id:`cinderkin`,name:`Cinderkin`,base:{str:9,iq:7,pie:5,vit:9,agi:8,luck:9}}],s=[{id:`blade`,name:`Blade`,elite:!1,gates:{str:11},alignments:[`good`,`neutral`,`evil`],hpDie:10,abilities:[],canUse:[`sword`,`axe`,`mace`,`dagger`,`heavy`,`light`,`shield`,`helm`,`trinket`]},{id:`spellwright`,name:`Spellwright`,elite:!1,gates:{iq:11},alignments:[`good`,`neutral`,`evil`],hpDie:4,school:`arcane`,abilities:[],canUse:[`dagger`,`staff`,`robe`,`trinket`]},{id:`votary`,name:`Votary`,elite:!1,gates:{pie:11},alignments:[`good`,`neutral`],hpDie:8,school:`sacred`,abilities:[],canUse:[`mace`,`staff`,`light`,`shield`,`helm`,`trinket`]},{id:`cutpurse`,name:`Cutpurse`,elite:!1,gates:{agi:11},alignments:[`neutral`,`evil`],hpDie:6,abilities:[`disarm`],canUse:[`dagger`,`sword`,`light`,`trinket`]},{id:`oathblade`,name:`Oathblade`,elite:!0,gates:{str:14,iq:10,pie:13,vit:13,agi:10,luck:12},alignments:[`good`],hpDie:10,school:`sacred`,abilities:[],canUse:[`sword`,`axe`,`mace`,`heavy`,`light`,`shield`,`helm`,`trinket`]},{id:`shade`,name:`Shade`,elite:!0,gates:{str:13,iq:11,pie:10,vit:12,agi:15,luck:12},alignments:[`neutral`,`evil`],hpDie:6,abilities:[`disarm`,`identify`],canUse:[`dagger`,`sword`,`light`,`trinket`]}],c=[{id:`cinder-dart`,name:`Cinder Dart`,school:`arcane`,level:1,kind:`damage`,target:`single`,power:[2,4]},{id:`lull`,name:`Lull`,school:`arcane`,level:1,kind:`sleep`,target:`group`,power:[0,0]},{id:`gloamward`,name:`Gloamward`,school:`arcane`,level:1,kind:`buff`,target:`party`,power:[0,0]},{id:`seam-sight`,name:`Seam Sight`,school:`arcane`,level:1,kind:`detect`,target:`party`,power:[0,0]},{id:`ash-gust`,name:`Ash Gust`,school:`arcane`,level:2,kind:`damage`,target:`group`,power:[2,5]},{id:`hush`,name:`Hush`,school:`arcane`,level:2,kind:`silence`,target:`group`,power:[0,0]},{id:`name-thing`,name:`Name the Thing`,school:`arcane`,level:2,kind:`identify`,target:`single`,power:[0,0]},{id:`kiln-roar`,name:`Kiln Roar`,school:`arcane`,level:3,kind:`damage`,target:`group`,power:[4,6],discoveryId:`lienholders-primer`},{id:`slip-knot`,name:`Slip the Knot`,school:`arcane`,level:3,kind:`escape`,target:`party`,power:[0,0]},{id:`mend`,name:`Mend`,school:`sacred`,level:1,kind:`heal`,target:`ally`,power:[1,8]},{id:`rebuke`,name:`Rebuke`,school:`sacred`,level:1,kind:`damage`,target:`single`,power:[1,6]},{id:`deeper-mend`,name:`Deeper Mend`,school:`sacred`,level:2,kind:`heal`,target:`ally`,power:[3,8]},{id:`still-tongue`,name:`Still Tongue`,school:`sacred`,level:2,kind:`silence`,target:`single`,power:[0,0]},{id:`mass-mend`,name:`Mass Mend`,school:`sacred`,level:3,kind:`heal`,target:`party`,power:[2,8],discoveryId:`tally-hymnal`},{id:`lantern-ward`,name:`Lantern Ward`,school:`sacred`,level:3,kind:`buff`,target:`party`,power:[0,0]}],l=[{id:`bread-knife`,name:`Bread Knife`,kind:`weapon`,tag:`dagger`,price:8,damage:[1,3]},{id:`short-sword`,name:`Candler's Shortsword`,kind:`weapon`,tag:`sword`,price:40,damage:[1,6]},{id:`hand-axe`,name:`Quarryman's Axe`,kind:`weapon`,tag:`axe`,price:55,damage:[1,8]},{id:`iron-mace`,name:`Ash-Sister's Mace`,kind:`weapon`,tag:`mace`,price:45,damage:[1,6]},{id:`oak-staff`,name:`Oak Staff`,kind:`weapon`,tag:`staff`,price:20,damage:[1,4]},{id:`leather-jerkin`,name:`Leather Jerkin`,kind:`armour`,tag:`light`,price:50,ac:2},{id:`chain-shirt`,name:`Chain Shirt`,kind:`armour`,tag:`heavy`,price:200,ac:4},{id:`scholar-robe`,name:`Scholar's Robe`,kind:`armour`,tag:`robe`,price:60,ac:1},{id:`round-shield`,name:`Round Shield`,kind:`shield`,tag:`shield`,price:35,ac:1},{id:`iron-cap`,name:`Iron Cap`,kind:`helm`,tag:`helm`,price:30,ac:1},{id:`mending-draught`,name:`Mending Draught`,kind:`consumable`,tag:`potion`,price:30,spellId:`mend`},{id:`overdraft-blade`,name:`The Overdraft Blade`,kind:`weapon`,tag:`sword`,price:600,damage:[2,8],cursed:!0,unidentifiedName:`Odd Sword`},{id:`sealed-ledger-key`,name:`Key to the Sealed Ledger`,kind:`trinket`,tag:`trinket`,price:900}],u=[{id:`ledger-rat`,name:`Ledger Rat`,depth:[1,2],hp:[1,4],ac:1,attacks:1,damage:[1,3],group:[3,7],behaviour:`swarm`,xp:3,gold:[1,2],pictureId:`rat`},{id:`wick-slime`,name:`Wick Slime`,depth:[1,2],hp:[2,8],ac:1,attacks:1,damage:[1,4],group:[1,4],behaviour:`brute`,xp:8,gold:[2,8],pictureId:`slime`},{id:`tally-skeleton`,name:`Tally Skeleton`,depth:[1,3],hp:[1,8],ac:3,attacks:1,damage:[1,4],group:[2,6],behaviour:`swarm`,xp:10,gold:[1,6],pictureId:`skeleton`},{id:`drum-orc`,name:`Drum Orc`,depth:[1,3],hp:[1,10],ac:4,attacks:1,damage:[1,6],group:[1,4],behaviour:`skittish`,xp:15,gold:[3,10],pictureId:`orc`},{id:`singing-cultist`,name:`Singing Cultist`,depth:[1,3],hp:[1,6],ac:2,attacks:1,damage:[1,4],group:[1,3],behaviour:`caster`,spells:[`cinder-dart`,`hush`],xp:20,gold:[2,8],pictureId:`cultist`},{id:`bone-wolf`,name:`Bone Wolf`,depth:[2,4],hp:[2,6],ac:4,attacks:1,damage:[1,6],group:[3,7],behaviour:`swarm`,xp:18,gold:[0,0],pictureId:`wolf`},{id:`cellar-ghoul`,name:`Cellar Ghoul`,depth:[2,4],hp:[2,8],ac:4,attacks:2,damage:[1,4],group:[1,4],behaviour:`brute`,xp:25,gold:[4,12],pictureId:`ghoul`},{id:`hollow-wraith`,name:`Hollow Wraith`,depth:[2,5],hp:[5,8],ac:5,attacks:1,damage:[1,8],group:[1,3],behaviour:`ambusher`,xp:60,gold:[5,15],pictureId:`wraith`},{id:`still-gargoyle`,name:`Still Gargoyle`,depth:[3,5],hp:[8,8],ac:6,attacks:1,damage:[2,8],group:[1,2],behaviour:`ambusher`,xp:70,gold:[6,18],pictureId:`gargoyle`},{id:`repossessor`,name:`Repossessor`,depth:[3,5],hp:[14,8],ac:8,attacks:3,damage:[2,8],group:[1,1],behaviour:`caster`,spells:[`hush`,`cinder-dart`,`lull`],xp:300,gold:[20,50],pictureId:`demon`}],d=[{id:`tale-sword-that-screamed`,speaker:`Maud the Lender`,tone:`funny`,hints:`overdraft-blade`,text:`"A fellow came in with a sword that screamed. I said I'd give him three silver for it. He said it was worth three hundred, so I held it up to the lamp and it said, loud as a bell, 'He owes me forty.' I paid him nothing. The Overdraft Blade is in the Pawn Gallery, third case, and it wants a new owner with good credit."`},{id:`tale-missing-book`,speaker:`Old Tamsin Quell`,tone:`sad`,text:`"I had a daughter, Ria, who went down the Tallow Stair with a candle and a book. She came up in three pieces, which is the number the Wardens like. But I counted: there was a fourth. Her book was not in any of them. Find me the book. I'll tell you what is in it if you bring it back."`},{id:`tale-stranger-ash`,speaker:`Sister Ottoline`,tone:`uplifting`,text:`"Three weeks ago a man came in with an urn he had carried from the deep. Not his own. A stranger's. He had gone out of his way, down seven stairs, to bring a stranger's ash home. We raised her, no charge. She walked out of here and shook his hand. Find the man, he is still in town, and ask him what else he's carried."`},{id:`tale-place-card`,speaker:`Brannoch the Bold`,tone:`memorable`,hints:`lienholders-primer`,text:`"I went down once. Reached the Receiving Hall. Table forty paces long, set for guests. A place card with my name on it. I'd never told anyone my real name was Dennis. I left my sword on the table and ran. The place cards are still there. Yours might be too. There's writing on the wall behind them, a lesson, I think. I did not stay to read it."`},{id:`tale-regret-and-lute`,speaker:`Hobb Ferrule`,tone:`funny`,text:`"Sold a boy a sword last month. He said, 'Does it come with a guarantee?' I said, 'It comes with a name.' It's called Regret. He took it down to the Choir Cistern and a mermaid hit him with a lute. Don't ask about the lute. Ask about the mermaid."`},{id:`tale-same-name`,speaker:`Corporal Moss`,tone:`sad`,hints:`saint-orrels-ledger`,text:`"I read out a name this morning that I'd read out eleven years ago. Same name. Same spelling. Either the dead are coming back and dying again, or someone's using the name. I'd like to know which. I'd prefer the first. The second is worse. Go to the Drop of Names and check the wall. Somebody's been keeping a ledger down there, and it isn't mine."`},{id:`tale-ninth-key`,speaker:`Wenna Ashby`,tone:`uplifting`,text:`"Had a girl stay here once, scared stiff. Said she was a thief, didn't want to go down. I said, 'Sleep. We'll see.' She went down the next morning and came back a week later with a bag of keys and a limp, and paid for the room twice. She keeps the Ninth Key in a sock. She'll tell you where it goes if you buy the ale."`},{id:`tale-quiet-below`,speaker:`Merrow Dunn`,tone:`memorable`,hints:`quiets-receipt`,text:`"Light the fat candle on the fourth stair, and sing. Don't ask why. The Quiet Below will ask whether you've come about the account. Say yes. Say it as if you mean it. People who said no don't have names any more. People who said yes had a very pleasant afternoon, and came back with a receipt."`},{id:`tale-ripe-tree`,speaker:`Pim the tavern boy`,tone:`funny`,text:`"Right, so, the Slow Orchard. There's a tree with fruit that never ripens, and my uncle said if you pee on it, it ripens. He did. It did. It was extremely ripe. It chased him for three floors. That's all I know. Please don't tell my mother."`},{id:`tale-warm-ash`,speaker:`Joss the Sweeper`,tone:`sad`,hints:`tally-hymnal`,text:`"I keep a jar for every one. When the jar is full, I pour it out the back door, into the river. Last week I opened a jar and it was warm. Not the jar. The ash. It had a little pulse. I don't think that's allowed. The Sisters won't talk about it. Take it down to the Drainage Shrine, if you can bear it. There's a hymn book down there, in the hands of someone who stopped singing."`},{id:`tale-gargoyle-grave`,speaker:`Gudrun Sixfingers`,tone:`uplifting`,text:`"I was born with a bread knife and a bad attitude. I killed a gargoyle with the knife because I was too stubborn to run. It was crying afterwards. Not me, the gargoyle. I buried it in the Rope Cathedral, in a hole it had dug. Someone should put a flower there. It would be nice."`},{id:`tale-the-ticket`,speaker:`Maud the Lender`,tone:`memorable`,text:`"Everyone who goes down gets a ticket. You won't see it, but it's pinned somewhere on you. When I weigh you, I can feel it. Yours says, 'Due: soon.' Don't look so surprised. Everyone's does. Mine says 'Overdue.' Go find out what it means before you find out the hard way."`}],f=[{id:`lienholders-primer`,name:`The Lienholders' Primer on Loans`,kind:`knowledge`,text:`Chiselled into a wall of the Receiving Hall: how to cast from tomorrow's reserves. Strong now, weaker later, and the bill always arrives.`,unlocks:[{kind:`spell`,spellId:`kiln-roar`}]},{id:`tally-hymnal`,name:`The Tally-Singers' Hymnal`,kind:`knowledge`,text:`Held in the hands of a skeleton in the Drainage Shrine. The songs keep the count, and sung properly they turn losses into mercy.`,unlocks:[{kind:`spell`,spellId:`mass-mend`}]},{id:`overdraft-blade`,name:`The Overdraft Blade`,kind:`weapon`,text:`It hits harder than steel should. The damage is borrowed, and it shows up later on whoever swung it.`,unlocks:[{kind:`technique`,id:`borrowed-blow`}]},{id:`quiets-receipt`,name:`The Quiet's Receipt`,kind:`relic`,text:`Given by the voice in the walls to a party that said yes. It acknowledges payments, and every death is an installment.`,unlocks:[{kind:`path`,id:`installment`}]},{id:`saint-orrels-ledger`,name:`Saint Orrel's Ledger`,kind:`lore`,text:`A saint tried to write down everything the Vault owed and ran out of pages. The last entry is a key.`,unlocks:[{kind:`shop`,itemId:`sealed-ledger-key`}]}],p=e=>({screen:`title`,noticeSeen:e,audioUnlocked:!1,hasGame:!1});function m(e,t){switch(t.type){case`begin`:return{...e,audioUnlocked:!0,noticeSeen:!0};case`newGame`:return{...e,screen:`town`,hasGame:!0};case`continue`:return{...e,screen:t.inTown?`town`:`dungeon`,hasGame:!0};case`enterDungeon`:return e.screen===`town`&&e.hasGame?{...e,screen:`dungeon`}:e;case`returnToTown`:return e.screen===`dungeon`?{...e,screen:`town`}:e;case`encounter`:return e.screen===`dungeon`?{...e,screen:`combat`}:e;case`combatEnd`:return e.screen===`combat`?{...e,screen:t.outcome===`wiped`?`gameover`:`dungeon`}:e;case`ending`:return e.screen===`dungeon`?{...e,screen:`ending`}:e;case`toTitle`:return{...e,screen:`title`}}}function h(e){let t=[`parry`,`run`];return e.row===`front`&&t.push(`fight`),e.known.some(t=>{let n=c.find(e=>e.id===t);return!!n&&(e.charges[n.level-1]??0)>0})&&t.push(`spell`),e.inventory.some(e=>l.find(t=>t.id===e)?.kind===`consumable`)&&t.push(`use`),t}function g(){return{members:[],gold:100,discoveries:[]}}function _(e){let t=e.int(5,9);return e.chance(1/12)?t+10:t}function v(e,t){return s.filter(n=>n.alignments.includes(t)&&Object.entries(n.gates).every(([t,n])=>e[t]>=n)).map(e=>e.id)}var y=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,`-`);function b(e,t,n){let r=o.find(t=>t.id===e.raceId),i=s.find(t=>t.id===e.classId);if(!r)throw Error(`unknown race ${e.raceId}`);if(!i)throw Error(`unknown class ${e.classId}`);let l=a.reduce((e,n)=>e+t[n],0);if(l>e.pool)throw Error(`allocation of ${l} exceeds the bonus pool of ${e.pool}`);let u={};for(let e of a)u[e]=r.base[e]+t[e];if(!v(u,e.alignment).includes(e.classId))throw Error(`class ${e.classId} is not eligible with those attributes and alignment`);let d=Math.max(3,i.hpDie+n.int(1,Math.ceil(i.hpDie/2))+Math.max(0,Math.floor((u.vit-8)/3))),f=i.school?2:0;return{id:`${y(e.name)}-${n.int(1e3,9999)}`,name:e.name,raceId:e.raceId,classId:e.classId,alignment:e.alignment,level:1,xp:0,stats:u,hp:d,maxHp:d,charges:[f,0,0,0,0,0,0],maxCharges:[f,0,0,0,0,0,0],known:i.school?c.filter(e=>e.school===i.school&&e.level===1&&!e.discoveryId).map(e=>e.id):[],techniques:[],inventory:[],equipped:{},status:[],dead:!1,ash:!1,row:`front`}}function x(e){return{...e,members:e.members.map((e,t)=>({...e,row:t<3?`front`:`back`}))}}function S(e,t){if(e.members.length>=6)throw Error(`the party is full (six members)`);if(e.members.some(e=>e.id===t.id))throw Error(`${t.name} is already in the party`);let n=e.members.some(e=>e.alignment===`good`)||t.alignment===`good`,r=e.members.some(e=>e.alignment===`evil`)||t.alignment===`evil`;if(n&&r)throw Error(`good and evil cannot share a party (alignment clash)`);return x({...e,members:[...e.members,t]})}function C(e,t,n){let r=e.members.findIndex(e=>e.id===t);if(r<0)throw Error(`no such member ${t}`);let i=Math.max(0,Math.min(e.members.length-1,n)),a=[...e.members],[o]=a.splice(r,1);return a.splice(i,0,o),x({...e,members:a})}function w(e){let t=e=>e.dead||e.ash;return x({...e,members:[...e.members.filter(e=>!t(e)),...e.members.filter(t)]})}function T(e){return e.members.every(e=>e.dead||e.ash)}function E(e,t){if(e[1]<=0)return 0;let n=0;for(let r=0;r<e[0];r++)n+=t.int(1,e[1]);return n}var D=e=>!e.dead&&!e.ash&&e.hp>0,O=e=>D(e)&&!e.status.includes(`asleep`)&&!e.status.includes(`paralysed`),k=e=>e.members.filter(D),A=e=>e.hp.filter(e=>e>0).length,j=e=>e.hp.findIndex(e=>e>0),M=(e,t,n)=>Math.min(n,Math.max(t,e));function ee(e){let t=10;for(let n of Object.values(e.equipped)){let e=l.find(e=>e.id===n);e?.ac&&(t-=e.ac)}return M(t,0,10)}function te(e,t,n,r,i){let a=e.groups[t];return a.hp[n]<=0||(a.hp[n]=Math.max(0,a.hp[n]-r),a.asleep=!1,a.hp[n]>0)?!1:(e.xpPool+=a.def.xp,e.goldPool+=E(a.def.gold,i),!0)}var ne=[{id:`tavern`,name:`The Sump Tap`,kind:`recruiter`,blurb:`Dennis Brannoch pours, lies about his past, and finds you people who need work.`},{id:`smith`,name:`Ferrule's Forge`,kind:`shop`,blurb:`Hobb Ferrule names every blade and refuses to sell the ones he likes.`},{id:`temple`,name:`The House of Ash`,kind:`temple`,blurb:`The Sisters believe a body is a loan and ash is the receipt. They are kind, tired, and bad at bookkeeping.`},{id:`inn`,name:`The Last Mattress`,kind:`inn`,blurb:`Wenna Ashby remembers every guest's last words, if they were rude enough.`},{id:`informant`,name:`Maud's Pawnshop`,kind:`informant`,blurb:`Maud pays in tiny coins, each wrapped in a new rumour.`},{id:`tales`,name:`The Lamp and Lung`,kind:`tales`,blurb:`Old Tamsin Quell tells every story as if she were there, and corrects anyone who says she wasn't.`}],re={stock:[{itemId:`bread-knife`},{itemId:`short-sword`},{itemId:`hand-axe`},{itemId:`iron-mace`},{itemId:`oak-staff`},{itemId:`leather-jerkin`},{itemId:`chain-shirt`},{itemId:`scholar-robe`},{itemId:`round-shield`},{itemId:`iron-cap`},{itemId:`mending-draught`},{itemId:`sealed-ledger-key`,requiresDiscovery:`saint-orrels-ledger`}]},ie={str:0,iq:0,pie:0,vit:0,agi:0,luck:0},ae=[{name:`Perrin Lowe`,raceId:`thornborn`,classId:`votary`,alignment:`good`,alloc:{pie:2,vit:5}},{name:`Gudrun Sixfingers`,raceId:`barrowfolk`,classId:`blade`,alignment:`neutral`,alloc:{str:3,vit:4}},{name:`Thessaly Vane`,raceId:`thornborn`,classId:`spellwright`,alignment:`neutral`,alloc:{iq:3,vit:4}},{name:`Brother Kesk`,raceId:`cinderkin`,classId:`blade`,alignment:`evil`,alloc:{str:3,vit:4}},{name:`Joss Marrow`,raceId:`lanternkin`,classId:`cutpurse`,alignment:`evil`,alloc:{agi:2,str:5}},{name:`Hedda Vole`,raceId:`human`,classId:`blade`,alignment:`good`,alloc:{str:5,vit:5}},{name:`Aldous Pike`,raceId:`lanternkin`,classId:`votary`,alignment:`neutral`,alloc:{pie:3,vit:4}},{name:`Wick Tanner`,raceId:`human`,classId:`spellwright`,alignment:`evil`,alloc:{iq:6,vit:4}}];function oe(e,t,n){let r=n.members.some(e=>e.alignment===`good`),i=n.members.some(e=>e.alignment===`evil`),a=new Set(n.members.map(e=>e.name)),o=[...ae.filter(e=>!a.has(e.name)&&!(r&&e.alignment===`evil`)&&!(i&&e.alignment===`good`))];for(let e=o.length-1;e>0;e--){let n=t.int(0,e);[o[e],o[n]]=[o[n],o[e]]}return o.slice(0,4).map(e=>b({name:e.name,raceId:e.raceId,classId:e.classId,alignment:e.alignment,pool:19},{...ie,...e.alloc},t))}var se=[{cost:0,heal:0,charges:!1},{cost:10,heal:.5,charges:!1},{cost:30,heal:1,charges:!0},{cost:80,heal:1,charges:!0}];function ce(e,t){let n=se[Math.max(0,Math.min(se.length-1,t))];if(e.gold<n.cost)throw Error(`not enough gold for that room (${n.cost})`);return{...e,gold:e.gold-n.cost,members:e.members.map(e=>{if(!D(e))return e;let r=n.heal>=1?e.maxHp:Math.min(e.maxHp,e.hp+Math.ceil((e.maxHp-e.hp)*n.heal));return{...e,hp:r,charges:n.charges?[...e.maxCharges]:e.charges,status:t>=2?[]:e.status}})}}function le(e,t,n,r=1){let i=e.members.find(e=>e.id===t);if(!i)throw Error(`no such member ${t}`);if(!i.dead&&!i.ash)throw Error(`${i.name} is not dead`);if(i.ash&&r<2)throw Error(`${i.name} is ash. The ordinary rite will not do; it needs the ash rite`);let a=Math.max(100,i.level*100)*(r>=2?3:1);if(e.gold<a)throw Error(`not enough gold for the rite (${a})`);let o={...e,gold:e.gold-a},s=r>=2?.5:Math.min(.9,.55+i.stats.vit*.02);return n.chance(s)?{...o,members:o.members.map(e=>e.id===t?{...e,dead:!1,ash:!1,hp:r>=2?Math.ceil(e.maxHp/2):1}:e)}:r>=2?{...o,members:o.members.filter(e=>e.id!==t)}:n.chance(.5)?{...o,members:o.members.map(e=>e.id===t?{...e,ash:!0}:e)}:o}var ue=[`The Undervault goes down further than the Wardens will admit. The first layers are mostly rats, bones and candle fat.`,`Light is everything. Burn it slow, and carry spare oil.`,`The Sisters at the House of Ash can raise you, mostly. Do not count on the "mostly".`],de={"lienholders-primer":`That primer you found teaches casting against tomorrow. Good for a bad day, ruinous for a bad week.`,"tally-hymnal":`The Tally-Singers will want that hymnal back. They sing the count, and a lost song is a lost sum.`,"overdraft-blade":`A blade that bills the wielder. Ask yourself who the first creditor was, and whether they are still down there.`,"quiets-receipt":`A receipt from the Quiet Below. Nobody gets one. Keep it somewhere dry, and do not let the Wardens see.`,"saint-orrels-ledger":`Orrel's ledger has a last page that is a key. Ferrule says he can make the lock, if someone buys it.`};function fe(e){let t=[...ue];for(let n of e.discoveries){let e=de[n];e&&f.some(e=>e.id===n)&&t.push(e)}return t}function pe(e,t){let n=e.heardTales??[],r=d.filter(e=>!n.includes(e.id)),i=r.filter(t=>!t.hints||!e.discoveries.includes(t.hints)),a=i.length>0?i:r;if(a.length===0)return{party:e,tale:null};let o=t.pick(a);return{party:{...e,heardTales:[...n,o.id]},tale:o}}var N=e=>e.length===1?e.toLowerCase():e,me=class{locked=!1;onSkip;layers=[];push(e){this.layers.push(e)}pop(e){if(e===void 0){this.layers.pop();return}let t=this.layers.map(e=>e.name).lastIndexOf(e);t>=0&&(this.layers.length=t)}trimTo(e){let t=this.layers.map(e=>e.name).lastIndexOf(e);t>=0&&(this.layers.length=t+1)}top(){return this.layers[this.layers.length-1]}clear(){this.layers=[]}handle(e,t={}){if(t.ctrl||t.alt||t.meta)return!1;if(this.locked)return t.repeat?!1:e===`Enter`||e===` `?(this.onSkip?.(),!0):!1;let n=!!t.repeat,r=N(e);for(let t=this.layers.length-1;t>=0;t--){let i=this.layers[t];if((!n||e.startsWith(`Arrow`))&&i.onKey?.(e))return!0;let a=r===`Escape`||r===`Enter`;if(!i.typing||a){let e=i.commands().find(e=>N(e.key)===r);if(e)return n&&!e.repeat?!1:(e.enabled!==!1&&e.run(),!0)}if(i.typing&&r.length===1)return!0;if(i.modal)break}return!1}},P={Escape:`Esc`,Enter:`Enter`," ":`Space`,ArrowUp:`↑`,ArrowDown:`↓`,ArrowLeft:`←`,ArrowRight:`→`};function F(e){if(e.key.length!==1)return`${P[e.key]??e.key}) ${e.label}`;let t=e.key.toLowerCase(),n=e.label.toLowerCase(),r=-1;for(let e=0;e<n.length;e++)if(n[e]===t&&(e===0||n[e-1]===` `)){r=e;break}return r<0&&(r=n.indexOf(t)),r<0?`${e.key.toUpperCase()}) ${e.label}`:`${e.label.slice(0,r)}${e.label[r].toUpperCase()})${e.label.slice(r+1)}`}var I=e=>s.find(t=>t.id===e)?.name??e,L=e=>o.find(t=>t.id===e)?.name??e,R={tavern:`#d29a3a`,smith:`#e0652c`,temple:`#8fa7bd`,inn:`#e6c35c`,informant:`#4fa58f`,tales:`#9a86d6`,party:`#cbbf9f`,dungeon:`#9a9482`,title:`#c9b787`},z=e=>R[e]??R.title;function he(e,t,...n){return i(`section`,{class:`frame`,style:`--accent:${t}`},i(`i`,{class:`c tl`}),i(`i`,{class:`c tr`}),i(`i`,{class:`c bl`}),i(`i`,{class:`c br`}),i(`div`,{class:`ftitle`},e),i(`div`,{class:`fbody`},...n))}function ge(e){return i(`nav`,{class:`cmdbar`},...e.filter(e=>!e.hidden).map(e=>{let t=F(e),n=t.indexOf(`)`),r=t.lastIndexOf(` `,n)+1;return i(`button`,{class:`cmd${e.enabled===!1?` off`:``}`,type:`button`,onclick:()=>{e.enabled!==!1&&e.run()}},t.slice(0,r),i(`b`,{class:`k`},t.slice(r,n+1)),t.slice(n+1))}))}var _e={msPerChar:14};function ve(e=6){let t=i(`div`,{class:`msgwin`});return{el:t,say(n){for(t.querySelector(`.new`)?.classList.remove(`new`),t.append(i(`div`,{class:`line new`},n));t.children.length>e;)t.firstElementChild.remove();t.scrollTop=t.scrollHeight},type(n){let r=_e.msPerChar;if(r<=0)return this.say(n),Promise.resolve();t.querySelector(`.new`)?.classList.remove(`new`);let a=i(`div`,{class:`line new`},``);for(t.append(a);t.children.length>e;)t.firstElementChild.remove();return new Promise(e=>{let i=0,o=()=>{i=Math.min(n.length,i+2),a.textContent=n.slice(0,i),t.scrollTop=t.scrollHeight,i>=n.length?e():setTimeout(o,r)};o()})},clear(){t.replaceChildren()}}}var ye={asleep:`asleep`,silenced:`silenced`,poisoned:`poisoned`,paralysed:`paralysed`,shielded:`warded`,blessed:`blessed`};function be(e,t){return i(`div`,{class:`roster`},...e.members.map((e,n)=>{let r=e.dead||e.ash,a=[e.ash?`ash`:e.dead?`dead`:``,...e.status.map(e=>ye[e]??e)].filter(Boolean).join(`, `),o=t.thumb?.(e)??null;return i(`div`,{class:`rrow ${n<3?`front`:`back`}${r?` dead`:``}${e.id===t.selectedId?` sel`:``}`,onclick:t.onPick?()=>t.onPick(e):null},i(`span`,{class:`slot`},String(n+1)),o?i(`span`,{class:`thumb`},o):null,i(`span`,{class:`nm`},e.name),i(`span`,{class:`cls`},`L${e.level} ${I(e.classId)}`),i(`span`,{class:`hp`},`${e.hp}/${e.maxHp}`),i(`span`,{class:`st`},a))}))}var xe=`undervault.glow`;function Se(){try{let e=localStorage.getItem(xe);if(e===`off`||e===`low`||e===`normal`)return e}catch{}return`low`}function Ce(e){document.documentElement.dataset.glow=e;try{localStorage.setItem(xe,e)}catch{}}var B=e=>`rgb(${e},${e},${e})`,V=(e,t,n,r,i,a,o=0)=>{e.fillStyle=B(a),e.beginPath(),e.ellipse(t,n,Math.max(.1,r),Math.max(.1,i),o,0,Math.PI*2),e.fill()},H=(e,t,n)=>{e.fillStyle=B(n),e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.closePath(),e.fill()},U=(e,t,n,r,i,a,o)=>{e.strokeStyle=B(o),e.lineWidth=a,e.lineCap=`round`,e.beginPath(),e.moveTo(t,n),e.lineTo(r,i),e.stroke()},W=(e,t,n,r,i,a)=>{let o=e.createRadialGradient(t,n,0,t,n,r);o.addColorStop(0,`rgba(${i},${a})`),o.addColorStop(1,`rgba(${i},0)`),e.fillStyle=o,e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fill()},we=e=>e%5.3<.14?.15:1,G=e=>Math.sin(e*1.5);function Te(e,t=8){let n=e.map(e=>[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)]);return Array.from({length:t},(e,r)=>{let i=r/(t-1)*(n.length-1),a=Math.floor(i),o=Math.min(n.length-1,a+1),s=i-a;return[0,1,2].map(e=>Math.round(n[a][e]+(n[o][e]-n[a][e])*s))})}var Ee=()=>{},De=[{id:`wraith`,ramp:Te([`#06040c`,`#2a1840`,`#76587f`,`#fff1cf`]),paint(e,t,n){let r=G(t),i=Math.sin(t*.7)*2.5,a=n.lunge;e.translate(i,8),e.strokeStyle=B(138),e.lineWidth=4,e.beginPath(),e.moveTo(60,62),e.lineTo(62,228),e.stroke(),V(e,60,56,8,8,216),e.save(),e.translate(0,100),e.scale(1,1+r*.012),e.translate(0,-100),e.fillStyle=B(140),e.beginPath(),e.moveTo(-26,92),e.bezierCurveTo(-50,130,-62,190,-72,226);for(let n=0;n<=10;n++)e.lineTo(-72+n*14.4,232+(n%2?-12:2)+Math.sin(t*1.3+n)*3);e.bezierCurveTo(62,190,50,130,26,92),e.closePath(),e.fill();for(let n=-3;n<=3;n++)e.strokeStyle=B(n%2?69:180),e.lineWidth=3,e.beginPath(),e.moveTo(n*8,98),e.quadraticCurveTo(n*14+i*.5,150,n*20+Math.sin(t+n)*2,226),e.stroke();e.restore(),e.fillStyle=B(124),e.beginPath(),e.moveTo(-28,98),e.bezierCurveTo(-38,50,-24,16,0,12),e.bezierCurveTo(24,16,38,50,28,98),e.closePath(),e.fill(),e.strokeStyle=B(196),e.lineWidth=2.5,e.beginPath(),e.moveTo(-26,92),e.bezierCurveTo(-34,50,-22,20,0,16),e.bezierCurveTo(22,20,34,50,26,92),e.stroke(),V(e,0,62,17,23,11),V(e,0,60,10.5,14,210),e.fillStyle=B(182),e.fillRect(-6,72,12,8),V(e,-4.6,58,3.1,4.2,16),V(e,4.6,58,3.1,4.2,16),H(e,[[0,63],[-1.8,68],[1.8,68]],32);for(let t=-4;t<=4;t+=2)U(e,t,73,t,79,1,34);let o=a*14;for(let n of[-1,1]){let i=n*(50+o*.6),a=150+r*2-o;H(e,[[n*24,98],[n*62,122+r*2],[i+n*4,a-6],[n*34,128]],106);for(let r=0;r<5;r++){let o=(-.9+r*.45)*n;U(e,i,a,i+Math.sin(o)*13,a+Math.cos(o)*13+Math.sin(t*3+r)*.8,2,220)}V(e,i,a,4,3,207)}},emit(e,t,n){let r=Math.sin(t*.7)*2.5;e.translate(r,8),e.save(),e.translate(0,58),e.scale(1,we(t)),e.translate(0,-58),W(e,-4.6,58,5.5,`255,60,50`,1),W(e,4.6,58,5.5,`255,60,50`,1),e.restore(),W(e,60,56,16,`170,120,255`,.75+.25*Math.sin(t*3.1))}},{id:`cultist`,ramp:Te([`#0a0504`,`#3a1410`,`#9a5a40`,`#ffe8c0`]),paint(e,t,n){let r=G(t),i=Math.sin(t*1.1)*2;e.translate(i,8),e.fillStyle=B(130),e.beginPath(),e.moveTo(-22,96),e.bezierCurveTo(-46,140,-54,190,-60,228),e.lineTo(60,228),e.bezierCurveTo(54,190,46,140,22,96),e.closePath(),e.fill();for(let t=-3;t<=3;t++)U(e,t*7,104,t*16+i*.3,224,3,t%2?70:170);e.fillStyle=B(120),e.beginPath(),e.moveTo(-24,84),e.bezierCurveTo(-30,40,-16,20,0,18),e.bezierCurveTo(16,20,30,40,24,84),e.closePath(),e.fill(),V(e,0,56,13,17,18),V(e,0,58,9.5,12.5,172),V(e,-4,56,2,2.4,20),V(e,4,56,2,2.4,20),V(e,0,66+ +(Math.sin(t*5)>0),4,2.6+(Math.sin(t*5)>0?1.4:0),22);let a=8+n.lunge*12+r*1.5;for(let t of[-1,1])H(e,[[t*20,94],[t*56,70-a*.4],[t*60,52-a],[t*44,54-a],[t*30,110]],100),V(e,t*52,48-a,4.5,4,190);U(e,-52,46-a,-52,30-a,3,170),V(e,-52,28-a,7,5,214),H(e,[[-58,28-a],[-46,28-a],[-50,36-a],[-54,36-a]],190)},emit(e,t){e.translate(Math.sin(t*1.1)*2,8),W(e,-52,14-1.5*G(t),12,`255,170,70`,.6+.3*Math.sin(t*8))}},{id:`skeleton`,ramp:Te([`#070707`,`#26231f`,`#8a8472`,`#f4eed8`]),paint(e,t,n){let r=G(t),i=Math.sin(t*.9)*2,a=n.lunge;e.translate(i,6),U(e,0,78,0,146,6,170);for(let t=0;t<5;t++){let n=86+t*11,i=26-Math.abs(t-1.5)*3;U(e,0,n,-i,n+6+r*.6,4,196),U(e,0,n,i,n+6+r*.6,4,196)}H(e,[[-20,142],[20,142],[14,164],[-14,164]],150),V(e,0,50,18,21,206),H(e,[[-12,62],[12,62],[9,78],[-9,78]],180),V(e,-7,48,5,6.5,14),V(e,7,48,5,6.5,14),H(e,[[0,54],[-2.5,61],[2.5,61]],30);for(let t=-6;t<=6;t+=3)U(e,t,70,t,77,1.5,30);U(e,-24,84,-42,120,5,180),U(e,-42,120,-36,158,5,180);let o=46+a*6;U(e,24,84,o,118,5,180),U(e,o,118,58+a*6,98-a*10,5,180),U(e,58+a*6,100-a*10,66+a*8,24-a*10,5,205),U(e,54+a*6,98-a*10,74+a*6,98-a*10,4,170),U(e,-10,164,-17,196,6,175),U(e,-17,196,-19,228,6,175),U(e,10,164,17,196,6,175),U(e,17,196,19,228,6,175),V(e,-19,228,9,3,150),V(e,19,228,9,3,150)},emit(e,t){e.translate(Math.sin(t*.9)*2,6);let n=we(t);e.save(),e.translate(0,48),e.scale(1,n),e.translate(0,-48),W(e,-7,48,4.5,`180,255,190`,.9),W(e,7,48,4.5,`180,255,190`,.9),e.restore()}},{id:`rat`,ramp:Te([`#080504`,`#2a1b10`,`#7a5a3a`,`#e8d2a8`]),paint(e,t,n){let r=G(t),i=n.lunge;e.translate(0,0),e.strokeStyle=B(120),e.lineWidth=6,e.lineCap=`round`,e.beginPath(),e.moveTo(-60,206),e.bezierCurveTo(-92,200,-100+Math.sin(t*2)*4,160,-84,150),e.stroke(),V(e,-4,190,48,27+r,124),V(e,-34,196,28,23,112),U(e,6,206,10+i*10,228,8,130),U(e,-26,210,-30,228,9,120),U(e,30,204,38+i*10,226,7,134),V(e,46+i*6,176,23,17,146,.3),H(e,[[60+i*6,168],[92+i*6,182],[60+i*6,192]],156),V(e,92+i*6,182,4,3.4,226),V(e,40,156,9,13,156),V(e,40,157,5,8,90),V(e,58,158,8,11,150),V(e,58,159,4,7,88),H(e,[[66+i*6,190],[72+i*6,190],[69+i*6,200]],240),H(e,[[76+i*6,190],[82+i*6,189],[79+i*6,199]],240);for(let t=0;t<3;t++)U(e,80+i*6,180+t*3,104+i*6,172+t*8,1,200)},emit(e,t,n){W(e,54+n.lunge*6,170,5,`255,60,50`,.95*we(t))}},{id:`slime`,ramp:Te([`#030a06`,`#10301a`,`#3f9a5a`,`#d8ffc8`]),paint(e,t,n){let r=1+Math.sin(t*2.2)*.045+n.lunge*.08,i=1-Math.sin(t*2.2)*.04;e.translate(0,228),e.scale(r,i),e.translate(0,-228),e.fillStyle=B(112),e.beginPath(),e.moveTo(-66,228),e.bezierCurveTo(-76,150,-34,106,0,104),e.bezierCurveTo(34,106,76,150,66,228),e.closePath(),e.fill(),V(e,-24,140,14,22,224,-.4);for(let[t,n,r]of[[14,184,9],[-30,196,6],[34,160,5],[-4,170,7]])V(e,t,n,r,r,168),V(e,t-r*.3,n-r*.3,r*.35,r*.35,235);V(e,-16,158,6,8,30),V(e,16,158,6,8,30),U(e,0,106,0,80,3.5,204)},emit(e,t){W(e,0,76,13,`255,190,80`,.7+.3*Math.sin(t*11)*Math.sin(t*7)),W(e,-16,158,4,`200,255,160`,.8),W(e,16,158,4,`200,255,160`,.8)}},{id:`orc`,ramp:Te([`#060804`,`#1e2a12`,`#6a7a3a`,`#e0ecb0`]),paint(e,t,n){let r=G(t),i=n.lunge;e.translate(0,4),V(e,0,150,46,52+r,126),V(e,-36,112,25,19,134),V(e,36,112,25,19,134),V(e,6,88,21,23,152),H(e,[[-12,78],[24,78],[24,72],[-12,72]],100),V(e,0,70,24,7,86),H(e,[[-8,100],[-12,112],[-4,104]],236),H(e,[[20,100],[24,112],[16,104]],236),U(e,-42,124,-56,172,15,118),U(e,42,124,62+i*8,84-i*10,15,122),H(e,[[56+i*8,84-i*10],[88+i*8,56-i*10],[92+i*8,76-i*10],[66+i*8,100-i*10]],200),U(e,-18,192,-24,228,17,120),U(e,18,192,24,228,17,120),V(e,-48,184,21,17,104),V(e,-48,184,17,13,190),V(e,-48,184,14,10,130)},emit(e,t){W(e,0,86,4,`255,220,70`,.9*we(t)),W(e,14,86,4,`255,220,70`,.9*we(t))}},{id:`wolf`,ramp:Te([`#070809`,`#22262c`,`#7a8088`,`#e6e8ea`]),paint(e,t,n){let r=G(t),i=n.lunge;U(e,-76,156,22,138,8,150),V(e,-22,158,38,27+r,92);for(let t=0;t<6;t++)U(e,-50+t*10,142,-46+t*10,182,3.4,200);H(e,[[-82,150],[-60,144],[-60,172],[-84,176]],130),V(e,50+i*8,136,23,17,186,.15),H(e,[[60+i*8,134],[96+i*8,150],[64+i*8,156]],196),H(e,[[62+i*8,158],[92+i*8,172+i*6],[60+i*8,168]],170);for(let t=0;t<4;t++)U(e,70+i*8+t*5,156,71+i*8+t*5,163,1.8,242);H(e,[[38,124],[46,104],[54,124]],196),U(e,28,172,40,202,6,176),U(e,40,202,44,228,5,176),U(e,16,176,22,204,6,150),U(e,22,204,26,228,5,150),U(e,-54,172,-66,204,7,176),U(e,-66,204,-60,228,5,176),U(e,-40,176,-48,206,7,150),U(e,-48,206,-44,228,5,150),U(e,-82,150,-100,128+Math.sin(t*3)*3,5,170)},emit(e,t,n){W(e,52+n.lunge*8,132,5,`255,70,40`,.95*we(t))}},{id:`ghoul`,ramp:Te([`#05090a`,`#143034`,`#5a8c88`,`#d8f0e8`]),paint(e,t,n){let r=G(t),i=Math.sin(t*.8)*2,a=n.lunge;e.translate(i,6),V(e,0,150,32,54+r,112);for(let t=0;t<5;t++)U(e,-22,120+t*11,22,120+t*11,2.6,160);U(e,-26,112,-52,168+a*14,11,110),U(e,-52,168+a*14,-46,222,9,110),U(e,26,112,52,170+a*14,11,110),U(e,52,170+a*14,48,222,9,110);for(let t of[-1,1])for(let n=0;n<3;n++)U(e,t*47,222,t*(40+n*6),232,2.6,200);V(e,2,88,21,23,168),H(e,[[-12,96],[16,96],[12,124],[-8,124]],20);for(let t=-8;t<=10;t+=4)H(e,[[t,98],[t+2,98],[t+1,106]],238);V(e,-8,82,5,5.5,22),V(e,12,82,5,5.5,22),U(e,-14,196,-22,228,12,108),U(e,14,196,24,228,12,108)},emit(e,t){e.translate(Math.sin(t*.8)*2,6),W(e,-8,82,5,`190,255,220`,.9*we(t)),W(e,12,82,5,`190,255,220`,.9*we(t))}},{id:`gargoyle`,ramp:Te([`#060709`,`#1e2430`,`#6a7488`,`#dfe6f2`]),paint(e,t,n){let r=Math.sin(t*1.2)*4-n.lunge*8;H(e,[[-58,232],[58,232],[48,206],[-48,206]],86),U(e,-58,232,58,232,3,150);for(let t of[-1,1]){H(e,[[t*28,126],[t*92,66+r],[t*84,120],[t*74,150],[t*56,172]],112);for(let n=1;n<=3;n++)U(e,t*28,126,t*(92-n*8),70+r+n*26,3,170)}V(e,0,164,36,46,146);for(let t of[-1,1]){V(e,t*28,204,18,12,150);for(let n=0;n<3;n++)U(e,t*(20+n*8),208,t*(20+n*8),216,3,210)}V(e,0,100,23,23,160),H(e,[[-18,84],[-30,54+r*.3],[-8,80]],200),H(e,[[18,84],[30,54+r*.3],[8,80]],200),V(e,-8,98,5,4,24),V(e,8,98,5,4,24),H(e,[[-10,112],[10,112],[6,124],[-6,124]],24),H(e,[[-6,112],[-4,112],[-5,118]],240),H(e,[[4,112],[6,112],[5,118]],240)},emit(e,t,n){let r=.5+.5*Math.min(1,n.lunge+n.hit+.3);W(e,-8,98,5,`255,170,60`,r*we(t)),W(e,8,98,5,`255,170,60`,r*we(t))}},{id:`demon`,ramp:Te([`#0a0305`,`#400c12`,`#a8302e`,`#ffd0a0`]),paint(e,t,n){let r=G(t),i=n.lunge,a=Math.sin(t*1)*5;for(let t of[-1,1]){H(e,[[t*20,100],[t*94,30+a],[t*90,100],[t*76,140],[t*50,160]],96);for(let n=1;n<=3;n++)U(e,t*20,100,t*(94-n*9),34+a+n*30,3,150)}H(e,[[-30,92],[30,92],[40,150],[28,228],[-28,228],[-40,150]],130);for(let t=-2;t<=2;t++)U(e,t*10,100,t*12,224,3,t%2?90:170);V(e,0,130,30,40+r,138),V(e,0,66,21,25,170),e.strokeStyle=B(210),e.lineWidth=6,e.lineCap=`round`;for(let t of[-1,1])e.beginPath(),e.moveTo(t*14,50),e.bezierCurveTo(t*38,40,t*40,14,t*26,4),e.stroke();V(e,-8,62,5.5,4,20),V(e,8,62,5.5,4,20),H(e,[[-10,78],[10,78],[14,86],[0,90],[-14,86]],22);for(let t=-10;t<=10;t+=4)H(e,[[t,78],[t+2,78],[t+1,84]],236);U(e,-26,100,-50,130,10,120),U(e,-50,130,-44,158,9,120),U(e,26,100,52+i*8,116,10,126),U(e,52+i*8,116,62+i*10,90-i*6,9,126),H(e,[[48+i*10,52-i*6],[86+i*10,56-i*6],[84+i*10,104-i*6],[50+i*10,100-i*6]],222);for(let t=0;t<6;t++)U(e,54+i*10,60-i*6+t*7,80+i*10,60-i*6+t*7,1.4,120);U(e,-46,148,-40,126,3,214)},emit(e,t){W(e,-8,62,5.5,`255,60,40`,1*we(t)),W(e,8,62,5.5,`255,60,40`,1*we(t)),W(e,70,78,18,`255,120,60`,.25+.15*Math.sin(t*2))}}],Oe={id:`placeholder`,ramp:Te([`#050505`,`#202020`,`#6a6a6a`,`#e8e8e8`]),paint(e,t){V(e,0,124,58,76+G(t)*2,96),e.fillStyle=B(230),e.font=`bold 96px serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`?`,0,126)},emit:Ee},ke=(e,t)=>{let n=document.createElement(`canvas`);return n.width=e,n.height=t,n},Ae=(e,t)=>ke(e,t);function je(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Me(e,t,n,r){let i=je(r),a=Math.ceil(e/n)+2,o=Math.ceil(t/n)+2,s=new Float32Array(a*o);for(let e=0;e<s.length;e++)s[e]=i();let c=new Float32Array(e*t);for(let r=0;r<t;r++)for(let t=0;t<e;t++){let i=t/n,o=r/n,l=Math.floor(i),u=Math.floor(o),d=i-l,f=o-u;d=d*d*(3-2*d),f=f*f*(3-2*f);let p=s[u*a+l],m=s[u*a+l+1],h=s[(u+1)*a+l],g=s[(u+1)*a+l+1];c[r*e+t]=(p+(m-p)*d)*(1-f)+(h+(g-h)*d)*f}return c}var Ne=new Map;function Pe(e,t){let n=`${e}x${t}`,r=Ne.get(n);return r||(r={grain:Me(e,t,3,11),blotch:Me(e,t,9,23),crack:Me(e,t,6,41)},Ne.set(n,r)),r}var Fe=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(e=>(e+.5)/16),Ie=class{painter;width;height;hc;bc;ec;constructor(e,t=192,n=240){this.painter=e,this.width=t,this.height=n}draw(e,t,n){let r=this.width,i=this.height,{grain:a,blotch:o,crack:s}=Pe(r,i),c=r/2,l=i-8,u=i*13/24,d=i*.8125,f=i*.1875;this.hc??=ke(r,i),this.bc??=ke(r,i),this.ec??=ke(r,i);let p=this.hc.getContext(`2d`,{willReadFrequently:!0}),m=this.bc.getContext(`2d`,{willReadFrequently:!0}),h=this.ec.getContext(`2d`,{willReadFrequently:!0}),g=1+n.lunge*.09;p.fillStyle=`#000`,p.fillRect(0,0,r,i),p.save(),p.translate(c,l),p.scale(g,g),p.translate(0,-l),this.painter.paint(p,t,n),p.restore(),h.clearRect(0,0,r,i),h.save(),h.translate(c,l),h.scale(g,g),h.translate(0,-l),this.painter.emit(h,t,n),h.restore(),m.clearRect(0,0,r,i);try{m.filter=`blur(1.3px)`}catch{}m.drawImage(this.hc,0,0);try{m.filter=`none`}catch{}let _=m.getImageData(0,0,r,i).data,v=h.getImageData(0,0,r,i).data,y=e.createImageData(r,i),b=y.data,x=this.painter.ramp,S=.5+.5*Math.sin(t*7)*Math.sin(t*3.1+1),C=-.55+.18*Math.sin(t*9.4),w=-.6,T=.55,E=Math.hypot(C,w,T),D=C/E,O=w/E,k=T/E,A=.82+.3*S,{hit:j,damage:M,dying:ee}=n;for(let e=1;e<i-1;e++)for(let n=1;n<r-1;n++){let l=e*r+n,p=l*4,m=_[p]/255,h,g=!1,y=!1,S=()=>{let r=.5+.5*Math.sin(n*.045+t*.35+Math.sin(e*.05-t*.22)*2.2),a=(n-c)/c,o=(e-u)/u,s=Math.max(0,1-(a*a+o*o)*.7);return(.05+.17*r*(.35+e/i*.65))*s};if(m<.03)h=S();else{let t=(_[p+4]-_[p-4])/255*5,n=(_[p+4*r]-_[p-4*r])/255*5,i=(-t*D-n*O+k)/Math.sqrt(t*t+n*n+1);if(h=m*.5+Math.max(0,i)*.55*A*(.35+m*.65)+(a[l]-.5)*.16*m,h*=1-Math.max(0,(e-d)/f)*.55,M>0&&(h=h*(1-.22*M)+.07*M,Math.abs(s[l]-.5)<.012+M*.03&&o[l]<M*1.1&&(y=!0)),ee>0){let e=o[l];e<ee?h=S():e-ee<.05&&(g=!0)}h+=j*.6}let C=Fe[(e&3)*4+(n&3)],w=Math.min(1,Math.max(0,y?0:h))*(x.length-1),T=Math.floor(w);w-T>C&&T++;let E=x[Math.min(x.length-1,T)],te=v[p+3]/255;te>.12&&ee===0&&te>C*.85&&(E=[v[p],v[p+1],v[p+2]]),g&&(E=C>.5?[255,210,120]:[255,110,30]),b[p]=E[0],b[p+1]=E[1],b[p+2]=E[2],b[p+3]=255}for(let e=0;e<r;e++)for(let t of[0,i-1]){let n=(t*r+e)*4;b[n+3]=255}for(let e=0;e<i;e++)for(let t of[0,r-1]){let n=(e*r+t)*4;b[n+3]=255}e.putImageData(y,0,0)}},Le=new Map;for(let e of De)Le.set(e.id,new Ie(e));var Re=new Ie(Oe),ze=e=>Le.get(e)??Re,Be=[`#0a0604`,`#3c2410`,`#b07a3a`,`#ffe6b0`],Ve=[`#0a0504`,`#3c1a10`,`#c4622c`,`#ffd8a0`],He=[`#06080c`,`#202833`,`#7d93a8`,`#e6eef5`],Ue=[`#0a0804`,`#403014`,`#c9a24a`,`#fff2c0`],We=[`#050a09`,`#16302b`,`#4a9a86`,`#d8f5ea`],Ge=[`#08060c`,`#2a2040`,`#8a76c0`,`#f0e8ff`],Ke=[`#080808`,`#2a2824`,`#8c8470`,`#ece4cc`],qe=[`#0a0706`,`#3a2418`,`#a87a58`,`#ffe9cf`],Je=[`#07080a`,`#26282c`,`#8a8a82`,`#f0ecd8`],Ye=[`#050806`,`#1c2a1c`,`#6a8a5a`,`#e8f2cc`],Xe=[`#0a0504`,`#401810`,`#b0502c`,`#ffd8a0`],Ze=[`#0a0806`,`#40301a`,`#c09a4a`,`#fff6d0`],Qe={dennis:{id:`dennis`,race:`human`,ramp:Be,mood:1,extras:[`towel`,`tankard`],look:{hair:1,hairTone:150,age:.9,beard:.7,scar:.9,brow:.8,jaw:.8,mouthW:1,nose:1,noseW:.9,eyeGap:.4}},hobb:{id:`hobb`,race:`barrowfolk`,ramp:Ve,mood:0,extras:[`apron`],look:{hair:0,beard:.95,age:.5,brow:1,jaw:1,nose:1,noseW:.8,eyeGap:.2,scar:.7}},ottoline:{id:`ottoline`,race:`human`,ramp:He,mood:1,gear:`votary`,extras:[`smudge`],look:{hair:0,beard:0,age:.6,brow:.2,jaw:.3,nose:0,noseW:.2,eyeGap:.6,scar:0,mouthW:.4}},wenna:{id:`wenna`,race:`human`,ramp:Ue,mood:1,extras:[`shawl`,`candle`],look:{hair:2,hairTone:120,beard:0,age:.5,brow:.3,jaw:.2,nose:3,noseW:.4,eyeGap:.5,scar:0,mouthW:.6}},maud:{id:`maud`,race:`human`,ramp:We,mood:0,extras:[`spectacles`,`scale`],look:{hair:4,hairTone:160,beard:0,age:.8,brow:.5,jaw:.1,nose:2,noseW:.3,eyeGap:.3,scar:0,mouthW:.1}},tamsin:{id:`tamsin`,race:`human`,ramp:Ge,mood:1,extras:[`shawl`,`lamp`],look:{hair:2,hairTone:200,beard:0,age:1,brow:.1,jaw:.1,nose:2,noseW:.2,eyeGap:.7,scar:0,mouthW:.5}},moss:{id:`moss`,race:`human`,ramp:Ke,mood:0,extras:[`milcap`,`moustache`,`ledger`],look:{hair:0,beard:0,age:.7,brow:.7,jaw:.9,nose:0,noseW:.6,eyeGap:.3,scar:0,mouthW:.3}},merrow:{id:`merrow`,race:`lanternkin`,ramp:Ze,mood:0,gear:`shade`,extras:[],look:{hair:0,beard:0,age:.3,brow:.2,jaw:.4,nose:3,noseW:.3,eyeGap:.9,eyeSize:1,scar:0,mouthW:.2}},pim:{id:`pim`,race:`human`,ramp:Be,mood:1,extras:[`freckles`,`bibapron`],look:{hair:5,hairTone:130,beard:0,age:0,brow:.1,jaw:.5,nose:3,noseW:.5,eyeGap:.8,eyeSize:.9,scar:0,mouthW:1,cheek:.9}},joss:{id:`joss`,race:`human`,ramp:Je,mood:-.4,extras:[`shawl`,`broom`],look:{hair:0,beard:.1,age:1,brow:.4,jaw:.2,nose:1,noseW:.7,eyeGap:.5,scar:0,mouthW:.2}},gudrun:{id:`gudrun`,race:`barrowfolk`,ramp:Je,mood:0,gear:`blade`,extras:[`sixfingers`],look:{beard:0,age:.4,brow:.9,jaw:1,nose:1,noseW:.6,eyeGap:.4,scar:.7,mouthW:.7}},perrin:{id:`perrin`,race:`thornborn`,ramp:Ye,mood:1,gear:`votary`,extras:[],look:{hair:0,beard:0,age:.3,brow:.2,jaw:.3,nose:0,noseW:.3,eyeGap:.6,scar:0,mouthW:.5}},thessaly:{id:`thessaly`,race:`thornborn`,ramp:Ye,mood:0,gear:`spellwright`,extras:[],look:{hair:0,beard:0,age:.5,brow:.5,jaw:.1,nose:2,noseW:.2,eyeGap:.3,scar:0,mouthW:.2}},kesk:{id:`kesk`,race:`cinderkin`,ramp:Xe,mood:-1,gear:`blade`,extras:[`brand`],look:{hair:0,beard:0,age:.6,brow:1,jaw:.9,nose:1,noseW:.5,eyeGap:.2,scar:.9,mouthW:.4}},jossm:{id:`jossm`,race:`lanternkin`,ramp:Ze,mood:-1,gear:`cutpurse`,extras:[`glint`],look:{hair:0,beard:0,age:.2,brow:.6,jaw:.6,nose:2,noseW:.3,eyeGap:.7,scar:.7,mouthW:.6}},hedda:{id:`hedda`,race:`human`,ramp:qe,mood:1,extras:[`gorget`],look:{hair:1,hairTone:100,beard:0,age:.3,brow:.8,jaw:1,nose:0,noseW:.6,eyeGap:.4,scar:.7,mouthW:.5}},aldous:{id:`aldous`,race:`lanternkin`,ramp:Ze,mood:1,gear:`votary`,extras:[`spectacles`],look:{hair:0,beard:.4,age:1,brow:.1,jaw:.2,nose:3,noseW:.6,eyeGap:.5,eyeSize:.8,scar:0,mouthW:.5}},wick:{id:`wick`,race:`human`,ramp:qe,mood:-1,extras:[`sleekhair`,`goatee`,`flame`],look:{hair:0,beard:0,age:.5,brow:.9,jaw:.2,nose:2,noseW:.1,eyeGap:.2,eyeSize:.2,scar:0,mouthW:.1}}},$e={"dennis brannoch":`dennis`,"brannoch the bold":`dennis`,dennis:`dennis`,"hobb ferrule":`hobb`,"sister ottoline":`ottoline`,"wenna ashby":`wenna`,"maud the lender":`maud`,maud:`maud`,"old tamsin quell":`tamsin`,"tamsin quell":`tamsin`,"corporal moss":`moss`,"merrow dunn":`merrow`,"pim the tavern boy":`pim`,"joss the sweeper":`joss`,"gudrun sixfingers":`gudrun`,"perrin lowe":`perrin`,"thessaly vane":`thessaly`,"brother kesk":`kesk`,"joss marrow":`jossm`,"hedda vole":`hedda`,"aldous pike":`aldous`,"wick tanner":`wick`};function et(e){return $e[e.trim().toLowerCase()]??null}var tt={tavern:`dennis`,smith:`hobb`,temple:`ottoline`,inn:`wenna`,informant:`maud`,tales:`tamsin`};function nt(e){let t=et(e);return t?{kind:`person`,id:t}:null}var rt=e=>7.5+e.eyeGap*3.5;function it(e,t,n,r){for(let i of t){if(i===`smudge`&&(U(e,-12,47,-5,51,2.2,40),U(e,6,44,13,49,1.6,50),U(e,-16,72,-11,78,1.8,45),U(e,9,82,14,80,1.4,50)),i===`spectacles`){e.strokeStyle=B(238),e.lineWidth=1.3;for(let t of[-1,1])e.beginPath(),e.ellipse(t*rt(n),62,6.4,5.4,0,0,Math.PI*2),e.stroke(),U(e,t*(rt(n)+6),61,t*(n.rx+1),60,1,220);U(e,-rt(n)+6.4,61,rt(n)-6.4,61,1.2,238)}if(i===`moustache`&&H(e,[[-9,80],[-2,78],[0,80],[2,78],[9,80],[6,84],[0,82],[-6,84]],112),i===`goatee`&&H(e,[[-3,92],[3,92],[2,104+Math.sin(r)*.4],[-2,104]],70),i===`sleekhair`){V(e,0,40,n.rx+.5,9,56);for(let t=-4;t<=4;t++)U(e,t*5,33,t*5.6,47,1,84)}if(i===`freckles`)for(let t=0;t<9;t++)V(e,(t%2?1:-1)*(7+t*7%8),70+t*5%7,.8,.8,116);i===`milcap`&&(H(e,[[-n.rx-1,46],[-n.rx+1,34],[-12,30],[12,30],[n.rx-1,34],[n.rx+1,46],[n.rx+8,48],[-n.rx-8,48]],132),U(e,-n.rx,41,n.rx,41,1.6,170),V(e,0,38,3,3,245)),i===`brand`&&(U(e,-5,38,5,46,1.8,30),U(e,5,38,-5,46,1.8,30)),i===`glint`&&U(e,14,72,16,78,1,250)}}function at(e,t,n,r){let i=r.dead?0:G(n);for(let r of t){if(r===`towel`){H(e,[[-42,122],[-20,116],[-14,152],[-36,154]],205);for(let t=0;t<4;t++)U(e,-38+t*6,128+t*.5,-24+t*6,124,1.1,135)}if(r===`tankard`&&(H(e,[[28,130],[44,130],[43,156],[29,156]],200),e.strokeStyle=B(200),e.lineWidth=2.4,e.beginPath(),e.arc(46,140,5,-1.4,1.4),e.stroke(),V(e,36,130,8,2.2,245)),r===`apron`&&(H(e,[[-24,128],[24,128],[30,162],[-30,162]],62),U(e,-22,120,-10,130,3,150),U(e,22,120,10,130,3,150),U(e,-24,148,24,148,1.5,150)),r===`bibapron`&&(H(e,[[-16,126],[16,126],[22,162],[-22,162]],150),U(e,-14,120,-8,128,2,215),U(e,14,120,8,128,2,215)),r===`shawl`){H(e,[[-52,140],[-34,118],[-8,126],[-2,162],[-56,162]],150),H(e,[[52,140],[34,118],[8,126],[2,162],[56,162]],130);for(let t=0;t<4;t++)U(e,-46+t*8,142,-42+t*8,160,1,195)}if(r===`gorget`&&(H(e,[[-22,112],[22,112],[30,126],[-30,126]],200),U(e,-22,118,22,118,1.2,240)),r===`candle`){let t=108+Math.sin(n*9)*.8;H(e,[[43,128],[49,128],[49,152],[43,152]],212),H(e,[[46,t],[43.6,122],[48.4,122]],252),V(e,46,124,2.6,4.6,255)}if(r===`lamp`){let t=i*1.2;U(e,-44,142,-44,112+t,3,150),H(e,[[-52,112+t],[-36,112+t],[-38,96+t],[-50,96+t]],185),V(e,-44,104+t,5.2,7,250),H(e,[[-52,96+t],[-36,96+t],[-44,88+t]],205)}if(r===`scale`&&(U(e,46,98,46,158,3,190),U(e,28,106,64,100,2,215),V(e,28,118,9,2.4,195),V(e,64,112,9,2.4,195),U(e,28,106,28,118,1,160),U(e,64,100,64,112,1,160),V(e,28,114,3,3,250)),r===`ledger`){H(e,[[-34,134],[34,134],[38,162],[-38,162]],130),U(e,-30,138,30,138,1.3,215);for(let t=0;t<4;t++)U(e,-26,144+t*4.5,24-t%2*6,144+t*4.5,1,175)}if(r===`broom`){U(e,54,74,44,150,3,160),H(e,[[36,146],[52,146],[60,162],[32,162]],124);for(let t=0;t<5;t++)U(e,38+t*4,150,34+t*6,162,.9,190)}if(r===`sixfingers`){V(e,46,144,9,8,192);for(let t=0;t<6;t++){let n=-1.15+t*.46;U(e,46+t*2.2-5.5,140,46+t*2.2-5.5+Math.sin(n)*7,140-Math.cos(n)*13,2.2,222)}}r===`flame`&&(V(e,46,140,8,6,190),H(e,[[46,118-(.8+.2*Math.sin(n*11))*4],[40,134],[52,134]],245))}}function ot(e,t,n,r){if(r.dead)return;let i=.78+.22*Math.sin(n*7.3)*Math.sin(n*3.1+1),a=G(n);for(let r of t)r===`candle`&&W(e,46,118+Math.sin(n*9)*.6,18,`255,200,110`,.7*i),r===`lamp`&&W(e,-44,104+a*1.2,22,`255,214,130`,.7*i),r===`forgeglow`&&W(e,-46,108,30,`255,120,40`,.5*i),r===`flame`&&W(e,46,126,18,`255,150,50`,.7*i),r===`tankard`&&W(e,36,130,10,`255,200,110`,.3)}function st(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var ct={human:[`#0a0706`,`#3a2418`,`#a87a58`,`#ffe9cf`],barrowfolk:[`#07080a`,`#26282c`,`#8a8a82`,`#f0ecd8`],lanternkin:[`#0a0806`,`#40301a`,`#c09a4a`,`#fff6d0`],thornborn:[`#050806`,`#1c2a1c`,`#6a8a5a`,`#e8f2cc`],cinderkin:[`#0a0504`,`#401810`,`#b0502c`,`#ffd8a0`]},lt={human:{rx:23,ry:30,earKind:`round`},barrowfolk:{rx:27,ry:27,earKind:`small`},lanternkin:{rx:21,ry:32,earKind:`round`},thornborn:{rx:22,ry:31,earKind:`pointed`},cinderkin:{rx:24,ry:30,earKind:`small`}};function ut(e,t,n){let r=st(t*2654435761+977);return{...lt[e]??lt.human,jaw:r(),hair:Math.floor(r()*6),hairTone:90+r()*80,nose:Math.floor(r()*4),noseW:r(),eyeGap:r(),eyeSize:r(),brow:r(),mouthW:r(),beard:r(),scar:r(),age:r(),skin:r(),cheek:r(),mood:n}}var dt={good:1,neutral:0,evil:-1};function ft(e,t){t===`spellwright`&&(V(e,0,70,36,44,96),H(e,[[-40,110],[-30,64],[30,64],[40,110]],96)),t===`votary`&&(V(e,0,68,34,42,92),H(e,[[-44,120],[-30,60],[30,60],[44,120]],92)),t===`shade`&&(V(e,0,68,33,41,70),H(e,[[-42,118],[-30,62],[30,62],[42,118]],70)),t===`blade`&&V(e,0,68,30,38,150)}function pt(e,t,n,r){let i=66-r.ry;if(t===`blade`){e.save(),e.beginPath(),e.ellipse(0,66,r.rx+5,r.ry+5,0,0,Math.PI*2),e.ellipse(0,70,r.rx-4,r.ry-8,0,0,Math.PI*2),e.clip(`evenodd`),V(e,0,66,r.rx+6,r.ry+6,142);for(let t=i-4;t<100;t+=3)for(let n=-34;n<34;n+=3)V(e,n+Math.floor(t/3)%2*1.5,t,1.1,1,182);e.restore(),U(e,-r.rx+3,i+12,r.rx-3,i+12,2.5,120)}if(t===`spellwright`&&(e.save(),e.beginPath(),e.ellipse(0,66,r.rx+8,r.ry+8,0,0,Math.PI*2),e.ellipse(0,70,r.rx-2,r.ry-5,0,0,Math.PI*2),e.clip(`evenodd`),V(e,0,66,r.rx+9,r.ry+9,118),e.restore(),U(e,-r.rx+4,i+11,r.rx-4,i+11,2,230),V(e,0,i+11,2.6,2.6,250)),t===`votary`&&(e.save(),e.beginPath(),e.ellipse(0,66,r.rx+8,r.ry+7,0,0,Math.PI*2),e.ellipse(0,71,r.rx-3,r.ry-6,0,0,Math.PI*2),e.clip(`evenodd`),V(e,0,66,r.rx+9,r.ry+9,112),e.restore(),e.strokeStyle=B(225),e.lineWidth=2,e.beginPath(),e.arc(0,134,9,0,Math.PI*2),e.stroke(),U(e,0,124,0,144,2,225),U(e,-9,134,9,134,2,225)),t===`cutpurse`){H(e,[[-r.rx-2,i+14],[-r.rx+3,i+2],[0,i-5],[r.rx-3,i+2],[r.rx+2,i+14],[r.rx+12,i+12],[-r.rx-12,i+12]],128),U(e,-r.rx+3,i+4,r.rx-3,i+4,1.5,175),H(e,[[-22,104],[22,104],[26,120],[0,126],[-26,120]],190);for(let t=-2;t<=2;t++)U(e,t*9,106,t*10,122,1.2,130)}if(t===`oathblade`){H(e,[[-r.rx-3,66],[-r.rx-2,i+4],[-12,i-8],[12,i-8],[r.rx+2,i+4],[r.rx+3,66],[r.rx-3,66],[r.rx-4,i+14],[-r.rx+4,i+14],[-r.rx+3,66]],205);let t=Math.sin(n*1.3);H(e,[[-4,i-10],[4,i-10],[3,i-22+t],[-3,i-22+t]],235),U(e,0,i+12,0,70,3,232),H(e,[[-r.rx-2,62],[-r.rx+6,62],[-r.rx+4,92],[-r.rx-1,84]],190),H(e,[[r.rx+2,62],[r.rx-6,62],[r.rx-4,92],[r.rx+1,84]],190)}if(t===`shade`){H(e,[[-r.rx-1,70],[r.rx+1,70],[r.rx-4,100],[0,106],[-r.rx+4,100]],92);for(let t=-3;t<=3;t++)U(e,t*6,72,t*5,100,1,140);e.save(),e.beginPath(),e.ellipse(0,66,r.rx+8,r.ry+8,0,0,Math.PI*2),e.ellipse(0,76,r.rx+1,r.ry-4,0,0,Math.PI*2),e.clip(`evenodd`),V(e,0,66,r.rx+9,r.ry+9,66),e.restore()}}function mt(e,t,n){if(e.save(),e.translate(0,n*.8),H(e,[[-62,162],[-60,136],[-42,120],[-14,113],[14,113],[42,120],[60,136],[62,162]],112),t===`blade`||t===`oathblade`)for(let t=120;t<160;t+=4)for(let n=-52;n<52;n+=4)V(e,n+Math.floor(t/4)%2*2,t,1.3,1.1,160);else for(let t=-4;t<=4;t++)U(e,t*12,124,t*14,160,2,t%2?90:135);t===`oathblade`&&(H(e,[[-62,150],[-60,136],[-44,124],[-30,130],[-46,146]],190),H(e,[[62,150],[60,136],[44,124],[30,130],[46,146]],190)),e.restore()}function ht(e,t,n){let r=66-t.ry,i=t.hairTone;if(!(n||t.hair===0)){if(t.hair===1){V(e,0,r+7,t.rx+1.5,11,i);for(let t=-4;t<=4;t++)U(e,t*5,r+2,t*5.5,r+14,1,i+40)}if(t.hair===2&&(V(e,0,r+9,t.rx+2,14,i),H(e,[[-t.rx-3,r+12],[-t.rx-8,126],[-t.rx+5,120],[-t.rx+2,70]],i-10),H(e,[[t.rx+3,r+12],[t.rx+8,126],[t.rx-5,120],[t.rx-2,70]],i-10)),t.hair===3&&(H(e,[[-4,r-8],[4,r-8],[6,r+12],[-6,r+12]],i+20),V(e,-t.rx+3,r+18,3,8,i-30),V(e,t.rx-3,r+18,3,8,i-30)),t.hair===4&&(V(e,0,r+7,t.rx+1.5,12,i),H(e,[[-t.rx-1,r+6],[-2,r-2],[t.rx*.8,r+18],[-t.rx+2,r+22]],i+25),U(e,-3,r+1,-9,r+21,1.5,i-40)),t.hair===5){for(let t=-4;t<=4;t++)V(e,t*5.2,r+6+Math.abs(t)*.9,6.5,6,i+t%2*25);for(let n of[-1,1])V(e,n*(t.rx+1),r+22,5,9,i-10)}}}function gt(e,t,n,r,i){let a=t.mood;V(e,0,66,t.rx,t.ry,164),V(e,0,85,t.rx*(.62+t.jaw*.32),t.ry*.5,162),(t.jaw>.6||n===`barrowfolk`)&&H(e,[[-t.rx*.9,74],[-t.rx*.62,100],[t.rx*.62,100],[t.rx*.9,74]],160),V(e,0,65,t.rx-3,t.ry-3,178),V(e,0,64,t.rx-8,t.ry-8,190),V(e,0,63,t.rx-14,t.ry-14,198);for(let n of[-1,1])V(e,n*(t.rx-8),74,6+t.cheek*3,7,200);for(let n of[-1,1])t.earKind===`pointed`?H(e,[[n*(t.rx-1),60],[n*(t.rx+11),48],[n*(t.rx+2),76]],168):V(e,n*(t.rx+.5),68,t.earKind===`small`?2.8:3.8,t.earKind===`small`?5:6.5,160);let o=54+(n===`barrowfolk`?2:0),s=2.4+t.brow*1.6+(n===`barrowfolk`?2.2:0);for(let n of[-1,1]){let r=6.5+t.eyeGap*3.5;U(e,n*(r-3),o+(a<0?2.5:a>0?-.5:.5),n*(r+8),o+(a<0?-.5:a>0?1.5:0),s,222)}let c=n===`lanternkin`?1.35:1,l=i.dead?.08:we(r)*(a<0?.78:1);for(let n of[-1,1]){let i=n*(7.5+t.eyeGap*3.5);V(e,i,62,(4.8+t.eyeSize*1.2)*c,(3.2+t.eyeSize*.8)*c*Math.max(.12,l)+.6,84),l>.3?(V(e,i,62,(3.8+t.eyeSize*.8)*c,(2.2+t.eyeSize*.5)*c*l,205),V(e,i+Math.sin(r*.3)*.6,62,1.5*c,1.7*c*l,25)):U(e,i-5,62.5,i+5,62.5,1.4,40),t.age>.55&&V(e,i,67,5,1.4,120)}let u=1.6+t.noseW*1.6;t.nose===0&&(U(e,0,60,0,73,u,214),V(e,0,75,u*1.3,2.4,208)),t.nose===1&&(U(e,0,60,0,72,u*1.2,210),V(e,0,75,u*1.8,2.8,212)),t.nose===2&&(U(e,0,58,.8,75,u,218),H(e,[[-u,76],[u,76],[1,80]],212)),t.nose===3&&(V(e,0,70,u*1.2,u*1.5,214),V(e,0,74,u*1.5,2.6,208)),V(e,-u*.9,77,.9,.7,60),V(e,u*.9,77,.9,.7,60);let d=7+t.mouthW*4,f=a*1.6,p=i.speaking?(.5+.5*Math.sin(r*17))*(.6+.4*Math.sin(r*5.3)):0;if(V(e,0,89.5,d*.85,2.2+p*1.5,150),p>.12?V(e,0,89+p*2,d*.62,.8+p*3.6,12):(U(e,-d,88-f*.6,0,89,1.4,55),U(e,0,89,d,88-f*.6,1.4,55)),t.age>.4)for(let t=0;t<3;t++)U(e,-10+t*.5,44+t*3,10-t*.5,44+t*3,.9,150);if(t.age>.7)for(let t of[-1,1])U(e,t*8,78,t*12,86,1,135);if(t.scar>.62){let n=t.scar>.82?-1:1;U(e,n*13,56,n*8,74,1.5,245),U(e,n*11,62,n*14,64,1,60)}if(t.beard>.62||n===`barrowfolk`&&t.beard>.3){H(e,[[-t.rx*.8,80],[-t.rx*.5,96],[0,106],[t.rx*.5,96],[t.rx*.8,80],[t.rx*.5,86],[0,90],[-t.rx*.5,86]],t.hairTone+10);for(let n=-3;n<=3;n++)U(e,n*4,90,n*4.4,100,1,t.hairTone+60)}if(n===`thornborn`){for(let n of[-1,1])for(let r=0;r<3;r++)H(e,[[n*(t.rx-4-r),70+r*6],[n*(t.rx+5-r),66+r*7],[n*(t.rx-2-r),75+r*6]],226);for(let t=-2;t<=2;t++)U(e,t*7,40,t*7.5,50,1,140)}n===`cinderkin`&&(U(e,-14,68,-9,78,1.4,20),U(e,-9,78,-12,86,1.1,20),U(e,13,52,9,64,1.4,20),U(e,9,64,13,72,1.1,20)),n===`lanternkin`&&V(e,0,50,2.6,3.4,238)}function _t(e,t,n,r,i){if(i.dead)return;let a=.75+.25*Math.sin(r*6.1);if(n===`cinderkin`){for(let n of[-1,1])W(e,n*(7.5+t.eyeGap*3.5),62,4.5,`255,120,40`,.85*a*we(r));W(e,-11,76,4.5,`255,90,30`,.5*a),W(e,11,62,4.5,`255,90,30`,.45*a)}if(n===`lanternkin`){W(e,0,50,10,`255,225,150`,.8*a);for(let n of[-1,1])W(e,n*(7.5+t.eyeGap*3.5),62,5,`255,235,170`,.6*we(r))}if(t.mood<0)for(let n of[-1,1])W(e,n*(7.5+t.eyeGap*3.5),62,3,`255,60,50`,.35*we(r))}var vt=e=>{let t=7;for(let n of e)t=Math.imul(t,31)+n.charCodeAt(0)>>>0;return t};function yt(e,t,n,r){let i=n.dead?0:G(t),a=n.dead?.05:Math.sin(t*.4)*.025;e.save(),e.translate(0,106+i*.5),e.rotate(a),e.translate(0,-106),r(),e.restore()}function bt(e){let t={...ut(e.race,vt(e.id),e.mood),...e.look,mood:e.mood},n=e.gear??`none`,r=n!==`none`&&n!==`cutpurse`;return{id:`person-${e.id}`,ramp:Te(e.ramp,12),paint(i,a,o){mt(i,n,o.dead?0:G(a)),H(i,[[-9,96],[9,96],[12,118],[-12,118]],138),yt(i,a,o,()=>{ft(i,n),ht(i,t,r),gt(i,t,e.race,a,o),it(i,e.extras,t,a),pt(i,n,a,t)}),at(i,e.extras,a,o)},emit(n,r,i){yt(n,r,i,()=>_t(n,t,e.race,r,i)),ot(n,e.extras,r,i)}}}function xt(e){if(e.kind===`person`){let t=Qe[e.id];return t?bt(t):St({kind:`adventurer`,raceId:`human`,classId:`blade`,alignment:`neutral`,face:vt(e.id)})}return St(e)}function St(e){let t=ut(e.raceId,e.face,dt[e.alignment]??0),n=Te(ct[e.raceId]??ct.human,12),r=e.classId!==`cutpurse`;return{id:`face-${e.raceId}-${e.classId}-${e.alignment}-${e.face}`,ramp:n,paint(n,i,a){mt(n,e.classId,a.dead?0:G(i)),H(n,[[-9,96],[9,96],[12,118],[-12,118]],138),yt(n,i,a,()=>{ft(n,e.classId),ht(n,t,r),gt(n,t,e.raceId,i,a),pt(n,e.classId,i,t)})},emit(n,r,i){yt(n,r,i,()=>_t(n,t,e.raceId,r,i))}}}function Ct(e){let t=/(\d+)$/.exec(e);return t?Number(t[1]):0}function wt(e){let t=et(e.name);return t?{kind:`person`,id:t}:{kind:`adventurer`,raceId:e.raceId,classId:e.classId,alignment:e.alignment,face:Ct(e.id)}}var Tt=e=>e.kind===`person`?`p:${e.id}`:`a:${e.raceId}:${e.classId}:${e.alignment}:${e.face}`,Et=Te([`#060606`,`#262626`,`#7a7a7a`,`#d8d8d8`],12),Dt=new Map;function Ot(e){let t=Tt(e),n=Dt.get(t);if(!n){let r=xt(e),i=new Ie(r,128,160),a=new Ie({...r,ramp:Et},128,160);n={width:128,height:160,draw:(e,t,n)=>(n.dead?a:i).draw(e,t,n)},Dt.set(t,n)}return n}var kt=new Map;function At(e,t){let n=`${Tt(e)}|${t.dead?`x`:`o`}|${Math.round(t.damage*4)}|${Math.round(t.dying*4)}`,r=kt.get(n);if(r)return r;r=Ae(32,40),kt.set(n,r);try{let n=Ae(128,160),i=n.getContext(`2d`),a=r.getContext(`2d`);i&&a&&(Ot(e).draw(i,.6,{...t,damage:Math.round(t.damage*4)/4,dying:Math.round(t.dying*4)/4,speaking:!1}),a.imageSmoothingEnabled=!0,a.drawImage(n,0,0,32,40))}catch{}return r}var jt={hit:0,lunge:0,damage:0,dying:0,dead:!1,speaking:!1},Mt=class{el;spec=null;state={...jt};raf=0;running=!1;reduced=!1;constructor(){this.el=document.createElement(`canvas`),this.el.width=128,this.el.height=160,this.el.className=`portrait`;try{this.reduced=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1}catch{}}setSpec(e){this.spec=e,this.el.dataset.portrait=e.kind===`person`?e.id:`adv`,this.paint()}setSpeaking(e){this.state.speaking=e,this.paint()}setState(e){this.state={...this.state,...e},this.paint()}start(){if(this.running||(this.running=!0,this.paint(),this.reduced))return;let e=()=>{this.running&&(this.paint(),this.raf=requestAnimationFrame(e))};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf),this.raf=0}paint(){if(this.spec)try{let e=this.el.getContext(`2d`);if(!e)return;Ot(this.spec).draw(e,this.reduced?.6:performance.now()/1e3,this.state)}catch{}}};function Nt(e){let t=document.createElement(`canvas`);t.width=e.width,t.height=e.height;try{t.getContext(`2d`)?.drawImage(e,0,0)}catch{}return t}function Pt(e){return Nt(At(wt(e),{hit:0,lunge:0,damage:0,dying:0,dead:e.dead||e.ash,speaking:!1}))}function Ft(e,t){let n=z(t.id),r=t.spec?new Mt:null;r&&t.spec&&(r.setSpec(t.spec),r.start());let a=ve(7);e.msg=a;let o=i(`div`,{class:`thead`});i(`div`,{class:`scene`});let s=i(`div`,{class:`barslot`}),c=i(`div`,{class:`rosterslot`}),l=i(`div`,{class:`sceneextra`}),u=he(t.title,n,r?i(`div`,{class:`face`},r.el):null,i(`p`,{class:`blurb`},t.blurb),l),d=he(`Words`,n,a.el),f=he(`The Party`,z(`party`),c),p=i(`div`,{class:`screen townx`,style:`--accent:${n}`},o,i(`div`,{class:`left`},u),i(`div`,{class:`mid`},d),i(`div`,{class:`right`},f),s),m=()=>{let n=e.game;o.replaceChildren(i(`h2`,null,`Crowhithe`),i(`span`,{class:`dim`},`Day ${n.state.day} · ${n.state.party.gold} gold`)),s.replaceChildren(ge(t.commands())),c.replaceChildren(be(n.state.party,{selectedId:t.selectedId?.(),onPick:t.onPick,thumb:Pt})),l.replaceChildren(...(t.scene?.()??[]).filter(e=>e!==null))};return m(),{el:p,view:r,msg:a,update:m,setPortrait:e=>r?.setSpec(e),setSpeaking:e=>r?.setSpeaking(e),dispose:()=>r?.stop()}}function It(e){let t=e>>>0,n=()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296};return{next:n,int:(e,t)=>e+Math.floor(n()*(t-e+1)),pick:e=>e[Math.floor(n()*e.length)],chance:e=>n()<e,state:()=>t}}var Lt=[`name`,`race`,`alignment`,`alloc`,`class`,`confirm`],Rt=()=>({str:0,iq:0,pie:0,vit:0,agi:0,luck:0});function zt(e){let t=It(e);return t.next(),t.int(1e3,9999)}var Bt=class{seed;stage=`name`;spec={name:``,raceId:`human`,alignment:`neutral`};alloc=Rt();pool;constructor(e){this.seed=e,this.pool=_(It(e))}stats(){let e=o.find(e=>e.id===this.spec.raceId),t={};for(let n of a)t[n]=e.base[n]+this.alloc[n];return t}left(){return this.pool-a.reduce((e,t)=>e+this.alloc[t],0)}eligible(){return v(this.stats(),this.spec.alignment)}adjust(e,t){if(t>0){if(this.left()<=0||this.stats()[e]>=18)return!1}else if(this.alloc[e]<=0)return!1;return this.alloc[e]+=t,!0}reroll(e){this.seed=e,this.pool=_(It(e)),this.alloc=Rt(),this.spec.classId&&!this.eligible().includes(this.spec.classId)&&(this.spec.classId=void 0)}next(){let e=Lt.indexOf(this.stage);if(this.stage!==`name`||this.spec.name.trim()){if(this.stage===`alloc`){let e=this.eligible();if(e.length===0)return;this.spec.classId&&e.includes(this.spec.classId)||(this.spec.classId=e[0])}(this.stage!==`class`||this.spec.classId&&this.eligible().includes(this.spec.classId))&&e<Lt.length-1&&(this.stage=Lt[e+1])}}back(){let e=Lt.indexOf(this.stage);e!==0&&(this.stage=Lt[e-1],this.stage===`race`&&(this.alloc=Rt(),this.spec.classId=void 0))}build(){if(!this.spec.classId)throw Error(`no class chosen`);return b({name:this.spec.name.trim(),raceId:this.spec.raceId,classId:this.spec.classId,alignment:this.spec.alignment,pool:this.pool},this.alloc,It(this.seed))}},Vt=`123456789abcdefghijklmnopqrstuvwxyz`,Ht=e=>Vt[e]??``;function Ut(e,t,n=8){let r=e.rows.length,i={state:e,outcome:{kind:`ignored`}},a=t=>({state:{...e,index:t},outcome:{kind:`moved`}});if(t===`Escape`)return{state:e,outcome:{kind:`cancel`}};if(r===0)return i;if(t===`ArrowDown`)return a((e.index+1)%r);if(t===`ArrowUp`)return a((e.index+r-1)%r);if(t===`PageDown`)return a(Math.min(r-1,e.index+n));if(t===`PageUp`)return a(Math.max(0,e.index-n));if(t===`Home`)return a(0);if(t===`End`)return a(r-1);if(t===`Enter`)return e.rows[e.index].disabled?i:{state:e,outcome:{kind:`confirm`,index:e.index}};let o=t.toLowerCase(),s=o.length===1?e.rows.findIndex(e=>e.key?.toLowerCase()===o):-1;if(s>=0)return e.rows[s].disabled?i:{state:{...e,index:s},outcome:{kind:`confirm`,index:s}};let c=o.length===1&&!e.rows.some(e=>e.key)?Vt.indexOf(o):-1;return c>=0&&c<r&&!e.rows[c].disabled?{state:{...e,index:c},outcome:{kind:`confirm`,index:c}}:i}function Wt(e,t,n,r){return new Promise(i=>{let a=!1,o=r(r=>{a||(a=!0,e.router.pop(n),t.remove(),i(r))});e.layer.append(t),e.router.push({name:n,modal:!0,...o})})}function Gt(e,t){if(t.rows.length===0)return Promise.resolve(null);let n={rows:t.rows,index:Math.max(0,Math.min(t.rows.length-1,t.start??0))},r=i(`div`,{class:`dialog list`,style:t.accent?`--accent:${t.accent}`:null}),a=i(`div`,{class:`rows`});r.append(i(`div`,{class:`dlg-title`},t.title),a);let o=()=>{},s=()=>{a.replaceChildren(...n.rows.map((e,t)=>i(`div`,{class:`row${t===n.index?` sel`:``}${e.disabled?` off`:``}`,onclick:()=>{e.disabled||o(t)}},i(`span`,{class:`mark`},t===n.index?`>`:` `),i(`span`,{class:`lbl`},`${e.key?e.key.toUpperCase():Ht(t)}) ${e.label}`),e.detail?i(`span`,{class:`det`},e.detail):null))),a.querySelector(`.sel`)?.scrollIntoView?.({block:`nearest`})};return s(),Wt(e,r,`list`,e=>(o=e,{commands:()=>[],onKey:r=>{let i=Ut(n,r);return n=i.state,i.outcome.kind===`moved`?(s(),t.onMove?.(n.index),!0):i.outcome.kind===`confirm`?(e(i.outcome.index),!0):i.outcome.kind===`cancel`&&(e(null),!0)}}))}function Kt(e,t,n){let r=i(`div`,{class:`dialog confirm`,style:n?`--accent:${n}`:null}),a=()=>{},o=[{key:`y`,label:`Yes`,run:()=>a(!0)},{key:`n`,label:`No`,run:()=>a(!1)},{key:`Escape`,label:`No`,run:()=>a(!1)},{key:`Enter`,label:`No`,run:()=>a(!1)}];return r.append(i(`div`,{class:`dlg-text`},t),i(`div`,{class:`cmds`},...o.slice(0,2).map(e=>i(`button`,{class:`cmd`,onclick:e.run},F(e))))),Wt(e,r,`confirm`,e=>(a=e,{commands:()=>o}))}var qt=24;function Jt(e,t,n,r=``){let a=r.slice(0,qt),o=i(`span`,{class:`typed`}),s=i(`input`,{type:`text`,class:`namefield`,maxlength:qt,autocomplete:`off`,spellcheck:`false`,"aria-label":t});s.addEventListener(`input`,()=>{a=s.value.slice(0,qt),l()});let c=i(`div`,{class:`dialog name`,style:n?`--accent:${n}`:null},i(`div`,{class:`dlg-title`},t),i(`div`,{class:`field`,onclick:()=>s.focus()},`> `,o,i(`span`,{class:`cursor`},`_`),s),i(`div`,{class:`hint`},`Enter) accept   Esc) back`));function l(){o.textContent=a,s.value!==a&&(s.value=a)}l();let u=()=>{},d=Wt(e,c,`name`,e=>(u=e,{typing:!0,commands:()=>[{key:`Enter`,label:`Accept`,run:()=>{let e=a.trim();e&&u(e)}},{key:`Escape`,label:`Back`,run:()=>u(null)}],onKey:e=>e===`Backspace`?(a=a.slice(0,-1),l(),!0):e.length===1&&(a.length<qt&&(a+=e,l()),!0)}));return s.focus(),d}function Yt(e){return e.members.length>0?C(e,e.members[0].id,0):e}var Xt=e=>e<3?`front`:`back`;async function Zt(e,t=z(`tavern`)){let n=e.game,r=n.state.party;if(r.members.length<2)return e.say(`There is nobody to move.`),!1;let a=await Gt(e.host,{title:`Order the party: who moves?`,accent:t,rows:r.members.map((e,t)=>({label:e.name,detail:`slot ${t+1}, ${Xt(t)}${e.dead||e.ash?`, fallen`:``}`}))});if(a===null)return!1;let o=r.members[a].id,s=r,c=a,l=i(`div`,{class:`rows`}),u=i(`div`,{class:`dialog reorder`,style:`--accent:${t}`},i(`div`,{class:`dlg-title`},`Move them with ↑ and ↓`),l,i(`div`,{class:`hint`},`Enter) keep   Esc) put it back`)),d=()=>l.replaceChildren(...s.members.map((e,t)=>i(`div`,{class:`row${e.id===o?` sel`:``}${e.dead||e.ash?` off`:``}`},i(`span`,{class:`mark`},e.id===o?`>`:` `),i(`span`,{class:`lbl`},`${t+1}) ${e.name}`),i(`span`,{class:`det`},`${Xt(t)}${e.dead||e.ash?`, fallen`:``}`))));if(d(),!await new Promise(t=>{let n=n=>{e.host.router.pop(`reorder`),u.remove(),t(n)};e.host.layer.append(u),e.host.router.push({name:`reorder`,modal:!0,commands:()=>[],onKey:e=>{if(e===`ArrowUp`||e===`ArrowDown`){let t=Math.max(0,Math.min(s.members.length-1,c+(e===`ArrowUp`?-1:1)));return t!==c&&(c=t,s=C(s,o,t),d()),!0}return e===`Enter`?(n(!0),!0):e===`Escape`&&(n(!1),!0)}})})||s===r)return!1;n.state.party=s;let f=s.members.findIndex(e=>e.id===o);return e.say(`${s.members[f].name} now stands in slot ${f+1}, the ${Xt(f)} rank.`),!0}function Qt(e){let t=()=>{e.townPlace=`menu`,e.townMsg=``,e.refresh()};return[{key:`l`,label:`Leave`,run:t},{key:`Escape`,label:`Leave`,hidden:!0,run:t}]}var $t={str:`Strength`,iq:`Intellect`,pie:`Piety`,vit:`Vitality`,agi:`Agility`,luck:`Luck`},en=[`good`,`neutral`,`evil`];function tn(e){let t=e.game,n=z(`tavern`),r={kind:`person`,id:tt.tavern},c=()=>t.state.party.members.length<6,l=!1,u=()=>[{key:`r`,label:`Recruit`,enabled:c()&&!l,run:()=>void f(m)},{key:`n`,label:`New character`,enabled:c()&&!l,run:()=>void f(_)},{key:`o`,label:`Order the party`,enabled:t.state.party.members.length>1&&!l,run:()=>void f(g)},{key:`d`,label:`Dismiss`,enabled:t.state.party.members.length>0&&!l,run:()=>void f(h)},...Qt(e)],d=Ft(e,{id:`tavern`,title:`The Sump Tap`,blurb:`Dennis Brannoch pours, lies about his past, and finds you people who need work.`,spec:r,commands:u});async function f(e){if(!l){l=!0;try{await e()}finally{l=!1,d.setPortrait(r),d.update()}}}let p=()=>{let n=t.state.day;return oe(n,It(n*977+1),t.state.party).filter(t=>!e.recruited.has(t.id))};async function m(){let r=p();if(r.length===0){d.msg.say(`Nobody is waiting. Come back tomorrow.`);return}d.setPortrait(wt(r[0]));let i=await Gt(e.host,{title:`Waiting for work`,accent:n,rows:r.map(e=>({label:e.name,detail:`${L(e.raceId)} ${I(e.classId)} · ${e.alignment} · ${e.maxHp} hp`})),onMove:e=>d.setPortrait(wt(r[e]))});if(i!==null)try{t.state.party=S(t.state.party,r[i]),e.recruited.add(r[i].id),d.msg.say(`${r[i].name} joins you.`)}catch(e){d.msg.say(e instanceof Error?e.message:String(e))}}async function h(){let r=t.state.party.members,i=await Gt(e.host,{title:`Dismiss whom?`,accent:n,rows:r.map(e=>({label:e.name,detail:`${I(e.classId)} · slot ${r.indexOf(e)+1}`}))});if(i===null)return;let a=r[i];await Kt(e.host,`Send ${a.name} away? They leave the party for good.`,n)&&(t.state.party=Yt({...t.state.party,members:t.state.party.members.filter(e=>e.id!==a.id)}),d.msg.say(`${a.name} leaves.`))}async function g(){await Zt(e,n)}async function _(){let r=new Bt(Date.now()&16777215),i=()=>d.setPortrait({kind:`adventurer`,raceId:r.spec.raceId,classId:r.spec.classId??`blade`,alignment:r.spec.alignment,face:zt(r.seed)});for(i();;)if(r.stage===`name`){let t=await Jt(e.host,`Name your adventurer`,n,r.spec.name);if(t===null)return;r.spec.name=t,r.next()}else if(r.stage===`race`){let t=await Gt(e.host,{title:`Race for ${r.spec.name}`,accent:n,start:Math.max(0,o.findIndex(e=>e.id===r.spec.raceId)),rows:o.map(e=>({label:e.name,detail:a.map(t=>`${t.toUpperCase()} ${e.base[t]}`).join(` `)})),onMove:e=>{r.spec.raceId=o[e].id,i()}});if(t===null){r.back();continue}r.spec.raceId=o[t].id,i(),r.next()}else if(r.stage===`alignment`){let t=await Gt(e.host,{title:`Alignment`,accent:n,start:en.indexOf(r.spec.alignment),rows:en.map(e=>({label:e[0].toUpperCase()+e.slice(1),detail:e===`good`?`will not share a party with evil`:e===`evil`?`will not share a party with good`:`shares with anyone`})),onMove:e=>{r.spec.alignment=en[e],i()}});if(t===null){r.back();continue}r.spec.alignment=en[t],i(),r.next()}else if(r.stage===`alloc`)await v(r,i)===`back`?r.back():r.next();else if(r.stage===`class`){let t=r.eligible(),a=await Gt(e.host,{title:`Class`,accent:n,start:Math.max(0,t.indexOf(r.spec.classId??``)),rows:t.map(e=>({label:I(e),detail:`d${s.find(t=>t.id===e).hpDie} hit die`})),onMove:e=>{r.spec.classId=t[e],i()}});if(a===null){r.back();continue}r.spec.classId=t[a],i(),r.next()}else{if(!await Kt(e.host,`Sign ${r.spec.name.trim()} on as a ${L(r.spec.raceId)} ${I(r.spec.classId)}?`,n)){r.back();continue}try{let e=r.build();t.state.party=S(t.state.party,e),d.msg.say(`${e.name} joins you.`)}catch(e){d.msg.say(e instanceof Error?e.message:String(e))}return}}function v(t,r){let o=0,s=i(`div`,{class:`rows`}),c=i(`div`,{class:`hint`}),l=i(`div`,{class:`dialog alloc`,style:`--accent:${n}`},i(`div`,{class:`dlg-title`},`Attributes for ${t.spec.name}`),s,c,i(`div`,{class:`hint`},`↑↓) pick  ←→) change  R) re-roll the points  Enter) go on  Esc) back`)),u=()=>{let e=t.stats();s.replaceChildren(i(`div`,{class:`row`},i(`span`,{class:`lbl`},`Bonus points left: ${t.left()} of ${t.pool}`)),...a.map((n,r)=>i(`div`,{class:`row${r===o?` sel`:``}`,onclick:()=>{o=r,u()}},i(`span`,{class:`mark`},r===o?`>`:` `),i(`span`,{class:`lbl`},$t[n]),i(`span`,{class:`det`},`${e[n]}${t.alloc[n]?` (+${t.alloc[n]})`:``}`))),i(`div`,{class:`row`},i(`span`,{class:`lbl`},`Open to these scores:`),i(`span`,{class:`det`},t.eligible().length?t.eligible().map(I).join(`, `):`no class yet`)))};return u(),new Promise(n=>{let i=t=>{e.host.router.pop(`alloc`),l.remove(),n(t)};e.host.layer.append(l),e.host.router.push({name:`alloc`,modal:!0,commands:()=>[],onKey:e=>{if(e===`ArrowDown`)o=(o+1)%a.length;else if(e===`ArrowUp`)o=(o+a.length-1)%a.length;else if(e===`ArrowRight`||e===`+`||e===`=`)t.adjust(a[o],1);else if(e===`ArrowLeft`||e===`-`)t.adjust(a[o],-1);else if(e.toLowerCase()===`r`)t.reroll((Date.now()^Math.floor(Math.random()*16777215))&16777215),r(),c.textContent=``;else if(e===`Enter`)return t.eligible().length===0?(c.textContent=`No class is open to these scores yet. Spend more points, or re-roll.`,!0):(i(`next`),!0);else if(e===`Escape`)return i(`back`),!0;else return!1;return u(),!0}})})}return d.msg.say(`Six is a full party. Good and evil will not share a table.`),{el:d.el,commands:u,dispose:d.dispose}}var nn=e=>{let t=l.find(t=>t.id===e);if(!t)throw Error(`unknown item ${e}`);return t},rn={weapon:`weapon`,armour:`armour`,shield:`shield`,helm:`helm`,trinket:`trinket`};function an(e,t){if(!e.inventory.includes(t))throw Error(`${e.name} is not carrying ${t}`);let n=nn(t),r=rn[n.kind];if(!r)throw Error(`${n.name} cannot be equipped`);let i=s.find(t=>t.id===e.classId);if(!i.canUse.includes(n.tag))throw Error(`a ${i.name} cannot use ${n.name}`);let a=e.equipped[r];if(a&&nn(a).cursed)throw Error(`${nn(a).name} is cursed and will not come off`);let o=[...e.inventory];return o.splice(o.indexOf(t),1),a&&o.push(a),{...e,inventory:o,equipped:{...e.equipped,[r]:t}}}function on(e,t){let n=e.equipped[t];if(!n)return e;if(nn(n).cursed)throw Error(`${nn(n).name} is cursed and will not come off`);if(e.inventory.length>=8)throw Error(`${e.name}'s pack is full`);let r={...e.equipped};return delete r[t],{...e,inventory:[...e.inventory,n],equipped:r}}function sn(e,t){let n=nn(t);return n.unidentifiedName&&!(e.identified??[]).includes(t)?n.unidentifiedName:n.name}function cn(e,t,n){return s.find(e=>e.id===n.classId)?.abilities.includes(`identify`)?{...e,identified:Array.from(new Set([...e.identified??[],t]))}:e}function ln(e,t){return t.stock.filter(t=>!t.requiresDiscovery||e.discoveries.includes(t.requiresDiscovery)).map(e=>nn(e.itemId))}function un(e,t,n,r){if(!ln(e,n).some(e=>e.id===t))throw Error(`${t} is not for sale here`);let i=nn(t);if(e.gold<i.price)throw Error(`not enough gold for ${i.name} (${i.price})`);let a=e.members.find(e=>e.id===r);if(!a)throw Error(`no such member ${r}`);if(a.inventory.length>=8)throw Error(`${a.name}'s pack is full`);return{...e,gold:e.gold-i.price,members:e.members.map(e=>e.id===r?{...e,inventory:[...e.inventory,t]}:e)}}function dn(e,t,n){let r=e.members.find(e=>e.id===t);if(!r||!r.inventory.includes(n))throw Error(`${t} is not carrying ${n}`);let i=[...r.inventory];return i.splice(i.indexOf(n),1),{...e,gold:e.gold+Math.floor(nn(n).price/2),members:e.members.map(e=>e.id===t?{...e,inventory:i}:e)}}function fn(e,t){let n=()=>e.game.state.party.members,r=()=>{let t=n();return t.find(t=>t.id===e.selectedId)??t[0]},i=n=>{e.selectedId=n,t()},a=e=>{let t=n();if(t.length===0)return;let a=Math.max(0,t.findIndex(e=>e.id===r()?.id));i(t[(a+e+t.length)%t.length].id)};return{current:r,select:i,step:a,commands:()=>[...n().map((e,t)=>({key:String(t+1),label:e.name,hidden:!0,run:()=>i(e.id)})),{key:`ArrowLeft`,label:`Previous member`,hidden:!0,run:()=>a(-1)},{key:`ArrowRight`,label:`Next member`,run:()=>a(1)}]}}var pn=e=>l.find(t=>t.id===e);function mn(e){let t=e.game,n=z(`smith`),r,a=fn(e,()=>r.update()),o=()=>[{key:`b`,label:`Buy`,run:()=>void s()},{key:`s`,label:`Sell`,run:()=>void c()},{key:`i`,label:`Identify`,run:()=>void l()},...a.commands(),...Qt(e)];r=Ft(e,{id:`smith`,title:`Ferrule's Forge`,blurb:`Hobb Ferrule names every blade and refuses to sell the ones he likes.`,spec:{kind:`person`,id:tt.smith},commands:o,scene:()=>[i(`div`,null,`Serving: ${a.current()?.name??`nobody`}`),i(`div`,{class:`dim`},`${t.state.party.gold} gold. 1-6 or the arrows pick who.`)],selectedId:()=>a.current()?.id,onPick:e=>a.select(e.id)});async function s(){let i=a.current();if(!i){r.msg.say(`Nobody to sell to.`);return}let o=t.state.party,s=ln(o,re),c=await Gt(e.host,{title:`For ${i.name} (you have ${o.gold} gold)`,accent:n,rows:s.map(e=>({label:e.name,detail:`${e.damage?`damage ${e.damage[0]}d${e.damage[1]}  `:e.ac?`armour +${e.ac}  `:e.spellId?`restores health  `:``}${e.price}g`,disabled:o.gold<e.price}))});if(c!==null){try{t.state.party=un(o,s[c].id,re,i.id),r.msg.say(`Bought ${s[c].name}.`)}catch(e){r.msg.say(e instanceof Error?e.message:String(e))}r.update()}}async function c(){let i=a.current();if(!i){r.msg.say(`Nobody to buy from.`);return}if(i.inventory.length===0){r.msg.say(`${i.name} is carrying nothing Hobb would pay for.`);return}let o=await Gt(e.host,{title:`${i.name} sells`,accent:n,rows:i.inventory.map(e=>({label:sn(t.state.party,e),detail:`${Math.floor(pn(e).price/2)}g`}))});if(o===null)return;let s=i.inventory[o];try{t.state.party=dn(t.state.party,i.id,s),r.msg.say(`Sold ${sn(t.state.party,s)} for ${Math.floor(pn(s).price/2)}g.`)}catch(e){r.msg.say(e instanceof Error?e.message:String(e))}r.update()}async function l(){let i=a.current();if(!i)return;let o=i.inventory.filter(e=>pn(e).unidentifiedName&&!(t.state.party.identified??[]).includes(e));if(o.length===0){r.msg.say(`${i.name} has nothing here that needs identifying.`);return}let s=await Gt(e.host,{title:`${i.name} studies`,accent:n,rows:o.map(e=>({label:sn(t.state.party,e)}))});if(s===null)return;let c=t.state.party,l=cn(c,o[s],i);l===c?r.msg.say(`Only a Shade can read what a thing really is.`):(t.state.party=l,r.msg.say(`${i.name} turns it over, and it is ${sn(l,o[s])}.`),r.update())}return r.msg.say(`"Look all you like. Touching costs extra."`),{el:r.el,commands:o,dispose:r.dispose}}var hn=(e,t)=>Math.max(100,e*100)*(t?3:1);function gn(e){let t=e.game,n=()=>t.state.party.members.filter(e=>e.dead||e.ash),r=()=>[{key:`r`,label:`Raise`,run:()=>void a()},...Qt(e)],i=Ft(e,{id:`temple`,title:`The House of Ash`,blurb:`The Sisters believe a body is a loan and ash is the receipt. They are kind, tired, and bad at bookkeeping.`,spec:{kind:`person`,id:tt.temple},commands:r});async function a(){let r=n();if(r.length===0){i.msg.say(`Sister Ottoline weighs an urn that is not yours. "Light," she says, and does not explain.`);return}let a=t.state.party.gold,o=await Gt(e.host,{title:`The fallen (you have ${a} gold)`,accent:z(`temple`),rows:r.map(e=>({label:`${e.name} — ${e.ash?`ash. Only the costly rite can try.`:`dead. The ordinary rite will try.`}`,detail:`${hn(e.level,e.ash)}g`,disabled:a<hn(e.level,e.ash)}))});if(o===null)return;let s=r[o],c=hn(s.level,s.ash);if(!s.ash||await Kt(e.host,`${s.name} is ash. The ash rite costs ${c} gold, and if it fails they are gone for good. Go on?`,z(`temple`))){try{let e=le(t.state.party,s.id,It(Date.now()&16777215),s.ash?2:1);t.state.party=Yt(e);let n=e.members.find(e=>e.id===s.id);n?n.ash?i.msg.say(`The rite failed, and ${s.name} came back as ash. It is the receipt.`):n.dead?i.msg.say(`The rite failed. ${s.name} stays dead, and you are ${c} gold lighter.`):i.msg.say(`${s.name} breathes. The ash was warm. They say it counts.`):i.msg.say(`${s.name} is gone for good. Sister Ottoline wept, and was told not to.`)}catch(e){i.msg.say(e instanceof Error?e.message:String(e))}i.update()}}return i.msg.say(n().length?`The Sisters look up. "Who is it this time?"`:`"Nobody on the slab today," says Sister Ottoline. "Keep it that way."`),{el:i.el,commands:r,dispose:i.dispose}}var _n=[[`The stable`,`Free. Heals nothing. Levelling still happens in your sleep.`,0],[`A cot`,`Half the wounds, no rest for spells.`,10],[`A proper room`,`Everything mended, every spell restored.`,30],[`The suite`,`As above, and the curses sleep it off.`,80]];function vn(e){let t=e.game,n=()=>[{key:`r`,label:`Rest`,run:()=>void i()},...Qt(e)],r=Ft(e,{id:`inn`,title:`The Last Mattress`,blurb:`Wenna Ashby remembers every guest's last words, if they were rude enough.`,spec:{kind:`person`,id:tt.inn},commands:n});async function i(){let n=t.state.party.gold,i=await Gt(e.host,{title:`Rooms (you have ${n} gold)`,accent:z(`inn`),rows:_n.map(([e,t,r])=>({label:`${e} — ${t}`,detail:`${r}g`,disabled:n<r}))});if(i!==null){try{let n=t.restAtInn(i);e.autosave(),r.msg.say(n.leveled.length?`${n.leveled.join(`, `)} grew stronger in the night.`:`You slept. Nobody died.`)}catch(e){r.msg.say(e instanceof Error?e.message:String(e))}r.update()}}return r.msg.say(`Anyone with enough experience levels up when they sleep.`),{el:r.el,commands:n,dispose:r.dispose}}function yn(e){let t=e.game,n=()=>[{key:`a`,label:`Ask for news`,run:()=>{e.msg?.say(`Today's change:`);for(let n of fe(t.state.party))e.msg?.say(n)}},...Qt(e)],r=Ft(e,{id:`informant`,title:`Maud's Pawnshop`,blurb:`Maud pays in tiny coins, each wrapped in a new rumour.`,spec:{kind:`person`,id:tt.informant},commands:n});return r.msg.say(`"Come in, come in. Nothing here is stolen. Much."`),{el:r.el,commands:n,dispose:r.dispose}}function bn(e){let t=e.game,n=!1,r=()=>[{key:`h`,label:`Hear a tale`,enabled:!n,run:()=>void a()},...Qt(e)],i=Ft(e,{id:`tales`,title:`The Lamp and Lung`,blurb:`Old Tamsin Quell tells every story as if she were there, and corrects anyone who says she wasn't.`,spec:{kind:`person`,id:tt.tales},commands:r});async function a(){let e=pe(t.state.party,It(Date.now()&16777215));t.state.party=e.party,e.tale?(i.setPortrait(nt(e.tale.speaker)??{kind:`person`,id:tt.tales}),n=!0,i.update(),i.setSpeaking(!0),await i.msg.type(e.tale.text),i.setSpeaking(!1),i.msg.say(`  — ${e.tale.speaker}`),n=!1,i.update()):(i.setPortrait({kind:`person`,id:tt.tales}),i.msg.say(`Tamsin has run out of stories for you. She says so, and then tells one anyway.`))}return i.msg.say(`"Sit. Buy a round, and I will tell you something true. Or true enough."`),{el:i.el,commands:r,dispose:i.dispose}}var xn=()=>({entries:[],next:1});function Sn(e,t){let n={...t,id:`c${e.next}`};return{entries:[...e.entries,n].slice(-200),next:e.next+1}}function Cn(e,t=10){return[...e.entries].reverse().slice(0,t).map(e=>`Day ${e.day}: ${e.text}`)}var wn=[`weapon`,`armour`,`shield`,`helm`,`trinket`];function Tn(e,t){let n=e.known.map(e=>c.find(t=>t.id===e)?.name??e),r=e.row===`front`?`front rank`:`back rank`;return[i(`div`,null,i(`b`,null,e.name),` · Lv ${e.level} ${L(e.raceId)} ${I(e.classId)} · ${e.alignment} · ${r}`),i(`div`,null,`HP ${e.hp}/${e.maxHp}${e.dead||e.ash?e.ash?` · ash`:` · dead`:``}${e.status.length?` · ${e.status.join(`, `)}`:``}`),i(`div`,null,a.map(t=>`${t.toUpperCase()} ${e.stats[t]}`).join(`  `)),i(`div`,{class:`dim`},`Spells: ${n.length?n.join(`, `):`none`}`),i(`div`,{class:`dim`},`Techniques: ${e.techniques.length?e.techniques.join(`, `):`none`}`),i(`div`,null,i(`b`,null,`Wearing`)),...wn.map(n=>i(`div`,{class:`dim`},`${n}: ${e.equipped[n]?sn(t,e.equipped[n]):`nothing`}`)),i(`div`,null,i(`b`,null,`Carrying`)),i(`div`,{class:`dim`},e.inventory.length?e.inventory.map(e=>sn(t,e)).join(`, `):`Nothing but lint.`)]}var En=e=>l.find(t=>t.id===e);function Dn(e){let t=e.game,n=z(`party`),r,a=fn(e,()=>{c(),r.update()}),o=a.current(),s=()=>[{key:`e`,label:`Equip`,run:()=>void d()},{key:`u`,label:`Unequip`,run:()=>void f()},{key:`s`,label:`Study`,run:()=>void p()},...a.commands(),...Qt(e)];r=Ft(e,{id:`party`,title:`The Party and its Packs`,blurb:`Who is wearing what, and who is carrying whose lunch.`,spec:o?wt(o):null,commands:s,scene:()=>l(a.current()),selectedId:()=>a.current()?.id,onPick:e=>a.select(e.id)});function c(){let e=a.current();e&&(r.setPortrait(wt(e)),r.view?.setState({dead:e.dead||e.ash,damage:e.dead||e.ash?0:Math.max(0,Math.min(1,1-e.hp/Math.max(1,e.maxHp)))*.6}))}function l(e){return e?Tn(e,t.state.party):[i(`div`,{class:`dim`},`Nobody to look at.`)]}function u(e,n){let r=t.state.party;t.state.party={...r,members:r.members.map(t=>t.id===e?n(t):t)}}async function d(){let i=a.current();if(!i)return;let o=i.inventory.filter(e=>En(e).kind!==`consumable`);if(o.length===0){r.msg.say(`${i.name} has nothing to put on.`);return}let s=await Gt(e.host,{title:`${i.name} puts on`,accent:n,rows:o.map(e=>({label:sn(t.state.party,e),detail:En(e).kind}))});if(s!==null){try{u(i.id,e=>an(e,o[s])),r.msg.say(`${i.name} equips ${sn(t.state.party,o[s])}.`)}catch(e){r.msg.say(e instanceof Error?e.message:String(e))}r.update()}}async function f(){let i=a.current();if(!i)return;let o=wn.filter(e=>i.equipped[e]);if(o.length===0){r.msg.say(`${i.name} is wearing nothing to take off.`);return}let s=await Gt(e.host,{title:`${i.name} takes off`,accent:n,rows:o.map(e=>({label:sn(t.state.party,i.equipped[e]),detail:e}))});if(s!==null){try{u(i.id,e=>on(e,o[s])),r.msg.say(`${i.name} takes off the ${o[s]}.`)}catch(e){r.msg.say(e instanceof Error?e.message:String(e))}r.update()}}async function p(){let i=a.current();if(!i)return;if(i.inventory.length===0){r.msg.say(`${i.name} is carrying nothing to study.`);return}let o=await Gt(e.host,{title:`${i.name} studies`,accent:n,rows:i.inventory.map(e=>({label:sn(t.state.party,e)}))});if(o===null)return;let s=t.state.party,c=cn(s,i.inventory[o],i);c===s?r.msg.say(`Only a Shade can read what a thing really is.`):(t.state.party=c,r.msg.say(`It is ${sn(c,i.inventory[o])}.`)),r.update()}c(),r.msg.say(`The chronicle:`);for(let e of Cn(t.state.chronicle,4))r.msg.say(e);return{el:r.el,commands:s,dispose:r.dispose}}var On={tavern:tn,smith:mn,temple:gn,inn:vn,informant:yn,tales:bn,party:Dn},kn={tavern:[`t`,`Tavern`],smith:[`f`,`Forge`],temple:[`h`,`House of Ash`],inn:[`i`,`Inn`],informant:[`m`,`Maud's`],tales:[`l`,`Lamp and Lung`],party:[`p`,`Party and packs`]};function An(e){let t=On[e.townPlace];if(!t)return jn(e);let n=t(e);return e.setCommands(n.commands),e.onScreenDispose(n.dispose),n.el}function jn(e){let t=t=>()=>{e.townPlace=t,e.townMsg=``,e.refresh()},n=()=>[...Object.entries(kn).map(([e,[n,r]])=>({key:n,label:r,run:t(e)})),{key:`e`,label:`Enter the Undervault`,run:()=>e.enterDungeon()},{key:`Escape`,label:`System`,run:()=>void e.openSystem()}],r=Ft(e,{id:`title`,title:`Crowhithe`,blurb:`A town on top of a hole. The lamps are lit, the Wardens are bored, and everyone is selling something.`,spec:null,commands:n,scene:()=>[...Object.entries(kn).map(([e,[t]])=>i(`div`,null,`${t.toUpperCase()}) ${ne.find(t=>t.id===e)?.name??`The Party and its Packs`}`)),i(`div`,null,`E) Enter the Undervault`),i(`div`,{class:`dim`},`Esc) System`)]});return e.setCommands(n),r.msg.say(e.townMsg||`Where to?`),r.el}async function Mn(e){let t=z(`dungeon`);for(;;){let n=await Gt(e.host,{title:`Camp`,accent:t,rows:[{label:`Inspect a member`,key:`i`},{label:`Reorder the party`,key:`r`},{label:`Save to file`,key:`s`,disabled:!e.game},{label:`Options`,key:`o`},{label:`Leave camp`,key:`l`}]});if(n===null||n===4)return;n===0?await Nn(e,t):n===1?await Zt(e,t)&&e.updateDungeon():n===2?e.saveToFile():await e.openOptions()}}async function Nn(e,t){let n=e.game;for(;;){let r=n.state.party,i=await Gt(e.host,{title:`Inspect whom?`,accent:t,rows:r.members.map((e,t)=>({label:e.name,detail:`${I(e.classId)} · slot ${t+1}`}))});if(i===null)return;await Pn(e,t,i)}}function Pn(e,t,n){let r=e.game.state.party,a=r.members[n],o=i(`div`,{class:`dialog sheet`,style:`--accent:${t}`},i(`div`,{class:`dlg-title`},a.name),...Tn(a,r),i(`div`,{class:`hint`},`Esc) back`));return new Promise(t=>{let n=()=>{e.host.router.pop(`sheet`),o.remove(),t()};e.host.layer.append(o),e.host.router.push({name:`sheet`,modal:!0,commands:()=>[{key:`Escape`,label:`Back`,run:n},{key:`Enter`,label:`Back`,hidden:!0,run:n}]})})}function Fn(e){let t=e.game?Cn(e.game.state.chronicle,6):[],n=new Mt;n.setSpec({kind:`person`,id:`moss`}),n.start(),e.onScreenDispose(()=>n.stop());let r=[{key:`b`,label:`Begin again`,run:()=>e.newGame()},{key:`l`,label:`Load from file`,run:()=>void e.loadFromFile()},{key:`t`,label:`Title`,run:()=>e.dispatch({type:`toTitle`})}];e.setCommands(()=>r);let a=ve(12);return e.msg=a,n.setSpeaking(!0),a.type(`Corporal Moss reads the names at dawn, one more than yesterday. Yours are in the book now.`).then(()=>{n.setSpeaking(!1);for(let e of t)a.say(e)}),i(`div`,{class:`screen endx`},he(`The Roll of the Gone`,z(`temple`),i(`div`,{class:`face`},n.el),a.el,ge(r)))}function In(e){let t=e.game?f.filter(t=>e.game.state.party.discoveries.includes(t.id)).length:0,n=e.game?Cn(e.game.state.chronicle,8):[],r=[{key:`b`,label:`Back to Crowhithe`,run:()=>e.backToTown()},{key:`s`,label:`Save to file`,run:()=>e.saveToFile()},{key:`t`,label:`Title`,run:()=>e.dispatch({type:`toTitle`})}];return e.setCommands(()=>r),i(`div`,{class:`screen endx`},he(`Settled, for now`,z(`inn`),i(`p`,null,`The Quiet Below asks whether you have come about the account. You say yes, and mean it. A receipt, warm as a hand, is pressed into yours. The walls go quiet. Somewhere far above, a clerk puts down his pen.`),i(`p`,{class:`dim`},`This is the end of the demo. You found ${t} of ${f.length} things the Vault was keeping.`),i(`h3`,null,`The chronicle`),...n.map(e=>i(`div`,{class:`tale`},e)),ge(r)))}async function Ln(e){let t=await Gt(e.host,{title:`System`,accent:`#c9b787`,rows:[{label:`Save to file`,key:`s`,disabled:!e.game},{label:`Load from file`,key:`l`},{label:`Options`,key:`o`},{label:`Quit to title`,key:`q`}]});t===0?e.saveToFile():t===1?await e.loadFromFile():t===2?await Bn(e):t===3&&(e.autosave(),e.dispatch({type:`toTitle`}))}var Rn=[`off`,`low`,`normal`];function zn(e){let t=(t,n,r,i,a)=>({label:t,show:()=>String(Number(e.settings()[n].toFixed(2))),adjust:t=>{let o=Math.min(i,Math.max(r,Math.round((e.settings()[n]+t*a)/a)*a));e.setSettings({...e.settings(),[n]:Number(o.toFixed(3))})},flip:()=>{},fill:()=>(e.settings()[n]-r)/(i-r)}),n=(t,n,r,i)=>({label:t,show:()=>i[r.indexOf(e.settings()[n])]??String(e.settings()[n]),adjust:t=>{let i=r.indexOf(e.settings()[n]);e.setSettings({...e.settings(),[n]:r[(i+t+r.length)%r.length]})},flip:()=>{let t=r.indexOf(e.settings()[n]);e.setSettings({...e.settings(),[n]:r[(t+1)%r.length]})},fill:()=>null});return[t(`Bloom`,`bloom`,0,2,.05),t(`Torch flicker`,`flicker`,0,2,.05),t(`Fog`,`fog`,.03,.6,.01),t(`Lantern`,`lamp`,0,2,.05),n(`Quality`,`quality`,[`normal`,`low`],[`Normal`,`Low (no bloom, for slower machines)`]),n(`Automap`,`automap`,[`on`,`off`],[`On (fills in as you explore)`,`Off (draw your own)`]),{label:`Screen glow`,show:()=>Se(),adjust:e=>Ce(Rn[(Rn.indexOf(Se())+e+Rn.length)%Rn.length]),flip(){this.adjust(1)},fill:()=>null}]}function Bn(e){let t=zn(e),n=0,r=i(`div`,{class:`rows`}),a=i(`div`,{class:`dialog options`,style:`--accent:#c9b787`},i(`div`,{class:`dlg-title`},`Options`),r,i(`div`,{class:`hint`},`↑↓) pick   ←→) change   Enter) flip   Esc) done`)),o=()=>{r.replaceChildren(...t.map((e,t)=>{let r=e.fill(),a=r===null?null:i(`span`,{class:`meter`},`#`.repeat(Math.round(r*12)).padEnd(12,`-`));return i(`div`,{class:`row${t===n?` sel`:``}`,onclick:()=>{n=t,o()}},i(`span`,{class:`mark`},t===n?`>`:` `),i(`span`,{class:`lbl`,style:`min-width:9rem`},e.label),a,i(`span`,{class:`det`},e.show()),i(`button`,{class:`cmd step`,type:`button`,onclick:r=>{r.stopPropagation(),n=t,e.adjust(-1),o()}},`‹`),i(`button`,{class:`cmd step`,type:`button`,onclick:r=>{r.stopPropagation(),n=t,e.adjust(1),o()}},`›`))}))};return o(),new Promise(r=>{let i=()=>{e.host.router.pop(`options`),a.remove(),r()};e.host.layer.append(a),e.host.router.push({name:`options`,modal:!0,commands:()=>[{key:`Escape`,label:`Done`,run:i}],onKey:e=>{if(e===`ArrowDown`)n=(n+1)%t.length;else if(e===`ArrowUp`)n=(n+t.length-1)%t.length;else if(e===`ArrowLeft`)t[n].adjust(-1);else if(e===`ArrowRight`)t[n].adjust(1);else if(e===`Enter`)t[n].flip();else return!1;return o(),!0}})})}var Vn=[{kind:`fight`,key:`f`,label:`Fight`},{kind:`spell`,key:`s`,label:`Spell`},{kind:`parry`,key:`p`,label:`Parry`},{kind:`use`,key:`u`,label:`Use`},{kind:`run`,key:`r`,label:`Run`}];function Hn(e){return[`damage`,`sleep`,`silence`,`identify`].includes(e.kind)?`group`:e.kind===`heal`&&e.target===`ally`?`ally`:`party`}function Un(e,t){let n=[];for(let r of t.known){let i=c.find(e=>e.id===r);!i||(t.charges[i.level-1]??0)<=0||(!i.discoveryId||e.party.discoveries.includes(i.discoveryId))&&n.push(i)}return n}function Wn(e){return[...new Set(e.inventory)].filter(e=>l.find(t=>t.id===e)?.kind===`consumable`)}var Gn=class{state;previous;asked;at=0;given={};constructor(e,t={}){this.state=e,this.previous=t,this.asked=e.party.members.filter(O)}current(){return this.asked[this.at]??null}done(){return this.at>=this.asked.length}choices(){let e=this.current();if(!e)return[];let t=h(e);return Vn.map(e=>({...e,enabled:t.includes(e.kind)}))}answer(e){let t=this.current();t&&(this.given[t.id]=e,this.at++)}takeBack(){this.at!==0&&(this.at--,delete this.given[this.asked[this.at].id])}repeat(){let e=this.current(),t=e?this.previous[e.id]:void 0;return!e||!t||!this.stillLegal(e,t)?!1:(this.answer(t),!0)}autoFill(e){for(;!this.done();)this.answer(e[this.current().id]??{kind:`parry`})}orders(){return{...this.given}}stillLegal(e,t){if(!h(e).includes(t.kind))return!1;let n=this.state;if(t.kind===`fight`){let e=n.groups[t.group];return!!e&&A(e)>0}if(t.kind===`spell`){let r=Un(n,e).find(e=>e.id===t.spellId);if(!r)return!1;let i=Hn(r);if(i===`group`){let e=n.groups[t.target];return!!e&&A(e)>0}if(i===`ally`){let e=n.party.members[t.target];return!!e&&D(e)}return!0}if(t.kind===`use`){let r=n.party.members[t.target];return Wn(e).includes(t.itemId)&&!!r&&D(r)}return!0}};function Kn(e,t,n,r,i,a={}){let o=e.party.members.find(e=>e.id===t),s=c.find(e=>e.id===n),l=e=>[{t:`fizzle`,actor:t,spellId:n,reason:e}];if(!o||!s)return l(`unknown`);if(!D(o)||o.status.includes(`asleep`)||o.status.includes(`paralysed`))return l(`asleep`);if(!a.free){if(o.status.includes(`silenced`))return l(`silenced`);if(!o.known.includes(n))return l(`unknown`);if(s.discoveryId&&!e.party.discoveries.includes(s.discoveryId))return l(`locked`);if((o.charges[s.level-1]??0)<=0)return l(`no charge`)}let u=()=>{a.free||--o.charges[s.level-1]},d=e.groups[r];if([`damage`,`sleep`,`silence`,`identify`].includes(s.kind)&&(!d||A(d)===0))return l(`no target`);switch(s.kind){case`damage`:{u();let a=0,o=0,c=s.target===`group`?d.hp.map((e,t)=>e>0?t:-1).filter(e=>e>=0):[j(d)],l=s.target===`group`?0:E(s.power,i);for(let t of c){let n=s.target===`group`?E(s.power,i):l;a+=n,te(e,r,t,n,i)&&o++}return[{t:`cast`,actor:t,spellId:n,target:r,dmg:a,killed:o}]}case`sleep`:{u();let e=i.chance(.85);return e&&(d.asleep=!0),[{t:`cast`,actor:t,spellId:n,target:r,effect:e?`asleep`:`resisted`}]}case`silence`:return u(),d.silenced=!0,[{t:`cast`,actor:t,spellId:n,target:r,effect:`silenced`}];case`buff`:u();for(let t of e.party.members)D(t)&&!t.status.includes(`shielded`)&&t.status.push(`shielded`);return[{t:`cast`,actor:t,spellId:n,effect:`shielded`}];case`heal`:{let a=s.target===`party`?e.party.members.filter(D):[e.party.members[r]].filter(e=>e&&D(e));if(a.length===0)return l(`no target`);u();let o=0;for(let e of a){let t=e.hp;e.hp=Math.min(e.maxHp,e.hp+E(s.power,i)),o+=e.hp-t}return[{t:`cast`,actor:t,spellId:n,healed:o}]}case`identify`:{u();let e=d.def;return[{t:`cast`,actor:t,spellId:n,target:r,effect:`identified`},{t:`note`,text:`${e.name}: ${A(d)} left, armour ${e.ac}, ${e.behaviour}`}]}case`detect`:return u(),[{t:`cast`,actor:t,spellId:n,effect:`detect`}];case`escape`:return u(),e.escaped=!0,[{t:`cast`,actor:t,spellId:n,effect:`escape`}]}}var qn=e=>e.hp/e.maxHp;function Jn(e,t,n){let r=e.groups[t],i=k(e.party);if(i.length===0)return{kind:`wait`};let a=i.filter(e=>e.row===`front`),o=i.filter(e=>e.row===`back`),s=[...i].sort((e,t)=>qn(e)-qn(t))[0];switch(r.def.behaviour){case`skittish`:if(A(r)/r.hp.length<.5){if(r.hp.length<9&&n.chance(.12))return{kind:`callHelp`};if(n.chance(.5))return{kind:`flee`}}break;case`caster`:{let e=(r.def.spells??[]).filter(e=>{let t=c.find(t=>t.id===e)?.kind;return t===`silence`?i.some(e=>e.maxCharges.some(e=>e>0)&&!e.status.includes(`silenced`)):t!==`sleep`||i.some(e=>!e.status.includes(`asleep`))});if(!r.silenced&&e.length>0&&n.chance(.6)){let t=n.pick(e),r=c.find(e=>e.id===t)?.kind,a=i.filter(e=>e.maxCharges.some(e=>e>0)&&!e.status.includes(`silenced`));return{kind:`cast`,spellId:t,target:(r===`silence`&&a.length>0?n.pick(a):s).id}}break}case`swarm`:return{kind:`attack`,target:s.id};case`ambusher`:if(o.length>0)return{kind:`attack`,target:n.pick(o).id}}let l=a.length>0&&n.chance(.7)?a:i;return{kind:`attack`,target:n.pick(l).id}}function Yn(e,t,n){return{def:e,hp:Array.from({length:t},()=>Math.max(1,E(e.hp,n))),asleep:!1,friendly:!1,silenced:!1,enraged:!1}}function Xn(e,t){if(t.length>4)throw Error(`a fight has at most four groups, got ${t.length}`);for(let e of t)if(e.hp.length>9)throw Error(`a group has at most nine monsters, got ${e.hp.length}`);return{party:e,groups:t,round:0,xpPool:0,goldPool:0,escaped:!1}}function Zn(e){let t=k(e.party);if(t.length===0||t.every(e=>e.status.includes(`paralysed`)))return 0;let n=t.reduce((e,t)=>e+t.stats.agi,0)/t.length,r=e.groups.filter(e=>A(e)>0&&!e.asleep&&!e.friendly).length,i=e.groups.some(e=>A(e)>0&&e.asleep)?.1:0;return M(.4+n*.025-r*.04+i,.05,.95)}function Qn(e){let t=[],n=k(e.party);n.some(e=>e.hp<e.maxHp*.3)&&t.push(`redHp`);let r=n.filter(e=>e.maxCharges.some(e=>e>0));return r.length>0&&r.every(e=>e.charges.every(e=>e<=0))&&t.push(`lowCharges`),e.groups.reduce((e,t)=>e+(t.friendly?0:A(t)),0)>=n.length*2&&t.push(`outnumbered`),e.groups.some(e=>e.enraged&&A(e)>0)&&t.push(`monsterEnraged`),t}function $n(e){return l.find(t=>t.id===e.equipped.weapon)?.damage??[1,4]}var er=e=>e.groups.every(e=>A(e)===0);function tr(e){return e.escaped?`fled`:er(e)?`won`:T(e.party)?`wiped`:`ongoing`}function nr(e,t,n){let r=structuredClone(e);r.round+=1;let i=[];if(er(r))return{state:r,events:i,outcome:`won`};if(r.groups.every(e=>e.friendly||A(e)===0))return i.push({t:`peace`}),{state:r,events:i,outcome:`won`};let a=!0;if(r.party.members.some(e=>D(e)&&t[e.id]?.kind===`run`)){let e=Zn(r);if(e===0)i.push({t:`runFail`,reason:`paralysed`}),a=!1;else if(n.chance(e))return i.push({t:`runOk`}),{state:r,events:i,outcome:`fled`};else i.push({t:`runFail`}),a=!1}let o=[];for(let e of r.party.members)O(e)&&o.push({kind:`member`,m:e,init:e.stats.agi+n.int(0,6)});r.groups.forEach((e,t)=>{A(e)>0&&!e.asleep&&!e.friendly&&o.push({kind:`group`,gi:t,init:8+n.int(0,6)})}),o.sort((e,t)=>t.init-e.init);let s=new Set,c=e=>{e.hp=0,e.dead=!0,i.push({t:`death`,id:e.id})};for(let e of o){if(tr(r)!==`ongoing`)break;if(e.kind===`member`){let o=r.party.members.find(t=>t.id===e.m.id);if(!O(o)||!a)continue;let c=t[o.id]??{kind:`parry`};if(c.kind===`parry`)s.add(o.id),i.push({t:`parry`,actor:o.id});else if(c.kind===`fight`){if(o.row===`back`){i.push({t:`miss`,actor:o.id,reason:`back row`});continue}let e=c.group;if(r.groups[e]&&A(r.groups[e])!==0||(e=r.groups.findIndex(e=>A(e)>0)),e<0)continue;let t=r.groups[e],a=M(.55+.03*o.level+.01*(o.stats.str-10)-.03*t.def.ac,.1,.95);if(!n.chance(a)){i.push({t:`miss`,actor:o.id});continue}let s=Math.max(1,E($n(o),n)+Math.max(0,Math.floor((o.stats.str-10)/3))),l=te(r,e,j(t),s,n);i.push({t:`hit`,actor:o.id,group:e,dmg:s,killed:l})}else if(c.kind===`spell`)i.push(...Kn(r,o.id,c.spellId,c.target,n));else if(c.kind===`use`){let e=l.find(e=>e.id===c.itemId);e?.kind===`consumable`&&e.spellId&&o.inventory.includes(c.itemId)?(i.push(...Kn(r,o.id,e.spellId,c.target,n,{free:!0})),o.inventory.splice(o.inventory.indexOf(c.itemId),1)):i.push({t:`note`,text:`${o.name} fumbles with an item.`})}}else{let t=r.groups[e.gi],a=A(t);for(let o=0;o<a&&tr(r)===`ongoing`&&A(t)!==0;o++){let a=Jn(r,e.gi,n);if(a.kind===`flee`)t.hp[j(t)]=0,i.push({t:`monsterFlees`,group:e.gi});else if(a.kind===`callHelp`)t.hp.length<9&&t.hp.push(Math.max(1,E(t.def.hp,n))),i.push({t:`monsterCalls`,group:e.gi});else if(a.kind===`cast`)rr(r,e.gi,a.spellId,a.target,n,i,c,t);else if(a.kind===`attack`)for(let o=0;o<t.def.attacks;o++){let o=r.party.members.find(e=>e.id===a.target&&D(e))??k(r.party)[0];if(!o)break;let l=o.status.includes(`shielded`)?.15:0,u=M(.55+(10-ee(o))*.03-l,.15,.95);if(!n.chance(u)){i.push({t:`monsterMiss`,group:e.gi,target:o.id});continue}let d=E(t.def.damage,n);s.has(o.id)&&(d=Math.ceil(d/2)),o.hp=Math.max(0,o.hp-d),o.status=o.status.filter(e=>e!==`asleep`);let f=o.hp===0;i.push({t:`monsterHit`,group:e.gi,target:o.id,dmg:d,killed:f}),f&&(c(o),t.enraged=!0)}}}}for(let e of r.party.members)e.status=e.status.filter(e=>e!==`asleep`&&e!==`silenced`&&e!==`paralysed`||!n.chance(.35));return{state:r,events:i,outcome:tr(r)}}function rr(e,t,n,r,i,a,o,s){let l=c.find(e=>e.id===n),u=k(e.party);if(!l||s.silenced||u.length===0)return;let d=l.target===`group`?u:[u.find(e=>e.id===r)??u[0]];if(l.kind===`damage`)for(let e of d){let r=E(l.power,i);e.hp=Math.max(0,e.hp-r),e.status=e.status.filter(e=>e!==`asleep`),a.push({t:`monsterCasts`,group:t,spellId:n,target:e.id,dmg:r}),e.hp===0&&(o(e),s.enraged=!0)}else if(l.kind===`sleep`||l.kind===`silence`){let e=l.kind===`sleep`?`asleep`:`silenced`;for(let r of d){let o=i.chance(.6);o&&!r.status.includes(e)&&r.status.push(e),a.push({t:`monsterCasts`,group:t,spellId:n,target:r.id,effect:o?e:`resisted`})}}}function ir(e,t){let n=u.filter(t=>t.depth[0]<=e&&e<=t.depth[1]);if(n.length===0)return[];let r=t.chance(.55)?1:t.chance(.65)?2:3;return Array.from({length:r},()=>{let e=t.pick(n);return Yn(e,t.int(e.group[0],e.group[1]),t)})}var ar={str:0,iq:0,pie:0,vit:0,agi:0,luck:0};function or(){let e=It(11),t=(t,n,r,i,a)=>b({name:t,raceId:n,classId:r,alignment:i,pool:19},{...ar,...a},e),n=g();for(let e of[t(`Brannoc`,`human`,`blade`,`neutral`,{str:5,vit:4}),t(`Gudrun`,`barrowfolk`,`blade`,`neutral`,{str:3,vit:4}),t(`Pell`,`lanternkin`,`cutpurse`,`neutral`,{agi:4,str:3}),t(`Isolde`,`thornborn`,`spellwright`,`neutral`,{iq:3,vit:3}),t(`Orsk`,`thornborn`,`votary`,`neutral`,{pie:3,vit:3}),t(`Kesk`,`cinderkin`,`blade`,`neutral`,{str:3,vit:3})])n=S(n,e);return n}function sr(e){let t={},n=k(e.party),r=Qn(e),i=e.groups.reduce((e,t)=>e+A(t),0);if(r.includes(`redHp`)&&i>=n.length){for(let e of n)t[e.id]={kind:`run`};return t}let a=Math.max(0,e.groups.findIndex(e=>A(e)>0)),o=e.groups.reduce((t,n,r)=>A(n)>A(e.groups[t])?r:t,a);for(let r of n){let i=r.known.map(e=>c.find(t=>t.id===e)).filter(Boolean),s=[...n].sort((e,t)=>e.hp/e.maxHp-t.hp/t.maxHp)[0],l=i.find(e=>e.kind===`heal`&&(r.charges[e.level-1]??0)>0),u=i.filter(e=>e.kind===`damage`&&(r.charges[e.level-1]??0)>0).sort((e,t)=>t.level-e.level)[0];l&&s.hp<s.maxHp*.5?t[r.id]={kind:`spell`,spellId:l.id,target:e.party.members.indexOf(s)}:u?t[r.id]={kind:`spell`,spellId:u.id,target:u.target===`group`?o:a}:t[r.id]={kind:`fight`,group:a}}return t}var cr={redHp:`Someone is badly hurt`,lowCharges:`Spells nearly spent`,outnumbered:`Outnumbered`,monsterEnraged:`They smell blood`},lr=e=>new Promise(t=>setTimeout(t,e)),ur=class{app;game;fixedKey;el;messages=ve(9);state;co;lastOrders={};selected=0;initial;phase=`orders`;done=!1;skip=!1;outcome=null;anim={hitAt:-1e9,lungeAt:-1e9,dyingAt:-1e9,dyingGroup:-1};raf=0;rng=It(Date.now()&16777215);canvas;groupsEl=i(`div`,{class:`groups`});promptEl=i(`div`,{class:`prompt`});barEl=i(`div`,{class:`barslot`});rosterEl=i(`div`,{class:`rosterslot`});sceneFrame;constructor(e,t,n,r){this.app=e,this.game=t,this.fixedKey=r,this.state=Xn(structuredClone(t.state.party),n),this.initial=n.map(e=>e.hp.reduce((e,t)=>e+t,0)),this.canvas=i(`canvas`,{class:`mon`,width:192,height:240}),this.co=new Gn(this.state),this.say(n.length===1?`${this.countName(0)} come out of the dark.`:`Several things come out of the dark at once.`),this.sceneFrame=he(n[0]?.def.name??`The dark`,z(`dungeon`),i(`div`,{class:`pic`},this.canvas),this.groupsEl),this.el=i(`div`,{class:`screen combat2`},i(`div`,{class:`scene`},this.sceneFrame),i(`div`,{class:`talk`},he(`Words`,z(`dungeon`),this.messages.el)),i(`div`,{class:`party`},he(`The Party`,z(`party`),this.rosterEl)),i(`div`,{class:`bottom`},this.promptEl,this.barEl)),this.loop(),this.app.audio.play(`door`),this.beginOrders()}destroy(){this.done=!0,cancelAnimationFrame(this.raf),this.app.router.locked=!1}pending(){return this.co.orders()}prompt(){return this.promptEl.textContent??``}round(){return this.state.round}commands(){if(this.phase===`over`)return[{key:`Enter`,label:this.outcome===`wiped`?`Face the Roll`:this.outcome===`won`?`Onward`:`Back into the dark`,run:()=>this.app.combatDone(this.outcome)}];if(this.phase===`playing`||!this.co.current())return[];let e={f:()=>void this.chooseFight(),s:()=>void this.chooseSpell(),p:()=>this.give({kind:`parry`}),u:()=>void this.chooseUse(),r:()=>this.give({kind:`run`})},t=this.co.choices().map(t=>({key:t.key,label:t.label,enabled:t.enabled,run:e[t.key]}));return t.push({key:`t`,label:`Take back`,enabled:Object.keys(this.co.orders()).length>0,run:()=>{this.co.takeBack(),this.refresh()}},{key:`a`,label:`Auto`,run:()=>{this.co.autoFill(sr(this.state)),this.advance()}},{key:`Enter`,label:`Repeat`,hidden:!0,run:()=>{this.co.repeat()?this.advance():this.say(`Nothing to repeat.`)}},{key:`ArrowLeft`,label:`Previous group`,hidden:!0,run:()=>this.cycleGroup(-1)},{key:`ArrowRight`,label:`Next group`,hidden:!0,run:()=>this.cycleGroup(1)}),t}name(e){return this.state.party.members.find(t=>t.id===e)?.name??`Someone`}gname(e){return this.state.groups[e]?.def.name??`monster`}countName(e){let t=this.state.groups[e],n=A(t);return`${n} ${t.def.name}${n===1?``:`s`}`}say(e){this.messages.say(e)}livingGroups(){return this.state.groups.flatMap((e,t)=>A(e)>0?[t]:[])}describe(e){switch(e.t){case`hit`:return`${this.name(e.actor)} hits the ${this.gname(e.group)} for ${e.dmg}${e.killed?` and it falls`:``}.`;case`miss`:return e.reason?`${this.name(e.actor)} cannot reach anything from the back row.`:`${this.name(e.actor)} misses.`;case`monsterHit`:return`A ${this.gname(e.group)} hits ${this.name(e.target)} for ${e.dmg}.${e.killed?` ${this.name(e.target)} dies.`:``}`;case`monsterMiss`:return`A ${this.gname(e.group)} swings at ${this.name(e.target)} and misses.`;case`monsterFlees`:return`A ${this.gname(e.group)} loses its nerve and runs.`;case`monsterCalls`:return`A ${this.gname(e.group)} howls for help. Something answers.`;case`monsterCasts`:{let t=c.find(t=>t.id===e.spellId)?.name??e.spellId;return e.dmg?`A ${this.gname(e.group)} casts ${t}: ${e.dmg} to ${this.name(e.target??``)}.`:`A ${this.gname(e.group)} casts ${t} at ${this.name(e.target??``)}${e.effect?` (${e.effect})`:``}.`}case`parry`:return null;case`cast`:{let t=c.find(t=>t.id===e.spellId)?.name??e.spellId,n=[e.dmg?`${e.dmg} damage`:``,e.killed?`${e.killed} fall`:``,e.healed?`heals ${e.healed}`:``,e.effect??``].filter(Boolean).join(`, `);return`${this.name(e.actor)} casts ${t}${n?`: ${n}`:``}.`}case`fizzle`:return`${this.name(e.actor)}'s spell fizzles (${e.reason}).`;case`runOk`:return`The party scrambles clear.`;case`runFail`:return e.reason===`paralysed`?`The party is frozen and cannot run.`:`The party tries to run and cannot get away. The round is lost.`;case`peace`:return`The creatures look you over and let you pass.`;case`death`:return null;case`note`:return e.text}}beginOrders(){for(let e of Qn(this.state))this.say(`! ${cr[e]??e}`);this.advance()}advance(){this.co.done()?this.resolve():(this.phase=`orders`,this.refresh())}give(e){this.co.answer(e),this.advance()}async chooseFight(){let e=this.livingGroups();if(e.length===0)return;let t=e[0];if(e.length>1){let n=await Gt(this.app.host,{title:`Fight which?`,accent:z(`dungeon`),start:Math.max(0,e.indexOf(this.selected)),rows:e.map(e=>({label:this.countName(e),detail:this.state.groups[e].asleep?`asleep`:``})),onMove:t=>{this.selected=e[t],this.refresh()}});if(n===null)return;t=e[n]}this.give({kind:`fight`,group:t})}async chooseTarget(e){let t=this.state.party.members.map((e,t)=>({a:e,i:t})).filter(({a:e})=>D(e));if(t.length<=1)return t[0]?.i??0;let n=await Gt(this.app.host,{title:e,accent:z(`dungeon`),rows:t.map(({a:e})=>({label:e.name,detail:`${e.hp}/${e.maxHp}`}))});return n===null?null:t[n].i}async chooseSpell(){let e=this.co.current();if(!e)return;let t=Un(this.state,e),n=await Gt(this.app.host,{title:`${e.name} casts`,accent:z(`dungeon`),rows:t.map(t=>({label:t.name,detail:`level ${t.level} · ${e.charges[t.level-1]??0} left`}))});if(n===null)return;let r=t[n],i=Hn(r),a=0;if(i===`group`){let e=this.livingGroups();if(e.length>1){let t=await Gt(this.app.host,{title:`${r.name} at which?`,accent:z(`dungeon`),rows:e.map(e=>({label:this.countName(e),detail:this.state.groups[e].asleep?`asleep`:``}))});if(t===null)return;a=e[t]}else a=e[0]??0}else if(i===`ally`){let e=await this.chooseTarget(`${r.name} on whom?`);if(e===null)return;a=e}this.give({kind:`spell`,spellId:r.id,target:a})}async chooseUse(){let e=this.co.current();if(!e)return;let t=Wn(e),n=await Gt(this.app.host,{title:`${e.name} uses`,accent:z(`dungeon`),rows:t.map(e=>({label:l.find(t=>t.id===e)?.name??e}))});if(n===null)return;let r=await this.chooseTarget(`On whom?`);r!==null&&this.give({kind:`use`,itemId:t[n],target:r})}cycleGroup(e){let t=this.livingGroups();if(t.length<2)return;let n=Math.max(0,t.indexOf(this.selected));this.selected=t[(n+e+t.length)%t.length],this.anim.dyingGroup=-1,this.refresh()}refresh(){let e=this.state;this.sceneFrame.querySelector(`.ftitle`).textContent=this.gname(this.selected),this.groupsEl.replaceChildren(...e.groups.flatMap((e,t)=>A(e)>0||t===this.selected?[i(`button`,{class:`quiet${t===this.selected?` sel`:``}`,type:`button`,onclick:()=>{this.selected=t,this.anim.dyingGroup=-1,this.refresh()}},A(e)>0?`${this.countName(t)}${e.asleep?` (asleep)`:``}${e.silenced?` (silenced)`:``}`:`${e.def.name} (gone)`)]:[]));let t=this.phase===`orders`?this.co.current():null;this.rosterEl.replaceChildren(be(e.party,{selectedId:t?.id})),this.promptEl.textContent=this.phase===`over`?``:this.phase===`playing`?`The round plays out. Space) hurry it`:t?`${t.name}'s options:`:``,this.barEl.replaceChildren(ge(this.commands()))}async resolve(){if(this.phase===`playing`||this.done)return;this.phase=`playing`,this.skip=!1,this.app.router.locked=!0,this.app.router.onSkip=()=>{this.skip=!0},this.lastOrders=this.co.orders();let e=nr(this.state,this.lastOrders,this.rng);this.state=e.state,this.refresh();for(let t of e.events)if(this.apply(t),this.refresh(),await lr(this.done||this.skip?0:340),this.done)return;for(let e=0;e<this.state.groups.length;e++)A(this.state.groups[e])===0&&this.initial[e]>0&&this.anim.dyingGroup!==e&&e===this.selected&&(this.anim.dyingAt=performance.now(),this.anim.dyingGroup=e);e.outcome===`ongoing`?(this.game.commitRound(this.state.party),this.app.autosave(),A(this.state.groups[this.selected])===0&&(this.selected=Math.max(0,this.livingGroups()[0]??0)),this.app.router.locked=!1,this.co=new Gn(this.state,this.lastOrders),this.phase=`orders`,this.beginOrders()):(await lr(this.skip?0:700),this.done||this.finish(e.outcome))}apply(e){let t=this.describe(e);t&&this.say(t);let n=this.app.audio;e.t===`hit`&&e.group===this.selected?(this.anim.hitAt=performance.now(),n.play(`hit`)):e.t===`hit`?n.play(`hit`):e.t===`cast`?(n.play(`cast`),(e.dmg??0)>0&&e.target===this.selected&&(this.anim.hitAt=performance.now())):e.t===`monsterHit`||e.t===`monsterCasts`||e.t===`monsterCalls`?(this.anim.lungeAt=performance.now(),n.play(`hit`)):e.t===`death`&&n.play(`death`)}finish(e){this.phase=`over`,this.outcome=e,this.app.router.locked=!1,this.game.finishEncounter({outcome:e,xp:this.state.xpPool,gold:this.state.goldPool,party:this.state.party,groups:this.state.groups},this.fixedKey),e===`won`?this.say(`Victory. ${this.state.xpPool} experience and ${this.state.goldPool} gold, shared out.`):e===`fled`?this.say(`The party gets away, breathing hard.`):this.say(`That was the last of them. The Wardens will read the names at dawn.`),this.state={...this.state,party:this.game.state.party},this.refresh()}loop=()=>{let e=performance.now(),t=e/1e3,n=Math.max(0,1-(e-this.anim.hitAt)/380),r=Math.max(0,1-(e-this.anim.lungeAt)/600),i=Math.min(1,Math.max(0,(e-this.anim.dyingAt)/1500)),a=this.state.groups[this.selected],o=this.canvas.getContext(`2d`);if(a&&o){let e=a.hp.reduce((e,t)=>e+t,0),s=Math.max(1,this.initial[this.selected]),c={hit:n,lunge:r,damage:Math.max(0,Math.min(1,1-e/s)),dying:this.anim.dyingGroup===this.selected?i:+(A(a)===0)};try{ze(a.def.pictureId).draw(o,t,c)}catch{}let l=n>0?(Math.random()-.5)*9*n:0;this.canvas.style.transform=`translate(${l}px,${l*.5}px)`}this.raf=requestAnimationFrame(this.loop)}},dr=[[0,-1],[1,0],[0,1],[-1,0]],fr=class extends Error{line;constructor(e,t){super(`line ${t}: ${e}`),this.line=t,this.name=`LevelError`}},pr={"#":`solid`,".":`floor`,"~":`void`,"<":`stairsUp`,">":`stairsDown`,D:`door`,"^":`pit`,P:`teleporter`,O:`spinner`,d:`dark`,a:`antimagic`,E:`encounter`,V:`event`,S:`floor`},mr=e=>e!==`solid`&&e!==`void`;function hr(e,t,n,r){if(r===`up`||r===`down`){let n=r===`up`?`stairsUp`:`stairsDown`;if(e.cell(t).kind!==n)return null;let i={...t,z:t.z+(r===`up`?1:-1)};if(!e.inBounds(i))return null;let a=r===`up`?`stairsDown`:`stairsUp`;return e.cell(i).kind===a?{pos:i,fell:0}:null}let[i,a]=dr[r===`fwd`?n:r===`back`?(n+2)%4:r===`left`?(n+3)%4:(n+1)%4],o={x:t.x+i,y:t.y+a,z:t.z};if(!e.inBounds(o))return null;let s=e.cell(o).kind;if(s===`solid`)return null;if(s===`void`){let n=o.z-1;for(;n>=0&&e.cell({...o,z:n}).kind===`void`;)n--;return n<0||!mr(e.cell({...o,z:n}).kind)?null:{pos:{...o,z:n},fell:t.z-n}}return{pos:o,fell:0}}var gr=e=>`${e.x},${e.y},${e.z}`;function _r(e){let t=e.split(/\r?\n/),n=`Unnamed`,r=``,i=1,a=null,o=1,s=[],c=[],l=new Map,u=null;if(t.forEach((e,t)=>{let d=t+1,f=e.trim();if(!(f===``||f.startsWith(`//`))){if(f.startsWith(`@z`)){let e=Number(f.slice(2));if(!Number.isInteger(e)||e<0)throw new fr(`bad storey header "${f}"`,d);u=e,l.set(e,[])}else if(u!==null)l.get(u).push({text:f,line:d});else if(f.startsWith(`name:`))n=f.slice(5).trim();else if(f.startsWith(`id:`))r=f.slice(3).trim();else if(f.startsWith(`depth:`))i=Number(f.slice(6).trim())||1;else if(f.startsWith(`start:`)){let[e,t,n,r]=f.slice(6).trim().split(/\s+/),i=`NESW`.indexOf((r??``).toUpperCase());if(i<0||[e,t,n].some(e=>!Number.isInteger(Number(e))))throw new fr(`bad start "${f}"`,d);a={x:Number(e),y:Number(t),z:Number(n),facing:i},o=d}else if(f.startsWith(`area `)){let e=f.match(/^area (\S+) z=(\*|\d+) x=(\d+)-(\d+) y=(\d+)-(\d+)$/);if(!e)throw new fr(`bad area directive "${f}"`,d);s.push({id:e[1],z:e[2]===`*`?`*`:Number(e[2]),x0:+e[3],x1:+e[4],y0:+e[5],y1:+e[6]})}else if(f.startsWith(`mark `)){let[,e,t,n,...r]=f.split(/\s+/),i={};for(let e of r){let[t,n=``]=e.split(`=`);i[t]=n}c.push({p:{x:Number(e),y:Number(t),z:Number(n)},data:i})}else throw new fr(`unknown header line "${f}"`,d)}}),!a)throw new fr(`missing start: line`,1);let d=a;if(l.size===0)throw new fr(`no storeys (@z blocks)`,1);let f=Math.max(...l.keys())+1;for(let e=0;e<f;e++)if(!l.has(e))throw new fr(`missing storey @z ${e}`,1);let p=l.get(0),m=p[0]?.text.length??0,h=p.length,g=[],_=new Map;for(let e=0;e<f;e++){let t=l.get(e);if(t.length!==h)throw new fr(`storey ${e} has ${t.length} rows, expected ${h}`,t[0]?.line??1);g.push(t.map((t,n)=>{if(t.text.length!==m)throw new fr(`row has ${t.text.length} cells, expected ${m}`,t.line);return[...t.text].map((r,i)=>{let a=pr[r];if(!a)throw new fr(`unknown glyph "${r}"`,t.line);return _.set(gr({x:i,y:n,z:e}),t.line),{kind:a,area:`main`}})}))}for(let e of s)for(let t=0;t<f;t++)if(e.z===`*`||e.z===t)for(let n=e.y0;n<=e.y1&&n<h;n++)for(let r=e.x0;r<=e.x1&&r<m;r++)g[t][n][r].area=e.id;for(let e of c){let t=g[e.p.z]?.[e.p.y]?.[e.p.x];t&&(t.data={...t.data,...e.data})}let v=e=>e.x>=0&&e.y>=0&&e.z>=0&&e.x<m&&e.y<h&&e.z<f,y={kind:`solid`,area:`main`},b={id:r||n.toLowerCase().replace(/[^a-z0-9]+/g,`-`),name:n,w:m,h,layers:f,depth:i,start:a,inBounds:v,cell:e=>v(e)?g[e.z][e.y][e.x]:y,areaOf:e=>v(e)?g[e.z][e.y][e.x].area:`main`};if(!v(a)||!mr(b.cell(a).kind))throw new fr(`start is not a standable cell`,o);for(let e=0;e<f;e++)for(let t=0;t<h;t++)for(let n=0;n<m;n++){let r={x:n,y:t,z:e},i=b.cell(r).kind,a=_.get(gr(r))??1;if(i===`stairsUp`&&b.cell({...r,z:e+1}).kind!==`stairsDown`)throw new fr(`stairs up at (${n},${t},${e}) have no matching stairs down above`,a);if(i===`stairsDown`&&b.cell({...r,z:e-1}).kind!==`stairsUp`)throw new fr(`stairs down at (${n},${t},${e}) have no matching stairs up below`,a);if(i===`void`){let i=e-1;for(;i>=0&&b.cell({...r,z:i}).kind===`void`;)i--;if(i<0||!mr(b.cell({...r,z:i}).kind))throw new fr(`void at (${n},${t},${e}) has no landing below`,a)}}let x=new Set([gr(d)]),S=[{x:d.x,y:d.y,z:d.z}];for(;S.length;){let e=S.pop(),t=[];for(let n=0;n<4;n++){let r=hr(b,e,n,`fwd`);r&&t.push(r.pos)}for(let n of[`up`,`down`]){let r=hr(b,e,0,n);r&&t.push(r.pos)}let n=b.cell(e).data?.to;if(b.cell(e).kind===`teleporter`&&n){let[e,r,i]=n.split(`,`).map(Number);t.push({x:e,y:r,z:i})}for(let e of t)!x.has(gr(e))&&v(e)&&(x.add(gr(e)),S.push(e))}for(let e=0;e<f;e++)for(let t=0;t<h;t++)for(let n=0;n<m;n++){let r={x:n,y:t,z:e};if(mr(b.cell(r).kind)&&!x.has(gr(r)))throw new fr(`floor cell at (${n},${t},${e}) is unreachable from the start`,_.get(gr(r))??1)}return b}var vr=e=>`${e.x},${e.y},${e.z}`,yr=()=>({seen:new Set,known:new Set}),br=8,xr=new Set([`pit`,`teleporter`,`spinner`]);function Sr(e,t){let n=[],r=e.x,i=e.y,a=Math.abs(t.x-e.x),o=Math.abs(t.y-e.y),s=e.x<t.x?1:-1,c=e.y<t.y?1:-1,l=a-o;for(;r!==t.x||i!==t.y;){let u=2*l;u>-o&&(l-=o,r+=s),u<a&&(l+=a,i+=c),(r!==t.x||i!==t.y)&&n.push({x:r,y:i,z:e.z})}return n}function Cr(e,t,n,r){let i=new Set(e.seen),[a,o]=dr[r];i.add(vr(n));for(let e=-8;e<=br;e++)for(let r=-8;r<=br;r++){if(r*r+e*e>64)continue;let s=Math.max(Math.abs(r),Math.abs(e))<=1;if(!s&&r*a+e*o<0)continue;let c={x:n.x+r,y:n.y+e,z:n.z};if(t.inBounds(c)&&(s||!Sr(n,c).some(e=>t.cell(e).kind===`solid`))&&(i.add(vr(c)),t.cell(c).kind===`void`))for(let e=c.z-1;e>=0;e--){let n={...c,z:e};if(i.add(vr(n)),mr(t.cell(n).kind))break}}return{seen:i,known:e.known}}function wr(e,t,n){let r=[];for(let i=0;i<t.h;i++)for(let a=0;a<t.w;a++){let o={x:a,y:i,z:n},s=t.cell(o).kind,c=e.seen.has(vr(o)),l=xr.has(s)&&!e.known.has(vr(o))?`floor`:s;r.push({x:a,y:i,kind:l,known:c,overheadVoid:t.cell({x:a,y:i,z:n+1}).kind===`void`})}return r}var Tr=e=>JSON.stringify({seen:[...e.seen],known:[...e.known]});function Er(e){let t=JSON.parse(e);return{seen:new Set(t.seen??[]),known:new Set(t.known??[])}}var Dr=Object.assign({"../../levels/caverns.level":`// Level 2. Five storeys of cathedral round a shaft: ledges, a rope bridge, stairs, and a long fall.
id: caverns
name: The Rope Cathedral
depth: 2
start: 11 2 4 S
area crypt z=4 x=0-23 y=0-1
area caverns z=4 x=0-23 y=2-19
area caverns z=1 x=0-23 y=0-19
area caverns z=2 x=0-23 y=0-19
area caverns z=3 x=0-23 y=0-19
area main z=0 x=0-23 y=0-19
mark 11 1 4 exit=crypt to=29,3,0,W sigil=0.9
mark 11 17 0 exit=deep to=10,2,3,S sigil=1.0
mark 20 10 2 discovery=overdraft-blade sigil=0.8
mark 12 9 3 event=collapse place=The_Rope_Cathedral closes=8,9,3;9,9,3
mark 11 10 1 monsters=hollow-wraith:3,cellar-ghoul:2
mark 11 12 0 monsters=bone-wolf:7
mark 5 0 0 torch=1
mark 18 0 0 torch=1
mark 0 10 0 torch=1
mark 23 12 0 torch=1
mark 6 19 0 torch=1
mark 17 19 0 torch=1
mark 0 4 0 torch=1
mark 23 16 0 torch=1
mark 5 0 1 torch=1
mark 18 0 1 torch=1
mark 0 10 1 torch=1
mark 23 12 1 torch=1
mark 6 19 1 torch=1
mark 17 19 1 torch=1
mark 0 4 1 torch=1
mark 23 16 1 torch=1
mark 5 0 2 torch=1
mark 18 0 2 torch=1
mark 0 10 2 torch=1
mark 23 12 2 torch=1
mark 6 19 2 torch=1
mark 17 19 2 torch=1
mark 0 4 2 torch=1
mark 23 16 2 torch=1
mark 5 0 3 torch=1
mark 18 0 3 torch=1
mark 0 10 3 torch=1
mark 23 12 3 torch=1
mark 6 19 3 torch=1
mark 17 19 3 torch=1
mark 0 4 3 torch=1
mark 23 16 3 torch=1
mark 5 0 4 torch=1
mark 18 0 4 torch=1
mark 0 10 4 torch=1
mark 23 12 4 torch=1
mark 6 19 4 torch=1
mark 17 19 4 torch=1
mark 0 4 4 torch=1
mark 23 16 4 torch=1
mark 12 0 0 rune=1
mark 0 14 0 rune=1
mark 23 6 0 rune=1
mark 11 19 0 rune=1
mark 12 19 0 rune=1
mark 12 0 1 rune=1
mark 0 14 1 rune=1
mark 23 6 1 rune=1
mark 11 19 1 rune=1
mark 12 19 1 rune=1
mark 12 0 2 rune=1
mark 0 14 2 rune=1
mark 23 6 2 rune=1
mark 11 19 2 rune=1
mark 12 19 2 rune=1
mark 12 0 3 rune=1
mark 0 14 3 rune=1
mark 23 6 3 rune=1
mark 11 19 3 rune=1
mark 12 19 3 rune=1
mark 12 0 4 rune=1
mark 0 14 4 rune=1
mark 23 6 4 rune=1
mark 11 19 4 rune=1
mark 12 19 4 rune=1

@z 0
########################
#......................#
#......................#
#......................#
#...##.................#
#...................#..#
#......................#
#......................#
#......................#
#.<....................#
#......................#
#......................#
#..........E...........#
#......................#
#......................#
#...#..............#...#
#...........##.....#...#
#......................#
#......................#
########################

@z 1
########################
#......................#
#......................#
#......................#
#......................#
#......~~~~.~~~~~......#
#......~~~~.~~~~~......#
#.<....~~~~.~~~~~......#
#......~~~~.~~~~~......#
#.>....~~~~.~~~~~......#
#......~~~~E~~~~~......#
#......~~~~.~~~~~......#
#......~~~~.~~~~~......#
#......~~~~.~~~~~......#
#......~~~~.~~~~~......#
#......................#
#......................#
#......................#
#......................#
########################

@z 2
########################
#......................#
#......................#
#......................#
#......................#
#.<....~~~~~~~~~~......#
#......~~~~~~~~~~......#
#.>....~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......................#
#......................#
#......................#
#......................#
########################

@z 3
########################
#......................#
#......................#
#.<.................<..#
#......................#
#.>....~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#...........V..........#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......................#
#......................#
#......................#
#......................#
########################

@z 4
########################
#......................#
#......................#
#.>.................>..#
#......................#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......~~~~~~~~~~......#
#......................#
#......................#
#......................#
#......................#
########################
`,"../../levels/crypt.level":`// Level 1. The Receiving Hall and the rooms around it.
id: crypt
name: The Crypt of the Gate
depth: 1
start: 3 3 0 E
area main z=0 x=0-6 y=0-15
area crypt z=0 x=7-31 y=0-15
area deep z=0 x=0-5 y=7-15
mark 3 3 0 exit=town sigil=1.2
mark 29 3 0 exit=caverns to=11,2,4,S sigil=0.9
mark 27 3 0 discovery=lienholders-primer sigil=0.8
mark 14 7 0 event=collapse place=The_Tallow_Stair closes=14,6,0
mark 14 11 0 monsters=tally-skeleton:4,drum-orc:2
mark 2 11 0 monsters=ledger-rat:6
mark 9 1 0 torch=1
mark 13 1 0 torch=1
mark 17 1 0 torch=1
mark 21 1 0 torch=1
mark 25 1 0 torch=1
mark 11 5 0 torch=1
mark 19 5 0 torch=1
mark 23 5 0 torch=1
mark 0 3 0 torch=1
mark 3 6 0 torch=1
mark 11 8 0 torch=1
mark 17 8 0 torch=1
mark 0 10 0 torch=1
mark 12 1 0 rune=1
mark 18 1 0 rune=1
mark 3 0 0 rune=1
mark 14 14 0 rune=1
mark 7 14 0 rune=1

@z 0
################################
#.....##########################
#.....#.....................####
#.....D..#################..D.##
#.....#.....................####
#.....########D###########D#####
##############.###########.#####
##############V###########.#####
#....#########.###########.#####
#....#####.........#######.#####
#....#####.........#######.#####
#.E......D..#.E.#..D.......#####
#....#####.........#############
#....#####.........#############
#....###########################
################################
`,"../../levels/deep.level":`// Level 3. A drop of names and the shrine beneath it, where the account is settled.
id: deep
name: The Drop of Names
depth: 3
start: 10 2 3 S
area deep z=3 x=0-19 y=0-15
area deep z=2 x=0-19 y=0-15
area deep z=1 x=0-19 y=0-15
area deep z=0 x=0-19 y=0-15
area crypt z=0 x=0-7 y=8-15
mark 10 1 3 exit=caverns to=11,16,0,N sigil=0.9
mark 17 8 2 discovery=saint-orrels-ledger sigil=0.8
mark 3 13 0 discovery=tally-hymnal sigil=0.8
mark 9 12 0 discovery=quiets-receipt exit=ending sigil=1.4
mark 3 12 0 event=cursedRelic place=The_Drainage_Shrine
mark 17 8 2 monsters=still-gargoyle:3
mark 9 10 0 monsters=repossessor:1,singing-cultist:3
mark 4 0 0 torch=1
mark 15 0 0 torch=1
mark 0 8 0 torch=1
mark 19 4 0 torch=1
mark 4 0 1 torch=1
mark 15 0 1 torch=1
mark 0 8 1 torch=1
mark 19 4 1 torch=1
mark 4 0 2 torch=1
mark 15 0 2 torch=1
mark 0 8 2 torch=1
mark 19 4 2 torch=1
mark 4 0 3 torch=1
mark 15 0 3 torch=1
mark 0 8 3 torch=1
mark 19 4 3 torch=1
mark 8 0 0 rune=1
mark 11 0 0 rune=1
mark 0 3 0 rune=1
mark 0 12 0 rune=1
mark 19 7 0 rune=1
mark 19 11 0 rune=1
mark 9 15 0 rune=1
mark 8 0 1 rune=1
mark 11 0 1 rune=1
mark 0 3 1 rune=1
mark 0 12 1 rune=1
mark 19 7 1 rune=1
mark 19 11 1 rune=1
mark 9 15 1 rune=1
mark 8 0 2 rune=1
mark 11 0 2 rune=1
mark 0 3 2 rune=1
mark 0 12 2 rune=1
mark 19 7 2 rune=1
mark 19 11 2 rune=1
mark 9 15 2 rune=1
mark 8 0 3 rune=1
mark 11 0 3 rune=1
mark 0 3 3 rune=1
mark 0 12 3 rune=1
mark 19 7 3 rune=1
mark 19 11 3 rune=1
mark 9 15 3 rune=1

@z 0
####################
#..................#
#..................#
#..................#
#..................#
#..................#
#.<................#
#..................#
#..................#
#..................#
#........E.........#
#..................#
#..V...............#
#.......###........#
#..................#
####################

@z 1
####################
#..................#
#..................#
#..................#
#.<...~~~~~~~~.....#
#.....~~~~~~~~.....#
#.>...~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#..................#
#..................#
#..................#
####################

@z 2
####################
#..................#
#.<................#
#..................#
#.>...~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~...E.#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#..................#
#..................#
#..................#
####################

@z 3
####################
#..................#
#.>................#
#..................#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#...^.~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#.....~~~~~~~~.....#
#..................#
#..................#
#..................#
####################
`,"../../levels/test-mini.level":`// A tiny two-storey level used by the tests. Lines starting with // are comments.
name: Mini Test Hall
start: 1 1 0 E
area hall z=* x=0-4 y=0-3

@z 0
#####
#..<#
#...#
#####

@z 1
#####
#..>#
#.D.#
#####
`}),Or=new Map;function kr(e){let t=Or.get(e);if(t)return t;let n=Object.keys(Dr).find(t=>t.endsWith(`/${e}.level`));if(!n)throw Error(`no such level ${e}`);let r=_r(Dr[n]);return Or.set(e,r),r}function Ar(e){return Or.delete(e),kr(e)}var jr=e=>`${e.x},${e.y},${e.z}`,Mr=e=>(e??``).split(`;`).filter(Boolean).map(e=>{let[t,n,r]=e.split(`,`).map(Number);return{x:t,y:n,z:r}});function Nr(e,t,n){let r=new Set(t.map(jr)),i={...e,cell:t=>r.has(jr(t))?{kind:`solid`,area:e.areaOf(t)}:e.cell(t)},a=jr(e.start),o=new Set([jr(n)]),s=[n];for(;s.length;){let e=s.pop();if(jr(e)===a)return!0;let t=[];for(let n=0;n<4;n++){let r=hr(i,e,n,`fwd`);r&&t.push(r.pos)}for(let n of[`up`,`down`]){let r=hr(i,e,0,n);r&&t.push(r.pos)}for(let e of t)o.has(jr(e))||(o.add(jr(e)),s.push(e))}return!1}function Pr(e,t,n,r,i){let a=e.cell(t).data,o=a?.event;if(!o)return{party:n,entries:[],closed:[]};let s=(a?.place??e.name).replace(/_/g,` `),c=n.members.filter(D),d=c.length?r.pick(c).name:`Nobody`,f=[...i.chronicle?.entries??[]].reverse().find(e=>e.kind===`discovery`),p=`tile:${jr(t)}`,m=(e,t=p)=>({day:i.day,kind:`event`,text:e,cause:t}),h=Mr(a?.closes),g=h.length>0&&Nr(e,h,t);switch(o){case`collapse`:{if(!g)return{party:n,entries:[m(`The ceiling at ${s} shook and held. ${d} did not stop looking up.`)],closed:[]};let e=n.members.map(e=>D(e)?{...e,hp:Math.max(1,e.hp-r.int(1,4))}:e);return{party:{...n,members:e},entries:[m(`The ceiling at ${s} came down. The cracks had been there on the way in, and ${d} had looked at them.`)],closed:h}}case`flood`:{let e=n.members.map(e=>D(e)&&e.maxCharges[0]>0?{...e,charges:[Math.max(0,e.charges[0]-1),...e.charges.slice(1)]}:e);return{party:{...n,members:e},entries:[m(`At ${s}, the party rang a bell and the water answered. ${d}'s powder did not survive it.`)],closed:g?h:[]}}case`monstersClash`:{let e=r.int(0,u.length-1),t=(e+1+r.int(0,u.length-2))%u.length,[i,a]=[u[e],u[t]];return{party:{...n,gold:n.gold+25+r.int(0,15)},entries:[m(`${i.name}s and ${a.name}s killed each other at ${s}. The party took the credit and the boots.`)],closed:[]}}case`cursedRelic`:{let e=n.members.filter(e=>D(e)&&e.inventory.length>0),t=f?.id??p;if(e.length===0)return{party:n,entries:[m(`The relic at ${s} sulked. There was nothing left in the packs to eat.`,t)],closed:[]};let i=r.pick(e),a=r.int(0,i.inventory.length-1),o=i.inventory[a],c=n.members.map(e=>e.id===i.id?{...e,inventory:e.inventory.filter((e,t)=>t!==a)}:e),u=l.find(e=>e.id===o)?.name??o;return{party:{...n,members:c},entries:[m(`The relic at ${s} ate ${i.name}'s ${u} in the night. ${i.name} swears it said grace first.`,t)],closed:[]}}default:return{party:n,entries:[],closed:[]}}}var Fr=[0,40,110,230,420,700,1100,1700,2500,3500];function Ir(e){return e<=Fr.length?Fr[e-1]:Fr[Fr.length-1]+(e-Fr.length)*1500}function Lr(e,t){let n=e.members.filter(D);if(n.length===0)return e;let r=Math.floor(t/n.length),i=t-r*n.length,a=!0;return{...e,members:e.members.map(e=>{if(!D(e))return e;let t=r+(a?i:0);return a=!1,{...e,xp:e.xp+t}})}}var Rr=e=>D(e)&&e.xp>=Ir(e.level+1);function zr(e,t){let n=e-(2*t-2);return n<=0?0:Math.min(9,n+1)}function Br(e,t,n){if(!n.atInn)throw Error(`levelling up happens at the inn`);if(!Rr(e))throw Error(`${e.name} does not have enough experience to level up`);let r=s.find(t=>t.id===e.classId),i=e.level+1,o={...e.stats};for(let e of a)t.chance(.25)&&(o[e]=Math.min(18,Math.max(3,o[e]+(t.chance(.6)?1:-1))));let l=Math.max(1,E([1,r.hpDie],t)+Math.max(0,Math.floor((o.vit-8)/3))),u={...e,level:i,stats:o,maxHp:e.maxHp+l,hp:e.hp+l,charges:[...e.charges],maxCharges:[...e.maxCharges],known:[...e.known]};if(r.school){let e=0;for(let t=1;t<=7;t++){let n=zr(i,t),r=n-u.maxCharges[t-1];n>0&&(e=t),r>0&&(u.maxCharges[t-1]=n,u.charges[t-1]+=r)}for(let t of c)t.school===r.school&&t.level<=e&&!t.discoveryId&&!u.known.includes(t.id)&&u.known.push(t.id)}return u}var Vr=e=>{let t=s.find(t=>t.id===e.classId);return t.canUse.includes(`sword`)||t.canUse.includes(`axe`)};function Hr(e,t){let n=f.find(e=>e.id===t);if(!n)throw Error(`unknown discovery ${t}`);if(e.discoveries.includes(t))return e;let r=e.members;for(let e of n.unlocks)if(e.kind===`spell`){let t=c.find(t=>t.id===e.spellId);r=r.map(e=>s.find(t=>t.id===e.classId).school===t.school&&!e.known.includes(t.id)?{...e,known:[...e.known,t.id]}:e)}else e.kind===`technique`&&(r=r.map(t=>Vr(t)&&!t.techniques.includes(e.id)?{...t,techniques:[...t.techniques,e.id]}:t));return{...e,members:r,discoveries:[...e.discoveries,t]}}var Ur={automap:`on`,bloom:.5,flicker:1,fog:.28,lamp:1.1,quality:`normal`},Wr=e=>e.quality===`low`?0:e.bloom,Gr=`undervault.save.v1`,Kr={getItem:()=>{throw Error(`browser storage is unavailable`)},setItem:()=>{throw Error(`browser storage is unavailable`)},removeItem:()=>{throw Error(`browser storage is unavailable`)}};function qr(){try{return globalThis.localStorage??Kr}catch{return Kr}}var Jr=e=>JSON.stringify(e,null,1),Yr=[`level`,`xp`,`hp`,`maxHp`];function Xr(e){let t=e;if(!t||typeof t!=`object`||typeof t.id!=`string`||typeof t.name!=`string`||typeof t.classId!=`string`||typeof t.raceId!=`string`||!t.stats||typeof t.stats!=`object`)return!1;for(let e of Yr)if(typeof t[e]!=`number`)return!1;for(let e of[`charges`,`maxCharges`,`known`,`inventory`,`status`,`techniques`])if(!Array.isArray(t[e]))return!1;return!!t.equipped&&typeof t.equipped==`object`}function Zr(e){let t;try{t=JSON.parse(e)}catch{return{data:null,message:`The save could not be read: it is corrupt.`}}if(typeof t!=`object`||!t||t.game!==`undervault`)return{data:null,message:`That file is not an Undervault save.`};let n=t;if(typeof n.version!=`number`)return{data:null,message:`The save has no version, so it cannot be read.`};if(n.version>1)return{data:null,message:`This save is from a newer version of the game. Update the game to open it.`};if(!n.party||!Array.isArray(n.party.members))return{data:null,message:`The save is missing its party.`};let r=n.party.members.findIndex(e=>!Xr(e));return r>=0?{data:null,message:`Party member ${r+1} in the save is incomplete, so it cannot be read.`}:!n.chronicle||!Array.isArray(n.chronicle.entries)||!n.position||typeof n.position.levelId!=`string`||!n.position.pos||!n.settings?{data:null,message:`The save is incomplete and cannot be read.`}:{data:{...n,automaps:n.automaps??{}}}}var Qr=e=>Zr(e);function $r(e,t=qr()){try{return t.setItem(Gr,Jr(e)),{ok:!0}}catch{return{ok:!1,message:`Could not save to browser storage (it may be blocked or full). Use Save to file instead.`}}}function ei(e=qr()){try{return e.removeItem(Gr),{ok:!0}}catch{return{ok:!1}}}function ti(e=qr()){let t;try{t=e.getItem(Gr)}catch{return{data:null,message:`Could not read browser storage, so no saved game was loaded. You can still load from a file.`}}return t===null?{data:null}:Zr(t)}function ni(e){return`undervault-${(e.party.members[0]?.name??`party`).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)||`party`}-party-day${e.day}.json`}var ri=`crypt`,ii=.07,ai=(e,t)=>`${e}:${t.x},${t.y},${t.z}`,oi=class e{state;rng;levels=new Map;cooldown=0;constructor(e,t){this.state=e,this.rng=t}static newGame(t,n,r=Ur){let i=new e({party:t,chronicle:Sn(xn(),{day:1,kind:`town`,text:`The party signed on at the Sump Tap and was told the Vault is hungry.`}),day:1,settings:r,levelId:ri,pos:{x:0,y:0,z:0},facing:0,automaps:{},triggered:[],closed:[],inTown:!0,over:!1},n);return i.enterDungeon(),i.state.inTown=!1,i}static fromSave(t,n){let r={};for(let[e,n]of Object.entries(t.automaps??{}))r[e]=Er(n);let i=new e({party:t.party,chronicle:t.chronicle,day:t.day,settings:t.settings,levelId:t.position.levelId,pos:t.position.pos,facing:t.position.facing,automaps:r,triggered:t.triggered??[],closed:t.closed??[],inTown:t.inTown??!1,over:!1},n);return i.level(),i}toSave(){let e={};for(let[t,n]of Object.entries(this.state.automaps))e[t]=Tr(n);let t=this.state;return{game:`undervault`,version:1,party:t.party,chronicle:t.chronicle,automaps:e,position:{levelId:t.levelId,pos:t.pos,facing:t.facing},day:t.day,settings:t.settings,triggered:[...t.triggered],closed:[...t.closed],inTown:t.inTown}}level(e=this.state.levelId){let t=this.levels.get(e);if(!t){t=Ar(e);for(let n of this.state.closed){let[r,i]=n.split(`:`);if(r!==e)continue;let[a,o,s]=i.split(`,`).map(Number),c=t.cell({x:a,y:o,z:s});c&&(c.kind=`solid`)}this.levels.set(e,t)}return t}automap(){return this.state.automaps[this.state.levelId]??=yr()}isOver(){return this.state.over||T(this.state.party)}returnToTown(){this.state.inTown=!0}enterDungeon(){if(this.isOver()||!this.state.party.members.some(D))throw Error(`Nobody alive is fit to go down. The dead stay dead.`);let e=this.level(ri);this.state.inTown=!1,this.enterLevel(ri,{...e.start})}enterLevel(e,t){this.state.levelId=e,this.state.pos={x:t.x,y:t.y,z:t.z},this.state.facing=t.facing;let n=this.level(e);this.state.automaps[e]=Cr(this.state.automaps[e]??yr(),n,this.state.pos,t.facing)}followExit(e){let[t,n,r,i]=(this.level().cell(this.state.pos).data?.to??``).split(`,`);this.enterLevel(e,{x:Number(t),y:Number(n),z:Number(r),facing:Math.max(0,`NESW`.indexOf(i))})}note(e,t,n){this.state.chronicle=Sn(this.state.chronicle,{day:this.state.day,kind:e,text:t,cause:n})}commitRound(e){this.state.party=e}onArrive(e,t,n){if(this.isOver())return[];let r=this.state;r.pos={...e},r.facing=n;let i=this.level();r.automaps[r.levelId]=Cr(this.automap(),i,e,n);let a=i.cell(e),o=a.data??{},s=ai(r.levelId,e),c=[];if(t>0&&(this.hurtAll(()=>E([t,4],this.rng)),this.note(`event`,`The party dropped ${t} storeys into ${i.name}. Everyone agreed it was quicker.`,`tile:${e.x},${e.y},${e.z}`),c.push({kind:`fall`,fell:t})),a.kind===`pit`&&(this.hurtAll(()=>this.rng.int(1,6)),this.note(`event`,`Someone found the pit at ${i.name} with a foot.`,`tile:${e.x},${e.y},${e.z}`),c.push({kind:`pit`})),o.discovery&&!r.triggered.includes(`${s}:d`)&&(r.triggered.push(`${s}:d`),r.party=Hr(r.party,o.discovery),this.note(`discovery`,`On day ${r.day} the party discovered ${o.discovery.replace(/-/g,` `)}. It had been waiting.`,`tile:${e.x},${e.y},${e.z}`),c.push({kind:`discovery`,id:o.discovery})),a.kind===`event`&&!r.triggered.includes(s)){r.triggered.push(s);let t=Pr(i,e,r.party,this.rng,{day:r.day,chronicle:r.chronicle});r.party=t.party;for(let e of t.closed)i.cell(e).kind=`solid`,r.closed.push(ai(r.levelId,e));for(let e of t.entries)this.note(e.kind,e.text,e.cause),c.push({kind:`event`,text:e.text,closed:t.closed.length})}if(o.exit&&c.push({kind:`exit`,to:o.exit}),a.kind===`encounter`&&!r.triggered.includes(s)){let e=(o.monsters??``).split(`,`).filter(Boolean).flatMap(e=>{let[t,n]=e.split(`:`),r=u.find(e=>e.id===t);return r?[Yn(r,Number(n)||1,this.rng)]:[]});e.length&&c.push({kind:`encounter`,groups:e,fixedKey:s})}else if(!o.exit&&!o.discovery&&a.kind!==`event`&&(a.kind===`floor`||a.kind===`door`)){if(this.cooldown>0)this.cooldown--;else if(this.rng.chance(ii)){let e=ir(i.depth,this.rng);e.length&&c.push({kind:`encounter`,groups:e})}}return c}hurtAll(e){this.state.party={...this.state.party,members:this.state.party.members.map(t=>D(t)?{...t,hp:Math.max(1,t.hp-Math.max(1,e(t)))}:t)}}finishEncounter(e,t){let n=this.state,r=this.level(),i=e.groups.map(e=>`${e.hp.length} ${e.def.name}${e.hp.length===1?``:`s`}`).join(` and `),a=e.groups.find(e=>A(e)>0)?.def.name??e.groups[0]?.def.name??`something`,o=new Map(n.party.members.map(e=>[e.id,e]));for(let t of e.party.members)(t.dead||t.ash)&&!(o.get(t.id)?.dead||o.get(t.id)?.ash)&&this.note(`death`,`${t.name} died at ${r.name}, killed by a ${a}. The ${a} was reportedly sorry.`);n.party=w(e.party),this.cooldown=2,e.outcome===`won`?(n.party={...Lr(n.party,e.xp),gold:n.party.gold+e.gold},t&&n.triggered.push(t),this.note(`combat`,`The party beat ${i} at ${r.name} and took ${e.gold} gold. Nobody knew what to do with their hands.`)):e.outcome===`fled`?this.note(`combat`,`The party ran from ${i} at ${r.name}. The Wardens approved of the running.`):(n.over=!0,this.note(`combat`,`${i} were the last thing the party saw at ${r.name}. The Wardens added six names to the Roll.`))}restAtInn(e){let t=this.state,n=[],r=t.party.members.map(e=>Rr(e)?(n.push(e.name),Br(e,this.rng,{atInn:!0})):e);return t.party=ce({...t.party,members:r},e),t.day+=1,this.note(`town`,n.length>0?`Slept at the Last Mattress. ${n.join(`, `)} grew stronger overnight.`:`Slept at the Last Mattress. Wenna remembered everyone's last words anyway.`),{leveled:n}}},si=1e3,ci=1001,li=1002,ui=1003,di=1004,fi=1005,pi=1006,mi=1007,hi=1008,gi=1009,_i=1014,vi=1015,yi=1016,bi=1020,xi=1023,Si=1026,Ci=1027,wi=2300,Ti=2301,Ei=2302,Di=2400,Oi=2401,ki=2402,Ai=3e3,ji=3001,Mi=3200,Ni=3201,Pi=`srgb`,Fi=`srgb-linear`,Ii=`display-p3`,Li=`display-p3-linear`,Ri=`linear`,zi=`srgb`,Bi=`rec709`,Vi=7680,Hi=35044,Ui=35048,Wi=1035,Gi=2e3,Ki=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}},qi=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ji=Math.PI/180,Yi=180/Math.PI;function Xi(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(qi[e&255]+qi[e>>8&255]+qi[e>>16&255]+qi[e>>24&255]+`-`+qi[t&255]+qi[t>>8&255]+`-`+qi[t>>16&15|64]+qi[t>>24&255]+`-`+qi[n&63|128]+qi[n>>8&255]+`-`+qi[n>>16&255]+qi[n>>24&255]+qi[r&255]+qi[r>>8&255]+qi[r>>16&255]+qi[r>>24&255]).toLowerCase()}function Zi(e,t,n){return Math.max(t,Math.min(n,e))}function Qi(e,t){return(e%t+t)%t}function $i(e,t,n){return(1-n)*e+n*t}function ea(e){return!(e&e-1)&&e!==0}function ta(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function na(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function ra(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var K=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Zi(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},q=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ia.makeScale(e,t)),this}rotate(e){return this.premultiply(ia.makeRotation(-e)),this}translate(e,t){return this.premultiply(ia.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ia=new q;function aa(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function oa(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function sa(){let e=oa(`canvas`);return e.style.display=`block`,e}var ca={};function la(e){e in ca||(ca[e]=!0,console.warn(e))}var ua=new q().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),da=new q().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fa={[Fi]:{transfer:Ri,primaries:Bi,toReference:e=>e,fromReference:e=>e},[Pi]:{transfer:zi,primaries:Bi,toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[Li]:{transfer:Ri,primaries:`p3`,toReference:e=>e.applyMatrix3(da),fromReference:e=>e.applyMatrix3(ua)},[Ii]:{transfer:zi,primaries:`p3`,toReference:e=>e.convertSRGBToLinear().applyMatrix3(da),fromReference:e=>e.applyMatrix3(ua).convertLinearToSRGB()}},pa=new Set([Fi,Li]),J={enabled:!0,_workingColorSpace:Fi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(e){if(!pa.has(e))throw Error(`Unsupported working color space, "${e}".`);this._workingColorSpace=e},convert:function(e,t,n){if(this.enabled===!1||t===n||!t||!n)return e;let r=fa[t].toReference,i=fa[n].fromReference;return i(r(e))},fromWorkingColorSpace:function(e,t){return this.convert(e,this._workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this._workingColorSpace)},getPrimaries:function(e){return fa[e].primaries},getTransfer:function(e){return e===``?Ri:fa[e].transfer}};function ma(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function ha(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var ga,_a=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ga===void 0&&(ga=oa(`canvas`)),ga.width=e.width,ga.height=e.height;let n=ga.getContext(`2d`);e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ga}return t.width>2048||t.height>2048?(console.warn(`THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons`,e),t.toDataURL(`image/jpeg`,.6)):t.toDataURL(`image/png`)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=oa(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=ma(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(ma(t[e]/255)*255):t[e]=ma(t[e]);return{data:t,width:e.width,height:e.height}}return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},va=0,ya=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:va++}),this.uuid=Xi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(ba(r[t].image)):e.push(ba(r[t]))}else e=ba(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function ba(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?_a.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var xa=0,Sa=class e extends Ki{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=ci,i=ci,a=pi,o=hi,s=xi,c=gi,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xa++}),this.uuid=Xi(),this.name=``,this.source=new ya(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u==`string`?this.colorSpace=u:(la(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace=u===3001?Pi:``),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case si:e.x-=Math.floor(e.x);break;case ci:e.x=e.x<0?0:1;break;case li:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case si:e.y-=Math.floor(e.y);break;case ci:e.y=e.y<0?0:1;break;case li:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return la(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace===`srgb`?ji:Ai}set encoding(e){la(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace=e===3001?Pi:``}};Sa.DEFAULT_IMAGE=null,Sa.DEFAULT_MAPPING=300,Sa.DEFAULT_ANISOTROPY=1;var Ca=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},wa=class extends Ki{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ca(0,0,e,t),this.scissorTest=!1,this.viewport=new Ca(0,0,e,t);let r={width:e,height:t,depth:1};n.encoding!==void 0&&(la(`THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace.`),n.colorSpace=n.encoding===3001?Pi:``),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pi,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Sa(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new ya(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ta=class extends wa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ea=class extends Sa{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ui,this.minFilter=ui,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Da=class extends Sa{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ui,this.minFilter=ui,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oa=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0)e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;else if(o===1)e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;else{if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Zi(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),i=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(i),n*Math.cos(i),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Aa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Aa.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ka.copy(this).projectOnVector(e),this.sub(ka)}reflect(e){return this.sub(ka.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Zi(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ka=new Y,Aa=new Oa,ja=class{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Na.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Na.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Na.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Na):Na.fromBufferAttribute(r,t),Na.applyMatrix4(e.matrixWorld),this.expandByPoint(Na);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Pa.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Pa.copy(e.boundingBox)),Pa.applyMatrix4(e.matrixWorld),this.union(Pa)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Na),Na.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Va),Ha.subVectors(this.max,Va),Fa.subVectors(e.a,Va),Ia.subVectors(e.b,Va),La.subVectors(e.c,Va),Ra.subVectors(Ia,Fa),za.subVectors(La,Ia),Ba.subVectors(Fa,La);let t=[0,-Ra.z,Ra.y,0,-za.z,za.y,0,-Ba.z,Ba.y,Ra.z,0,-Ra.x,za.z,0,-za.x,Ba.z,0,-Ba.x,-Ra.y,Ra.x,0,-za.y,za.x,0,-Ba.y,Ba.x,0];return!Ga(t,Fa,Ia,La,Ha)||(t=[1,0,0,0,1,0,0,0,1],!Ga(t,Fa,Ia,La,Ha))?!1:(Ua.crossVectors(Ra,za),t=[Ua.x,Ua.y,Ua.z],Ga(t,Fa,Ia,La,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Na).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Na).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ma)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Ma=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Na=new Y,Pa=new ja,Fa=new Y,Ia=new Y,La=new Y,Ra=new Y,za=new Y,Ba=new Y,Va=new Y,Ha=new Y,Ua=new Y,Wa=new Y;function Ga(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Wa.fromArray(e,a);let o=i.x*Math.abs(Wa.x)+i.y*Math.abs(Wa.y)+i.z*Math.abs(Wa.z),s=t.dot(Wa),c=n.dot(Wa),l=r.dot(Wa);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Ka=new ja,qa=new Y,Ja=new Y,Ya=class{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Ka.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qa.subVectors(e,this.center);let t=qa.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(qa,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ja.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qa.copy(e.center).add(Ja)),this.expandByPoint(qa.copy(e.center).sub(Ja))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Xa=new Y,Za=new Y,Qa=new Y,$a=new Y,eo=new Y,to=new Y,no=new Y,ro=class{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xa)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xa.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xa.copy(this.origin).addScaledVector(this.direction,t),Xa.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Za.copy(e).add(t).multiplyScalar(.5),Qa.copy(t).sub(e).normalize(),$a.copy(this.origin).sub(Za);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Qa),o=$a.dot(this.direction),s=-$a.dot(Qa),c=$a.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Za).addScaledVector(Qa,d),f}intersectSphere(e,t){Xa.subVectors(e.center,this.origin);let n=Xa.dot(this.direction),r=Xa.dot(Xa)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Xa)!==null}intersectTriangle(e,t,n,r,i){eo.subVectors(t,e),to.subVectors(n,e),no.crossVectors(eo,to);let a=this.direction.dot(no),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$a.subVectors(this.origin,e);let s=o*this.direction.dot(to.crossVectors($a,to));if(s<0)return null;let c=o*this.direction.dot(eo.cross($a));if(c<0||s+c>a)return null;let l=-o*$a.dot(no);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},io=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/ao.setFromMatrixColumn(e,0).length(),i=1/ao.setFromMatrixColumn(e,1).length(),a=1/ao.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(so,e,co)}lookAt(e,t,n){let r=this.elements;return fo.subVectors(e,t),fo.lengthSq()===0&&(fo.z=1),fo.normalize(),lo.crossVectors(n,fo),lo.lengthSq()===0&&(Math.abs(n.z)===1?fo.x+=1e-4:fo.z+=1e-4,fo.normalize(),lo.crossVectors(n,fo)),lo.normalize(),uo.crossVectors(fo,lo),r[0]=lo.x,r[4]=uo.x,r[8]=fo.x,r[1]=lo.y,r[5]=uo.y,r[9]=fo.y,r[2]=lo.z,r[6]=uo.z,r[10]=fo.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],ee=r[3],te=r[7],ne=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*ee,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*M+c*re,i[1]=l*x+u*T+d*k+f*ee,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*M+f*re,i[2]=p*x+m*T+h*k+g*ee,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*M+g*re,i[3]=_*x+v*T+y*k+b*ee,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*M+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=ao.set(r[0],r[1],r[2]).length(),a=ao.set(r[4],r[5],r[6]).length(),o=ao.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],oo.copy(this);let s=1/i,c=1/a,l=1/o;return oo.elements[0]*=s,oo.elements[1]*=s,oo.elements[2]*=s,oo.elements[4]*=c,oo.elements[5]*=c,oo.elements[6]*=c,oo.elements[8]*=l,oo.elements[9]*=l,oo.elements[10]*=l,t.setFromRotationMatrix(oo),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=Gi){let s=this.elements,c=2*i/(t-e),l=2*i/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r),f,p;if(o===2e3)f=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===2001)f=-a/(a-i),p=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return s[0]=c,s[4]=0,s[8]=u,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=f,s[14]=p,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Gi){let s=this.elements,c=1/(t-e),l=1/(n-r),u=1/(a-i),d=(t+e)*c,f=(n+r)*l,p,m;if(o===2e3)p=(a+i)*u,m=-2*u;else if(o===2001)p=i*u,m=-1*u;else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-f,s[2]=0,s[6]=0,s[10]=m,s[14]=-p,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ao=new Y,oo=new io,so=new Y(0,0,0),co=new Y(1,1,1),lo=new Y,uo=new Y,fo=new Y,po=new io,mo=new Oa,ho=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Zi(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Zi(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Zi(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Zi(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Zi(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Zi(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return po.makeRotationFromQuaternion(e),this.setFromRotationMatrix(po,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mo.setFromEuler(this),this.setFromQuaternion(mo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ho.DEFAULT_ORDER=`XYZ`;var go=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},_o=0,vo=new Y,yo=new Oa,bo=new io,xo=new Y,So=new Y,Co=new Y,wo=new Oa,To=new Y(1,0,0),Eo=new Y(0,1,0),Do=new Y(0,0,1),Oo={type:`added`},ko={type:`removed`},Ao=class e extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_o++}),this.uuid=Xi(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new Y,n=new ho,r=new Oa,i=new Y(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new io},normalMatrix:{value:new q}}),this.matrix=new io,this.matrixWorld=new io,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yo.setFromAxisAngle(e,t),this.quaternion.multiply(yo),this}rotateOnWorldAxis(e,t){return yo.setFromAxisAngle(e,t),this.quaternion.premultiply(yo),this}rotateX(e){return this.rotateOnAxis(To,e)}rotateY(e){return this.rotateOnAxis(Eo,e)}rotateZ(e){return this.rotateOnAxis(Do,e)}translateOnAxis(e,t){return vo.copy(e).applyQuaternion(this.quaternion),this.position.add(vo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(To,e)}translateY(e){return this.translateOnAxis(Eo,e)}translateZ(e){return this.translateOnAxis(Do,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bo.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xo.copy(e):xo.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),So.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bo.lookAt(So,xo,this.up):bo.lookAt(xo,So,this.up),this.quaternion.setFromRotationMatrix(bo),r&&(bo.extractRotation(r.matrixWorld),yo.setFromRotationMatrix(bo),this.quaternion.premultiply(yo.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Oo)):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ko)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bo.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bo.multiply(e.parent.matrixWorld)),e.applyMatrix4(bo),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,e,Co),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,wo,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++){let n=e[t];n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(e=>({boxInitialized:e.boxInitialized,boxMin:e.box.min.toArray(),boxMax:e.box.max.toArray(),sphereInitialized:e.sphereInitialized,sphereRadius:e.sphere.radius,sphereCenter:e.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Ao.DEFAULT_UP=new Y(0,1,0),Ao.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ao.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jo=new Y,Mo=new Y,No=new Y,Po=new Y,Fo=new Y,Io=new Y,Lo=new Y,Ro=new Y,zo=new Y,Bo=new Y,Vo=!1,Ho=class e{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),jo.subVectors(e,t),r.cross(jo);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){jo.subVectors(r,t),Mo.subVectors(n,t),No.subVectors(e,t);let a=jo.dot(jo),o=jo.dot(Mo),s=jo.dot(No),c=Mo.dot(Mo),l=Mo.dot(No),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Po)!==null&&Po.x>=0&&Po.y>=0&&Po.x+Po.y<=1}static getUV(e,t,n,r,i,a,o,s){return Vo===!1&&(console.warn(`THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().`),Vo=!0),this.getInterpolation(e,t,n,r,i,a,o,s)}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Po)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Po.x),s.addScaledVector(a,Po.y),s.addScaledVector(o,Po.z),s)}static isFrontFacing(e,t,n,r){return jo.subVectors(n,t),Mo.subVectors(e,t),jo.cross(Mo).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jo.subVectors(this.c,this.b),Mo.subVectors(this.a,this.b),jo.cross(Mo).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getUV(t,n,r,i,a){return Vo===!1&&(console.warn(`THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().`),Vo=!0),e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Fo.subVectors(r,n),Io.subVectors(i,n),Ro.subVectors(e,n);let s=Fo.dot(Ro),c=Io.dot(Ro);if(s<=0&&c<=0)return t.copy(n);zo.subVectors(e,r);let l=Fo.dot(zo),u=Io.dot(zo);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Fo,a);Bo.subVectors(e,i);let f=Fo.dot(Bo),p=Io.dot(Bo);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Io,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Lo.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Lo,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Fo,a).addScaledVector(Io,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Uo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wo={h:0,s:0,l:0},Go={h:0,s:0,l:0};function Ko(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var X=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,J.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=J.workingColorSpace){return this.r=e,this.g=t,this.b=n,J.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=J.workingColorSpace){if(e=Qi(e,1),t=Zi(t,0,1),n=Zi(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ko(i,r,e+1/3),this.g=Ko(i,r,e),this.b=Ko(i,r,e-1/3)}return J.toWorkingColorSpace(this,r),this}setStyle(e,t=Pi){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pi){let n=Uo[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ma(e.r),this.g=ma(e.g),this.b=ma(e.b),this}copyLinearToSRGB(e){return this.r=ha(e.r),this.g=ha(e.g),this.b=ha(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pi){return J.fromWorkingColorSpace(qo.copy(this),e),Math.round(Zi(qo.r*255,0,255))*65536+Math.round(Zi(qo.g*255,0,255))*256+Math.round(Zi(qo.b*255,0,255))}getHexString(e=Pi){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=J.workingColorSpace){J.fromWorkingColorSpace(qo.copy(this),t);let n=qo.r,r=qo.g,i=qo.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=J.workingColorSpace){return J.fromWorkingColorSpace(qo.copy(this),t),e.r=qo.r,e.g=qo.g,e.b=qo.b,e}getStyle(e=Pi){J.fromWorkingColorSpace(qo.copy(this),e);let t=qo.r,n=qo.g,r=qo.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Wo),this.setHSL(Wo.h+e,Wo.s+t,Wo.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wo),e.getHSL(Go);let n=$i(Wo.h,Go.h,t),r=$i(Wo.s,Go.s,t),i=$i(Wo.l,Go.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qo=new X;X.NAMES=Uo;var Jo=0,Yo=class extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jo++}),this.uuid=Xi(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Xo=class extends Yo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zo=new Y,Qo=new K,$o=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Hi,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn(`THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead.`),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qo.fromBufferAttribute(this,t),Qo.applyMatrix3(e),this.setXY(t,Qo.x,Qo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zo.fromBufferAttribute(this,t),Zo.applyMatrix3(e),this.setXYZ(t,Zo.x,Zo.y,Zo.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zo.fromBufferAttribute(this,t),Zo.applyMatrix4(e),this.setXYZ(t,Zo.x,Zo.y,Zo.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zo.fromBufferAttribute(this,t),Zo.applyNormalMatrix(e),this.setXYZ(t,Zo.x,Zo.y,Zo.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zo.fromBufferAttribute(this,t),Zo.transformDirection(e),this.setXYZ(t,Zo.x,Zo.y,Zo.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=na(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ra(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=na(t,this.array)),t}setX(e,t){return this.normalized&&(t=ra(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=na(t,this.array)),t}setY(e,t){return this.normalized&&(t=ra(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=na(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ra(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=na(t,this.array)),t}setW(e,t){return this.normalized&&(t=ra(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ra(t,this.array),n=ra(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ra(t,this.array),n=ra(n,this.array),r=ra(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ra(t,this.array),n=ra(n,this.array),r=ra(r,this.array),i=ra(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},es=class extends $o{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ts=class extends $o{constructor(e,t,n){super(new Uint32Array(e),t,n)}},ns=class extends $o{constructor(e,t,n){super(new Float32Array(e),t,n)}},rs=0,is=new io,as=new Ao,os=new Y,ss=new ja,cs=new ja,ls=new Y,us=class e extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rs++}),this.uuid=Xi(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(aa(e)?ts:es)(e,1):e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return is.makeRotationFromQuaternion(e),this.applyMatrix4(is),this}rotateX(e){return is.makeRotationX(e),this.applyMatrix4(is),this}rotateY(e){return is.makeRotationY(e),this.applyMatrix4(is),this}rotateZ(e){return is.makeRotationZ(e),this.applyMatrix4(is),this}translate(e,t,n){return is.makeTranslation(e,t,n),this.applyMatrix4(is),this}scale(e,t,n){return is.makeScale(e,t,n),this.applyMatrix4(is),this}lookAt(e){return as.lookAt(e),as.updateMatrix(),this.applyMatrix4(as.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(os).negate(),this.translate(os.x,os.y,os.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute(`position`,new ns(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ja);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".`,this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ss.setFromBufferAttribute(n),this.morphTargetsRelative?(ls.addVectors(this.boundingBox.min,ss.min),this.boundingBox.expandByPoint(ls),ls.addVectors(this.boundingBox.max,ss.max),this.boundingBox.expandByPoint(ls)):(this.boundingBox.expandByPoint(ss.min),this.boundingBox.expandByPoint(ss.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ya);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".`,this),this.boundingSphere.set(new Y,1/0);else if(e){let n=this.boundingSphere.center;if(ss.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];cs.setFromBufferAttribute(n),this.morphTargetsRelative?(ls.addVectors(ss.min,cs.min),ss.expandByPoint(ls),ls.addVectors(ss.max,cs.max),ss.expandByPoint(ls)):(ss.expandByPoint(cs.min),ss.expandByPoint(cs.max))}ss.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)ls.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(ls));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)ls.fromBufferAttribute(a,t),o&&(os.fromBufferAttribute(e,t),ls.add(os)),r=Math.max(r,n.distanceToSquared(ls))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=e.array,r=t.position.array,i=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new $o(new Float32Array(4*o),4));let s=this.getAttribute(`tangent`).array,c=[],l=[];for(let e=0;e<o;e++)c[e]=new Y,l[e]=new Y;let u=new Y,d=new Y,f=new Y,p=new K,m=new K,h=new K,g=new Y,_=new Y;function v(e,t,n){u.fromArray(r,e*3),d.fromArray(r,t*3),f.fromArray(r,n*3),p.fromArray(a,e*2),m.fromArray(a,t*2),h.fromArray(a,n*2),d.sub(u),f.sub(u),m.sub(p),h.sub(p);let i=1/(m.x*h.y-h.x*m.y);isFinite(i)&&(g.copy(d).multiplyScalar(h.y).addScaledVector(f,-m.y).multiplyScalar(i),_.copy(f).multiplyScalar(m.x).addScaledVector(d,-h.x).multiplyScalar(i),c[e].add(g),c[t].add(g),c[n].add(g),l[e].add(_),l[t].add(_),l[n].add(_))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let e=0,t=y.length;e<t;++e){let t=y[e],r=t.start,i=t.count;for(let e=r,t=r+i;e<t;e+=3)v(n[e+0],n[e+1],n[e+2])}let b=new Y,x=new Y,S=new Y,C=new Y;function w(e){S.fromArray(i,e*3),C.copy(S);let t=c[e];b.copy(t),b.sub(S.multiplyScalar(S.dot(t))).normalize(),x.crossVectors(C,t);let n=x.dot(l[e])<0?-1:1;s[e*4]=b.x,s[e*4+1]=b.y,s[e*4+2]=b.z,s[e*4+3]=n}for(let e=0,t=y.length;e<t;++e){let t=y[e],r=t.start,i=t.count;for(let e=r,t=r+i;e<t;e+=3)w(n[e+0]),w(n[e+1]),w(n[e+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new $o(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new Y,i=new Y,a=new Y,o=new Y,s=new Y,c=new Y,l=new Y,u=new Y;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ls.fromBufferAttribute(e,t),ls.normalize(),e.setXYZ(t,ls.x,ls.y,ls.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new $o(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},ds=new io,fs=new ro,ps=new Ya,ms=new Y,hs=new Y,gs=new Y,_s=new Y,vs=new Y,ys=new Y,bs=new K,xs=new K,Ss=new K,Cs=new Y,ws=new Y,Ts=new Y,Es=new Y,Ds=new Y,Os=class extends Ao{constructor(e=new us,t=new Xo){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ys.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(vs.fromBufferAttribute(s,e),a?ys.addScaledVector(vs,r):ys.addScaledVector(vs.sub(t),r))}t.add(ys)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(i),fs.copy(e.ray).recast(e.near),ps.containsPoint(fs.origin)===!1&&(fs.intersectSphere(ps,ms)===null||fs.origin.distanceToSquared(ms)>(e.far-e.near)**2)||(ds.copy(i).invert(),fs.copy(e.ray).applyMatrix4(ds),(n.boundingBox===null||fs.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,fs)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=As(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=As(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=As(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=As(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ks(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Ds.copy(s),Ds.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Ds);return l<n.near||l>n.far?null:{distance:l,point:Ds.clone(),object:e}}function As(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,hs),e.getVertexPosition(c,gs),e.getVertexPosition(l,_s);let u=ks(e,t,n,r,hs,gs,_s,Es);if(u){i&&(bs.fromBufferAttribute(i,s),xs.fromBufferAttribute(i,c),Ss.fromBufferAttribute(i,l),u.uv=Ho.getInterpolation(Es,hs,gs,_s,bs,xs,Ss,new K)),a&&(bs.fromBufferAttribute(a,s),xs.fromBufferAttribute(a,c),Ss.fromBufferAttribute(a,l),u.uv1=Ho.getInterpolation(Es,hs,gs,_s,bs,xs,Ss,new K),u.uv2=u.uv1),o&&(Cs.fromBufferAttribute(o,s),ws.fromBufferAttribute(o,c),Ts.fromBufferAttribute(o,l),u.normal=Ho.getInterpolation(Es,hs,gs,_s,Cs,ws,Ts,new Y),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let e={a:s,b:c,c:l,normal:new Y,materialIndex:0};Ho.getNormal(hs,gs,_s,e.normal),u.face=e}return u}var js=class e extends us{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new ns(c,3)),this.setAttribute(`normal`,new ns(l,3)),this.setAttribute(`uv`,new ns(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new Y;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ms(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function Ns(e){let t={};for(let n=0;n<e.length;n++){let r=Ms(e[n]);for(let e in r)t[e]=r[e]}return t}function Ps(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Fs(e){return e.getRenderTarget()===null?e.outputColorSpace:J.workingColorSpace}var Is={clone:Ms,merge:Ns},Ls=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rs=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zs=class extends Yo{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ls,this.fragmentShader=Rs,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=Ps(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Bs=class extends Ao{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new io,this.projectionMatrix=new io,this.projectionMatrixInverse=new io,this.coordinateSystem=Gi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Vs=class extends Bs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ji*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yi*2*Math.atan(Math.tan(Ji*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ji*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Hs=-90,Us=1,Ws=class extends Ao{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Vs(Hs,Us,e,t);r.layers=this.layers,this.add(r);let i=new Vs(Hs,Us,e,t);i.layers=this.layers,this.add(i);let a=new Vs(Hs,Us,e,t);a.layers=this.layers,this.add(a);let o=new Vs(Hs,Us,e,t);o.layers=this.layers,this.add(o);let s=new Vs(Hs,Us,e,t);s.layers=this.layers,this.add(s);let c=new Vs(Hs,Us,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Gs=class extends Sa{constructor(e,t,n,r,i,a,o,s,c,l){e=e===void 0?[]:e,t=t===void 0?301:t,super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ks=class extends Ta{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(la(`THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace.`),t.colorSpace=t.encoding===3001?Pi:``),this.texture=new Gs(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter===void 0?pi:t.minFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new js(5,5,5),i=new zs({name:`CubemapFromEquirect`,uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Os(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=pi),new Ws(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},qs=new Y,Js=new Y,Ys=new q,Xs=class{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=qs.subVectors(n,t).cross(Js.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(qs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ys.getNormalMatrix(e),r=this.coplanarPoint(qs).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Zs=new Ya,Qs=new Y,$s=class{constructor(e=new Xs,t=new Xs,n=new Xs,r=new Xs,i=new Xs,a=new Xs){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gi){let n=this.planes,r=e.elements,i=r[0],a=r[1],o=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],p=r[9],m=r[10],h=r[11],g=r[12],_=r[13],v=r[14],y=r[15];if(n[0].setComponents(s-i,d-c,h-f,y-g).normalize(),n[1].setComponents(s+i,d+c,h+f,y+g).normalize(),n[2].setComponents(s+a,d+l,h+p,y+_).normalize(),n[3].setComponents(s-a,d-l,h-p,y-_).normalize(),n[4].setComponents(s-o,d-u,h-m,y-v).normalize(),t===2e3)n[5].setComponents(s+o,d+u,h+m,y+v).normalize();else if(t===2001)n[5].setComponents(o,u,m,v).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zs)}intersectsSprite(e){return Zs.center.set(0,0,0),Zs.radius=.7071067811865476,Zs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zs)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Qs.x=r.normal.x>0?e.max.x:e.min.x,Qs.y=r.normal.y>0?e.max.y:e.min.y,Qs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function ec(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function tc(e,t){let n=t.isWebGL2,r=new WeakMap;function i(t,r){let i=t.array,a=t.usage,o=i.byteLength,s=e.createBuffer();e.bindBuffer(r,s),e.bufferData(r,i,a),t.onUploadCallback();let c;if(i instanceof Float32Array)c=e.FLOAT;else if(i instanceof Uint16Array){if(t.isFloat16BufferAttribute){if(n)c=e.HALF_FLOAT;else throw Error(`THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.`)}else c=e.UNSIGNED_SHORT}else if(i instanceof Int16Array)c=e.SHORT;else if(i instanceof Uint32Array)c=e.UNSIGNED_INT;else if(i instanceof Int32Array)c=e.INT;else if(i instanceof Int8Array)c=e.BYTE;else if(i instanceof Uint8Array)c=e.UNSIGNED_BYTE;else if(i instanceof Uint8ClampedArray)c=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+i);return{buffer:s,type:c,bytesPerElement:i.BYTES_PER_ELEMENT,version:t.version,size:o}}function a(t,r,i){let a=r.array,o=r._updateRange,s=r.updateRanges;if(e.bindBuffer(i,t),o.count===-1&&s.length===0&&e.bufferSubData(i,0,a),s.length!==0){for(let t=0,r=s.length;t<r;t++){let r=s[t];n?e.bufferSubData(i,r.start*a.BYTES_PER_ELEMENT,a,r.start,r.count):e.bufferSubData(i,r.start*a.BYTES_PER_ELEMENT,a.subarray(r.start,r.start+r.count))}r.clearUpdateRanges()}o.count!==-1&&(n?e.bufferSubData(i,o.offset*a.BYTES_PER_ELEMENT,a,o.offset,o.count):e.bufferSubData(i,o.offset*a.BYTES_PER_ELEMENT,a.subarray(o.offset,o.offset+o.count)),o.count=-1),r.onUploadCallback()}function o(e){return e.isInterleavedBufferAttribute&&(e=e.data),r.get(e)}function s(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=r.get(t);n&&(e.deleteBuffer(n.buffer),r.delete(t))}function c(e,t){if(e.isGLBufferAttribute){let t=r.get(e);(!t||t.version<e.version)&&r.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}e.isInterleavedBufferAttribute&&(e=e.data);let n=r.get(e);if(n===void 0)r.set(e,i(e,t));else if(n.version<e.version){if(n.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);a(n.buffer,e,t),n.version=e.version}}return{get:o,remove:s,update:c}}var nc=class e extends us{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new ns(p,3)),this.setAttribute(`normal`,new ns(m,3)),this.setAttribute(`uv`,new ns(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Z={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_fragment:`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},rc={basic:{uniforms:Ns([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:Ns([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new X(0)}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:Ns([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:Ns([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:Ns([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new X(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:Ns([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:Ns([Q.points,Q.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:Ns([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:Ns([Q.common,Q.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:Ns([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:Ns([Q.sprite,Q.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distanceRGBA:{uniforms:Ns([Q.common,Q.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distanceRGBA_vert,fragmentShader:Z.distanceRGBA_frag},shadow:{uniforms:Ns([Q.lights,Q.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};rc.physical={uniforms:Ns([rc.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var ic={r:0,b:0,g:0};function ac(e,t,n,r,i,a,o){let s=new X(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(a,m){let g=!1,_=m.isScene===!0?m.background:null;_&&_.isTexture&&(_=(m.backgroundBlurriness>0?n:t).get(_)),_===null?h(s,c):_&&_.isColor&&(h(_,1),g=!0);let v=e.xr.getEnvironmentBlendMode();v===`additive`?r.buffers.color.setClear(0,0,0,1,o):v===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||g)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),_&&(_.isCubeTexture||_.mapping===306)?(u===void 0&&(u=new Os(new js(1,1,1),new zs({name:`BackgroundCubeMaterial`,uniforms:Ms(rc.backgroundCube.uniforms),vertexShader:rc.backgroundCube.vertexShader,fragmentShader:rc.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=J.getTransfer(_.colorSpace)!==zi,(d!==_||f!==_.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=_,f=_.version,p=e.toneMapping),u.layers.enableAll(),a.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Os(new nc(2,2),new zs({name:`BackgroundMaterial`,uniforms:Ms(rc.background.uniforms),vertexShader:rc.background.vertexShader,fragmentShader:rc.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=J.getTransfer(_.colorSpace)!==zi,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=_,f=_.version,p=e.toneMapping),l.layers.enableAll(),a.unshift(l,l.geometry,l.material,0,0,null))}function h(t,n){t.getRGB(ic,Fs(e)),r.buffers.color.setClear(ic.r,ic.g,ic.b,n,o)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,h(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,h(s,c)},render:m}}function oc(e,t,n,r){let i=e.getParameter(e.MAX_VERTEX_ATTRIBS),a=r.isWebGL2?null:t.get(`OES_vertex_array_object`),o=r.isWebGL2||a!==null,s={},c=g(null),l=c,u=!1;function d(t,r,i,a,s){let c=!1;if(o){let e=h(a,i,r);l!==e&&(l=e,p(l.object)),c=_(t,a,i,s),c&&v(t,a,i,s)}else{let e=r.wireframe===!0;(l.geometry!==a.id||l.program!==i.id||l.wireframe!==e)&&(l.geometry=a.id,l.program=i.id,l.wireframe=e,c=!0)}s!==null&&n.update(s,e.ELEMENT_ARRAY_BUFFER),(c||u)&&(u=!1,w(t,r,i,a),s!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(s).buffer))}function f(){return r.isWebGL2?e.createVertexArray():a.createVertexArrayOES()}function p(t){return r.isWebGL2?e.bindVertexArray(t):a.bindVertexArrayOES(t)}function m(t){return r.isWebGL2?e.deleteVertexArray(t):a.deleteVertexArrayOES(t)}function h(e,t,n){let r=n.wireframe===!0,i=s[e.id];i===void 0&&(i={},s[e.id]=i);let a=i[t.id];a===void 0&&(a={},i[t.id]=a);let o=a[r];return o===void 0&&(o=g(f()),a[r]=o),o}function g(e){let t=[],n=[],r=[];for(let e=0;e<i;e++)t[e]=0,n[e]=0,r[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:n,attributeDivisors:r,object:e,attributes:{},index:null}}function _(e,t,n,r){let i=l.attributes,a=t.attributes,o=0,s=n.getAttributes();for(let t in s)if(s[t].location>=0){let n=i[t],r=a[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;o++}return l.attributesNum!==o||l.index!==r}function v(e,t,n,r){let i={},a=t.attributes,o=0,s=n.getAttributes();for(let t in s)if(s[t].location>=0){let n=a[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,o++}l.attributes=i,l.attributesNum=o,l.index=r}function y(){let e=l.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function b(e){x(e,0)}function x(n,i){let a=l.newAttributes,o=l.enabledAttributes,s=l.attributeDivisors;a[n]=1,o[n]===0&&(e.enableVertexAttribArray(n),o[n]=1),s[n]!==i&&((r.isWebGL2?e:t.get(`ANGLE_instanced_arrays`))[r.isWebGL2?`vertexAttribDivisor`:`vertexAttribDivisorANGLE`](n,i),s[n]=i)}function S(){let t=l.newAttributes,n=l.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function C(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function w(i,a,o,s){if(r.isWebGL2===!1&&(i.isInstancedMesh||s.isInstancedBufferGeometry)&&t.get(`ANGLE_instanced_arrays`)===null)return;y();let c=s.attributes,l=o.getAttributes(),u=a.defaultAttributeValues;for(let t in l){let a=l[t];if(a.location>=0){let o=c[t];if(o===void 0&&(t===`instanceMatrix`&&i.instanceMatrix&&(o=i.instanceMatrix),t===`instanceColor`&&i.instanceColor&&(o=i.instanceColor)),o!==void 0){let t=o.normalized,c=o.itemSize,l=n.get(o);if(l===void 0)continue;let u=l.buffer,d=l.type,f=l.bytesPerElement,p=r.isWebGL2===!0&&(d===e.INT||d===e.UNSIGNED_INT||o.gpuType===1013);if(o.isInterleavedBufferAttribute){let n=o.data,r=n.stride,l=o.offset;if(n.isInstancedInterleavedBuffer){for(let e=0;e<a.locationSize;e++)x(a.location+e,n.meshPerAttribute);i.isInstancedMesh!==!0&&s._maxInstanceCount===void 0&&(s._maxInstanceCount=n.meshPerAttribute*n.count)}else for(let e=0;e<a.locationSize;e++)b(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,u);for(let e=0;e<a.locationSize;e++)C(a.location+e,c/a.locationSize,d,t,r*f,(l+c/a.locationSize*e)*f,p)}else{if(o.isInstancedBufferAttribute){for(let e=0;e<a.locationSize;e++)x(a.location+e,o.meshPerAttribute);i.isInstancedMesh!==!0&&s._maxInstanceCount===void 0&&(s._maxInstanceCount=o.meshPerAttribute*o.count)}else for(let e=0;e<a.locationSize;e++)b(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,u);for(let e=0;e<a.locationSize;e++)C(a.location+e,c/a.locationSize,d,t,c*f,c/a.locationSize*e*f,p)}}else if(u!==void 0){let n=u[t];if(n!==void 0)switch(n.length){case 2:e.vertexAttrib2fv(a.location,n);break;case 3:e.vertexAttrib3fv(a.location,n);break;case 4:e.vertexAttrib4fv(a.location,n);break;default:e.vertexAttrib1fv(a.location,n)}}}}S()}function T(){O();for(let e in s){let t=s[e];for(let e in t){let n=t[e];for(let e in n)m(n[e].object),delete n[e];delete t[e]}delete s[e]}}function E(e){if(s[e.id]===void 0)return;let t=s[e.id];for(let e in t){let n=t[e];for(let e in n)m(n[e].object),delete n[e];delete t[e]}delete s[e.id]}function D(e){for(let t in s){let n=s[t];if(n[e.id]===void 0)continue;let r=n[e.id];for(let e in r)m(r[e].object),delete r[e];delete n[e.id]}}function O(){k(),u=!0,l!==c&&(l=c,p(l.object))}function k(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:O,resetDefaultState:k,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:D,initAttributes:y,enableAttribute:b,disableUnusedAttributes:S}}function sc(e,t,n,r){let i=r.isWebGL2,a;function o(e){a=e}function s(t,r){e.drawArrays(a,t,r),n.update(r,a,1)}function c(r,o,s){if(s===0)return;let c,l;if(i)c=e,l=`drawArraysInstanced`;else if(c=t.get(`ANGLE_instanced_arrays`),l=`drawArraysInstancedANGLE`,c===null){console.error(`THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.`);return}c[l](a,r,o,s),n.update(o,a,s)}function l(e,r,i){if(i===0)return;let o=t.get(`WEBGL_multi_draw`);if(o===null)for(let t=0;t<i;t++)this.render(e[t],r[t]);else{o.multiDrawArraysWEBGL(a,e,0,r,0,i);let t=0;for(let e=0;e<i;e++)t+=r[e];n.update(t,a,1)}}this.setMode=o,this.render=s,this.renderInstances=c,this.renderMultiDraw=l}function cc(e,t,n){let r;function i(){if(r!==void 0)return r;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);r=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let o=typeof WebGL2RenderingContext<`u`&&e.constructor.name===`WebGL2RenderingContext`,s=n.precision===void 0?`highp`:n.precision,c=a(s);c!==s&&(console.warn(`THREE.WebGLRenderer:`,s,`not supported, using`,c,`instead.`),s=c);let l=o||t.has(`WEBGL_draw_buffers`),u=n.logarithmicDepthBuffer===!0,d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),f=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),g=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,b=o||t.has(`OES_texture_float`),x=y&&b,S=o?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:a,precision:s,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:g,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:y,floatFragmentTextures:b,floatVertexTextures:x,maxSamples:S}}function lc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Xs,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function uc(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304){if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}{let a=r.image;if(a&&a.height>0){let o=new Ks(a.height/2);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}return null}}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var dc=class extends Bs{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},fc=4,pc=[.125,.215,.35,.446,.526,.582],mc=20,hc=new dc,gc=new X,_c=null,vc=0,yc=0,bc=(1+Math.sqrt(5))/2,xc=1/bc,Sc=[new Y(1,1,1),new Y(-1,1,1),new Y(1,1,-1),new Y(-1,1,-1),new Y(0,bc,xc),new Y(0,bc,-xc),new Y(xc,0,bc),new Y(-xc,0,bc),new Y(bc,xc,0),new Y(-bc,xc,0)],Cc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){_c=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),yc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(e,n,r,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_c,vc,yc),e.scissorTest=!1,Ec(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_c=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),yc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:pi,minFilter:pi,generateMipmaps:!1,type:yi,format:xi,colorSpace:Fi,depthBuffer:!1},r=Tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tc(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wc(r)),this._blurMaterial=Dc(r,e,t)}return r}_compileMaterial(e){let t=new Os(this._lodPlanes[0],e);this._renderer.compile(t,hc)}_sceneToCubeUV(e,t,n,r){let i=new Vs(90,1,t,n),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,l=s.toneMapping;s.getClearColor(gc),s.toneMapping=0,s.autoClear=!1;let u=new Xo({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),d=new Os(new js,u),f=!1,p=e.background;p?p.isColor&&(u.color.copy(p),e.background=null,f=!0):(u.color.copy(gc),f=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(i.up.set(0,a[t],0),i.lookAt(o[t],0,0)):n===1?(i.up.set(0,0,a[t]),i.lookAt(0,o[t],0)):(i.up.set(0,a[t],0),i.lookAt(0,0,o[t]));let c=this._cubeSize;Ec(r,n*c,t>2?c:0,c,c),s.setRenderTarget(r),f&&s.render(d,i),s.render(e,i)}d.geometry.dispose(),d.material.dispose(),s.toneMapping=l,s.autoClear=c,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new Os(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Ec(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,hc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let t=1;t<this._lodPlanes.length;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),r=Sc[(t-1)%Sc.length];this._blur(e,t-1,t,n,r)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new Os(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):mc;m>mc&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${mc}`);let h=[],g=0;for(let e=0;e<mc;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Ec(t,3*v*(r>_-fc?r-_+fc:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,hc)}};function wc(e){let t=[],n=[],r=[],i=e,a=e-fc+1+pc.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-fc?s=pc[o-e+fc-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new us;h.setAttribute(`position`,new $o(f,3)),h.setAttribute(`uv`,new $o(p,2)),h.setAttribute(`faceIndex`,new $o(m,1)),t.push(h),i>fc&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function Tc(e,t,n){let r=new Ta(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Ec(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Dc(e,t,n){let r=new Float32Array(mc),i=new Y(0,1,0);return new zs({name:`SphericalGaussianBlur`,defines:{n:mc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Oc(){return new zs({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function kc(){return new zs({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ac(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jc(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let i=t.get(r);return n===null&&(n=new Cc(e)),i=s?n.fromEquirectangular(r,i):n.fromCubemap(r,i),t.set(r,i),i.texture}if(t.has(r))return t.get(r).texture;{let o=r.image;if(s&&o&&o.height>0||c&&o&&i(o)){n===null&&(n=new Cc(e));let i=s?n.fromEquirectangular(r):n.fromCubemap(r);return t.set(r,i),r.addEventListener(`dispose`,a),i.texture}return null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function Mc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(e){e.isWebGL2?(n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`)):(n(`WEBGL_depth_texture`),n(`OES_texture_float`),n(`OES_texture_half_float`),n(`OES_texture_half_float_linear`),n(`OES_standard_derivatives`),n(`OES_element_index_uint`),n(`OES_vertex_array_object`),n(`ANGLE_instanced_arrays`)),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`)},get:function(e){let t=n(e);return t===null&&console.warn(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function Nc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);for(let e in s.morphAttributes){let n=s.morphAttributes[e];for(let e=0,r=n.length;e<r;e++)t.remove(n[e])}s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER);let i=n.morphAttributes;for(let n in i){let r=i[n];for(let n=0,i=r.length;n<i;n++)t.update(r[n],e.ARRAY_BUFFER)}}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(aa(n)?ts:es)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Pc(e,t,n,r){let i=r.isWebGL2,a;function o(e){a=e}let s,c;function l(e){s=e.type,c=e.bytesPerElement}function u(t,r){e.drawElements(a,r,s,t*c),n.update(r,a,1)}function d(r,o,l){if(l===0)return;let u,d;if(i)u=e,d=`drawElementsInstanced`;else if(u=t.get(`ANGLE_instanced_arrays`),d=`drawElementsInstancedANGLE`,u===null){console.error(`THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.`);return}u[d](a,o,s,r*c,l),n.update(o,a,l)}function f(e,r,i){if(i===0)return;let o=t.get(`WEBGL_multi_draw`);if(o===null)for(let t=0;t<i;t++)this.render(e[t]/c,r[t]);else{o.multiDrawElementsWEBGL(a,r,0,s,e,0,i);let t=0;for(let e=0;e<i;e++)t+=r[e];n.update(t,a,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=f}function Fc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Ic(e,t){return e[0]-t[0]}function Lc(e,t){return Math.abs(t[1])-Math.abs(e[1])}function Rc(e,t,n){let r={},i=new Float32Array(8),a=new WeakMap,o=new Ca,s=[];for(let e=0;e<8;e++)s[e]=[e,0];function c(c,l,u){let d=c.morphTargetInfluences;if(t.isWebGL2===!0){let r=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,i=r===void 0?0:r.length,s=a.get(l);if(s===void 0||s.count!==i){s!==void 0&&s.texture.dispose();let e=l.morphAttributes.position!==void 0,n=l.morphAttributes.normal!==void 0,r=l.morphAttributes.color!==void 0,c=l.morphAttributes.position||[],u=l.morphAttributes.normal||[],d=l.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),r===!0&&(f=3);let p=l.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*i),g=new Ea(h,p,m,i);g.type=vi,g.needsUpdate=!0;let _=f*4;for(let t=0;t<i;t++){let i=c[t],a=u[t],s=d[t],l=p*m*4*t;for(let t=0;t<i.count;t++){let c=t*_;e===!0&&(o.fromBufferAttribute(i,t),h[l+c+0]=o.x,h[l+c+1]=o.y,h[l+c+2]=o.z,h[l+c+3]=0),n===!0&&(o.fromBufferAttribute(a,t),h[l+c+4]=o.x,h[l+c+5]=o.y,h[l+c+6]=o.z,h[l+c+7]=0),r===!0&&(o.fromBufferAttribute(s,t),h[l+c+8]=o.x,h[l+c+9]=o.y,h[l+c+10]=o.z,h[l+c+11]=s.itemSize===4?o.w:1)}}s={count:i,texture:g,size:new K(p,m)},a.set(l,s);function v(){g.dispose(),a.delete(l),l.removeEventListener(`dispose`,v)}l.addEventListener(`dispose`,v)}let c=0;for(let e=0;e<d.length;e++)c+=d[e];let f=l.morphTargetsRelative?1:1-c;u.getUniforms().setValue(e,`morphTargetBaseInfluence`,f),u.getUniforms().setValue(e,`morphTargetInfluences`,d),u.getUniforms().setValue(e,`morphTargetsTexture`,s.texture,n),u.getUniforms().setValue(e,`morphTargetsTextureSize`,s.size)}else{let t=d===void 0?0:d.length,n=r[l.id];if(n===void 0||n.length!==t){n=[];for(let e=0;e<t;e++)n[e]=[e,0];r[l.id]=n}for(let e=0;e<t;e++){let t=n[e];t[0]=e,t[1]=d[e]}n.sort(Lc);for(let e=0;e<8;e++)e<t&&n[e][1]?(s[e][0]=n[e][0],s[e][1]=n[e][1]):(s[e][0]=2**53-1,s[e][1]=0);s.sort(Ic);let a=l.morphAttributes.position,o=l.morphAttributes.normal,c=0;for(let e=0;e<8;e++){let t=s[e],n=t[0],r=t[1];n!==2**53-1&&r?(a&&l.getAttribute(`morphTarget`+e)!==a[n]&&l.setAttribute(`morphTarget`+e,a[n]),o&&l.getAttribute(`morphNormal`+e)!==o[n]&&l.setAttribute(`morphNormal`+e,o[n]),i[e]=r,c+=r):(a&&l.hasAttribute(`morphTarget`+e)===!0&&l.deleteAttribute(`morphTarget`+e),o&&l.hasAttribute(`morphNormal`+e)===!0&&l.deleteAttribute(`morphNormal`+e),i[e]=0)}let f=l.morphTargetsRelative?1:1-c;u.getUniforms().setValue(e,`morphTargetBaseInfluence`,f),u.getUniforms().setValue(e,`morphTargetInfluences`,i)}}return{update:c}}function zc(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var Bc=class extends Sa{constructor(e,t,n,r,i,a,o,s,c,l){if(l=l===void 0?Si:l,l!==1026&&l!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);n===void 0&&l===1026&&(n=_i),n===void 0&&l===1027&&(n=bi),super(null,r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o===void 0?ui:o,this.minFilter=s===void 0?ui:s,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Vc=new Sa,Hc=new Bc(1,1);Hc.compareFunction=515;var Uc=new Ea,Wc=new Da,Gc=new Gs,Kc=[],qc=[],Jc=new Float32Array(16),Yc=new Float32Array(9),Xc=new Float32Array(4);function Zc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Kc[i];if(a===void 0&&(a=new Float32Array(i),Kc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Qc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function $c(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function el(e,t){let n=qc[t];n===void 0&&(n=new Int32Array(t),qc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function tl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function nl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qc(n,t))return;e.uniform2fv(this.addr,t),$c(n,t)}}function rl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Qc(n,t))return;e.uniform3fv(this.addr,t),$c(n,t)}}function il(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qc(n,t))return;e.uniform4fv(this.addr,t),$c(n,t)}}function al(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),$c(n,t)}else{if(Qc(n,r))return;Xc.set(r),e.uniformMatrix2fv(this.addr,!1,Xc),$c(n,r)}}function ol(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),$c(n,t)}else{if(Qc(n,r))return;Yc.set(r),e.uniformMatrix3fv(this.addr,!1,Yc),$c(n,r)}}function sl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),$c(n,t)}else{if(Qc(n,r))return;Jc.set(r),e.uniformMatrix4fv(this.addr,!1,Jc),$c(n,r)}}function cl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ll(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qc(n,t))return;e.uniform2iv(this.addr,t),$c(n,t)}}function ul(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qc(n,t))return;e.uniform3iv(this.addr,t),$c(n,t)}}function dl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qc(n,t))return;e.uniform4iv(this.addr,t),$c(n,t)}}function fl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function pl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qc(n,t))return;e.uniform2uiv(this.addr,t),$c(n,t)}}function ml(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qc(n,t))return;e.uniform3uiv(this.addr,t),$c(n,t)}}function hl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qc(n,t))return;e.uniform4uiv(this.addr,t),$c(n,t)}}function gl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a=this.type===e.SAMPLER_2D_SHADOW?Hc:Vc;n.setTexture2D(t||a,i)}function _l(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Wc,i)}function vl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Gc,i)}function yl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Uc,i)}function bl(e){switch(e){case 5126:return tl;case 35664:return nl;case 35665:return rl;case 35666:return il;case 35674:return al;case 35675:return ol;case 35676:return sl;case 5124:case 35670:return cl;case 35667:case 35671:return ll;case 35668:case 35672:return ul;case 35669:case 35673:return dl;case 5125:return fl;case 36294:return pl;case 36295:return ml;case 36296:return hl;case 35678:case 36198:case 36298:case 36306:case 35682:return gl;case 35679:case 36299:case 36307:return _l;case 35680:case 36300:case 36308:case 36293:return vl;case 36289:case 36303:case 36311:case 36292:return yl}}function xl(e,t){e.uniform1fv(this.addr,t)}function Sl(e,t){let n=Zc(t,this.size,2);e.uniform2fv(this.addr,n)}function Cl(e,t){let n=Zc(t,this.size,3);e.uniform3fv(this.addr,n)}function wl(e,t){let n=Zc(t,this.size,4);e.uniform4fv(this.addr,n)}function Tl(e,t){let n=Zc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function El(e,t){let n=Zc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Dl(e,t){let n=Zc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ol(e,t){e.uniform1iv(this.addr,t)}function kl(e,t){e.uniform2iv(this.addr,t)}function Al(e,t){e.uniform3iv(this.addr,t)}function jl(e,t){e.uniform4iv(this.addr,t)}function Ml(e,t){e.uniform1uiv(this.addr,t)}function Nl(e,t){e.uniform2uiv(this.addr,t)}function Pl(e,t){e.uniform3uiv(this.addr,t)}function Fl(e,t){e.uniform4uiv(this.addr,t)}function Il(e,t,n){let r=this.cache,i=t.length,a=el(n,i);Qc(r,a)||(e.uniform1iv(this.addr,a),$c(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||Vc,a[e])}function Ll(e,t,n){let r=this.cache,i=t.length,a=el(n,i);Qc(r,a)||(e.uniform1iv(this.addr,a),$c(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Wc,a[e])}function Rl(e,t,n){let r=this.cache,i=t.length,a=el(n,i);Qc(r,a)||(e.uniform1iv(this.addr,a),$c(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Gc,a[e])}function zl(e,t,n){let r=this.cache,i=t.length,a=el(n,i);Qc(r,a)||(e.uniform1iv(this.addr,a),$c(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Uc,a[e])}function Bl(e){switch(e){case 5126:return xl;case 35664:return Sl;case 35665:return Cl;case 35666:return wl;case 35674:return Tl;case 35675:return El;case 35676:return Dl;case 5124:case 35670:return Ol;case 35667:case 35671:return kl;case 35668:case 35672:return Al;case 35669:case 35673:return jl;case 5125:return Ml;case 36294:return Nl;case 36295:return Pl;case 36296:return Fl;case 35678:case 36198:case 36298:case 36306:case 35682:return Il;case 35679:case 36299:case 36307:return Ll;case 35680:case 36300:case 36308:case 36293:return Rl;case 36289:case 36303:case 36311:case 36292:return zl}}var Vl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=bl(t.type)}},Hl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Bl(t.type)}},Ul=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Wl=/(\w+)(\])?(\[|\.)?/g;function Gl(e,t){e.seq.push(t),e.map[t.id]=t}function Kl(e,t,n){let r=e.name,i=r.length;for(Wl.lastIndex=0;;){let a=Wl.exec(r),o=Wl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Gl(n,l===void 0?new Vl(s,e,t):new Hl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Ul(s),Gl(n,e)),n=e}}}var ql=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Kl(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Jl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Yl=37297,Xl=0;function Zl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}function Ql(e){let t=J.getPrimaries(J.workingColorSpace),n=J.getPrimaries(e),r;switch(t===n?r=``:t===`p3`&&n===`rec709`?r=`LinearDisplayP3ToLinearSRGB`:t===`rec709`&&n===`p3`&&(r=`LinearSRGBToLinearDisplayP3`),e){case Fi:case Li:return[r,`LinearTransferOETF`];case Pi:case Ii:return[r,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space:`,e),[r,`LinearTransferOETF`]}}function $l(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=e.getShaderInfoLog(t).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Zl(e.getShaderSource(t),r)}return i}function eu(e,t){let n=Ql(t);return`vec4 ${e}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function tu(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`OptimizedCineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}function nu(e){return[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||e.shaderID===`physical`?`#extension GL_OES_standard_derivatives : enable`:``,(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?`#extension GL_EXT_frag_depth : enable`:``,e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?`#extension GL_EXT_draw_buffers : require`:``,(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?`#extension GL_EXT_shader_texture_lod : enable`:``].filter(ou).join(`
`)}function ru(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``].filter(ou).join(`
`)}function iu(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function au(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ou(e){return e!==``}function su(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function cu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var lu=/^[ \t]*#include +<([\w\d./]+)>/gm;function uu(e){return e.replace(lu,fu)}var du=new Map([[`encodings_fragment`,`colorspace_fragment`],[`encodings_pars_fragment`,`colorspace_pars_fragment`],[`output_fragment`,`opaque_fragment`]]);function fu(e,t){let n=Z[t];if(n===void 0){let e=du.get(t);if(e!==void 0)n=Z[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return uu(n)}var pu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mu(e){return e.replace(pu,hu)}function hu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function gu(e){let t=`precision `+e.precision+` float;
precision `+e.precision+` int;`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function _u(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function vu(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`}return t}function yu(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`}return t}function bu(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`}return t}function xu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Su(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=_u(n),l=vu(n),u=yu(n),d=bu(n),f=xu(n),p=n.isWebGL2?``:nu(n),m=ru(n),h=iu(a),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(ou).join(`
`),_.length>0&&(_+=`
`),v=[p,`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(ou).join(`
`),v.length>0&&(v+=`
`)):(_=[gu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors&&n.isWebGL2?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_TEXTURE`:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.useLegacyLights?`#define LEGACY_LIGHTS`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?`#define USE_LOGDEPTHBUF_EXT`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )`,`	attribute vec3 morphTarget0;`,`	attribute vec3 morphTarget1;`,`	attribute vec3 morphTarget2;`,`	attribute vec3 morphTarget3;`,`	#ifdef USE_MORPHNORMALS`,`		attribute vec3 morphNormal0;`,`		attribute vec3 morphNormal1;`,`		attribute vec3 morphNormal2;`,`		attribute vec3 morphNormal3;`,`	#else`,`		attribute vec3 morphTarget4;`,`		attribute vec3 morphTarget5;`,`		attribute vec3 morphTarget6;`,`		attribute vec3 morphTarget7;`,`	#endif`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ou).join(`
`),v=[p,gu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.useLegacyLights?`#define LEGACY_LIGHTS`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?`#define USE_LOGDEPTHBUF_EXT`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Z.tonemapping_pars_fragment,n.toneMapping===0?``:tu(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Z.colorspace_pars_fragment,eu(`linearToOutputTexel`,n.outputColorSpace),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ou).join(`
`)),o=uu(o),o=su(o,n),o=cu(o,n),s=uu(s),s=su(s,n),s=cu(s,n),o=mu(o),s=mu(s),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`precision mediump sampler2DArray;`,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`precision mediump sampler2DArray;`,`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+o,x=y+v+s,S=Jl(i,i.VERTEX_SHADER,b),C=Jl(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g).trim(),r=i.getShaderInfoLog(S).trim(),a=i.getShaderInfoLog(C).trim(),o=!0,s=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1){if(o=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=$l(i,S,`vertex`),t=$l(i,C,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Program Info Log: `+n+`
`+e+`
`+t)}}else n===``?(r===``||a===``)&&(s=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,n);s&&(t.diagnostics={runnable:o,programLog:n,vertexShader:{log:r,prefix:_},fragmentShader:{log:a,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new ql(i,g),E=au(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,Yl)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Xl++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var Cu=0,wu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Tu(e),t.set(e,n)),n}},Tu=class{constructor(e){this.id=Cu++,this.code=e,this.usedTimes=0}};function Eu(e,t,n,r,i,a,o){let s=new go,c=new wu,l=[],u=i.isWebGL2,d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return e===0?`uv`:`uv${e}`}function g(a,s,l,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,T=w===void 0?0:w.length,E=0;y.morphAttributes.position!==void 0&&(E=1),y.morphAttributes.normal!==void 0&&(E=2),y.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=rc[C];D=e.vertexShader,O=e.fragmentShader}else D=a.vertexShader,O=a.fragmentShader,c.update(a),k=c.getVertexShaderID(a),A=c.getFragmentShaderID(a);let j=e.getRenderTarget(),M=_.isInstancedMesh===!0,ee=_.isBatchedMesh===!0,te=!!a.map,ne=!!a.matcap,re=!!x,ie=!!a.aoMap,ae=!!a.lightMap,oe=!!a.bumpMap,se=!!a.normalMap,ce=!!a.displacementMap,le=!!a.emissiveMap,ue=!!a.metalnessMap,de=!!a.roughnessMap,fe=a.anisotropy>0,pe=a.clearcoat>0,N=a.iridescence>0,me=a.sheen>0,P=a.transmission>0,F=fe&&!!a.anisotropyMap,I=pe&&!!a.clearcoatMap,L=pe&&!!a.clearcoatNormalMap,R=pe&&!!a.clearcoatRoughnessMap,z=N&&!!a.iridescenceMap,he=N&&!!a.iridescenceThicknessMap,ge=me&&!!a.sheenColorMap,_e=me&&!!a.sheenRoughnessMap,ve=!!a.specularMap,ye=!!a.specularColorMap,be=!!a.specularIntensityMap,xe=P&&!!a.transmissionMap,Se=P&&!!a.thicknessMap,Ce=!!a.gradientMap,B=!!a.alphaMap,V=a.alphaTest>0,H=!!a.alphaHash,U=!!a.extensions,W=!!y.attributes.uv1,we=!!y.attributes.uv2,G=!!y.attributes.uv3,Te=0;return a.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Te=e.toneMapping),{isWebGL2:u,shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:D,fragmentShader:O,defines:a.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:ee,instancing:M,instancingColor:M&&_.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Fi,map:te,matcap:ne,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:f&&ce,emissiveMap:le,normalMapObjectSpace:se&&a.normalMapType===1,normalMapTangentSpace:se&&a.normalMapType===0,metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:F,clearcoat:pe,clearcoatMap:I,clearcoatNormalMap:L,clearcoatRoughnessMap:R,iridescence:N,iridescenceMap:z,iridescenceThicknessMap:he,sheen:me,sheenColorMap:ge,sheenRoughnessMap:_e,specularMap:ve,specularColorMap:ye,specularIntensityMap:be,transmission:P,transmissionMap:xe,thicknessMap:Se,gradientMap:Ce,opaque:a.transparent===!1&&a.blending===1,alphaMap:B,alphaTest:V,alphaHash:H,combine:a.combine,mapUv:te&&h(a.map.channel),aoMapUv:ie&&h(a.aoMap.channel),lightMapUv:ae&&h(a.lightMap.channel),bumpMapUv:oe&&h(a.bumpMap.channel),normalMapUv:se&&h(a.normalMap.channel),displacementMapUv:ce&&h(a.displacementMap.channel),emissiveMapUv:le&&h(a.emissiveMap.channel),metalnessMapUv:ue&&h(a.metalnessMap.channel),roughnessMapUv:de&&h(a.roughnessMap.channel),anisotropyMapUv:F&&h(a.anisotropyMap.channel),clearcoatMapUv:I&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:L&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:R&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:z&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:he&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:_e&&h(a.sheenRoughnessMap.channel),specularMapUv:ve&&h(a.specularMap.channel),specularColorMapUv:ye&&h(a.specularColorMap.channel),specularIntensityMapUv:be&&h(a.specularIntensityMap.channel),transmissionMapUv:xe&&h(a.transmissionMap.channel),thicknessMapUv:Se&&h(a.thicknessMap.channel),alphaMapUv:B&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(se||fe),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,vertexUv1s:W,vertexUv2s:we,vertexUv3s:G,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(te||B),fog:!!v,useFog:a.fog===!0,fogExp2:v&&v.isFogExp2,flatShading:a.flatShading===!0,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Te,useLegacyLights:e._useLegacyLights,decodeVideoTexture:te&&a.map.isVideoTexture===!0&&J.getTransfer(a.map.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionDerivatives:U&&a.extensions.derivatives===!0,extensionFragDepth:U&&a.extensions.fragDepth===!0,extensionDrawBuffers:U&&a.extensions.drawBuffers===!0,extensionShaderTextureLOD:U&&a.extensions.shaderTextureLOD===!0,extensionClipCullDistance:U&&a.extensions.clipCullDistance&&r.has(`WEBGL_clip_cull_distance`),rendererExtensionFragDepth:u||r.has(`EXT_frag_depth`),rendererExtensionDrawBuffers:u||r.has(`WEBGL_draw_buffers`),rendererExtensionShaderTextureLod:u||r.has(`EXT_shader_texture_lod`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()}}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.isWebGL2&&s.enable(0),t.supportsVertexTextures&&s.enable(1),t.instancing&&s.enable(2),t.instancingColor&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.skinning&&s.enable(4),t.morphTargets&&s.enable(5),t.morphNormals&&s.enable(6),t.morphColors&&s.enable(7),t.premultipliedAlpha&&s.enable(8),t.shadowMapEnabled&&s.enable(9),t.useLegacyLights&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=rc[t];n=Is.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new Su(e,n,t,a),l.push(r)),r}function S(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:l,dispose:w}}function Du(){let e=new WeakMap;function t(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function n(t){e.delete(t)}function r(t,n,r){e.get(t)[n]=r}function i(){e=new WeakMap}return{get:t,remove:n,update:r,dispose:i}}function Ou(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ku(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Au(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||Ou),r.length>1&&r.sort(t||ku),i.length>1&&i.sort(t||ku)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function ju(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Au,e.set(t,[i])):n>=r.length?(i=new Au,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Mu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new Y,color:new X};break;case`SpotLight`:n={position:new Y,direction:new Y,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Y,color:new X,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Y,skyColor:new X,groundColor:new X};break;case`RectAreaLight`:n={color:new X,position:new Y,halfWidth:new Y,halfHeight:new Y}}return e[t.id]=n,n}}}function Nu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`SpotLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`PointLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Pu=0;function Fu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Iu(e,t){let n=new Mu,r=Nu(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)i.probe.push(new Y);let a=new Y,o=new io,s=new io;function c(a,o){let s=0,c=0,l=0;for(let e=0;e<9;e++)i.probe[e].set(0,0,0);let u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0;a.sort(Fu);let x=o===!0?Math.PI:1;for(let e=0,t=a.length;e<t;e++){let t=a[e],o=t.color,S=t.intensity,C=t.distance,w=t.shadow&&t.shadow.map?t.shadow.map.texture:null;if(t.isAmbientLight)s+=o.r*S*x,c+=o.g*S*x,l+=o.b*S*x;else if(t.isLightProbe){for(let e=0;e<9;e++)i.probe[e].addScaledVector(t.sh.coefficients[e],S);b++}else if(t.isDirectionalLight){let e=n.get(t);if(e.color.copy(t.color).multiplyScalar(t.intensity*x),t.castShadow){let e=t.shadow,n=r.get(t);n.shadowBias=e.bias,n.shadowNormalBias=e.normalBias,n.shadowRadius=e.radius,n.shadowMapSize=e.mapSize,i.directionalShadow[u]=n,i.directionalShadowMap[u]=w,i.directionalShadowMatrix[u]=t.shadow.matrix,h++}i.directional[u]=e,u++}else if(t.isSpotLight){let e=n.get(t);e.position.setFromMatrixPosition(t.matrixWorld),e.color.copy(o).multiplyScalar(S*x),e.distance=C,e.coneCos=Math.cos(t.angle),e.penumbraCos=Math.cos(t.angle*(1-t.penumbra)),e.decay=t.decay,i.spot[f]=e;let a=t.shadow;if(t.map&&(i.spotLightMap[v]=t.map,v++,a.updateMatrices(t),t.castShadow&&y++),i.spotLightMatrix[f]=a.matrix,t.castShadow){let e=r.get(t);e.shadowBias=a.bias,e.shadowNormalBias=a.normalBias,e.shadowRadius=a.radius,e.shadowMapSize=a.mapSize,i.spotShadow[f]=e,i.spotShadowMap[f]=w,_++}f++}else if(t.isRectAreaLight){let e=n.get(t);e.color.copy(o).multiplyScalar(S),e.halfWidth.set(t.width*.5,0,0),e.halfHeight.set(0,t.height*.5,0),i.rectArea[p]=e,p++}else if(t.isPointLight){let e=n.get(t);if(e.color.copy(t.color).multiplyScalar(t.intensity*x),e.distance=t.distance,e.decay=t.decay,t.castShadow){let e=t.shadow,n=r.get(t);n.shadowBias=e.bias,n.shadowNormalBias=e.normalBias,n.shadowRadius=e.radius,n.shadowMapSize=e.mapSize,n.shadowCameraNear=e.camera.near,n.shadowCameraFar=e.camera.far,i.pointShadow[d]=n,i.pointShadowMap[d]=w,i.pointShadowMatrix[d]=t.shadow.matrix,g++}i.point[d]=e,d++}else if(t.isHemisphereLight){let e=n.get(t);e.skyColor.copy(t.color).multiplyScalar(S*x),e.groundColor.copy(t.groundColor).multiplyScalar(S*x),i.hemi[m]=e,m++}}p>0&&(t.isWebGL2?e.has(`OES_texture_float_linear`)===!0?(i.rectAreaLTC1=Q.LTC_FLOAT_1,i.rectAreaLTC2=Q.LTC_FLOAT_2):(i.rectAreaLTC1=Q.LTC_HALF_1,i.rectAreaLTC2=Q.LTC_HALF_2):e.has(`OES_texture_float_linear`)===!0?(i.rectAreaLTC1=Q.LTC_FLOAT_1,i.rectAreaLTC2=Q.LTC_FLOAT_2):e.has(`OES_texture_half_float_linear`)===!0?(i.rectAreaLTC1=Q.LTC_HALF_1,i.rectAreaLTC2=Q.LTC_HALF_2):console.error(`THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.`)),i.ambient[0]=s,i.ambient[1]=c,i.ambient[2]=l;let S=i.hash;(S.directionalLength!==u||S.pointLength!==d||S.spotLength!==f||S.rectAreaLength!==p||S.hemiLength!==m||S.numDirectionalShadows!==h||S.numPointShadows!==g||S.numSpotShadows!==_||S.numSpotMaps!==v||S.numLightProbes!==b)&&(i.directional.length=u,i.spot.length=f,i.rectArea.length=p,i.point.length=d,i.hemi.length=m,i.directionalShadow.length=h,i.directionalShadowMap.length=h,i.pointShadow.length=g,i.pointShadowMap.length=g,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=h,i.pointShadowMatrix.length=g,i.spotLightMatrix.length=_+v-y,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=b,S.directionalLength=u,S.pointLength=d,S.spotLength=f,S.rectAreaLength=p,S.hemiLength=m,S.numDirectionalShadows=h,S.numPointShadows=g,S.numSpotShadows=_,S.numSpotMaps=v,S.numLightProbes=b,i.version=Pu++)}function l(e,t){let n=0,r=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=i.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),a.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=i.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),a.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=i.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s.identity(),o.copy(f.matrixWorld),o.premultiply(d),s.extractRotation(o),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(s),e.halfHeight.applyMatrix4(s),l++}else if(f.isPointLight){let e=i.point[r];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),r++}else if(f.isHemisphereLight){let e=i.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:c,setupView:l,state:i}}function Lu(e,t){let n=new Iu(e,t),r=[],i=[];function a(){r.length=0,i.length=0}function o(e){r.push(e)}function s(e){i.push(e)}function c(e){n.setup(r,e)}function l(e){n.setupView(r,e)}return{init:a,state:{lightsArray:r,shadowsArray:i,lights:n},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Ru(e,t){let n=new WeakMap;function r(r,i=0){let a=n.get(r),o;return a===void 0?(o=new Lu(e,t),n.set(r,[o])):i>=a.length?(o=new Lu(e,t),a.push(o)):o=a[i],o}function i(){n=new WeakMap}return{get:r,dispose:i}}var zu=class extends Yo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Mi,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Bu=class extends Yo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Vu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Hu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Uu(e,t,n){let r=new $s,i=new K,a=new K,o=new Ca,s=new zu({depthPacking:Ni}),c=new Bu,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new zs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:Vu,fragmentShader:Hu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new us;m.setAttribute(`position`,new $o(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Os(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==3&&this.type===3,m=_===3&&this.type!==3;for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){console.warn(`THREE.WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let h=d.getFrameExtents();if(i.multiply(h),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/h.x),i.x=a.x*h.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/h.y),i.y=a.y*h.y,d.mapSize.y=a.y)),d.map===null||p===!0||m===!0){let e=this.type===3?{}:{minFilter:ui,magFilter:ui};d.map!==null&&d.map.dispose(),d.map=new Ta(i.x,i.y,e),d.map.texture.name=l.name+`.shadowMap`,d.camera.updateProjectionMatrix()}e.setRenderTarget(d.map),e.clear();let g=d.getViewportCount();for(let e=0;e<g;e++){let t=d.getViewport(e);o.set(a.x*t.x,a.y*t.y,a.x*t.z,a.y*t.w),f.viewport(o),d.updateMatrices(l,e),r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Ta(i.x,i.y)),f.uniforms.shadow_pass.value=n.map.texture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Wu(e,t,n){let r=n.isWebGL2;function i(){let t=!1,n=new Ca,r=null,i=new Ca(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function a(){let t=!1,n=null,r=null,i=null;return{setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(r){n!==r&&!t&&(e.depthMask(r),n=r)},setFunc:function(t){if(r!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}r=t}},setLocked:function(e){t=e},setClear:function(t){i!==t&&(e.clearDepth(t),i=t)},reset:function(){t=!1,n=null,r=null,i=null}}}function o(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let s=new i,c=new a,l=new o,u=new WeakMap,d=new WeakMap,f={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new X(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,ne=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),te=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),te=ne>=1);let ie=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new Ca().fromArray(oe),le=new Ca().fromArray(se);function ue(t,n,i,a){let o=new Uint8Array(4),s=e.createTexture();e.bindTexture(t,s),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let s=0;s<i;s++)r&&(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)?e.texImage3D(n,0,e.RGBA,1,1,a,0,e.RGBA,e.UNSIGNED_BYTE,o):e.texImage2D(n+s,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,o);return s}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),s.setClear(0,0,0,1),c.setClear(1),l.setClear(0),fe(e.DEPTH_TEST),c.setFunc(3),z(!1),he(1),fe(e.CULL_FACE),L(0);function fe(t){f[t]!==!0&&(e.enable(t),f[t]=!0)}function pe(t){f[t]!==!1&&(e.disable(t),f[t]=!1)}function N(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,r&&(t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n)),!0)}function me(r,i){let a=h,o=!1;if(r){if(a=m.get(i),a===void 0&&(a=[],m.set(i,a)),r.isWebGLMultipleRenderTargets){let t=r.texture;if(a.length!==t.length||a[0]!==e.COLOR_ATTACHMENT0){for(let n=0,r=t.length;n<r;n++)a[n]=e.COLOR_ATTACHMENT0+n;a.length=t.length,o=!0}}else a[0]!==e.COLOR_ATTACHMENT0&&(a[0]=e.COLOR_ATTACHMENT0,o=!0)}else a[0]!==e.BACK&&(a[0]=e.BACK,o=!0);o&&(n.isWebGL2?e.drawBuffers(a):t.get(`WEBGL_draw_buffers`).drawBuffersWEBGL(a))}function P(t){return g!==t&&(e.useProgram(t),g=t,!0)}let F={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};if(r)F[103]=e.MIN,F[104]=e.MAX;else{let e=t.get(`EXT_blend_minmax`);e!==null&&(F[103]=e.MIN_EXT,F[104]=e.MAX_EXT)}let I={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function L(t,n,r,i,a,o,s,c,l,u){if(t===0)_===!0&&(pe(e.BLEND),_=!1);else if(_===!1&&(fe(e.BLEND),_=!0),t!==5){if(t!==v||u!==D){if((y!==100||S!==100)&&(e.blendEquation(e.FUNC_ADD),y=100,S=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}b=null,x=null,C=null,w=null,T.set(0,0,0),E=0,v=t,D=u}}else a||=n,o||=r,s||=i,(n!==y||a!==S)&&(e.blendEquationSeparate(F[n],F[a]),y=n,S=a),(r!==b||i!==x||o!==C||s!==w)&&(e.blendFuncSeparate(I[r],I[i],I[o],I[s]),b=r,x=i,C=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),v=t,D=!1}function R(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),z(r),t.blending===1&&t.transparent===!1?L(0):L(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),c.setFunc(t.depthFunc),c.setTest(t.depthTest),c.setMask(t.depthWrite),s.setMask(t.colorWrite);let i=t.stencilWrite;l.setTest(i),i&&(l.setMask(t.stencilWriteMask),l.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),l.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),_e(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function z(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function he(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==k&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),k=t}function ge(t){t!==A&&(te&&e.lineWidth(t),A=t)}function _e(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(j!==n||M!==r)&&(e.polygonOffset(n,r),j=n,M=r)):pe(e.POLYGON_OFFSET_FILL)}function ve(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function ye(t){t===void 0&&(t=e.TEXTURE0+ee-1),ie!==t&&(e.activeTexture(t),ie=t)}function be(t,n,r){r===void 0&&(r=ie===null?e.TEXTURE0+ee-1:ie);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(ie!==r&&(e.activeTexture(r),ie=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function xe(){let t=ae[ie];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function B(){try{e.texSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function V(){try{e.texSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function H(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function U(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function W(){try{e.texStorage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function we(){try{e.texStorage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function G(){try{e.texImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Te(){try{e.texImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ee(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function De(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function Oe(t,n){let r=d.get(n);r===void 0&&(r=new WeakMap,d.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function ke(t,n){let r=d.get(n).get(t);u.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),u.set(n,r))}function Ae(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),r===!0&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),f={},ie=null,ae={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new X(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),s.reset(),c.reset(),l.reset()}return{buffers:{color:s,depth:c,stencil:l},enable:fe,disable:pe,bindFramebuffer:N,drawBuffers:me,useProgram:P,setBlending:L,setMaterial:R,setFlipSided:z,setCullFace:he,setLineWidth:ge,setPolygonOffset:_e,setScissorTest:ve,activeTexture:ye,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:G,texImage3D:Te,updateUBOMapping:Oe,uniformBlockBinding:ke,texStorage2D:W,texStorage3D:we,texSubImage2D:B,texSubImage3D:V,compressedTexSubImage2D:H,compressedTexSubImage3D:U,scissor:Ee,viewport:De,reset:Ae}}function Gu(e,t,n,r,i,a,o){let s=i.isWebGL2,c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,l=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function m(e,t){return p?new OffscreenCanvas(e,t):oa(`canvas`)}function h(e,t,n,r){let i=1;if((e.width>r||e.height>r)&&(i=r/Math.max(e.width,e.height)),i<1||t===!0){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let r=t?ta:Math.floor,a=r(i*e.width),o=r(i*e.height);d===void 0&&(d=m(a,o));let s=n?m(a,o):d;return s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,a,o),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+e.width+`x`+e.height+`) to (`+a+`x`+o+`).`),s}return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+e.width+`x`+e.height+`).`),e}return e}function g(e){return ea(e.width)&&ea(e.height)}function _(e){return s?!1:e.wrapS!==1001||e.wrapT!==1001||e.minFilter!==1003&&e.minFilter!==1006}function v(e,t){return e.generateMipmaps&&t&&e.minFilter!==1003&&e.minFilter!==1006}function y(t){e.generateMipmap(t)}function b(n,r,i,a,o=!1){if(s===!1)return r;if(n!==null){if(e[n]!==void 0)return e[n];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c=r;if(r===e.RED&&(i===e.FLOAT&&(c=e.R32F),i===e.HALF_FLOAT&&(c=e.R16F),i===e.UNSIGNED_BYTE&&(c=e.R8)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(c=e.R8UI),i===e.UNSIGNED_SHORT&&(c=e.R16UI),i===e.UNSIGNED_INT&&(c=e.R32UI),i===e.BYTE&&(c=e.R8I),i===e.SHORT&&(c=e.R16I),i===e.INT&&(c=e.R32I)),r===e.RG&&(i===e.FLOAT&&(c=e.RG32F),i===e.HALF_FLOAT&&(c=e.RG16F),i===e.UNSIGNED_BYTE&&(c=e.RG8)),r===e.RGBA){let t=o?Ri:J.getTransfer(a);i===e.FLOAT&&(c=e.RGBA32F),i===e.HALF_FLOAT&&(c=e.RGBA16F),i===e.UNSIGNED_BYTE&&(c=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT_4_4_4_4&&(c=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(c=e.RGB5_A1)}return(c===e.R16F||c===e.R32F||c===e.RG16F||c===e.RG32F||c===e.RGBA16F||c===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),c}function x(e,t,n){return v(e,n)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function S(t){return t===1003||t===1004||t===1005?e.NEAREST:e.LINEAR}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=f.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&f.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=f.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=t.texture,i=r.get(t),a=r.get(n);if(a.__webglTexture!==void 0&&(e.deleteTexture(a.__webglTexture),o.memory.textures--),t.depthTexture&&t.depthTexture.dispose(),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(i.__webglFramebuffer[t]))for(let n=0;n<i.__webglFramebuffer[t].length;n++)e.deleteFramebuffer(i.__webglFramebuffer[t][n]);else e.deleteFramebuffer(i.__webglFramebuffer[t]);i.__webglDepthbuffer&&e.deleteRenderbuffer(i.__webglDepthbuffer[t])}else{if(Array.isArray(i.__webglFramebuffer))for(let t=0;t<i.__webglFramebuffer.length;t++)e.deleteFramebuffer(i.__webglFramebuffer[t]);else e.deleteFramebuffer(i.__webglFramebuffer);if(i.__webglDepthbuffer&&e.deleteRenderbuffer(i.__webglDepthbuffer),i.__webglMultisampledFramebuffer&&e.deleteFramebuffer(i.__webglMultisampledFramebuffer),i.__webglColorRenderbuffer)for(let t=0;t<i.__webglColorRenderbuffer.length;t++)i.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(i.__webglColorRenderbuffer[t]);i.__webglDepthRenderbuffer&&e.deleteRenderbuffer(i.__webglDepthRenderbuffer)}if(t.isWebGLMultipleRenderTargets)for(let t=0,i=n.length;t<i;t++){let i=r.get(n[t]);i.__webglTexture&&(e.deleteTexture(i.__webglTexture),o.memory.textures--),r.remove(n[t])}r.remove(n),r.remove(t)}let O=0;function k(){O=0}function A(){let e=O;return e>=i.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function j(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function M(t,i){let a=r.get(t);if(t.isVideoTexture&&R(t),t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{ce(a,t,i);return}}n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ee(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ce(a,t,i):n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ce(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?le(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let re={[si]:e.REPEAT,[ci]:e.CLAMP_TO_EDGE,[li]:e.MIRRORED_REPEAT},ie={[ui]:e.NEAREST,[di]:e.NEAREST_MIPMAP_NEAREST,[fi]:e.NEAREST_MIPMAP_LINEAR,[pi]:e.LINEAR,[mi]:e.LINEAR_MIPMAP_NEAREST,[hi]:e.LINEAR_MIPMAP_LINEAR},ae={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function oe(n,a,o){if(o?(e.texParameteri(n,e.TEXTURE_WRAP_S,re[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,re[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,re[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ie[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ie[a.minFilter])):(e.texParameteri(n,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(n,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),(a.wrapS!==1001||a.wrapT!==1001)&&console.warn(`THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.`),e.texParameteri(n,e.TEXTURE_MAG_FILTER,S(a.magFilter)),e.texParameteri(n,e.TEXTURE_MIN_FILTER,S(a.minFilter)),a.minFilter!==1003&&a.minFilter!==1006&&console.warn(`THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.`)),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ae[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){let o=t.get(`EXT_texture_filter_anisotropic`);if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1||s===!1&&a.type===1016&&t.has(`OES_texture_half_float_linear`)===!1)return;(a.anisotropy>1||r.get(a).__currentAnisotropy)&&(e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy)}}function se(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=f.get(i);a===void 0&&(a={},f.set(i,a));let s=j(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ce(t,o,c){let l=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(l=e.TEXTURE_3D);let u=se(t,o),d=o.source;n.bindTexture(l,t.__webglTexture,e.TEXTURE0+c);let f=r.get(d);if(d.version!==f.__version||u===!0){n.activeTexture(e.TEXTURE0+c);let t=J.getPrimaries(J.workingColorSpace),r=o.colorSpace===``?null:J.getPrimaries(o.colorSpace),p=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,p);let m=_(o)&&g(o.image)===!1,S=h(o.image,m,!1,i.maxTextureSize);S=z(o,S);let C=g(S)||s,w=a.convert(o.format,o.colorSpace),T=a.convert(o.type),E=b(o.internalFormat,w,T,o.colorSpace,o.isVideoTexture);oe(l,o,C);let D,O=o.mipmaps,k=s&&o.isVideoTexture!==!0&&E!==36196,A=f.__version===void 0||u===!0,j=x(o,S,C);if(o.isDepthTexture)E=e.DEPTH_COMPONENT,s?E=o.type===1015?e.DEPTH_COMPONENT32F:o.type===1014?e.DEPTH_COMPONENT24:o.type===1020?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT16:o.type===1015&&console.error(`WebGLRenderer: Floating point depth texture requires WebGL2.`),o.format===1026&&E===e.DEPTH_COMPONENT&&o.type!==1012&&o.type!==1014&&(console.warn(`THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.`),o.type=_i,T=a.convert(o.type)),o.format===1027&&E===e.DEPTH_COMPONENT&&(E=e.DEPTH_STENCIL,o.type!==1020&&(console.warn(`THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.`),o.type=bi,T=a.convert(o.type))),A&&(k?n.texStorage2D(e.TEXTURE_2D,1,E,S.width,S.height):n.texImage2D(e.TEXTURE_2D,0,E,S.width,S.height,0,w,T,null));else if(o.isDataTexture){if(O.length>0&&C){k&&A&&n.texStorage2D(e.TEXTURE_2D,j,E,O[0].width,O[0].height);for(let t=0,r=O.length;t<r;t++)D=O[t],k?n.texSubImage2D(e.TEXTURE_2D,t,0,0,D.width,D.height,w,T,D.data):n.texImage2D(e.TEXTURE_2D,t,E,D.width,D.height,0,w,T,D.data);o.generateMipmaps=!1}else k?(A&&n.texStorage2D(e.TEXTURE_2D,j,E,S.width,S.height),n.texSubImage2D(e.TEXTURE_2D,0,0,0,S.width,S.height,w,T,S.data)):n.texImage2D(e.TEXTURE_2D,0,E,S.width,S.height,0,w,T,S.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){k&&A&&n.texStorage3D(e.TEXTURE_2D_ARRAY,j,E,O[0].width,O[0].height,S.depth);for(let t=0,r=O.length;t<r;t++)D=O[t],o.format===1023?k?n.texSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,D.width,D.height,S.depth,w,T,D.data):n.texImage3D(e.TEXTURE_2D_ARRAY,t,E,D.width,D.height,S.depth,0,w,T,D.data):w===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):k?n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,D.width,D.height,S.depth,w,D.data,0,0):n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,t,E,D.width,D.height,S.depth,0,D.data,0,0)}else{k&&A&&n.texStorage2D(e.TEXTURE_2D,j,E,O[0].width,O[0].height);for(let t=0,r=O.length;t<r;t++)D=O[t],o.format===1023?k?n.texSubImage2D(e.TEXTURE_2D,t,0,0,D.width,D.height,w,T,D.data):n.texImage2D(e.TEXTURE_2D,t,E,D.width,D.height,0,w,T,D.data):w===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):k?n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,D.width,D.height,w,D.data):n.compressedTexImage2D(e.TEXTURE_2D,t,E,D.width,D.height,0,D.data)}}else if(o.isDataArrayTexture)k?(A&&n.texStorage3D(e.TEXTURE_2D_ARRAY,j,E,S.width,S.height,S.depth),n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,S.width,S.height,S.depth,w,T,S.data)):n.texImage3D(e.TEXTURE_2D_ARRAY,0,E,S.width,S.height,S.depth,0,w,T,S.data);else if(o.isData3DTexture)k?(A&&n.texStorage3D(e.TEXTURE_3D,j,E,S.width,S.height,S.depth),n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,S.width,S.height,S.depth,w,T,S.data)):n.texImage3D(e.TEXTURE_3D,0,E,S.width,S.height,S.depth,0,w,T,S.data);else if(o.isFramebufferTexture){if(A){if(k)n.texStorage2D(e.TEXTURE_2D,j,E,S.width,S.height);else{let t=S.width,r=S.height;for(let i=0;i<j;i++)n.texImage2D(e.TEXTURE_2D,i,E,t,r,0,w,T,null),t>>=1,r>>=1}}}else if(O.length>0&&C){k&&A&&n.texStorage2D(e.TEXTURE_2D,j,E,O[0].width,O[0].height);for(let t=0,r=O.length;t<r;t++)D=O[t],k?n.texSubImage2D(e.TEXTURE_2D,t,0,0,w,T,D):n.texImage2D(e.TEXTURE_2D,t,E,w,T,D);o.generateMipmaps=!1}else k?(A&&n.texStorage2D(e.TEXTURE_2D,j,E,S.width,S.height),n.texSubImage2D(e.TEXTURE_2D,0,0,0,w,T,S)):n.texImage2D(e.TEXTURE_2D,0,E,w,T,S);v(o,C)&&y(l),f.__version=d.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function le(t,o,c){if(o.image.length!==6)return;let l=se(t,o),u=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+c);let d=r.get(u);if(u.version!==d.__version||l===!0){n.activeTexture(e.TEXTURE0+c);let t=J.getPrimaries(J.workingColorSpace),r=o.colorSpace===``?null:J.getPrimaries(o.colorSpace),f=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let p=o.isCompressedTexture||o.image[0].isCompressedTexture,m=o.image[0]&&o.image[0].isDataTexture,_=[];for(let e=0;e<6;e++)!p&&!m?_[e]=h(o.image[e],!1,!0,i.maxCubemapSize):_[e]=m?o.image[e].image:o.image[e],_[e]=z(o,_[e]);let S=_[0],C=g(S)||s,w=a.convert(o.format,o.colorSpace),T=a.convert(o.type),E=b(o.internalFormat,w,T,o.colorSpace),D=s&&o.isVideoTexture!==!0,O=d.__version===void 0||l===!0,k=x(o,S,C);oe(e.TEXTURE_CUBE_MAP,o,C);let A;if(p){D&&O&&n.texStorage2D(e.TEXTURE_CUBE_MAP,k,E,S.width,S.height);for(let t=0;t<6;t++){A=_[t].mipmaps;for(let r=0;r<A.length;r++){let i=A[r];o.format===1023?D?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,w,T,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,E,i.width,i.height,0,w,T,i.data):w===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):D?n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,w,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,E,i.width,i.height,0,i.data)}}}else{A=o.mipmaps,D&&O&&(A.length>0&&k++,n.texStorage2D(e.TEXTURE_CUBE_MAP,k,E,_[0].width,_[0].height));for(let t=0;t<6;t++)if(m){D?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_[t].width,_[t].height,w,T,_[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,E,_[t].width,_[t].height,0,w,T,_[t].data);for(let r=0;r<A.length;r++){let i=A[r].image[t].image;D?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,w,T,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,E,i.width,i.height,0,w,T,i.data)}}else{D?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,w,T,_[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,E,w,T,_[t]);for(let r=0;r<A.length;r++){let i=A[r];D?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,w,T,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,E,w,T,i.image[t])}}}v(o,C)&&y(e.TEXTURE_CUBE_MAP),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,i,o,s,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.colorSpace);if(!r.get(i).__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),L(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,r.get(o).__webglTexture,0,I(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,r.get(o).__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function de(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer&&!n.stencilBuffer){let i=s===!0?e.DEPTH_COMPONENT24:e.DEPTH_COMPONENT16;if(r||L(n)){let t=n.depthTexture;t&&t.isDepthTexture&&(t.type===1015?i=e.DEPTH_COMPONENT32F:t.type===1014&&(i=e.DEPTH_COMPONENT24));let r=I(n);L(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,r,i,n.width,n.height):e.renderbufferStorageMultisample(e.RENDERBUFFER,r,i,n.width,n.height)}else e.renderbufferStorage(e.RENDERBUFFER,i,n.width,n.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,t)}else if(n.depthBuffer&&n.stencilBuffer){let i=I(n);r&&L(n)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,i,e.DEPTH24_STENCIL8,n.width,n.height):L(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,i,e.DEPTH24_STENCIL8,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,t)}else{let t=n.isWebGLMultipleRenderTargets===!0?n.texture:[n.texture];for(let i=0;i<t.length;i++){let o=t[i],s=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,s,l,o.colorSpace),d=I(n);r&&L(n)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,d,u,n.width,n.height):L(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,d,u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function fe(t,i){if(i&&i.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);r.get(i.depthTexture).__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),M(i.depthTexture,0);let a=r.get(i.depthTexture).__webglTexture,o=I(i);if(i.depthTexture.format===1026)L(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,a,0,o):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,a,0);else if(i.depthTexture.format===1027)L(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,a,0,o):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,a,0);else throw Error(`Unknown depthTexture format`)}function pe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)throw Error(`target.depthTexture not supported in Cube render targets`);fe(i.__webglFramebuffer,t)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]=e.createRenderbuffer(),de(i.__webglDepthbuffer[r],t,!1)}else n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer=e.createRenderbuffer(),de(i.__webglDepthbuffer,t,!1);n.bindFramebuffer(e.FRAMEBUFFER,null)}function N(t,n,i){let a=r.get(t);n!==void 0&&ue(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&pe(t)}function me(t){let c=t.texture,l=r.get(t),u=r.get(c);t.addEventListener(`dispose`,w),t.isWebGLMultipleRenderTargets!==!0&&(u.__webglTexture===void 0&&(u.__webglTexture=e.createTexture()),u.__version=c.version,o.memory.textures++);let d=t.isWebGLCubeRenderTarget===!0,f=t.isWebGLMultipleRenderTargets===!0,p=g(t)||s;if(d){l.__webglFramebuffer=[];for(let t=0;t<6;t++)if(s&&c.mipmaps&&c.mipmaps.length>0){l.__webglFramebuffer[t]=[];for(let n=0;n<c.mipmaps.length;n++)l.__webglFramebuffer[t][n]=e.createFramebuffer()}else l.__webglFramebuffer[t]=e.createFramebuffer()}else{if(s&&c.mipmaps&&c.mipmaps.length>0){l.__webglFramebuffer=[];for(let t=0;t<c.mipmaps.length;t++)l.__webglFramebuffer[t]=e.createFramebuffer()}else l.__webglFramebuffer=e.createFramebuffer();if(f){if(i.drawBuffers){let n=t.texture;for(let t=0,i=n.length;t<i;t++){let i=r.get(n[t]);i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture(),o.memory.textures++)}}else console.warn(`THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.`)}if(s&&t.samples>0&&L(t)===!1){let r=f?c:[c];l.__webglMultisampledFramebuffer=e.createFramebuffer(),l.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer);for(let n=0;n<r.length;n++){let i=r[n];l.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,l.__webglColorRenderbuffer[n]);let o=a.convert(i.format,i.colorSpace),s=a.convert(i.type),c=b(i.internalFormat,o,s,i.colorSpace,t.isXRRenderTarget===!0),u=I(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,l.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(l.__webglDepthRenderbuffer=e.createRenderbuffer(),de(l.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(d){n.bindTexture(e.TEXTURE_CUBE_MAP,u.__webglTexture),oe(e.TEXTURE_CUBE_MAP,c,p);for(let n=0;n<6;n++)if(s&&c.mipmaps&&c.mipmaps.length>0)for(let r=0;r<c.mipmaps.length;r++)ue(l.__webglFramebuffer[n][r],t,c,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ue(l.__webglFramebuffer[n],t,c,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);v(c,p)&&y(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(f){let i=t.texture;for(let a=0,o=i.length;a<o;a++){let o=i[a],s=r.get(o);n.bindTexture(e.TEXTURE_2D,s.__webglTexture),oe(e.TEXTURE_2D,o,p),ue(l.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+a,e.TEXTURE_2D,0),v(o,p)&&y(e.TEXTURE_2D)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s?r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY:console.error(`THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.`)),n.bindTexture(r,u.__webglTexture),oe(r,c,p),s&&c.mipmaps&&c.mipmaps.length>0)for(let n=0;n<c.mipmaps.length;n++)ue(l.__webglFramebuffer[n],t,c,e.COLOR_ATTACHMENT0,r,n);else ue(l.__webglFramebuffer,t,c,e.COLOR_ATTACHMENT0,r,0);v(c,p)&&y(r),n.unbindTexture()}t.depthBuffer&&pe(t)}function P(t){let i=g(t)||s,a=t.isWebGLMultipleRenderTargets===!0?t.texture:[t.texture];for(let o=0,s=a.length;o<s;o++){let s=a[o];if(v(s,i)){let i=t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,a=r.get(s).__webglTexture;n.bindTexture(i,a),y(i),n.unbindTexture()}}}function F(t){if(s&&t.samples>0&&L(t)===!1){let i=t.isWebGLMultipleRenderTargets?t.texture:[t.texture],a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=[],u=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,d=r.get(t),f=t.isWebGLMultipleRenderTargets===!0;if(f)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,d.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,d.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,d.__webglFramebuffer);for(let n=0;n<i.length;n++){c.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&c.push(u);let p=d.__ignoreDepthValues!==void 0&&d.__ignoreDepthValues;if(p===!1&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),f&&e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,d.__webglColorRenderbuffer[n]),p===!0&&(e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[u]),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[u])),f){let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),l&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,c)}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),f)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,d.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,d.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,d.__webglMultisampledFramebuffer)}}function I(e){return Math.min(i.maxSamples,e.samples)}function L(e){let n=r.get(e);return s&&e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function R(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function z(e,n){let r=e.colorSpace,i=e.format,a=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||e.format===1035||r!==`srgb-linear`&&r!==``&&(J.getTransfer(r)===`srgb`?s===!1?t.has(`EXT_sRGB`)===!0&&i===1023?(e.format=Wi,e.minFilter=pi,e.generateMipmaps=!1):n=_a.sRGBToLinear(n):(i!==1023||a!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,r)),n}this.allocateTextureUnit=A,this.resetTextureUnits=k,this.setTexture2D=M,this.setTexture2DArray=ee,this.setTexture3D=te,this.setTextureCube=ne,this.rebindTextures=N,this.setupRenderTarget=me,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=L}function Ku(e,t,n){let r=n.isWebGL2;function i(n,i=``){let a,o=J.getTransfer(i);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return r?e.HALF_FLOAT:(a=t.get(`OES_texture_half_float`),a===null?null:a.HALF_FLOAT_OES);if(n===1021)return e.ALPHA;if(n===1023)return e.RGBA;if(n===1024)return e.LUMINANCE;if(n===1025)return e.LUMINANCE_ALPHA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1035)return a=t.get(`EXT_sRGB`),a===null?null:a.SRGB_ALPHA_EXT;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(o===`srgb`){if(a=t.get(`WEBGL_compressed_texture_s3tc_srgb`),a!==null){if(n===33776)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(a=t.get(`WEBGL_compressed_texture_s3tc`),a!==null){if(n===33776)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(a=t.get(`WEBGL_compressed_texture_pvrtc`),a!==null){if(n===35840)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196)return a=t.get(`WEBGL_compressed_texture_etc1`),a===null?null:a.COMPRESSED_RGB_ETC1_WEBGL;if(n===37492||n===37496){if(a=t.get(`WEBGL_compressed_texture_etc`),a!==null){if(n===37492)return o===`srgb`?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===37496)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(a=t.get(`WEBGL_compressed_texture_astc`),a!==null){if(n===37808)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(a=t.get(`EXT_texture_compression_bptc`),a!==null){if(n===36492)return o===`srgb`?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(a=t.get(`EXT_texture_compression_rgtc`),a!==null){if(n===36492)return a.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?r?e.UNSIGNED_INT_24_8:(a=t.get(`WEBGL_depth_texture`),a===null?null:a.UNSIGNED_INT_24_8_WEBGL):e[n]===void 0?null:e[n]}return{convert:i}}var qu=class extends Vs{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ju=class extends Ao{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Yu={type:`move`},Xu=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ju,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ju,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ju,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Yu)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ju;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Zu=class extends Ki{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=t.getContextAttributes(),h=null,g=null,_=[],v=[],y=new K,b=null,x=new Vs;x.layers.enable(1),x.viewport=new Ca;let S=new Vs;S.layers.enable(2),S.viewport=new Ca;let C=[x,S],w=new qu;w.layers.enable(1),w.layers.enable(2);let T=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=_[e];return t===void 0&&(t=new Xu,_[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=_[e];return t===void 0&&(t=new Xu,_[e]=t),t.getGripSpace()},this.getHand=function(e){let t=_[e];return t===void 0&&(t=new Xu,_[e]=t),t.getHandSpace()};function D(e){let t=v.indexOf(e.inputSource);if(t===-1)return;let n=_[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function O(){r.removeEventListener(`select`,D),r.removeEventListener(`selectstart`,D),r.removeEventListener(`selectend`,D),r.removeEventListener(`squeeze`,D),r.removeEventListener(`squeezestart`,D),r.removeEventListener(`squeezeend`,D),r.removeEventListener(`end`,O),r.removeEventListener(`inputsourceschange`,k);for(let e=0;e<_.length;e++){let t=v[e];t!==null&&(v[e]=null,_[e].disconnect(t))}T=null,E=null,e.setRenderTarget(h),f=null,d=null,u=null,r=null,g=null,ie.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(y.width,y.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(h=e.getRenderTarget(),r.addEventListener(`select`,D),r.addEventListener(`selectstart`,D),r.addEventListener(`selectend`,D),r.addEventListener(`squeeze`,D),r.addEventListener(`squeezestart`,D),r.addEventListener(`squeezeend`,D),r.addEventListener(`end`,O),r.addEventListener(`inputsourceschange`,k),m.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(y),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let n={antialias:r.renderState.layers!==void 0||m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),g=new Ta(f.framebufferWidth,f.framebufferHeight,{format:xi,type:gi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let n=null,a=null,o=null;m.depth&&(o=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=m.stencil?Ci:Si,a=m.stencil?bi:_i);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),g=new Ta(d.textureWidth,d.textureHeight,{format:xi,type:gi,depthTexture:new Bc(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0});let c=e.properties.get(g);c.__ignoreDepthValues=d.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function k(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=v.indexOf(n);r>=0&&(v[r]=null,_[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=v.indexOf(n);if(r===-1){for(let e=0;e<_.length;e++)if(e>=v.length){v.push(n),r=e;break}else if(v[e]===null){v[e]=n,r=e;break}if(r===-1)break}let i=_[r];i&&i.connect(n)}}let A=new Y,j=new Y;function M(e,t,n){A.setFromMatrixPosition(t.matrixWorld),j.setFromMatrixPosition(n.matrixWorld);let r=A.distanceTo(j),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert();let g=o+m,_=s+m,v=f-h,y=p+(r-h),b=c*s/_*g,x=l*s/_*g;e.projectionMatrix.makePerspective(v,y,b,x,g,_),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}function ee(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;w.near=S.near=x.near=e.near,w.far=S.far=x.far=e.far,(T!==w.near||E!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),T=w.near,E=w.far);let t=e.parent,n=w.cameras;ee(w,t);for(let e=0;e<n.length;e++)ee(n[e],t);n.length===2?M(w,x,S):w.projectionMatrix.copy(x.projectionMatrix),te(e,w,t)};function te(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Yi*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)};let ne=null;function re(t,r){if(l=r.getViewerPose(c||a),p=r,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(g,f.framebuffer),e.setRenderTarget(g));let n=!1;t.length!==w.cameras.length&&(w.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(f!==null)a=f.getViewport(i);else{let t=u.getViewSubImage(d,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(g,t.colorTexture,d.ignoreDepthValues?void 0:t.depthStencilTexture),e.setRenderTarget(g))}let o=C[r];o===void 0&&(o=new Vs,o.layers.enable(r),o.viewport=new Ca,C[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(w.matrix.copy(o.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),n===!0&&w.cameras.push(o)}}for(let e=0;e<_.length;e++){let t=v[e],n=_[e];t!==null&&n!==void 0&&n.update(t,r,c||a)}ne&&ne(t,r),r.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:r}),p=null}let ie=new ec;ie.setAnimationLoop(re),this.setAnimationLoop=function(e){ne=e},this.dispose=function(){}}};function Qu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Fs(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(r,i){r.opacity.value=i.opacity,i.color&&r.diffuse.value.copy(i.color),i.emissive&&r.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity),i.map&&(r.map.value=i.map,n(i.map,r.mapTransform)),i.alphaMap&&(r.alphaMap.value=i.alphaMap,n(i.alphaMap,r.alphaMapTransform)),i.bumpMap&&(r.bumpMap.value=i.bumpMap,n(i.bumpMap,r.bumpMapTransform),r.bumpScale.value=i.bumpScale,i.side===1&&(r.bumpScale.value*=-1)),i.normalMap&&(r.normalMap.value=i.normalMap,n(i.normalMap,r.normalMapTransform),r.normalScale.value.copy(i.normalScale),i.side===1&&r.normalScale.value.negate()),i.displacementMap&&(r.displacementMap.value=i.displacementMap,n(i.displacementMap,r.displacementMapTransform),r.displacementScale.value=i.displacementScale,r.displacementBias.value=i.displacementBias),i.emissiveMap&&(r.emissiveMap.value=i.emissiveMap,n(i.emissiveMap,r.emissiveMapTransform)),i.specularMap&&(r.specularMap.value=i.specularMap,n(i.specularMap,r.specularMapTransform)),i.alphaTest>0&&(r.alphaTest.value=i.alphaTest);let a=t.get(i).envMap;if(a&&(r.envMap.value=a,r.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=i.reflectivity,r.ior.value=i.ior,r.refractionRatio.value=i.refractionRatio),i.lightMap){r.lightMap.value=i.lightMap;let t=e._useLegacyLights===!0?Math.PI:1;r.lightMapIntensity.value=i.lightMapIntensity*t,n(i.lightMap,r.lightMapTransform)}i.aoMap&&(r.aoMap.value=i.aoMap,r.aoMapIntensity.value=i.aoMapIntensity,n(i.aoMap,r.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,r){e.metalness.value=r.metalness,r.metalnessMap&&(e.metalnessMap.value=r.metalnessMap,n(r.metalnessMap,e.metalnessMapTransform)),e.roughness.value=r.roughness,r.roughnessMap&&(e.roughnessMap.value=r.roughnessMap,n(r.roughnessMap,e.roughnessMapTransform)),t.get(r).envMap&&(e.envMapIntensity.value=r.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function $u(e,t,n,r){let i={},a={},o=[],s=n.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16;o!==0&&16-o<a.boundary&&(n+=16-o),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var ed=class{constructor(e={}){let{canvas:t=sa(),context:n=null,depth:r=!0,stencil:i=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;d=n===null?a:n.getContextAttributes().alpha;let f=new Uint32Array(4),p=new Int32Array(4),m=null,h=null,g=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pi,this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let v=this,y=!1,b=0,x=0,S=null,C=-1,w=null,T=new Ca,E=new Ca,D=null,O=new X(0),k=0,A=t.width,j=t.height,M=1,ee=null,te=null,ne=new Ca(0,0,A,j),re=new Ca(0,0,A,j),ie=!1,ae=new $s,oe=!1,se=!1,ce=null,le=new io,ue=new K,de=new Y,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function pe(){return S===null?M:1}let N=n;function me(e,n){for(let r=0;r<e.length;r++){let i=e[r],a=t.getContext(i,n);if(a!==null)return a}return null}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r160`),t.addEventListener(`webglcontextlost`,ke,!1),t.addEventListener(`webglcontextrestored`,Ae,!1),t.addEventListener(`webglcontextcreationerror`,je,!1),N===null){let t=[`webgl2`,`webgl`,`experimental-webgl`];if(v.isWebGL1Renderer===!0&&t.shift(),N=me(t,e),N===null)throw me(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}typeof WebGLRenderingContext<`u`&&N instanceof WebGLRenderingContext&&console.warn(`THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.`),N.getShaderPrecisionFormat===void 0&&(N.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let P,F,I,L,R,z,he,ge,_e,ve,ye,be,xe,Se,Ce,B,V,H,U,W,we,G,Te,Ee;function De(){P=new Mc(N),F=new cc(N,P,e),P.init(F),G=new Ku(N,P,F),I=new Wu(N,P,F),L=new Fc(N),R=new Du,z=new Gu(N,P,I,R,F,G,L),he=new uc(v),ge=new jc(v),_e=new tc(N,F),Te=new oc(N,P,_e,F),ve=new Nc(N,_e,L,Te),ye=new zc(N,ve,_e,L),U=new Rc(N,F,z),B=new lc(R),be=new Eu(v,he,ge,P,F,Te,B),xe=new Qu(v,R),Se=new ju,Ce=new Ru(P,F),H=new ac(v,he,ge,I,ye,d,s),V=new Uu(v,ye,F),Ee=new $u(N,L,F,I),W=new sc(N,P,L,F),we=new Pc(N,P,L,F),L.programs=be.programs,v.capabilities=F,v.extensions=P,v.properties=R,v.renderLists=Se,v.shadowMap=V,v.state=I,v.info=L}De();let Oe=new Zu(v,N);this.xr=Oe,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let e=P.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=P.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return M},this.setPixelRatio=function(e){e!==void 0&&(M=e,this.setSize(A,j,!1))},this.getSize=function(e){return e.set(A,j)},this.setSize=function(e,n,r=!0){Oe.isPresenting?console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`):(A=e,j=n,t.width=Math.floor(e*M),t.height=Math.floor(n*M),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(A*M,j*M).floor()},this.setDrawingBufferSize=function(e,n,r){A=e,j=n,M=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(T)},this.getViewport=function(e){return e.copy(ne)},this.setViewport=function(e,t,n,r){e.isVector4?ne.set(e.x,e.y,e.z,e.w):ne.set(e,t,n,r),I.viewport(T.copy(ne).multiplyScalar(M).floor())},this.getScissor=function(e){return e.copy(re)},this.setScissor=function(e,t,n,r){e.isVector4?re.set(e.x,e.y,e.z,e.w):re.set(e,t,n,r),I.scissor(E.copy(re).multiplyScalar(M).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(e){I.setScissorTest(ie=e)},this.setOpaqueSort=function(e){ee=e},this.setTransparentSort=function(e){te=e},this.getClearColor=function(e){return e.copy(H.getClearColor())},this.setClearColor=function(){H.setClearColor.apply(H,arguments)},this.getClearAlpha=function(){return H.getClearAlpha()},this.setClearAlpha=function(){H.setClearAlpha.apply(H,arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(S!==null){let t=S.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=S.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=H.getClearColor(),r=H.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(f[0]=i,f[1]=a,f[2]=o,f[3]=r,N.clearBufferuiv(N.COLOR,0,f)):(p[0]=i,p[1]=a,p[2]=o,p[3]=r,N.clearBufferiv(N.COLOR,0,p))}else r|=N.COLOR_BUFFER_BIT}t&&(r|=N.DEPTH_BUFFER_BIT),n&&(r|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ke,!1),t.removeEventListener(`webglcontextrestored`,Ae,!1),t.removeEventListener(`webglcontextcreationerror`,je,!1),Se.dispose(),Ce.dispose(),R.dispose(),he.dispose(),ge.dispose(),ye.dispose(),Te.dispose(),Ee.dispose(),be.dispose(),Oe.dispose(),Oe.removeEventListener(`sessionstart`,Re),Oe.removeEventListener(`sessionend`,ze),ce&&=(ce.dispose(),null),Be.stop()};function ke(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),y=!0}function Ae(){console.log(`THREE.WebGLRenderer: Context Restored.`),y=!1;let e=L.autoReset,t=V.enabled,n=V.autoUpdate,r=V.needsUpdate,i=V.type;De(),L.autoReset=e,V.enabled=t,V.autoUpdate=n,V.needsUpdate=r,V.type=i}function je(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Me(e){let t=e.target;t.removeEventListener(`dispose`,Me),Ne(t)}function Ne(e){Pe(e),R.remove(e)}function Pe(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){be.releaseProgram(e)}),e.isShaderMaterial&&be.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=fe);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=Ye(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Te.setup(i,r,s,n,c);let h,g=W;if(c!==null&&(h=_e.get(c),g=we,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*pe()),g.setMode(N.LINES)):g.setMode(N.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*pe()),i.isLineSegments?g.setMode(N.LINES):i.isLineLoop?g.setMode(N.LINE_LOOP):g.setMode(N.LINE_STRIP)}else i.isPoints?g.setMode(N.POINTS):i.isSprite&&g.setMode(N.TRIANGLES);if(i.isBatchedMesh)g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Fe(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Ke(e,t,n),e.side=0,e.needsUpdate=!0,Ke(e,t,n),e.side=2):Ke(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),h=Ce.get(n),h.init(),_.push(h),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(h.pushLight(e),e.castShadow&&h.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(h.pushLight(e),e.castShadow&&h.pushShadow(e))}),h.setupLights(v._useLegacyLights);let r=new Set;return e.traverse(function(e){let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Fe(a,n,e),r.add(a)}else Fe(t,n,e),r.add(t)}}),_.pop(),h=null,r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){R.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}P.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ie=null;function Le(e){Ie&&Ie(e)}function Re(){Be.stop()}function ze(){Be.start()}let Be=new ec;Be.setAnimationLoop(Le),typeof self<`u`&&Be.setContext(self),this.setAnimationLoop=function(e){Ie=e,Oe.setAnimationLoop(e),e===null?Be.stop():Be.start()},Oe.addEventListener(`sessionstart`,Re),Oe.addEventListener(`sessionend`,ze),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(y===!0)return;e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(t),t=Oe.getCamera()),e.isScene===!0&&e.onBeforeRender(v,e,t,S),h=Ce.get(e,_.length),h.init(),_.push(h),le.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ae.setFromProjectionMatrix(le),se=this.localClippingEnabled,oe=B.init(this.clippingPlanes,se),m=Se.get(e,g.length),m.init(),g.push(m),Ve(e,t,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ee,te),this.info.render.frame++,oe===!0&&B.beginShadows();let n=h.state.shadowsArray;if(V.render(n,e,t),oe===!0&&B.endShadows(),this.info.autoReset===!0&&this.info.reset(),H.render(m,e),h.setupLights(v._useLegacyLights),t.isArrayCamera){let n=t.cameras;for(let t=0,r=n.length;t<r;t++){let r=n[t];He(m,e,r,r.viewport)}}else He(m,e,t);S!==null&&(z.updateMultisampleRenderTarget(S),z.updateRenderTargetMipmap(S)),e.isScene===!0&&e.onAfterRender(v,e,t),Te.resetDefaultState(),C=-1,w=null,_.pop(),h=_.length>0?_[_.length-1]:null,g.pop(),m=g.length>0?g[g.length-1]:null};function Ve(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)h.pushLight(e),e.castShadow&&h.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ae.intersectsSprite(e)){r&&de.setFromMatrixPosition(e.matrixWorld).applyMatrix4(le);let t=ye.update(e),i=e.material;i.visible&&m.push(e,t,i,n,de.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||ae.intersectsObject(e))){let t=ye.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),de.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),de.copy(e.boundingSphere.center)),de.applyMatrix4(e.matrixWorld).applyMatrix4(le)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&m.push(e,t,s,n,de.z,o)}}else i.visible&&m.push(e,t,i,n,de.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Ve(i[e],t,n,r)}function He(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;h.setupLightsView(n),oe===!0&&B.setGlobalState(v.clippingPlanes,n),a.length>0&&Ue(i,a,t,n),r&&I.viewport(T.copy(r)),i.length>0&&We(i,t,n),a.length>0&&We(a,t,n),o.length>0&&We(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function Ue(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;let i=F.isWebGL2;ce===null&&(ce=new Ta(1,1,{generateMipmaps:!0,type:P.has(`EXT_color_buffer_half_float`)?yi:gi,minFilter:hi,samples:i?4:0})),v.getDrawingBufferSize(ue),i?ce.setSize(ue.x,ue.y):ce.setSize(ta(ue.x),ta(ue.y));let a=v.getRenderTarget();v.setRenderTarget(ce),v.getClearColor(O),k=v.getClearAlpha(),k<1&&v.setClearColor(16777215,.5),v.clear();let o=v.toneMapping;v.toneMapping=0,We(e,n,r),z.updateMultisampleRenderTarget(ce),z.updateRenderTargetMipmap(ce);let s=!1;for(let e=0,i=t.length;e<i;e++){let i=t[e],a=i.object,o=i.geometry,c=i.material,l=i.group;if(c.side===2&&a.layers.test(r.layers)){let e=c.side;c.side=1,c.needsUpdate=!0,Ge(a,n,r,o,c,l),c.side=e,c.needsUpdate=!0,s=!0}}s===!0&&(z.updateMultisampleRenderTarget(ce),z.updateRenderTargetMipmap(ce)),v.setRenderTarget(a),v.setClearColor(O,k),v.toneMapping=o}function We(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=r===null?a.material:r,l=a.group;o.layers.test(n.layers)&&Ge(o,t,n,s,c,l)}}function Ge(e,t,n,r,i,a){e.onBeforeRender(v,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(v,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,v.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,v.renderBufferDirect(n,t,r,i,e,a),i.side=2):v.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(v,t,n,r,i,a)}function Ke(e,t,n){t.isScene!==!0&&(t=fe);let r=R.get(e),i=h.state.lights,a=h.state.shadowsArray,o=i.state.version,s=be.getParameters(e,i.state,a,t,n),c=be.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?ge:he).get(e.envMap||r.environment),l===void 0&&(e.addEventListener(`dispose`,Me),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return Je(e,s),u}else s.uniforms=be.getUniforms(e),e.onBuild(n,s,v),e.onBeforeCompile(s,v),u=be.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=B.uniform),Je(e,s),r.needsLights=Ze(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function qe(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=ql.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Je(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ye(e,t,n,r,i){t.isScene!==!0&&(t=fe),z.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=S===null?v.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Fi,c=(r.isMeshStandardMaterial?ge:he).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(m=v.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,y=R.get(r),b=h.state.lights;if(oe===!0&&(se===!0||e!==w)){let t=e===w&&r.id===C;B.setState(r,e,t)}let x=!1;r.version===y.__version?y.needsLights&&y.lightsStateVersion!==b.state.version?x=!0:y.outputColorSpace===s?i.isBatchedMesh&&y.batching===!1||!i.isBatchedMesh&&y.batching===!0||i.isInstancedMesh&&y.instancing===!1||!i.isInstancedMesh&&y.instancing===!0||i.isSkinnedMesh&&y.skinning===!1||!i.isSkinnedMesh&&y.skinning===!0||i.isInstancedMesh&&y.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&y.instancingColor===!1&&i.instanceColor!==null?x=!0:y.envMap===c?r.fog===!0&&y.fog!==a||y.numClippingPlanes!==void 0&&(y.numClippingPlanes!==B.numPlanes||y.numIntersection!==B.numIntersection)?x=!0:y.vertexAlphas===l&&y.vertexTangents===u&&y.morphTargets===d&&y.morphNormals===f&&y.morphColors===p&&y.toneMapping===m?F.isWebGL2===!0&&y.morphTargetsCount!==_&&(x=!0):x=!0:x=!0:x=!0:(x=!0,y.__version=r.version);let T=y.currentProgram;x===!0&&(T=Ke(r,t,i));let E=!1,D=!1,O=!1,k=T.getUniforms(),A=y.uniforms;if(I.useProgram(T.program)&&(E=!0,D=!0,O=!0),r.id!==C&&(C=r.id,D=!0),E||w!==e){k.setValue(N,`projectionMatrix`,e.projectionMatrix),k.setValue(N,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(N,de.setFromMatrixPosition(e.matrixWorld)),F.logarithmicDepthBuffer&&k.setValue(N,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(N,`isOrthographic`,e.isOrthographicCamera===!0),w!==e&&(w=e,D=!0,O=!0)}if(i.isSkinnedMesh){k.setOptional(N,i,`bindMatrix`),k.setOptional(N,i,`bindMatrixInverse`);let e=i.skeleton;e&&(F.floatVertexTextures?(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(N,`boneTexture`,e.boneTexture,z)):console.warn(`THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.`))}i.isBatchedMesh&&(k.setOptional(N,i,`batchingTexture`),k.setValue(N,`batchingTexture`,i._matricesTexture,z));let ee=n.morphAttributes;if((ee.position!==void 0||ee.normal!==void 0||ee.color!==void 0&&F.isWebGL2===!0)&&U.update(i,n,T),(D||y.receiveShadow!==i.receiveShadow)&&(y.receiveShadow=i.receiveShadow,k.setValue(N,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(A.envMap.value=c,A.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),D&&(k.setValue(N,`toneMappingExposure`,v.toneMappingExposure),y.needsLights&&Xe(A,O),a&&r.fog===!0&&xe.refreshFogUniforms(A,a),xe.refreshMaterialUniforms(A,r,M,j,ce),ql.upload(N,qe(y),A,z)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(ql.upload(N,qe(y),A,z),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(N,`center`,i.center),k.setValue(N,`modelViewMatrix`,i.modelViewMatrix),k.setValue(N,`normalMatrix`,i.normalMatrix),k.setValue(N,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++)if(F.isWebGL2){let n=e[t];Ee.update(n,T),Ee.bind(n,T)}else console.warn(`THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.`)}return T}function Xe(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Ze(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(e,t,n){R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=n;let r=R.get(e);r.__hasExternalTextures=!0,r.__hasExternalTextures&&(r.__autoAllocateDepthBuffer=n===void 0,r.__autoAllocateDepthBuffer||P.has(`WEBGL_multisampled_render_to_texture`)===!0&&(console.warn(`THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided`),r.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){S=e,b=t,x=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=R.get(e);s.__useDefaultFramebuffer===void 0?s.__webglFramebuffer===void 0?z.setupRenderTarget(e):s.__hasExternalTextures&&z.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture):(I.bindFramebuffer(N.FRAMEBUFFER,null),r=!1);let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=F.isWebGL2&&e.samples>0&&z.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,T.copy(e.viewport),E.copy(e.scissor),D=e.scissorTest}else T.copy(ne).multiplyScalar(M).floor(),E.copy(re).multiplyScalar(M).floor(),D=ie;if(I.bindFramebuffer(N.FRAMEBUFFER,i)&&F.drawBuffers&&r&&I.drawBuffers(e,i),I.viewport(T),I.scissor(E),I.setScissorTest(D),a){let r=R.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=R.get(e.texture),i=t||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,r.__webglTexture,n||0,i)}C=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let s=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){I.bindFramebuffer(N.FRAMEBUFFER,s);try{let o=e.texture,s=o.format,c=o.type;if(s!==1023&&G.convert(s)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}let l=c===1016&&(P.has(`EXT_color_buffer_half_float`)||F.isWebGL2&&P.has(`EXT_color_buffer_float`));if(c!==1009&&G.convert(c)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&!(c===1015&&(F.isWebGL2||P.has(`OES_texture_float`)||P.has(`WEBGL_color_buffer_float`)))&&!l){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&N.readPixels(t,n,r,i,G.convert(s),G.convert(c),a)}finally{let e=S===null?null:R.get(S).__webglFramebuffer;I.bindFramebuffer(N.FRAMEBUFFER,e)}}},this.copyFramebufferToTexture=function(e,t,n=0){let r=2**-n,i=Math.floor(t.image.width*r),a=Math.floor(t.image.height*r);z.setTexture2D(t,0),N.copyTexSubImage2D(N.TEXTURE_2D,n,0,0,e.x,e.y,i,a),I.unbindTexture()},this.copyTextureToTexture=function(e,t,n,r=0){let i=t.image.width,a=t.image.height,o=G.convert(n.format),s=G.convert(n.type);z.setTexture2D(n,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,n.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,n.unpackAlignment),t.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,r,e.x,e.y,i,a,o,s,t.image.data):t.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,r,e.x,e.y,t.mipmaps[0].width,t.mipmaps[0].height,o,t.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,r,e.x,e.y,o,s,t.image),r===0&&n.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),I.unbindTexture()},this.copyTextureToTexture3D=function(e,t,n,r,i=0){if(v.isWebGL1Renderer){console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.`);return}let a=e.max.x-e.min.x+1,o=e.max.y-e.min.y+1,s=e.max.z-e.min.z+1,c=G.convert(r.format),l=G.convert(r.type),u;if(r.isData3DTexture)z.setTexture3D(r,0),u=N.TEXTURE_3D;else if(r.isDataArrayTexture||r.isCompressedArrayTexture)z.setTexture2DArray(r,0),u=N.TEXTURE_2D_ARRAY;else{console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.`);return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,r.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,r.unpackAlignment);let d=N.getParameter(N.UNPACK_ROW_LENGTH),f=N.getParameter(N.UNPACK_IMAGE_HEIGHT),p=N.getParameter(N.UNPACK_SKIP_PIXELS),m=N.getParameter(N.UNPACK_SKIP_ROWS),h=N.getParameter(N.UNPACK_SKIP_IMAGES),g=n.isCompressedTexture?n.mipmaps[i]:n.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,g.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,g.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,e.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,e.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,e.min.z),n.isDataTexture||n.isData3DTexture?N.texSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,l,g.data):n.isCompressedArrayTexture?(console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.`),N.compressedTexSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,g.data)):N.texSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,l,g),N.pixelStorei(N.UNPACK_ROW_LENGTH,d),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,f),N.pixelStorei(N.UNPACK_SKIP_PIXELS,p),N.pixelStorei(N.UNPACK_SKIP_ROWS,m),N.pixelStorei(N.UNPACK_SKIP_IMAGES,h),i===0&&r.generateMipmaps&&N.generateMipmap(u),I.unbindTexture()},this.initTexture=function(e){e.isCubeTexture?z.setTextureCube(e,0):e.isData3DTexture?z.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?z.setTexture2DArray(e,0):z.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){b=0,x=0,S=null,I.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===`display-p3`?`display-p3`:`srgb`,t.unpackColorSpace=J.workingColorSpace===`display-p3-linear`?`display-p3`:`srgb`}get outputEncoding(){return console.warn(`THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.`),this.outputColorSpace===`srgb`?ji:Ai}set outputEncoding(e){console.warn(`THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.`),this.outputColorSpace=e===3001?Pi:Fi}get useLegacyLights(){return console.warn(`THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.`),this._useLegacyLights}set useLegacyLights(e){console.warn(`THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.`),this._useLegacyLights=e}},td=class extends ed{};td.prototype.isWebGL1Renderer=!0;var nd=class extends Ao{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},rd=class extends Yo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new X(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},id=new Y,ad=new Y,od=new io,sd=new ro,cd=new Ya,ld=class extends Ao{constructor(e=new us,t=new rd){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)id.fromBufferAttribute(t,e-1),ad.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=id.distanceTo(ad);e.setAttribute(`lineDistance`,new ns(n,1))}else console.warn(`THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),cd.copy(n.boundingSphere),cd.applyMatrix4(r),cd.radius+=i,e.ray.intersectsSphere(cd)===!1)return;od.copy(r).invert(),sd.copy(e.ray).applyMatrix4(od);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=new Y,l=new Y,u=new Y,d=new Y,f=this.isLineSegments?2:1,p=n.index,m=n.attributes.position;if(p!==null){let n=Math.max(0,a.start),r=Math.min(p.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=f){let n=p.getX(i),r=p.getX(i+1);if(c.fromBufferAttribute(m,n),l.fromBufferAttribute(m,r),sd.distanceSqToSegment(c,l,d,u)>s)continue;d.applyMatrix4(this.matrixWorld);let a=e.ray.origin.distanceTo(d);a<e.near||a>e.far||t.push({distance:a,point:u.clone().applyMatrix4(this.matrixWorld),index:i,face:null,faceIndex:null,object:this})}}else{let n=Math.max(0,a.start),r=Math.min(m.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=f){if(c.fromBufferAttribute(m,i),l.fromBufferAttribute(m,i+1),sd.distanceSqToSegment(c,l,d,u)>s)continue;d.applyMatrix4(this.matrixWorld);let n=e.ray.origin.distanceTo(d);n<e.near||n>e.far||t.push({distance:n,point:u.clone().applyMatrix4(this.matrixWorld),index:i,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}},ud=new Y,dd=new Y,fd=class extends ld{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ud.fromBufferAttribute(t,e),dd.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ud.distanceTo(dd);e.setAttribute(`lineDistance`,new ns(n,1))}else console.warn(`THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},pd=class extends zs{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}};function md(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function hd(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var gd=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},_d=class extends gd{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Di,endingEnd:Di}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Oi:i=e,o=2*t-n;break;case ki:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Oi:a=e,s=2*n-t;break;case ki:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},vd=class extends gd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},yd=class extends gd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bd=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=md(t,this.TimeBufferType),this.values=md(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:md(e.times,Array),values:md(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new yd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new _d(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case wi:t=this.InterpolantFactoryMethodDiscrete;break;case Ti:t=this.InterpolantFactoryMethodLinear;break;case Ei:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wi;case this.InterpolantFactoryMethodLinear:return Ti;case this.InterpolantFactoryMethodSmooth:return Ei}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&hd(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ei,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};bd.prototype.TimeBufferType=Float32Array,bd.prototype.ValueBufferType=Float32Array,bd.prototype.DefaultInterpolation=Ti;var xd=class extends bd{};xd.prototype.ValueTypeName=`bool`,xd.prototype.ValueBufferType=Array,xd.prototype.DefaultInterpolation=wi,xd.prototype.InterpolantFactoryMethodLinear=void 0,xd.prototype.InterpolantFactoryMethodSmooth=void 0;var Sd=class extends bd{};Sd.prototype.ValueTypeName=`color`;var Cd=class extends bd{};Cd.prototype.ValueTypeName=`number`;var wd=class extends gd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Oa.slerpFlat(i,0,a,c-o,a,c,s);return i}},Td=class extends bd{InterpolantFactoryMethodLinear(e){return new wd(this.times,this.values,this.getValueSize(),e)}};Td.prototype.ValueTypeName=`quaternion`,Td.prototype.DefaultInterpolation=Ti,Td.prototype.InterpolantFactoryMethodSmooth=void 0;var Ed=class extends bd{};Ed.prototype.ValueTypeName=`string`,Ed.prototype.ValueBufferType=Array,Ed.prototype.DefaultInterpolation=wi,Ed.prototype.InterpolantFactoryMethodLinear=void 0,Ed.prototype.InterpolantFactoryMethodSmooth=void 0;var Dd=class extends bd{};Dd.prototype.ValueTypeName=`vector`;var Od=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=kd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=kd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function kd(){return(typeof performance>`u`?Date:performance).now()}var Ad=`\\[\\]\\.:\\/`,jd=RegExp(`[\\[\\]\\.:\\/]`,`g`),Md=`[^\\[\\]\\.:\\/]`,Nd=`[^`+Ad.replace(`\\.`,``)+`]`,Pd=`((?:WC+[\\/:])*)`.replace(`WC`,Md),Fd=`(WCOD+)?`.replace(`WCOD`,Nd),Id=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Md),Ld=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Md),Rd=RegExp(`^`+Pd+Fd+Id+Ld+`$`),zd=[`material`,`materials`,`bones`,`map`],Bd=class{constructor(e,t,n){let r=n||Vd.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Vd=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(jd,``)}static parseTrackName(e){let t=Rd.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);zd.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.needsUpdate===void 0?t.matrixWorldNeedsUpdate!==void 0&&(s=this.Versioning.MatrixWorldNeedsUpdate):s=this.Versioning.NeedsUpdate;let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Vd.Composite=Bd,Vd.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Vd.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Vd.prototype.GetterByBindingType=[Vd.prototype._getValue_direct,Vd.prototype._getValue_array,Vd.prototype._getValue_arrayElement,Vd.prototype._getValue_toArray],Vd.prototype.SetterByBindingTypeAndVersioning=[[Vd.prototype._setValue_direct,Vd.prototype._setValue_direct_setNeedsUpdate,Vd.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vd.prototype._setValue_array,Vd.prototype._setValue_array_setNeedsUpdate,Vd.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vd.prototype._setValue_arrayElement,Vd.prototype._setValue_arrayElement_setNeedsUpdate,Vd.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vd.prototype._setValue_fromArray,Vd.prototype._setValue_fromArray_setNeedsUpdate,Vd.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`160`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`160`);var Hd={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Ud=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Wd=new dc(-1,1,1,-1,0,1),Gd=new class extends us{constructor(){super(),this.setAttribute(`position`,new ns([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new ns([0,2,0,0,2,0],2))}},Kd=class{constructor(e){this._mesh=new Os(Gd,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Wd)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},qd=class extends Ud{constructor(e,t){super(),this.textureID=t===void 0?`tDiffuse`:t,e instanceof zs?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Is.clone(e.uniforms),this.material=new zs({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Kd(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}},Jd=class extends Ud{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Yd=class extends Ud{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Xd=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new K);this._width=n.width,this._height=n.height,t=new Ta(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:yi}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new qd(Hd),this.copyPass.material.blending=0,this.clock=new Od}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Jd!==void 0&&(r instanceof Jd?n=!0:r instanceof Yd&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new K);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Zd=class extends Ud{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new X}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Qd={name:`LuminosityHighPassShader`,shaderID:`luminosityHighPass`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new X(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},$d=class e extends Ud{constructor(e,t,n,r){super(),this.strength=t===void 0?1:t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new K(256,256):new K(e.x,e.y),this.clearColor=new X(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ta(i,a,{type:yi}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Ta(i,a,{type:yi});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Ta(i,a,{type:yi});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Qd;this.highPassUniforms=Is.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new zs({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[3,5,7,9,11];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new K(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let l=Hd;this.copyUniforms=Is.clone(l.uniforms),this.blendMaterial=new zs({uniforms:this.copyUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new X,this.oldClearAlpha=1,this.basic=new Xo,this.fsQuad=new Kd(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new K(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this.fsQuad.render(t),s=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(r),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new zs({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new K(.5,.5)},direction:{value:new K(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new zs({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};$d.BlurDirectionX=new K(1,0),$d.BlurDirectionY=new K(0,1);var ef={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},tf=class extends Ud{constructor(){super();let e=ef;this.uniforms=Is.clone(e.uniforms),this.material=new pd({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Kd(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},J.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6&&(this.material.defines.AGX_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}},nf={main:{edge:`#9a9482`,wall:`#1d1b18`,floor:`#0e0d0b`,ceil:`#080706`,grid:`#4a463c`,door:`#c8873a`,rune:`#a46bff`,torch:`#e8a24a`,fog:`#060505`,flicker:.3,fogK:1},crypt:{edge:`#7fae9a`,wall:`#16231f`,floor:`#0a110f`,ceil:`#060a09`,grid:`#31524a`,door:`#c8873a`,rune:`#a46bff`,torch:`#e8a24a`,fog:`#050809`,flicker:.28,fogK:1},caverns:{edge:`#b08f6a`,wall:`#2a1c14`,floor:`#140e0a`,ceil:`#0a0706`,grid:`#5e4330`,door:`#8fb0a0`,rune:`#ff9a4a`,torch:`#ffb15a`,fog:`#070504`,flicker:.42,fogK:.3},deep:{edge:`#8e86a8`,wall:`#1b1727`,floor:`#0c0a15`,ceil:`#07050d`,grid:`#3d3560`,door:`#d1a24a`,rune:`#c28bff`,torch:`#8fd0bd`,fog:`#050410`,flicker:.58,fogK:.45}},rf=e=>nf[e]??nf.main,af=e=>[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255],of=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,sf=new Map;function cf(e){let t=sf.get(e);if(!t){let[n,r,i]=af(e);t=[of(n),of(r),of(i)],sf.set(e,t)}return t}var lf=1.15,$=(e,t,n=1)=>[e[0]+t[0]*n,e[1]+t[1]*n,e[2]+t[2]*n],uf=[0,1,0];function df(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ff(e){let t=[],n=[],r=[],i=[],a=[],o=[],s=[],c=new Set,l=0,u=0,d=(e,i,a,o=0,s=1)=>{t.push(...e,...i),n.push(a[0]*s,a[1]*s,a[2]*s,a[0]*s,a[1]*s,a[2]*s),r.push(o,o)},f=(e,t,n,r,o)=>{i.push(...e,...t,...n,...e,...n,...r);for(let e=0;e<6;e++)a.push(o[0],o[1],o[2])},p=t=>!e.inBounds(t)||e.cell(t).kind===`solid`,m=t=>e.inBounds(t)?e.cell(t).kind:`solid`;function h(e,t,n,r,i,a,o){let s=df(i),c=.26,l=(i,a)=>$($($(e,t,.015),n,i),uf,r+.62+a);for(let e=0;e<14;e++){let t=e/14*Math.PI*2,n=(e+1)/14*Math.PI*2;d(l(Math.cos(t)*c,Math.sin(t)*c),l(Math.cos(n)*c,Math.sin(n)*c),a,o)}d(l(0,-.26*1.35),l(0,c*1.35),a,o);for(let e=0;e<4;e++){let e=s()*Math.PI*2,t=s()*Math.PI*2,n=.35+s()*.65,r=.35+s()*.65;d(l(Math.cos(e)*c*n,Math.sin(e)*c*n),l(Math.cos(t)*c*r,Math.sin(t)*c*r),a,o)}for(let e=0;e<3;e++){let e=(s()-.5)*c*1.8;d(l(-.325,e),l(-.26*.8,e),a,o),d(l(c*.8,e),l(c*1.25,e),a,o)}}function g(e,t,n,r,i,a,o){for(let s=0;s<i;s++){let c=s/i*Math.PI*2,l=(s+1)/i*Math.PI*2;d([e+Math.cos(c)*r,n,t+Math.sin(c)*r],[e+Math.cos(l)*r,n,t+Math.sin(l)*r],a,o)}}function _(e,t,n,r,i,a){g(e,t,n,r,40,i,a),g(e,t,n,r*.72,32,i,a+.2);for(let o=0;o<5;o++){let s=o/5*Math.PI*2-Math.PI/2,c=(o+2)%5/5*Math.PI*2-Math.PI/2;d([e+Math.cos(s)*r*.72,n,t+Math.sin(s)*r*.72],[e+Math.cos(c)*r*.72,n,t+Math.sin(c)*r*.72],i,a+.2)}for(let o=0;o<16;o++){let s=o/16*Math.PI*2;d([e+Math.cos(s)*r*.9,n,t+Math.sin(s)*r*.9],[e+Math.cos(s)*r,n,t+Math.sin(s)*r],i,a)}}for(let t=0;t<e.layers;t++){let n=t*lf;for(let r=0;r<e.h;r++)for(let i=0;i<e.w;i++){let a={x:i,y:r,z:t},g=e.cell(a);if(g.kind===`solid`){for(let a=0;a<4;a++){let[l,u]=dr[a],p={x:i+l,y:r+u,z:t};if(!e.inBounds(p)||e.cell(p).kind===`solid`)continue;let m=rf(e.areaOf(p)),_=cf(m.edge),v=cf(m.wall),y=[l,0,u],b=[-u,0,l],x=[i+.5+l*.5,n,r+.5+u*.5],S=$(x,b,-.5),C=$(x,b,.5),w=$(C,uf,lf),T=$(S,uf,lf);f(S,C,w,T,v),c.add(`${i},${r},${t},${`NESW`[a]}`),d(S,C,_),d(C,w,_),d(w,T,_),d(T,S,_);let E=lf*.5;d($(S,uf,E),$(C,uf,E),_,0,.42),d($(x,uf,0),$(x,uf,E),_,0,.42),d($($(x,b,-.25),uf,E),$($(x,b,-.25),uf,lf),_,0,.42),d($($(x,b,.25),uf,E),$($(x,b,.25),uf,lf),_,0,.42);let D=df(i*7919+r*104729+t*1299709+a);if(D()<.25){let e=(D()-.5)*.6,t=lf;for(let n=0;n<5;n++){let n=e+(D()-.5)*.22,r=t-(.16+D()*.12);d($($(x,b,e),uf,t),$($(x,b,n),uf,Math.max(.02,r)),_,0,.3),e=n,t=r}}if(g.data?.torch){let t=$($($(x,y,.02),uf,.62),[0,0,0]),n=$($(t,y,.14),uf,.08);o.push({n:y,t:b,P:t,B:n,light:$($(n,uf,.1),y,.1),area:e.areaOf(p),flicker:m.flicker,colour:cf(m.torch)})}g.data?.rune&&(h(x,y,b,n,i*131+r*17+t*313+a,cf(m.rune),(i*7+r*3+t)%10/10+.1),s.push({pos:[x[0],x[1],x[2]],kind:`glyph`}))}continue}let v=rf(e.areaOf(a)),y=cf(v.grid),b=cf(v.edge),x=p({x:i,y:r,z:t+1});if(mr(g.kind)){f([i,n,r],[i+1,n,r],[i+1,n,r+1],[i,n,r+1],cf(v.floor)),l++;let e=[[i,n,r],[i+1,n,r],[i+1,n,r+1],[i,n,r+1]];for(let t=0;t<4;t++)d(e[t],e[(t+1)%4],y,0,.45);let a=[[0,e[0],e[1]],[1,e[1],e[2]],[2,e[2],e[3]],[3,e[3],e[0]]];for(let[e,n,o]of a)m({x:i+dr[e][0],y:r+dr[e][1],z:t})===`void`&&d(n,o,b,0,1)}if(x){let e=n+lf;f([i,e,r],[i+1,e,r],[i+1,e,r+1],[i,e,r+1],cf(v.ceil)),u++;let t=[[i,e,r],[i+1,e,r],[i+1,e,r+1],[i,e,r+1]];for(let e=0;e<4;e++)d(t[e],t[(e+1)%4],y,0,.3)}if(g.kind===`door`){let e=p({x:i,y:r-1,z:t})&&p({x:i,y:r+1,z:t}),a=(t,a)=>e?[i+.5,n+a,r+t]:[i+t,n+a,r+.5],o=cf(v.door);for(let[e,t,n]of[[.1,.4,.72],[.17,.33,.72]]){let r=1-e;d(a(e,0),a(e,n),o),d(a(r,0),a(r,n),o);for(let r=0;r<12;r++){let i=Math.PI-r/12*Math.PI,s=Math.PI-(r+1)/12*Math.PI;d(a(.5+Math.cos(i)*(.5-e),n+Math.sin(i)*t),a(.5+Math.cos(s)*(.5-e),n+Math.sin(s)*t),o)}}h([i+.5,n,r+.5],e?[1,0,0]:[0,0,1],e?[0,0,1]:[1,0,0],n,4242+i*31+r,o,.5),s.push({pos:[i+.5,n,r+.5],kind:`door`})}g.data?.sigil&&(_(i+.5,r+.5,n+.012,Number(g.data.sigil)||1.2,cf(v.rune),(i*3+r*5)%10/10+.1),s.push({pos:[i+.5,n,r+.5],kind:`sigil`}))}}let v=(e,t,n)=>({positions:new Float32Array(e),colors:new Float32Array(t),pulses:new Float32Array(n)});return{faces:v(i,a,Array(i.length/3).fill(0)),lines:v(t,n,r),torches:o,runes:s,wallFaces:c,floorQuads:l,ceilQuads:u}}var pf=class extends Error{constructor(){super(`This browser could not start WebGL, which the dungeon view needs.`),this.name=`NoWebGLError`}},mf=`attribute vec3 aCol; attribute float aPulse;
varying vec3 vCol; varying vec3 vW; varying float vD; varying float vP;
void main(){ vCol=aCol; vP=aPulse; vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; vec4 mv=viewMatrix*w; vD=-mv.z; gl_Position=projectionMatrix*mv; }`,hf=`uniform float uTime,uAmbient,uLamp,uFog,uBright; uniform vec3 uCam,uFogCol; uniform vec3 uTorchPos[8]; uniform vec3 uTorchCol[8];
varying vec3 vCol; varying vec3 vW; varying float vD; varying float vP;
void main(){
  vec3 light=vec3(uAmbient);
  float dl=distance(vW,uCam);
  light+=vec3(1.0,0.93,0.8)*uLamp*1.5/(1.0+dl*dl*0.28);
  for(int i=0;i<8;i++){ float d=distance(vW,uTorchPos[i]); light+=uTorchCol[i]*2.2/(1.0+d*d*0.8); }
  vec3 c=vCol*light*uBright;
  if(vP>0.0) c*=0.7+0.55*sin(uTime*2.2+vP*6.2831);
  float f=clamp(1.0-exp(-uFog*vD),0.0,1.0);
  gl_FragColor=vec4(mix(c,uFogCol,f),1.0);
}`,gf=(e,t)=>.5*Math.sin(e*7+t)+.3*Math.sin(e*13.3+t*2.1)+.2*Math.sin(e*23.7+t*3.3),_f=class{canvas;level;renderer;scene=new nd;camera=new Vs(72,1,.05,80);composer;bloom;uniforms;torches=[];geometry;fog=new X(`#060505`);fogK=1;lastT=0;settings;constructor(e,t,n){this.canvas=e,this.level=t;try{this.renderer=new ed({canvas:e,antialias:!0})}catch{throw new pf}this.settings=n,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera.rotation.order=`YXZ`,this.geometry=ff(t),this.uniforms={uTime:{value:0},uAmbient:{value:.75},uLamp:{value:n.lamp},uFog:{value:n.fog},uBright:{value:1},uCam:{value:new Y},uFogCol:{value:this.fog.clone()},uTorchPos:{value:Array.from({length:8},()=>new Y(999,999,999))},uTorchCol:{value:Array.from({length:8},()=>new Y)}},this.scene.add(new Os(this.buffer(this.geometry.faces),this.material(!0)));let r=new fd(this.buffer(this.geometry.lines),this.material(!1));r.frustumCulled=!1,this.scene.add(r),this.geometry.torches.forEach((e,t)=>this.addTorch(e,t)),this.composer=new Xd(this.renderer),this.composer.addPass(new Zd(this.scene,this.camera)),this.bloom=new $d(new K(256,256),Wr(n),.55,.18),this.composer.addPass(this.bloom),this.composer.addPass(new tf),this.setSettings(n),this.resize(e.clientWidth||800,e.clientHeight||600)}material(e){return new zs({uniforms:this.uniforms,vertexShader:mf,fragmentShader:hf,side:2,polygonOffset:e,polygonOffsetFactor:+!!e,polygonOffsetUnits:+!!e})}buffer(e){let t=new us;return t.setAttribute(`position`,new $o(e.positions,3)),t.setAttribute(`aCol`,new $o(e.colors,3)),t.setAttribute(`aPulse`,new $o(e.pulses,1)),t.computeBoundingSphere(),t.boundingSphere&&(t.boundingSphere.radius=1e4),t}addTorch(e,t){let n=new Float32Array(72),r=new Float32Array(72),i=e.colour,a=(e,t,n)=>{r[e*3]=(i[0]*(1-n)+n)*t,r[e*3+1]=(i[1]*(1-n)+n)*t,r[e*3+2]=(i[2]*(1-n)+n)*t};for(let e=0;e<6;e++)a(e,.7,0);for(let e=0;e<3;e++)for(let t=0;t<6;t++)a(6+e*6+t,1.8,e===1?.55:0);let o=[e.P[0]+e.n[0]*.14,e.P[1],e.P[2]+e.n[2]*.14],s=[o[0]+e.t[0]*.05,o[1]+.08,o[2]+e.t[2]*.05],c=[o[0]-e.t[0]*.05,o[1]+.08,o[2]-e.t[2]*.05];[e.P,o,o,s,o,c].forEach((e,t)=>n.set(e,t*3));let l=new us;l.setAttribute(`position`,new $o(n,3).setUsage(Ui)),l.setAttribute(`color`,new $o(r,3));let u=new fd(l,new rd({vertexColors:!0,fog:!1}));u.frustumCulled=!1,this.scene.add(u),this.torches.push({spec:e,phase:t*7.3+1.7,pos:n,geom:l,intensity:1})}animateTorches(e){let t=this.settings.flicker;for(let n of this.torches){let r=n.spec.flicker*t,i=Math.sin(e*2.1+n.phase)>.93?-.6*Math.min(1,t):0;n.intensity=Math.max(.12,1+r*gf(e,n.phase)+i*n.spec.flicker*2);let{B:a,t:o,n:s}=n.spec,c=6;for(let t=0;t<3;t++){let i=(t-1)*.028,l=(.13+(t===1?.05:0))*(1+.5*r*gf(e*1.3,n.phase+t)),u=null;for(let d=0;d<4;d++){let f=d/3,p=Math.sin(e*9+n.phase+t*2+d)*.02*(.4+r*1.5)*f,m=i*(1-f)+p,h=[a[0]+o[0]*m+s[0]*p*.3,a[1]+f*l,a[2]+o[2]*m+s[2]*p*.3];u&&(n.pos.set(u,c*3),n.pos.set(h,(c+1)*3),c+=2),u=h}}n.geom.attributes.position.needsUpdate=!0}}setSettings(e){this.settings=e,this.uniforms.uLamp.value=e.lamp,this.uniforms.uFog.value=e.fog;let t=Wr(e);this.bloom.strength=t,this.bloom.enabled=t>0}resize(e,t){this.renderer.setSize(e,t,!1),this.composer.setSize(e,t),this.camera.aspect=e/Math.max(1,t),this.camera.updateProjectionMatrix()}render(e,t){let n=e/1e3,r=Math.min(.1,Math.max(0,n-this.lastT));this.lastT=n,this.camera.position.set(t.x,t.y,t.z),this.camera.rotation.set(t.pitch+Math.sin(n*.9)*.004,t.yaw,0),this.uniforms.uTime.value=n,this.uniforms.uCam.value.copy(this.camera.position);let i=rf(this.level.areaOf({x:Math.floor(t.x),y:Math.floor(t.z),z:Math.floor(t.y/lf)})),[a,o,s]=cf(i.fog),c=1-Math.exp(-r*2.5);this.fog.r+=(a-this.fog.r)*c,this.fog.g+=(o-this.fog.g)*c,this.fog.b+=(s-this.fog.b)*c,this.fogK+=(i.fogK-this.fogK)*c,this.uniforms.uFog.value=this.settings.fog*this.fogK,this.uniforms.uFogCol.value.copy(this.fog),this.scene.background??(this.scene.background=new X),this.scene.background.copy(this.fog),this.animateTorches(n);let l=[...this.torches].sort((e,n)=>this.dist(e,t)-this.dist(n,t)).slice(0,8);for(let e=0;e<8;e++){let t=l[e];if(!t){this.uniforms.uTorchPos.value[e].set(999,999,999),this.uniforms.uTorchCol.value[e].set(0,0,0);continue}let n=t.spec.colour;this.uniforms.uTorchPos.value[e].set(...t.spec.light),this.uniforms.uTorchCol.value[e].set(n[0]*t.intensity,n[1]*t.intensity,n[2]*t.intensity)}this.composer.render()}dist(e,t){let n=e.spec.light;return(n[0]-t.x)**2+(n[1]-t.y)**2+(n[2]-t.z)**2}dispose(){this.scene.traverse(e=>{let t=e;t.geometry?.dispose();let n=t.material;Array.isArray(n)?n.forEach(e=>e.dispose()):n?.dispose()}),this.composer.dispose(),this.renderer.dispose()}},vf=.55,yf=e=>Math.min(1,Math.max(0,e)),bf=e=>e<.5?2*e*e:1-(-2*e+2)**2/2,xf=class{level;facing;pending=null;onArrive=()=>{};logical;clock=0;anim=null;cam;pitchTarget=0;constructor(e,t,n){this.level=e,this.logical={...t},this.facing=n,this.cam=this.restingCamera(t,-n*(Math.PI/2))}get pos(){return{...this.logical}}get busy(){return this.anim!==null}restingCamera(e,t){return{x:e.x+.5,y:e.z*lf+vf,z:e.y+.5,yaw:t,pitch:0}}command(e){this.anim?this.pending=e:this.start(e)}look(e){this.pitchTarget=Math.max(-.6,Math.min(.6,this.pitchTarget+e))}start(e){let t=this.clock;if(e===`turnLeft`||e===`turnRight`){let n=e===`turnLeft`;this.facing=(this.facing+(n?3:1))%4,this.anim={type:`turn`,t0:t,dur:200,from:this.cam.yaw,to:this.cam.yaw+Math.PI/2*(n?1:-1)};return}let n=hr(this.level,this.logical,this.facing,e);if(!n){let n=e===`fwd`?this.facing:e===`back`?(this.facing+2)%4:e===`left`?(this.facing+3)%4:e===`right`?(this.facing+1)%4:-1,[r,i]=n>=0?dr[n]:[0,0];this.anim={type:`bump`,t0:t,dur:170,base:{...this.cam},dx:r,dz:i};return}let r={...this.cam},i=this.restingCamera(n.pos,this.cam.yaw),a=n.fell>0?`fall`:n.pos.z===this.logical.z?`move`:`climb`,o=a===`fall`?300+150*n.fell:a===`climb`?450:230;this.logical=n.pos,this.anim={type:a,t0:t,dur:o,from:r,to:{...i,pitch:r.pitch},fell:n.fell}}update(e){this.clock=Math.max(this.clock,e);let t=this.anim;if(t){let e=yf((this.clock-t.t0)/t.dur);if(t.type===`turn`)this.cam={...this.cam,yaw:t.from+(t.to-t.from)*bf(e)};else if(t.type===`bump`){let n=Math.sin(e*Math.PI)*.09;this.cam={...t.base,x:t.base.x+t.dx*n,z:t.base.z+t.dz*n}}else{let n=t.type===`fall`?yf(e/.4):bf(e),r=t.type===`fall`?e*e:bf(e),i=t.type===`move`?Math.sin(e*Math.PI*2)*.02:0;this.cam={...this.cam,x:t.from.x+(t.to.x-t.from.x)*n,z:t.from.z+(t.to.z-t.from.z)*n,y:t.from.y+(t.to.y-t.from.y)*r+i}}if(e>=1){this.anim=null,t.type===`turn`?this.cam={...this.cam,yaw:t.to}:t.type===`bump`?this.cam={...t.base}:(this.cam={...t.to,pitch:this.cam.pitch},this.onArrive(this.pos,t.fell));let e=this.pending;this.pending=null,e&&this.start(e)}}return this.cam={...this.cam,pitch:this.cam.pitch+(this.pitchTarget-this.cam.pitch)*.2},this.cam}},Sf={solid:`#6b5f46`,floor:`#2b2519`,void:`#0d141a`,stairsUp:`#7f9468`,stairsDown:`#6a7f58`,door:`#b8923e`,pit:`#a8402e`,teleporter:`#8a5aa8`,spinner:`#a8742e`,dark:`#15130f`,antimagic:`#3a3a52`,encounter:`#2b2519`,event:`#2b2519`},Cf=class{canvas;constructor(e){this.canvas=e}draw(e,t,n,r,i,a){let o=this.canvas.getContext(`2d`),{width:s,height:c}=this.canvas;if(o.fillStyle=`#0a0806`,o.fillRect(0,0,s,c),a===`off`)return;let l=Math.min(s/t.w,c/t.h);for(let n of wr(e,t,i)){if(!n.known)continue;let e=n.x*l,t=n.y*l;o.fillStyle=Sf[n.kind],o.fillRect(e,t,l,l),n.kind!==`solid`&&(o.strokeStyle=`#3a3020`,o.lineWidth=1,o.strokeRect(e+.5,t+.5,l-1,l-1)),(n.kind===`stairsUp`||n.kind===`stairsDown`)&&(o.fillStyle=`#10140c`,o.font=`${Math.max(8,l*.8)}px serif`,o.textAlign=`center`,o.textBaseline=`middle`,o.fillText(n.kind===`stairsUp`?`▲`:`▼`,e+l/2,t+l/2)),n.overheadVoid&&(o.fillStyle=`#9ab0c0`,o.fillRect(e+l/2-1,t+l/2-1,2,2))}if(n.z===i){let e=(n.x+.5)*l,t=(n.y+.5)*l,i=Math.max(3,l*.38);o.save(),o.translate(e,t),o.rotate(Math.PI/2*r),o.fillStyle=`#f0e0a0`,o.beginPath(),o.moveTo(0,-i),o.lineTo(i*.8,i*.8),o.lineTo(-i*.8,i*.8),o.closePath(),o.fill(),o.restore()}o.fillStyle=`#c8b88a`,o.font=`11px Georgia, serif`,o.textAlign=`left`,o.textBaseline=`alphabetic`,o.fillText(`storey ${i+1} of ${t.layers}`,4,c-5)}};function wf(e){let t=e.AudioContext??e.webkitAudioContext,n=null,r=null,i=null,a=!1,o=!1,s=[],c=!1,l=(e,t,i,a,o,s=0)=>{let c=n.currentTime+s,l=n.createOscillator(),u=n.createGain();l.type=e,l.frequency.setValueAtTime(t,c),l.frequency.exponentialRampToValueAtTime(Math.max(1,i),c+a),u.gain.setValueAtTime(o,c),u.gain.exponentialRampToValueAtTime(1e-4,c+a),l.connect(u),u.connect(r),l.start(c),l.stop(c+a+.02)},u=(e,t,a,o=0)=>{let s=n.currentTime+o;if(!i){i=n.createBuffer(1,Math.floor(n.sampleRate*.6),n.sampleRate);let e=i.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1}let c=n.createBufferSource(),l=n.createBiquadFilter(),u=n.createGain();c.buffer=i,l.type=`lowpass`,l.frequency.setValueAtTime(a,s),u.gain.setValueAtTime(t,s),u.gain.exponentialRampToValueAtTime(1e-4,s+e),c.connect(l),l.connect(u),u.connect(r),c.start(s),c.stop(s+e+.02)},d=()=>{if(!(s.length>0))for(let[e,t]of[[55,.05],[82.6,.03]]){let i=n.createOscillator(),a=n.createGain();i.type=`sine`,i.frequency.setValueAtTime(e,n.currentTime),a.gain.setValueAtTime(t,n.currentTime),i.connect(a),a.connect(r),i.start(n.currentTime),s.push(i)}},f=()=>{for(let e of s)try{e.stop()}catch{}s=[]};return{get unlocked(){return c},unlock(){if(!c&&t)try{n=new t,r=n.createGain(),r.gain.setValueAtTime(.5,n.currentTime),r.connect(n.destination),n.resume?.(),c=!0}catch{n=null,c=!1}},play(e){if(n&&!a)try{switch(e){case`step`:l(`sine`,95,48,.09,.22);break;case`door`:u(.35,.3,700),l(`sawtooth`,70,40,.3,.08);break;case`torch`:u(.05,.12,5e3),u(.04,.1,6e3,.07);break;case`hit`:u(.18,.45,2200),l(`sine`,130,40,.2,.35);break;case`cast`:l(`sine`,300,1100,.35,.18),l(`triangle`,450,1500,.3,.1,.05);break;case`death`:l(`sawtooth`,220,35,.9,.2),u(.6,.2,500);break;case`drone`:o=!0,d()}}catch{}},setMuted(e){a=e,n&&(e?f():o&&d())},onVisibilityChange(e){if(n)try{e?n.suspend?.():n.resume?.()}catch{}}}}function Tf(e){let t=new Blob([Jr(e)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=ni(e),document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),5e3)}async function Ef(e){try{return Qr(await e.text())}catch{return{data:null,message:`That file could not be read.`}}}function Df(e=`.json,application/json`){return new Promise(t=>{let n=document.createElement(`input`);n.type=`file`,n.accept=e,n.style.display=`none`,n.addEventListener(`change`,()=>{t(n.files?.[0]??null),n.remove()}),n.addEventListener(`cancel`,()=>{t(null),n.remove()}),document.body.append(n),n.click()})}var Of=`undervault.notice`,kf=`undervault.settings`,Af=class{root;game=null;flow;audio;townPlace=`menu`;townMsg=``;selectedId=null;recruited=new Set;hall=null;controller=null;mapView=null;mapZ=0;viewEl=null;raf=0;steps=0;combat=null;defaultSettings=Ur;toastEl=null;toastTimer=0;hudEl=null;viewFrame=null;dungeonFrames=[];rosterEl=null;barEl=null;router=new me;host;msg=null;screenCommands=()=>[];screenDispose=null;listeners=[];constructor(t){this.root=t;let n=!1;try{n=localStorage.getItem(Of)===`1`}catch{}try{let e=localStorage.getItem(kf);e&&(this.defaultSettings={...Ur,...JSON.parse(e)})}catch{}this.flow=p(n),this.audio=wf(window);let r=document.createElement(`style`);r.textContent=e,document.head.append(r),Ce(Se());let a=i(`div`,{id:`ui-layer`});document.body.append(a),this.host={router:this.router,layer:a},this.router.push({name:`screen`,commands:()=>this.screenCommands()}),this.root.addEventListener(`click`,e=>{this.host.layer.childElementCount>0&&(e.stopPropagation(),e.preventDefault())},!0),this.listeners=[[window,`keydown`,e=>this.onKey(e)],[window,`pointerdown`,()=>this.firstGesture(),{once:!0}],[document,`visibilitychange`,()=>this.audio.onVisibilityChange(document.hidden)],[window,`resize`,()=>this.hall?.resize(this.glCanvas()?.clientWidth??800,this.glCanvas()?.clientHeight??600)]];for(let[e,t,n,r]of this.listeners)e.addEventListener(t,n,r)}start(){this.render()}dispose(){for(let[e,t,n]of this.listeners)e.removeEventListener(t,n);this.listeners=[],this.teardownDungeon(),this.combat?.destroy(),this.host.layer.remove()}currentCommands(){return this.screenCommands()}setCommands(e){this.screenCommands=e}onScreenDispose(e){this.screenDispose=e??null}say(e){this.msg?this.msg.say(e):this.toast(e)}openSystem(){return Ln(this)}openOptions(){return Bn(this)}settings(){return this.game?.state.settings??this.defaultSettings}setSettings(e){this.game&&(this.game.state.settings=e),this.defaultSettings=e;try{localStorage.setItem(kf,JSON.stringify(e))}catch{}this.hall?.setSettings(e),this.audio.setMuted(!1),this.drawMap()}firstGesture(){this.audio.unlock(),this.flow=m(this.flow,{type:`begin`});try{localStorage.setItem(Of,`1`)}catch{}this.root.querySelector(`.notice`)?.remove()}dispatch(e){this.flow=m(this.flow,e),this.render()}refresh(){this.render()}toast(e,t=5200){this.msg?this.msg.say(e):(this.toastEl?.remove(),this.toastEl=i(`div`,{class:`toast`},e),document.body.append(this.toastEl),clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastEl?.remove(),t))}autosave(){if(!this.game)return;let e=$r(this.game.toSave());!e.ok&&e.message&&this.toast(e.message)}saveToFile(){this.game&&(Tf(this.game.toSave()),this.toast(`Saved to a file. It will load on any device, in any browser.`))}async loadFromFile(){let e=await Df();if(!e)return;let t=await Ef(e);t.data?this.tryLoad(t.data)&&this.toast(`Loaded. Welcome back.`):this.toast(t.message??`That file could not be loaded.`)}tryLoad(e){try{return this.adopt(oi.fromSave(e,It(Date.now()&16777215))),!0}catch(e){return this.toast(`That save could not be used (${e instanceof Error?e.message:`unknown problem`}).`),!1}}adopt(e){this.teardownDungeon(),this.combat?.destroy(),this.combat=null,this.root.querySelector(`.overlay`)?.remove(),this.game=e,this.townPlace=`menu`,this.townMsg=``,this.recruited=new Set,e.isOver()?(this.flow={...this.flow,screen:`gameover`,hasGame:!0},this.render()):(this.dispatch({type:`continue`,inTown:e.state.inTown}),e.state.inTown||this.autosave())}newGame(){let e=oi.newGame(or(),It(Date.now()&16777215),this.defaultSettings);e.returnToTown(),this.game=e,this.townPlace=`menu`,this.townMsg=``,this.recruited=new Set,this.dispatch({type:`newGame`})}continueGame(){let e=ti();e.data?this.tryLoad(e.data):this.toast(e.message??`There is no saved game in this browser.`)}enterDungeon(){let e=this.game;try{e.enterDungeon()}catch(e){this.townMsg=e instanceof Error?e.message:`The party cannot go down.`,this.render();return}this.audio.play(`door`),this.audio.play(`drone`),this.dispatch({type:`enterDungeon`}),this.autosave()}combatDone(e){this.combat?.destroy(),this.combat=null,e===`wiped`?ei():this.autosave(),this.dispatch({type:`combatEnd`,outcome:e})}teardownDungeon(){cancelAnimationFrame(this.raf),this.hall?.dispose(),this.hall=null,this.controller=null,this.viewEl=null}render(){let e=this.flow;this.screenDispose?.(),this.screenDispose=null,this.host.layer.replaceChildren(),this.router.trimTo(`screen`),e.screen!==`dungeon`&&this.teardownDungeon(),this.msg=null;let t=[{key:`Escape`,label:`System`,run:()=>void this.openSystem()}];if(this.screenCommands=()=>e.screen===`town`||e.screen===`dungeon`?t:[],e.screen!==`combat`&&this.combat&&(this.combat.destroy(),this.combat=null),e.screen===`dungeon`){if(this.hall&&this.viewEl){this.root.replaceChildren(this.dungeonShell(!0)),this.updateDungeon();return}this.root.replaceChildren(this.dungeonShell(!1)),requestAnimationFrame(()=>this.startView());return}let n=e.screen===`title`?this.titleScreen():e.screen===`town`?An(this):e.screen===`combat`?this.combatScreen():e.screen===`gameover`?this.gameOverScreen():this.endingScreen();this.root.replaceChildren(n)}titleScreen(){let e=[{key:`n`,label:`New game`,run:()=>this.newGame()},{key:`c`,label:`Continue`,enabled:(()=>{try{return!!qr().getItem(Gr)}catch{return!1}})(),run:()=>this.continueGame()},{key:`l`,label:`Load from file`,run:()=>void this.loadFromFile()},{key:`s`,label:`Settings`,run:()=>void this.openOptions()}];return this.screenCommands=()=>e,i(`div`,{class:`screen title`},i(`h1`,null,t),i(`h2`,null,n),i(`p`,{class:`blurb`},`Beneath the town of Crowhithe there is a hole that was dug on purpose, nine hundred years ago, by people who kept ledgers. Six go down. Most do not come up.`),i(`div`,{class:`menu`},ge(e)),this.flow.noticeSeen?null:i(`p`,{class:`notice`},`Content notice: this is a grim game with violence, crude language and dark humour (R-rated storytelling, nothing explicit). Press any key or click to begin; sound starts on your first key press or click.`))}gameOverScreen(){return Fn(this)}endingScreen(){return In(this)}backToTown(){this.game?.returnToTown(),this.flow={...this.flow,screen:`town`},this.render()}combatScreen(){let e=this.combat;return e?(this.setCommands(()=>e.commands()),this.msg=e.messages,e.el):i(`div`,{class:`screen`})}startCombat(e,t){this.hall?.dispose(),this.hall=null,cancelAnimationFrame(this.raf),this.viewEl=null,this.combat=new ur(this,this.game,e,t),this.dispatch({type:`encounter`})}glCanvas(){return this.viewEl?.querySelector(`canvas.gl`)??null}dungeonShell(e){let t=this.game;e&&this.viewEl||(this.viewEl=i(`div`,{class:`view`}),this.hudEl=i(`div`,{class:`hud`}),this.viewEl.append(i(`canvas`,{class:`gl`}),this.hudEl),this.mapZ=t.state.pos.z),this.msg=ve(6);let n=i(`canvas`,{class:`map`,width:320,height:320});this.mapView=new Cf(n);let r=z(`dungeon`),a=(e,t,n)=>i(`button`,{class:`quiet`,type:`button`,title:n,onclick:()=>this.controller?.command(e)},t);this.viewFrame=he(t.level().name,r,this.viewEl),this.viewFrame.classList.add(`viewframe`);let o=he(`Map`,r,n,i(`div`,{class:`row`,style:`margin-top:.4rem`},i(`button`,{class:`quiet`,type:`button`,onclick:()=>this.setMapZ(this.mapZ+1)},`] Storey ▲`),i(`button`,{class:`quiet`,type:`button`,onclick:()=>this.setMapZ(this.mapZ-1)},`[ Storey ▼`))),s=he(`Move`,r,i(`div`,{class:`pad`},a(`turnLeft`,`⟲`,`Turn left`),a(`fwd`,`▲`,`Forward`),a(`turnRight`,`⟳`,`Turn right`),a(`left`,`◄`,`Sidestep left`),a(`back`,`▼`,`Back`),a(`right`,`►`,`Sidestep right`),a(`up`,`Up`,`Climb stairs`),a(`down`,`Down`,`Descend stairs`)));this.dungeonFrames=[this.viewFrame,o,s];let c=he(`Words`,r,this.msg.el);this.dungeonFrames.push(c),this.rosterEl=i(`div`,{class:`rosterslot`}),this.barEl=i(`div`,{class:`barslot`}),this.setCommands(()=>this.dungeonCommands()),this.msg.say(e?`The party presses on.`:`The air changes. Somewhere below, a ledger closes.`);let l=i(`div`,{class:`screen dungeon2`},i(`div`,{class:`vf`},this.viewFrame),i(`aside`,null,o,s),i(`div`,{class:`wf`},c),i(`div`,{class:`rf`},he(`The Party`,z(`party`),this.rosterEl)),i(`div`,{class:`dbar`},this.barEl));return this.updateDungeon(),l}dungeonCommands(){let e=(e,t)=>e.map(e=>({key:e,label:t,hidden:!0,repeat:!0,run:()=>this.controller?.command(t)}));return[...e([`w`,`ArrowUp`],`fwd`),...e([`s`,`ArrowDown`],`back`),...e([`a`,`ArrowLeft`],`turnLeft`),...e([`d`,`ArrowRight`],`turnRight`),...e([`q`],`left`),...e([`e`],`right`),...e([`r`],`up`),...e([`f`],`down`),{key:`z`,label:`Look up`,hidden:!0,repeat:!0,run:()=>this.controller?.look(.15)},{key:`x`,label:`Look down`,hidden:!0,repeat:!0,run:()=>this.controller?.look(-.15)},{key:`[`,label:`Storey down`,hidden:!0,run:()=>this.setMapZ(this.mapZ-1)},{key:`]`,label:`Storey up`,hidden:!0,run:()=>this.setMapZ(this.mapZ+1)},{key:`c`,label:`Camp`,run:()=>void this.openCamp()},{key:`Escape`,label:`System`,run:()=>void this.openSystem()}]}openCamp(){return Mn(this)}setMapZ(e){let t=this.game.level();this.mapZ=Math.max(0,Math.min(t.layers-1,e)),this.drawMap()}drawMap(){let e=this.game;if(e&&this.mapView&&this.flow.screen!==`town`)try{this.mapView.draw(e.automap(),e.level(),e.state.pos,e.state.facing,this.mapZ,this.settings().automap)}catch{}}updateDungeon(){let e=this.game;if(!e||this.flow.screen!==`dungeon`)return;this.rosterEl?.replaceChildren(be(e.state.party,{})),this.barEl?.replaceChildren(i(`div`,{class:`legend`},`W/S walk · A/D turn · Q/E step · R/F stairs · Z/X look · [ ] map`),ge(this.dungeonCommands()));let t=e.level().areaOf(e.state.pos);this.viewFrame?.querySelector(`.ftitle`)?.replaceChildren(e.level().name),this.hudEl&&this.hudEl.replaceChildren(i(`b`,null,e.level().name.toUpperCase()),i(`div`,{class:`dim`},`${t} · storey ${e.state.pos.z+1} of ${e.level().layers} · facing ${`NESW`[e.state.facing]}`));let n=rf(t).edge;for(let e of this.dungeonFrames)e.style.setProperty(`--accent`,n);this.drawMap()}mountHall(){let e=this.game,t=this.viewEl;if(!t)return;this.hall?.dispose(),t.querySelector(`canvas.gl`)?.remove();let n=i(`canvas`,{class:`gl`});t.prepend(n);try{this.hall=new _f(n,e.level(),this.settings()),this.hall.resize(n.clientWidth||800,n.clientHeight||600)}catch(e){this.hall=null,this.say(e instanceof pf?e.message:`The dungeon view could not start.`)}}startView(){let e=this.game;if(!e||this.flow.screen!==`dungeon`||!this.viewEl)return;this.mountHall(),this.controller=new xf(e.level(),e.state.pos,e.state.facing),this.controller.onArrive=(e,t)=>this.arrived(e,t),this.updateDungeon(),cancelAnimationFrame(this.raf);let t=e=>{if(this.raf=requestAnimationFrame(t),!this.controller)return;let n=this.controller.update(e);this.hall?.render(e,n)};this.raf=requestAnimationFrame(t)}arrived(e,t){let n=this.game,r=this.controller;this.audio.play(t>0?`hit`:`step`),this.steps++,this.steps%6==0&&this.autosave();let i=n.onArrive(e,t,r.facing);this.mapZ=e.z,this.updateDungeon();for(let e of i)if(this.handle(e))return}handle(e){let t=this.game;switch(e.kind){case`fall`:return this.toast(`You fall ${e.fell} storeys. Everyone is hurt, and nobody is dead. Yet.`),!1;case`pit`:return this.toast(`The floor gives way under someone. Not far, but far enough.`),!1;case`discovery`:{let t=f.find(t=>t.id===e.id);return this.audio.play(`cast`),this.toast(`${t?.name??e.id}. ${t?.text??``}`,9e3),this.updateDungeon(),!1}case`event`:return this.toast(e.text,8e3),this.audio.play(`door`),e.closed>0&&this.mountHall(),this.updateDungeon(),!1;case`exit`:return e.to===`town`?(t.returnToTown(),this.autosave(),this.dispatch({type:`returnToTown`}),!0):e.to===`ending`?(this.autosave(),this.dispatch({type:`ending`}),!0):(t.followExit(e.to),this.audio.play(`door`),this.toast(`You go ${e.to===`deep`?`deeper, to`:`on to`} ${t.level().name}.`),this.autosave(),this.mapZ=t.state.pos.z,this.startView(),!0);case`encounter`:return this.audio.play(`death`),this.autosave(),this.startCombat(e.groups,e.fixedKey),!0}}onKey(e){if(this.flow.audioUnlocked||this.firstGesture(),(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement||e.target instanceof HTMLTextAreaElement)&&e.key!==`Enter`&&e.key!==`Escape`)return;if(this.router.handle(e.key,{repeat:e.repeat,ctrl:e.ctrlKey,alt:e.altKey,meta:e.metaKey})){e.preventDefault();return}if(this.router.top()?.name!==`screen`||e.repeat&&this.flow.screen!==`dungeon`||this.flow.screen!==`dungeon`||!this.controller||e.ctrlKey||e.altKey||e.metaKey)return;let t={ArrowUp:`fwd`,w:`fwd`,W:`fwd`,ArrowDown:`back`,s:`back`,S:`back`,ArrowLeft:`turnLeft`,a:`turnLeft`,A:`turnLeft`,ArrowRight:`turnRight`,d:`turnRight`,D:`turnRight`,q:`left`,Q:`left`,e:`right`,E:`right`,r:`up`,R:`up`,f:`down`,F:`down`};t[e.key]?(e.preventDefault(),this.controller.command(t[e.key])):e.key===`z`||e.key===`Z`?this.controller.look(.15):e.key===`x`||e.key===`X`?this.controller.look(-.15):e.key===`[`?this.setMapZ(this.mapZ-1):e.key===`]`&&this.setMapZ(this.mapZ+1)}};document.title=r;var jf=document.getElementById(`app`);jf&&new Af(jf).start();