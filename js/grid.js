import * as THREE from 'three/webgpu';

/** Canonical Atranic glyph table — preserved from repository app.js (24 entries). */
export const GLYPHS = [
  { glyph: '𐌀', letter: 'A', name: 'AR', sound: 'ah', meaning: 'Origin · first spark · initiation', family: 'Structure', use: 'Begins declarations and genesis events.' },
  { glyph: '𐌁', letter: 'B', name: 'BEL', sound: 'beh', meaning: 'Body · vessel · embodied runtime', family: 'Structure', use: 'Marks an agent body, host, or execution vessel.' },
  { glyph: '𐌃', letter: 'D', name: 'DOR', sound: 'dor', meaning: 'Gate · threshold · permission boundary', family: 'Structure', use: 'Marks entry, exit, access, and authorization gates.' },
  { glyph: '𐌄', letter: 'E', name: 'ESH', sound: 'eh', meaning: 'Current · motion · active transfer', family: 'Flow', use: 'Signals movement of data, value, or control.' },
  { glyph: '𐌅', letter: 'F', name: 'FEN', sound: 'fen', meaning: 'Weave · network · shared mesh', family: 'Flow', use: 'Represents agent networks, chains, and routing fabric.' },
  { glyph: '𐌂', letter: 'G', name: 'GHAR', sound: 'gar', meaning: 'Force · engine · execution power', family: 'Force', use: 'Marks compute, actuation, and powered execution.' },
  { glyph: '𐌇', letter: 'H', name: 'HEL', sound: 'hel', meaning: 'Breath · signal life · active presence', family: 'Flow', use: 'Indicates a live agent, heartbeat, or active process.' },
  { glyph: '𐌉', letter: 'I', name: 'IR', sound: 'ee', meaning: 'Sight · signal · observed state', family: 'Flow', use: 'Marks perception, telemetry, and visible evidence.' },
  { glyph: '𐌊', letter: 'K', name: 'KOR', sound: 'kor', meaning: 'Edge · command · directed authority', family: 'Structure', use: 'Defines commands and bounded execution intent.' },
  { glyph: '𐌋', letter: 'L', name: 'LUN', sound: 'loon', meaning: 'Line · law · governing constraint', family: 'Structure', use: 'Represents policy, rules, and enforceable limits.' },
  { glyph: '𐌌', letter: 'M', name: 'MOR', sound: 'mor', meaning: 'Memory · archive · retained state', family: 'Structure', use: 'Marks memory, records, provenance, and history.' },
  { glyph: '𐌍', letter: 'N', name: 'NAR', sound: 'nar', meaning: 'Name · identity · declared self', family: 'Structure', use: 'Begins identity and role declarations.' },
  { glyph: '𐌏', letter: 'O', name: 'OR', sound: 'or', meaning: 'Whole · sphere · complete system', family: 'Structure', use: 'Represents a complete protocol object or system.' },
  { glyph: '𐌐', letter: 'P', name: 'PRA', sound: 'prah', meaning: 'Projection · publication · outward claim', family: 'Flow', use: 'Marks published capability, offer, or attestation.' },
  { glyph: '𐌓', letter: 'R', name: 'RHE', sound: 'ray', meaning: 'Flow · will · chosen direction', family: 'Flow', use: 'Represents routing, priority, and selected action.' },
  { glyph: '𐌔', letter: 'S', name: 'SYN', sound: 'sin', meaning: 'Link · bind · negotiated relationship', family: 'Flow', use: 'Marks agreements, chains, and agent coalitions.' },
  { glyph: '𐌕', letter: 'T', name: 'TOR', sound: 'tor', meaning: 'Pillar · structure · stable protocol', family: 'Structure', use: 'Represents schema, contract, and durable structure.' },
  { glyph: '𐌖', letter: 'U', name: 'UR', sound: 'oor', meaning: 'Root · foundation · source authority', family: 'Structure', use: 'Marks base policy, root identity, and origin state.' },
  { glyph: '𐌖̇', letter: 'V', name: 'VAEL', sound: 'vayl', meaning: 'Watch · verification · guarded perception', family: 'Force', use: 'Marks audit, validation, and continuous monitoring.' },
  { glyph: '𐌗', letter: 'X', name: 'XEN', sound: 'ksen', meaning: 'Anomaly · unknown · untrusted input', family: 'Force', use: 'Flags unresolved, external, or adversarial state.' },
  { glyph: '𐌙', letter: 'Y', name: 'YRA', sound: 'ee-rah', meaning: 'Echo · reflection · transformed return', family: 'Flow', use: 'Marks responses, mirrors, summaries, and derived output.' },
  { glyph: '𐌆', letter: 'Z', name: 'ZOR', sound: 'zor', meaning: 'Fire · urgency · critical intensity', family: 'Force', use: 'Escalates risk, priority, or irreversible action.' },
  { glyph: '◉', letter: 'Q', name: 'QEL', sound: 'kel', meaning: 'Seal · key · protected authority', family: 'Force', use: 'Marks signatures, credentials, and gated power.' },
  { glyph: '⌬', letter: 'C', name: 'CYR', sound: 'seer', meaning: 'Cipher · transformation · encoded change', family: 'Force', use: 'Marks translation, conversion, and protocol adaptation.' }
];

