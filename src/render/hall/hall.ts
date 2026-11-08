import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import type { Level } from '../../core/dungeon/level';
import { effectiveBloom, type Settings } from '../../core/settings';
import { buildHallGeometry, STOREY_H, type HallGeometry, type TorchSpec } from './geometry';
import { hexToLinear, paletteFor } from './palettes';
import type { CameraState } from './controller';

export class NoWebGLError extends Error {
  constructor() {
    super('This browser could not start WebGL, which the dungeon view needs.');
    this.name = 'NoWebGLError';
  }
}

const VERT = `attribute vec3 aCol; attribute float aPulse;
varying vec3 vCol; varying vec3 vW; varying float vD; varying float vP;
void main(){ vCol=aCol; vP=aPulse; vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; vec4 mv=viewMatrix*w; vD=-mv.z; gl_Position=projectionMatrix*mv; }`;

// Light is the heart of the look: a dim ambient, the party's lantern, and up to eight flickering torches.
const FRAG = `uniform float uTime,uAmbient,uLamp,uFog,uBright; uniform vec3 uCam,uFogCol; uniform vec3 uTorchPos[8]; uniform vec3 uTorchCol[8];
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
}`;

const TORCH_VERTS = 24;
const flick = (t: number, ph: number) => 0.5 * Math.sin(t * 7 + ph) + 0.3 * Math.sin(t * 13.3 + ph * 2.1) + 0.2 * Math.sin(t * 23.7 + ph * 3.3);

interface TorchObj { spec: TorchSpec; phase: number; pos: Float32Array; geom: THREE.BufferGeometry; intensity: number }

/** The first-person vector dungeon view for one level. */
export class Hall {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(72, 1, 0.05, 80);
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private uniforms;
  private torches: TorchObj[] = [];
  private geometry: HallGeometry;
  private fog = new THREE.Color('#060505');
  private fogK = 1;
  private lastT = 0;
  private settings: Settings;

