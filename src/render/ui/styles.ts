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
  .townx{grid-template-columns:1fr;grid-template-rows:auto;grid-template-areas:"head" "left" "mid" "right" "bar";overflow:auto}
  .townx .face canvas{width:160px}
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
@media (max-width:900px){.combat2{grid-template-columns:1fr;grid-template-rows:auto;grid-template-areas:"scene" "talk" "party" "bottom";overflow:auto}}

/* title */
.title{align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse at 50% 38%,#1c1710 0,#09070a 62%,#050406 100%)}
.title h1{font-size:clamp(2.2rem,8vw,5rem);color:#e9d9ae;text-shadow:0 0 14px #b8923e55,0 3px 0 #000;letter-spacing:.14em;margin:0}
.title h2{font-size:clamp(1rem,3vw,1.6rem);color:var(--dim);margin-bottom:1.4rem;font-style:italic}
.title .blurb{max-width:46ch;opacity:.8;margin:0 auto 1.6rem}
.title .menu{display:flex;flex-direction:column;gap:.6rem;width:min(18rem,80vw)}
.title .notice{position:absolute;bottom:14px;left:0;right:0;font-size:.8rem;opacity:.55;padding:0 1rem}

/* town */
.town{padding:12px;gap:10px}
.town .top{display:flex;justify-content:space-between;align-items:baseline;padding:0 .3em}
.town .body{display:grid;grid-template-columns:15rem 1fr 19rem;gap:10px;flex:1;min-height:0}
.town .nav{display:flex;flex-direction:column;gap:.5rem}
.town .nav button{text-align:left}
.town .nav button.here{border-color:var(--gold);font-weight:bold;background:color-mix(in srgb,var(--gold) 20%,transparent)}
.town .main{overflow:auto}
.town .side{overflow:auto}
.tbl{width:100%;border-collapse:collapse}
.tbl td,.tbl th{padding:.2em .4em;border-bottom:1px solid var(--line);text-align:left}
.tbl tr:last-child td{border-bottom:none}
.tale{border-left:3px solid var(--gold);padding-left:.8em;margin:.6em 0;font-style:italic}
.tone-funny{border-color:#c49a2e}.tone-sad{border-color:#5a6f8a}.tone-uplifting{border-color:#6a9a52}.tone-memorable{border-color:#9a4a8a}

/* party cards */
.member{display:grid;grid-template-columns:1fr auto;gap:.1em .5em;padding:.35em .3em;border-bottom:1px solid var(--line);cursor:default}
.member:last-child{border-bottom:none}
.member .nm{font-weight:bold}
.member.dead .nm{text-decoration:line-through;opacity:.6}
.member .meta{grid-column:1/3;font-size:.8rem;opacity:.75}
.bar{height:6px;background:#2a2118;border-radius:3px;overflow:hidden;grid-column:1/3}
.bar>i{display:block;height:100%;background:var(--ok)}
.bar.low>i{background:var(--bad)}

/* dungeon */
.dungeon{flex-direction:row}
.dungeon .view{position:relative;flex:1;min-width:0;background:#000}
.dungeon canvas.gl{width:100%;height:100%;display:block}
.dungeon .hud{position:absolute;left:12px;top:10px;font-size:.95rem;text-shadow:0 1px 3px #000;pointer-events:none;color:var(--text)}
.dungeon .hud b{letter-spacing:.1em}
.dungeon .hints{position:absolute;left:12px;bottom:8px;font-size:.72rem;opacity:.55;pointer-events:none}
.dungeon aside{width:20rem;display:flex;flex-direction:column;gap:8px;padding:8px;background:var(--bg);border-left:2px solid var(--line);overflow:auto}
.dungeon aside .panel{padding:.5em .6em}
.dungeon canvas.map{width:100%;aspect-ratio:1;background:#0a0806;border:1px solid #3a3020;image-rendering:pixelated;display:block}
.chron{font-size:.78rem;line-height:1.35;max-height:11rem;overflow:auto}
.chron div+div{margin-top:.3em}

/* combat */
.combat{padding:10px;gap:10px;background:radial-gradient(ellipse at 50% 20%,#1e1810 0,#080604 70%)}
.combat .stage{display:grid;grid-template-columns:1fr 24rem;gap:10px;flex:1;min-height:0}
.combat .left{display:flex;flex-direction:column;align-items:center;gap:8px;min-height:0}
.combat .pic{border:3px double var(--accent,#9a9482);padding:5px;background:#000;box-shadow:0 0 26px #0009}
.combat canvas.mon{height:min(46vh,480px);aspect-ratio:192/240;image-rendering:pixelated;display:block}
.combat .groups{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center}
.combat .groups button.sel{outline:2px solid var(--gold)}
.combat .log{width:100%;max-width:40rem;min-height:7.5rem;font-size:.95rem;line-height:1.45;padding:.4em .7em;background:#0b0907cc;border:1px solid #3a3020;border-radius:3px}
.combat .log div{opacity:.6}.combat .log div:last-child{opacity:1}
.combat .warn{display:flex;gap:.4rem;flex-wrap:wrap;min-height:1.6rem}
.chip{background:#4a1d17;color:#f0c8b8;border:1px solid #8a3a2a;border-radius:10px;padding:.05em .6em;font-size:.78rem}
.orders .o{display:grid;grid-template-columns:7rem 1fr;gap:.3rem;align-items:center;padding:.25em 0;border-bottom:1px solid var(--line)}
.orders .o:last-child{border:none}
.orders .o select{width:100%;margin-bottom:2px}

/* settings, ending */
.overlay{align-items:center;justify-content:center;background:#000c}
.overlay .panel{width:min(34rem,92vw);max-height:92vh;overflow:auto}
.set{display:grid;grid-template-columns:7rem 1fr 3rem;gap:.4rem .6rem;align-items:center;margin:.4em 0}
.end{align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse at 50% 38%,#241c18 0,#0a0807 70%)}
.end .panel{max-width:46rem;text-align:left}

@media (max-width:900px){
  .town .body{grid-template-columns:1fr}
  .dungeon{flex-direction:column}.dungeon aside{width:auto;flex-direction:row;overflow-x:auto;max-height:36vh}
  .combat .stage{grid-template-columns:1fr}
}
`;