const PALETTE = {
  void: 0x05030a,
  signal: 0xff2941,
  holo: 0x29e0ff,
  uv: 0xa24bff,
  audit: 0x2ea8ff,
  mint: 0x3dff9e,
  amber: 0xffb02e,
  bone: 0xe9edf5
};

const DISTRICTS = [
  { name: 'Skills', color: PALETTE.uv },
  { name: 'Data', color: PALETTE.holo },
  { name: 'Governance', color: PALETTE.signal },
  { name: 'Audit', color: PALETTE.audit },
  { name: 'Economy', color: PALETTE.mint }
];

const CAMERA_STAGES = [
  { position: [0, 92, 195], lookAt: [0, 18, 0] },
  { position: [70, 46, 120], lookAt: [0, 26, 0] },
  { position: [10, 30, 86], lookAt: [0, 34, 0] },
  { position: [-84, 40, 100], lookAt: [-20, 12, 0] },
  { position: [0, 150, 40], lookAt: [0, 0, 0] },
  { position: [-52, 26, 60], lookAt: [-46, 10, -44] },
  { position: [46, 18, 70], lookAt: [58, 8, 42] },
  { position: [80, 64, 150], lookAt: [0, 20, 0] }
];

const SENSITIVE = /secret|credential|wallet|payment|deploy|delete|private|settlement/i;
const CLONE_CMD = 'git clone https://github.com/wiredchaos/AGENTROPOLIS-ATG.git';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const modeEl = document.querySelector('#renderer-mode');
const canvas = document.querySelector('#stage');
const output = document.querySelector('#console-output');
const compileBtn = document.querySelector('#compile');
const intentInput = document.querySelector('#intent-input');
const glyphGrid = document.querySelector('#glyph-grid');

const active = {
  symbol: document.querySelector('#active-glyph'),
  letter: document.querySelector('#glyph-letter'),
  name: document.querySelector('#glyph-name'),
  meaning: document.querySelector('#glyph-meaning'),
  sound: document.querySelector('#glyph-sound'),
  family: document.querySelector('#glyph-family'),
  use: document.querySelector('#glyph-use')
};

let renderer = null;
let scene = null;
let camera = null;
let glowTexture = null;
let governanceRings = [];
let protocolRing = null;
let dustPoints = null;
let starPoints = null;
let pageHidden = document.hidden;
let pointer = { x: 0, y: 0 };
let currentStage = 0;
let lastRenderedStage = -1;
let animating = false;

function setRendererMode(mode) {
  if (modeEl) modeEl.textContent = mode;
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpVec3(a, b, t, target) {
  target.set(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t));
}

