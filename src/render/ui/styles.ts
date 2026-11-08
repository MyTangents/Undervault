/** Parchment, ink and dim metal: the menus look like worn dungeon tools, not a glowing terminal. */
export const CSS = `
:root{--ink:#1b1510;--parch:#d8c79d;--parch2:#c4b184;--metal:#5d5b57;--metal2:#3a3935;--blood:#7a2a22;--gold:#b8923e;--ok:#5f7a4a;--bad:#a8402e;--accent:#9a9482}
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:#050403;color:var(--parch);font-family:Georgia,'Times New Roman',serif;overflow:hidden}
button{font:inherit;color:var(--ink);background:linear-gradient(var(--parch),var(--parch2));border:1px solid #6b5a38;border-radius:3px;padding:.35em .8em;cursor:pointer;box-shadow:0 1px 0 #f0e3bf inset,0 2px 4px #0008}
button:hover:not(:disabled){filter:brightness(1.08)}
button:disabled{opacity:.45;cursor:default}
button.quiet{background:linear-gradient(var(--metal),var(--metal2));color:var(--parch);border-color:#2a2926}
select,input[type=text],input[type=number]{font:inherit;background:#efe3c3;color:var(--ink);border:1px solid #6b5a38;border-radius:3px;padding:.25em .4em}
input[type=range]{accent-color:var(--gold)}
h1,h2,h3{margin:.2em 0;font-weight:normal;letter-spacing:.04em}
.mono{font-family:Consolas,'Courier New',monospace}
.dim{opacity:.65}
.bad{color:var(--bad)}.good{color:#9ab87a}
#app{position:fixed;inset:0}
.screen{position:absolute;inset:0;display:flex;flex-direction:column}
.panel{background:linear-gradient(#e0d0a7,#cdbb8c);color:var(--ink);border:2px solid #4a3d24;border-radius:4px;padding:.7em .9em;box-shadow:0 0 0 1px #0007,0 6px 16px #000a}
.panel h3{border-bottom:1px solid #8a7648;padding-bottom:.2em;margin-bottom:.5em}
.row{display:flex;gap:.6em;align-items:center}
.grow{flex:1}
.stack>*+*{margin-top:.5em}
.toast{position:fixed;left:50%;top:14px;transform:translateX(-50%);background:#1b1510e8;color:var(--parch);border:1px solid var(--gold);border-radius:4px;padding:.5em 1em;max-width:70ch;z-index:50;box-shadow:0 4px 14px #000a;pointer-events:none}

/* title */
.title{align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse at 50% 38%,#2a2218 0,#0b0907 62%,#050403 100%)}
.title h1{font-size:clamp(2.6rem,9vw,6rem);color:#e9d9ae;text-shadow:0 0 18px #b8923e66,0 3px 0 #000;letter-spacing:.18em;margin:0}
.title h2{font-size:clamp(1rem,3vw,1.8rem);color:#b8a87c;margin-bottom:1.4rem;font-style:italic}
.title .blurb{max-width:46ch;opacity:.8;margin:0 auto 1.6rem}
.title .menu{display:flex;flex-direction:column;gap:.6rem;width:min(18rem,80vw)}
.title .notice{position:absolute;bottom:14px;left:0;right:0;font-size:.8rem;opacity:.55;padding:0 1rem}

/* town */
.town{padding:12px;gap:10px}
.town .top{display:flex;justify-content:space-between;align-items:baseline;padding:0 .3em}
.town .body{display:grid;grid-template-columns:15rem 1fr 19rem;gap:10px;flex:1;min-height:0}
.town .nav{display:flex;flex-direction:column;gap:.5rem}
.town .nav button{text-align:left}
.town .nav button.here{background:linear-gradient(#e9dba9,#d9c68e);border-color:var(--gold);font-weight:bold}
.town .main{overflow:auto}
.town .side{overflow:auto}
.tbl{width:100%;border-collapse:collapse}
.tbl td,.tbl th{padding:.2em .4em;border-bottom:1px solid #a5925f;text-align:left}
.tbl tr:last-child td{border-bottom:none}
.tale{border-left:3px solid var(--gold);padding-left:.8em;margin:.6em 0;font-style:italic}
.tone-funny{border-color:#c49a2e}.tone-sad{border-color:#5a6f8a}.tone-uplifting{border-color:#6a9a52}.tone-memorable{border-color:#9a4a8a}

/* party cards */
.member{display:grid;grid-template-columns:1fr auto;gap:.1em .5em;padding:.35em .3em;border-bottom:1px solid #a5925f;cursor:default}
.member:last-child{border-bottom:none}
.member .nm{font-weight:bold}
.member.dead .nm{text-decoration:line-through;opacity:.6}
.member .meta{grid-column:1/3;font-size:.8rem;opacity:.75}
.bar{height:6px;background:#3a2c1a;border-radius:3px;overflow:hidden;grid-column:1/3}
.bar>i{display:block;height:100%;background:var(--ok)}
.bar.low>i{background:var(--bad)}

/* dungeon */
.dungeon{flex-direction:row}
.dungeon .view{position:relative;flex:1;min-width:0;background:#000}
.dungeon canvas.gl{width:100%;height:100%;display:block}
.dungeon .hud{position:absolute;left:12px;top:10px;font-size:.95rem;text-shadow:0 1px 3px #000;pointer-events:none;color:var(--parch)}
.dungeon .hud b{letter-spacing:.1em}
.dungeon .hints{position:absolute;left:12px;bottom:8px;font-size:.72rem;opacity:.55;pointer-events:none}
.dungeon aside{width:20rem;display:flex;flex-direction:column;gap:8px;padding:8px;background:#0c0a08;border-left:2px solid #2a2418;overflow:auto}
.dungeon aside .panel{padding:.5em .6em}
.dungeon canvas.map{width:100%;aspect-ratio:1;background:#0a0806;border:1px solid #3a3020;image-rendering:pixelated;display:block}
.chron{font-size:.78rem;line-height:1.35;max-height:11rem;overflow:auto}
.chron div+div{margin-top:.3em}

/* combat */
.combat{padding:10px;gap:10px;background:radial-gradient(ellipse at 50% 20%,#1e1810 0,#080604 70%)}
.combat .stage{display:grid;grid-template-columns:1fr 24rem;gap:10px;flex:1;min-height:0}
.combat .left{display:flex;flex-direction:column;align-items:center;gap:8px;min-height:0}
.combat .pic{border:3px double var(--accent);padding:5px;background:#000;box-shadow:0 0 26px #0009}
.combat canvas.mon{height:min(46vh,480px);aspect-ratio:192/240;image-rendering:pixelated;display:block}
.combat .groups{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center}
.combat .groups button.sel{outline:2px solid var(--gold)}
.combat .log{width:100%;max-width:40rem;min-height:7.5rem;font-size:.95rem;line-height:1.45;padding:.4em .7em;background:#0b0907cc;border:1px solid #3a3020;border-radius:3px}
.combat .log div{opacity:.6}.combat .log div:last-child{opacity:1}
.combat .warn{display:flex;gap:.4rem;flex-wrap:wrap;min-height:1.6rem}
.chip{background:#4a1d17;color:#f0c8b8;border:1px solid #8a3a2a;border-radius:10px;padding:.05em .6em;font-size:.78rem}
.orders .o{display:grid;grid-template-columns:7rem 1fr;gap:.3rem;align-items:center;padding:.25em 0;border-bottom:1px solid #a5925f}
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