  constructor(private canvas: HTMLCanvasElement, private level: Level, settings: Settings) {
    try {
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      throw new NoWebGLError();
    }
    this.settings = settings;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.rotation.order = 'YXZ';
    this.geometry = buildHallGeometry(level);
    this.uniforms = {
      uTime: { value: 0 }, uAmbient: { value: 0.75 }, uLamp: { value: settings.lamp }, uFog: { value: settings.fog }, uBright: { value: 1 },
      uCam: { value: new THREE.Vector3() }, uFogCol: { value: this.fog.clone() },
      uTorchPos: { value: Array.from({ length: 8 }, () => new THREE.Vector3(999, 999, 999)) },
      uTorchCol: { value: Array.from({ length: 8 }, () => new THREE.Vector3()) },
    };
    this.scene.add(new THREE.Mesh(this.buffer(this.geometry.faces), this.material(true)));
    const lines = new THREE.LineSegments(this.buffer(this.geometry.lines), this.material(false));
    lines.frustumCulled = false;
    this.scene.add(lines);
    this.geometry.torches.forEach((spec, i) => this.addTorch(spec, i));

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), effectiveBloom(settings), 0.55, 0.18);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.setSettings(settings);
    this.resize(canvas.clientWidth || 800, canvas.clientHeight || 600);
  }

  private material(face: boolean): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: this.uniforms, vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide,
      polygonOffset: face, polygonOffsetFactor: face ? 1 : 0, polygonOffsetUnits: face ? 1 : 0,
    });
  }

  private buffer(b: { positions: Float32Array; colors: Float32Array; pulses: Float32Array }): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(b.positions, 3));
    g.setAttribute('aCol', new THREE.BufferAttribute(b.colors, 3));
    g.setAttribute('aPulse', new THREE.BufferAttribute(b.pulses, 1));
    g.computeBoundingSphere();
    if (g.boundingSphere) g.boundingSphere.radius = 1e4;
    return g;
  }

  private addTorch(spec: TorchSpec, i: number): void {
    const pos = new Float32Array(TORCH_VERTS * 3), col = new Float32Array(TORCH_VERTS * 3);
    const c = spec.colour;
    const set = (v: number, k: number, mix: number) => {
      col[v * 3] = (c[0] * (1 - mix) + mix) * k; col[v * 3 + 1] = (c[1] * (1 - mix) + mix) * k; col[v * 3 + 2] = (c[2] * (1 - mix) + mix) * k;
    };
    for (let v = 0; v < 6; v++) set(v, 0.7, 0);
    for (let tg = 0; tg < 3; tg++) for (let k = 0; k < 6; k++) set(6 + tg * 6 + k, 1.8, tg === 1 ? 0.55 : 0);
    const arm: [number, number, number] = [spec.P[0] + spec.n[0] * 0.14, spec.P[1], spec.P[2] + spec.n[2] * 0.14];
    const cupL: [number, number, number] = [arm[0] + spec.t[0] * 0.05, arm[1] + 0.08, arm[2] + spec.t[2] * 0.05];
    const cupR: [number, number, number] = [arm[0] - spec.t[0] * 0.05, arm[1] + 0.08, arm[2] - spec.t[2] * 0.05];
    [spec.P, arm, arm, cupL, arm, cupR].forEach((p, v) => pos.set(p, v * 3));
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const obj = new THREE.LineSegments(geom, new THREE.LineBasicMaterial({ vertexColors: true, fog: false }));
    obj.frustumCulled = false;
    this.scene.add(obj);
    this.torches.push({ spec, phase: i * 7.3 + 1.7, pos, geom, intensity: 1 });
  }

  private animateTorches(t: number): void {
    const amp = this.settings.flicker;
    for (const tr of this.torches) {
      const a = tr.spec.flicker * amp;
      const dip = Math.sin(t * 2.1 + tr.phase) > 0.93 ? -0.6 * Math.min(1, amp) : 0;
      tr.intensity = Math.max(0.12, 1 + a * flick(t, tr.phase) + dip * tr.spec.flicker * 2);
      const { B, t: tt, n } = tr.spec;
      let o = 6;
      for (let tg = 0; tg < 3; tg++) {
        const lat0 = (tg - 1) * 0.028, ht = (0.13 + (tg === 1 ? 0.05 : 0)) * (1 + 0.5 * a * flick(t * 1.3, tr.phase + tg));
        let prev: [number, number, number] | null = null;
        for (let k = 0; k < 4; k++) {
          const kk = k / 3, sway = Math.sin(t * 9 + tr.phase + tg * 2 + k) * 0.02 * (0.4 + a * 1.5) * kk;
          const lat = lat0 * (1 - kk) + sway;
          const p: [number, number, number] = [B[0] + tt[0] * lat + n[0] * sway * 0.3, B[1] + kk * ht, B[2] + tt[2] * lat + n[2] * sway * 0.3];
          if (prev) { tr.pos.set(prev, o * 3); tr.pos.set(p, (o + 1) * 3); o += 2; }
          prev = p;
        }
      }
      tr.geom.attributes.position.needsUpdate = true;
    }
  }

  setSettings(s: Settings): void {
    this.settings = s;
    this.uniforms.uLamp.value = s.lamp;
    this.uniforms.uFog.value = s.fog;
    const b = effectiveBloom(s);
    this.bloom.strength = b;
    this.bloom.enabled = b > 0;
  }

  resize(w: number, h: number): void {
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
  }

  render(tMs: number, cam: CameraState): void {
    const t = tMs / 1000, dt = Math.min(0.1, Math.max(0, t - this.lastT));
    this.lastT = t;
    this.camera.position.set(cam.x, cam.y, cam.z);
    this.camera.rotation.set(cam.pitch + Math.sin(t * 0.9) * 0.004, cam.yaw, 0);
    this.uniforms.uTime.value = t;
    this.uniforms.uCam.value.copy(this.camera.position);
    // fog and ambient ease toward the palette of the area the party is standing in
    const area = this.level.areaOf({ x: Math.floor(cam.x), y: Math.floor(cam.z), z: Math.floor(cam.y / STOREY_H) });
    const pal = paletteFor(area);
    const [r, g, b] = hexToLinear(pal.fog);
    const k = 1 - Math.exp(-dt * 2.5);
    this.fog.r += (r - this.fog.r) * k; this.fog.g += (g - this.fog.g) * k; this.fog.b += (b - this.fog.b) * k;
    this.fogK += (pal.fogK - this.fogK) * k;
    this.uniforms.uFog.value = this.settings.fog * this.fogK;
    this.uniforms.uFogCol.value.copy(this.fog);
    (this.scene.background as THREE.Color | null) ?? (this.scene.background = new THREE.Color());
    (this.scene.background as THREE.Color).copy(this.fog);
    this.animateTorches(t);
    const near = [...this.torches].sort((a, c) => this.dist(a, cam) - this.dist(c, cam)).slice(0, 8);
    for (let i = 0; i < 8; i++) {
      const tr = near[i];
      if (!tr) { this.uniforms.uTorchPos.value[i].set(999, 999, 999); this.uniforms.uTorchCol.value[i].set(0, 0, 0); continue; }
      const c = tr.spec.colour;
      this.uniforms.uTorchPos.value[i].set(...tr.spec.light);
      this.uniforms.uTorchCol.value[i].set(c[0] * tr.intensity, c[1] * tr.intensity, c[2] * tr.intensity);
    }
    this.composer.render();
  }

  private dist(tr: TorchObj, cam: CameraState): number {
    const l = tr.spec.light;
    return (l[0] - cam.x) ** 2 + (l[1] - cam.y) ** 2 + (l[2] - cam.z) ** 2;
  }

  dispose(): void {
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else mat?.dispose();
    });
    this.composer.dispose();
    this.renderer.dispose();
  }
}