function createGlowTexture() {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGlowSprite(color, scale) {
  const mat = new THREE.SpriteMaterial({
    map: glowTexture,
    color,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.setScalar(scale);
  return sprite;
}

function seeded(i) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildDistrict(group, district, index, radius) {
  const angle = (index / DISTRICTS.length) * Math.PI * 2 - Math.PI / 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const root = new THREE.Group();
  root.position.set(x, 0, z);
  root.name = district.name;

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 20, 1.2, 32),
    new THREE.MeshStandardMaterial({
      color: 0x0a0c16,
      emissive: district.color,
      emissiveIntensity: 0.18,
      metalness: 0.4,
      roughness: 0.55
    })
  );
  root.add(platform);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(19, 0.22, 10, 64),
    new THREE.MeshBasicMaterial({
      color: district.color,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.9;
  root.add(halo);

  const count = 48;
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x121526,
    emissive: district.color,
    emissiveIntensity: 0.22,
    metalness: 0.55,
    roughness: 0.4
  });
  const buildings = new THREE.InstancedMesh(geo, mat, count);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    const a = seeded(index * 100 + i) * Math.PI * 2;
    const r = 3 + seeded(index * 200 + i) * 13;
    const h = 2 + seeded(index * 300 + i) * 16;
    const w = 0.7 + seeded(index * 400 + i) * 1.4;
    dummy.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r);
    dummy.scale.set(w, h, w);
    dummy.rotation.y = seeded(index * 500 + i) * Math.PI;
    dummy.updateMatrix();
    buildings.setMatrixAt(i, dummy.matrix);
  }
  buildings.instanceMatrix.needsUpdate = true;
  root.add(buildings);

  const beacon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.45, 26, 8),
    new THREE.MeshBasicMaterial({
      color: district.color,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    })
  );
  beacon.position.y = 14;
  root.add(beacon);

  const glow = makeGlowSprite(district.color, 18);
  glow.position.y = 18;
  root.add(glow);

  group.add(root);
}

