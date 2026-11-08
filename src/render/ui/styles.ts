/** Near-black framed windows with a warm accent: a candle-lit terminal of the old crawlers, upgraded. System monospace only. */
export const CSS = `
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

`;