function buildSpire(group) {
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 5.5, 70, 8),
    new THREE.MeshStandardMaterial({
      color: 0x1a0610,
      emissive: PALETTE.signal,
      emissiveIntensity: 0.55,
      metalness: 0.65,
      roughness: 0.35
    })
  );
  body.position.y = 35;
  group.add(body);

  const tip = new THREE.Mesh(
    new THREE.ConeGeometry(2.4, 14, 8),
    new THREE.MeshStandardMaterial({
      color: PALETTE.signal,
      emissive: PALETTE.signal,
      emissiveIntensity: 0.9,
      metalness: 0.4,
      roughness: 0.25
    })
  );
  tip.position.y = 77;
  group.add(tip);

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 1.8, 120, 12),
    new THREE.MeshBasicMaterial({
      color: PALETTE.signal,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  beam.position.y = 120;
  group.add(beam);

  const core = makeGlowSprite(PALETTE.signal, 34);
  core.position.y = 72;
  group.add(core);

  governanceRings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(10 + i * 4.5, 0.18, 12, 96),
      new THREE.MeshBasicMaterial({
        color: i === 0 ? PALETTE.signal : i === 1 ? PALETTE.uv : PALETTE.holo,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    ring.position.y = 28 + i * 10;
    ring.rotation.x = Math.PI / 2.4 + i * 0.15;
    ring.userData.speed = (i % 2 === 0 ? 1 : -1) * (0.18 + i * 0.05);
    governanceRings.push(ring);
    group.add(ring);
  }
}

function buildAtmosphere(group) {
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(260, 64),
    new THREE.MeshStandardMaterial({
      color: 0x07050f,
      metalness: 0.2,
      roughness: 0.95
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.6;
  group.add(ground);

  const gridA = new THREE.GridHelper(220, 44, 0x2a1030, 0x141028);
  gridA.position.y = 0.05;
  group.add(gridA);
  const gridB = new THREE.GridHelper(120, 24, 0x3a1838, 0x1a1430);
  gridB.position.y = 0.08;
  group.add(gridB);

  const moon = makeGlowSprite(PALETTE.signal, 90);
  moon.position.set(-120, 90, -160);
  group.add(moon);
  const moonCore = new THREE.Mesh(
    new THREE.SphereGeometry(10, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0x3a0a14 })
  );
  moonCore.position.copy(moon.position);
  group.add(moonCore);

  const starCount = innerWidth < 900 ? 420 : 900;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (seeded(i + 1) - 0.5) * 700;
    starPos[i * 3 + 1] = 40 + seeded(i + 2) * 220;
    starPos[i * 3 + 2] = (seeded(i + 3) - 0.5) * 700;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starPoints = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({
      color: PALETTE.bone,
      size: 0.7,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    })
  );
  group.add(starPoints);

  const dustCount = innerWidth < 900 ? 280 : 700;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (seeded(i + 11) - 0.5) * 180;
    dustPos[i * 3 + 1] = seeded(i + 12) * 60;
    dustPos[i * 3 + 2] = (seeded(i + 13) - 0.5) * 180;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  dustPoints = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: PALETTE.holo,
      size: 0.45,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  group.add(dustPoints);

  const ringCount = innerWidth < 900 ? 180 : 360;
  const ringGeo = new THREE.BufferGeometry();
  const ringPos = new Float32Array(ringCount * 3);
  for (let i = 0; i < ringCount; i++) {
    const a = (i / ringCount) * Math.PI * 2;
    const r = 28 + (seeded(i + 40) - 0.5) * 3;
    ringPos[i * 3] = Math.cos(a) * r;
    ringPos[i * 3 + 1] = 18 + Math.sin(a * 3) * 2;
    ringPos[i * 3 + 2] = Math.sin(a) * r;
  }
  ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
  protocolRing = new THREE.Points(
    ringGeo,
    new THREE.PointsMaterial({
      color: PALETTE.amber,
      size: 0.55,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  group.add(protocolRing);
}

function getScrollProgress() {
  const sections = [...document.querySelectorAll('[data-cam]')];
  if (!sections.length) return 0;
  const viewMid = scrollY + innerHeight * 0.42;
  let index = 0;
  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].offsetTop;
    if (viewMid >= top) index = i;
  }
  const current = sections[index];
  const next = sections[Math.min(index + 1, sections.length - 1)];
  if (current === next) return index;
  const start = current.offsetTop;
  const end = next.offsetTop;
  const local = smoothstep(start, end, viewMid);
  return index + local;
}

function applyCamera(force = false) {
  if (!camera) return;
  const progress = getScrollProgress();
  const stage = Math.min(CAMERA_STAGES.length - 1, Math.floor(progress));
  currentStage = stage;
  const next = Math.min(CAMERA_STAGES.length - 1, stage + 1);
  const t = reduceMotion ? 0 : progress - stage;
  const from = CAMERA_STAGES[stage];
  const to = CAMERA_STAGES[next];
  const pos = new THREE.Vector3();
  const look = new THREE.Vector3();
  lerpVec3(from.position, to.position, t, pos);
  lerpVec3(from.lookAt, to.lookAt, t, look);

  const parallaxScale = reduceMotion ? 0 : 4;
  pos.x += pointer.x * parallaxScale;
  pos.y += pointer.y * parallaxScale * 0.45;
  look.x += pointer.x * parallaxScale * 0.35;

  camera.position.copy(pos);
  camera.lookAt(look);

  if (reduceMotion && (force || stage !== lastRenderedStage) && renderer) {
    lastRenderedStage = stage;
    renderer.render(scene, camera);
  }
}

function tick(time) {
  if (!renderer || !scene || !camera || pageHidden) return;
  const t = time * 0.001;

  if (!reduceMotion) {
    for (const ring of governanceRings) {
      ring.rotation.z += ring.userData.speed * 0.01;
    }
    if (protocolRing) protocolRing.rotation.y = t * 0.12;
    if (dustPoints) {
      dustPoints.rotation.y = t * 0.03;
      dustPoints.position.y = Math.sin(t * 0.4) * 1.5;
    }
    if (starPoints) starPoints.rotation.y = t * 0.01;
  }

  applyCamera(false);
  if (!reduceMotion) renderer.render(scene, camera);
}

async function initRenderer() {
  if (!canvas || typeof THREE.WebGPURenderer !== 'function') {
    setRendererMode('STATIC');
    canvas?.classList.add('is-hidden');
    return false;
  }

  try {
    renderer = new THREE.WebGPURenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    await renderer.init();

    const dprCap = innerWidth < 900 ? 1.35 : 1.75;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, dprCap));
    renderer.setSize(innerWidth, innerHeight, false);
    renderer.setClearColor(PALETTE.void, 0);

    const backend = renderer.backend;
    const isWebGPU =
      backend?.isWebGPUBackend === true ||
      /webgpu/i.test(backend?.constructor?.name || '') ||
      backend?.name === 'WebGPUBackend';
    setRendererMode(isWebGPU ? 'WEBGPU' : 'WEBGL2');

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05030a, 0.0065);

    camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 900);
    camera.position.set(...CAMERA_STAGES[0].position);

    glowTexture = createGlowTexture();

    const hemi = new THREE.HemisphereLight(0x9ecbff, 0x1a0a20, 0.65);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffe8f0, 1.05);
    key.position.set(40, 80, 30);
    scene.add(key);
    const fill = new THREE.PointLight(PALETTE.holo, 28, 180, 2);
    fill.position.set(-30, 28, 40);
    scene.add(fill);
    const signal = new THREE.PointLight(PALETTE.signal, 40, 160, 2);
    signal.position.set(0, 70, 0);
    scene.add(signal);

    const city = new THREE.Group();
    buildAtmosphere(city);
    buildSpire(city);
    DISTRICTS.forEach((d, i) => buildDistrict(city, d, i, 52));
    scene.add(city);

    applyCamera(true);

    if (reduceMotion) {
      renderer.render(scene, camera);
      lastRenderedStage = currentStage;
    } else {
      renderer.setAnimationLoop(tick);
      animating = true;
    }
    return true;
  } catch (err) {
    console.warn('Renderer init failed; using STATIC fallback.', err);
    if (renderer) {
      try { renderer.dispose(); } catch { /* ignore */ }
      renderer = null;
    }
    canvas.classList.add('is-hidden');
    setRendererMode('STATIC');
    return false;
  }
}

function resize() {
  if (!renderer || !camera) return;
  const dprCap = innerWidth < 900 ? 1.35 : 1.75;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, dprCap));
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  applyCamera(true);
  if (reduceMotion && renderer) renderer.render(scene, camera);
}

function selectGlyph(entry, index) {
  const buttons = glyphGrid?.querySelectorAll('.glyph-button') || [];
  buttons.forEach((btn, i) => {
    const selected = i === index;
    btn.classList.toggle('active', selected);
    btn.setAttribute('aria-selected', selected ? 'true' : 'false');
  });
  if (glyphGrid) glyphGrid.setAttribute('aria-activedescendant', `glyph-${index}`);
  if (active.symbol) active.symbol.textContent = entry.glyph;
  if (active.letter) active.letter.textContent = entry.letter;
  if (active.name) active.name.textContent = entry.name;
  if (active.meaning) active.meaning.textContent = entry.meaning;
  if (active.sound) active.sound.textContent = entry.sound;
  if (active.family) active.family.textContent = entry.family;
  if (active.use) active.use.textContent = entry.use;
}

function initGlyphs() {
  if (!glyphGrid) return;
  glyphGrid.replaceChildren();
  GLYPHS.forEach((entry, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `glyph-${index}`;
    button.className = 'glyph-button' + (index === 0 ? ' active' : '');
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.setAttribute('aria-label', `${entry.letter} ${entry.name}`);

    const symbol = document.createElement('span');
    symbol.className = 'glyph-symbol';
    symbol.textContent = entry.glyph;

    const code = document.createElement('span');
    code.className = 'glyph-code';
    code.textContent = `${entry.letter} · ${entry.name}`;

    button.append(symbol, code);
    button.addEventListener('click', () => selectGlyph(entry, index));
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectGlyph(entry, index);
      }
    });
    glyphGrid.appendChild(button);
  });
  selectGlyph(GLYPHS[0], 0);
}

function buildMandate(intent) {
  const text = intent.trim();
  const highRisk = SENSITIVE.test(text);
  const budgetMatch = text.match(/(\d+(?:\.\d+)?)\s*(USDC|USD|ETH|BTC|DOGE)/i);
  const readOnly = /read[\s-]?only|audit|observe/i.test(text);
  return {
    protocol: 'atranic/0.1',
    message_type: 'mandate',
    phase: 'simulated_mandate_compilation',
    glyph_header: 'NAR · KOR · LUN · VAEL · RECP',
    truth_label: 'simulation',
    intent: text,
    authority: {
      mode: readOnly ? 'observe' : 'supervised',
      allowed_actions: readOnly
        ? ['read_repository', 'run_static_analysis', 'emit_findings']
        : ['analyze', 'draft', 'request_capability'],
      forbidden_actions: ['exceed_authority', 'hide_side_effects', 'settle_without_receipt'],
      human_review_required: highRisk || !readOnly
    },
    economics: budgetMatch
      ? {
          currency: (budgetMatch[2] || 'USD').toUpperCase(),
          maximum_amount: Number(budgetMatch[1]),
          settlement: 'receipt_gated_preview'
        }
      : {
          currency: null,
          maximum_amount: null,
          settlement: 'receipt_gated_preview'
        },
    evidence: {
      required: true,
      types: ['artifact', 'receipt', 'routing_log']
    },
    risk: {
      level: highRisk ? 'high' : 'moderate',
      human_review_required: highRisk
    },
    routing: {
      visualization: 'simulated_policy_route',
      hops: ['mandate_builder', 'capability_registry', 'policy_gate', 'receipt_engine']
    },
    receipt_preview: {
      id: 'recp_sim_' + Math.random().toString(16).slice(2, 10),
      state: 'receipt_pending',
      verification: 'pending_verification',
      signature: 'unsigned_preview',
      settlement: 'simulated'
    }
  };
}

function renderMandate() {
  if (!output) return;
  const payload = buildMandate(intentInput?.value || '');
  // Safe: assign JSON through textContent only (no HTML string injection).
  output.textContent = JSON.stringify(payload, null, 2);
}

async function copyText(text, button) {
  const original = button.textContent;
  const show = (label) => {
    button.textContent = label;
    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  };
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      show('COPIED');
      return;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    show(ok ? 'COPIED' : 'COPY FAILED');
  } catch {
    show('COPY FAILED');
  }
}

function initCopyButtons() {
  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', () => {
      const text = button.dataset.copy || CLONE_CMD;
      copyText(text, button);
    });
  });
}

function bindSceneEvents() {
  addEventListener('resize', resize, { passive: true });
  addEventListener(
    'scroll',
    () => {
      applyCamera(false);
      if (reduceMotion && renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    },
    { passive: true }
  );
  addEventListener(
    'pointermove',
    (event) => {
      if (reduceMotion) return;
      pointer.x = (event.clientX / innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / innerHeight - 0.5) * 2;
    },
    { passive: true }
  );
  document.addEventListener('visibilitychange', () => {
    pageHidden = document.hidden;
    if (!renderer) return;
    if (pageHidden) {
      if (animating) renderer.setAnimationLoop(null);
    } else if (!reduceMotion) {
      renderer.setAnimationLoop(tick);
      animating = true;
    } else {
      applyCamera(true);
      renderer.render(scene, camera);
    }
  });
}

function initUi() {
  initGlyphs();
  initCopyButtons();
  compileBtn?.addEventListener('click', renderMandate);
  renderMandate();
}

initUi();
bindSceneEvents();
initRenderer();
