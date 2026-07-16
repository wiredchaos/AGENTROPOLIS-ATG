/* =========================================================
   AGENTROPOLIS INTELLIGENCE GRID — WebGPU city (WebGL2 fallback)
   ========================================================= */
import * as THREE from '../vendor/three.webgpu.min.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas  = document.getElementById('stage');
const badge   = document.getElementById('gpu-mode');

const COL = { void:0x05030a, signal:0xff2941, holo:0x29e0ff, uv:0xa24bff, audit:0x2ea8ff, mint:0x3dff9e };
let renderer, scene, camera, clock;
let spinners = [], beamMat, ringMats = [], dust, glyphRing;
const mouse = { x:0, y:0 };

const KEY = [
  [[0,92,195],[0,18,0]], [[70,46,120],[0,26,0]], [[10,30,86],[0,34,0]], [[-84,40,100],[-20,12,0]],
  [[0,150,40],[0,0,0]], [[-52,26,60],[-46,10,-44]], [[46,18,70],[58,8,42]], [[80,64,150],[0,20,0]],
];
const camPos = new THREE.Vector3(...KEY[0][0]);
const camLook= new THREE.Vector3(...KEY[0][1]);
const tPos   = camPos.clone();
const tLook  = camLook.clone();

function glowTexture(inner='rgba(255,255,255,1)', outer='rgba(255,255,255,0)'){
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64,64,0,64,64,64);
  r.addColorStop(0, inner); r.addColorStop(0.35, inner.replace(',1)',',0.55)')); r.addColorStop(1, outer);
  g.fillStyle = r; g.fillRect(0,0,128,128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function gradientBox(){
  const geo = new THREE.BoxGeometry(1,1,1); geo.translate(0,.5,0);
  const pos = geo.attributes.position, col = new Float32Array(pos.count*3);
  for(let i=0;i<pos.count;i++){ const v = Math.pow(THREE.MathUtils.clamp(pos.getY(i),0,1),1.6); col[i*3]=v; col[i*3+1]=v; col[i*3+2]=v; }
  geo.setAttribute('color', new THREE.BufferAttribute(col,3)); return geo;
}
function buildDistrict(cx, cz, hex, count){
  const geo = gradientBox();
  const mat = new THREE.MeshBasicMaterial({ vertexColors:true, toneMapped:false });
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion();
  const c = new THREE.Color(hex), s = new THREE.Vector3(), p = new THREE.Vector3();
  let placed = 0, guard = 0;
  while(placed < count && guard++ < count*30){
    const a = Math.random()*Math.PI*2, r = 5 + Math.sqrt(Math.random())*15;
    p.set(cx + Math.cos(a)*r, 0, cz + Math.sin(a)*r);
    const tall = Math.random() < .18;
    s.set(1.6+Math.random()*3.4, tall?16+Math.random()*16:3+Math.random()*9, 1.6+Math.random()*3.4);
    m.compose(p, q, s); mesh.setMatrixAt(placed, m);
    mesh.setColorAt(placed, c.clone().multiplyScalar(.75 + Math.random()*.45)); placed++;
  }
  mesh.instanceMatrix.needsUpdate = true; if(mesh.instanceColor) mesh.instanceColor.needsUpdate = true; scene.add(mesh);
  const halo = new THREE.Mesh(new THREE.RingGeometry(19.4,21.4,64), new THREE.MeshBasicMaterial({ color:hex, transparent:true, opacity:.5, blending:THREE.AdditiveBlending, side:THREE.DoubleSide, depthWrite:false, toneMapped:false }));
  halo.rotation.x = -Math.PI/2; halo.position.set(cx,.06,cz); scene.add(halo);
  const col = new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,46,10,1,true), new THREE.MeshBasicMaterial({ color:hex, transparent:true, opacity:.28, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false }));
  col.position.set(cx,23,cz); scene.add(col);
  const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTexture(`rgba(${(hex>>16)&255},${(hex>>8)&255},${hex&255},1)`), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false }));
  spr.scale.setScalar(20); spr.position.set(cx,4,cz); scene.add(spr);
}
function buildCore(){
  const spire = new THREE.Mesh(gradientBox(), new THREE.MeshBasicMaterial({ vertexColors:true, color:COL.signal, toneMapped:false })); spire.scale.set(6,44,6); scene.add(spire);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(3.2,12,4), new THREE.MeshBasicMaterial({ color:COL.signal, toneMapped:false })); tip.position.y = 50; scene.add(tip);
  beamMat = new THREE.MeshBasicMaterial({ color:COL.signal, transparent:true, opacity:.3, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.6,240,12,1,true), beamMat); beam.position.y = 120; scene.add(beam);
  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTexture('rgba(255,41,65,1)'), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false })); coreGlow.scale.setScalar(60); coreGlow.position.y = 28; scene.add(coreGlow);
  [16,24,33].forEach((r,i)=>{ const mat = new THREE.MeshBasicMaterial({ color:COL.signal, transparent:true, opacity:.55-.12*i, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false }); const ring = new THREE.Mesh(new THREE.TorusGeometry(r,.16,8,128), mat); ring.rotation.x = Math.PI/2; ring.position.y = .4+i*.25; scene.add(ring); spinners.push({ obj:ring, s:(i%2?-1:1)*(.12+.05*i) }); ringMats.push(mat); });
  const N = 96, gp = new Float32Array(N*3);
  for(let i=0;i<N;i++){ const a = i/N*Math.PI*2; gp[i*3]=Math.cos(a)*40; gp[i*3+1]=30+Math.sin(a*6)*2.4; gp[i*3+2]=Math.sin(a)*40; }
  const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.BufferAttribute(gp,3));
  glyphRing = new THREE.Points(gg, new THREE.PointsMaterial({ color:COL.signal, size:1.4, transparent:true, opacity:.9, map:glowTexture('rgba(255,90,110,1)'), blending:THREE.AdditiveBlending, depthWrite:false, sizeAttenuation:true })); scene.add(glyphRing);
}
function buildAtmosphere(){
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1400,1400), new THREE.MeshBasicMaterial({ color:0x070410 })); ground.rotation.x = -Math.PI/2; ground.position.y = -.02; scene.add(ground);
  const g1 = new THREE.GridHelper(700,70,COL.signal,0x1b0a20); g1.material.transparent = true; g1.material.opacity = .34; scene.add(g1);
  const g2 = new THREE.GridHelper(700,350,0x000000,0x120818); g2.material.transparent = true; g2.material.opacity = .5; g2.position.y=.01; scene.add(g2);
  const planet = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTexture('rgba(140,10,30,1)'), transparent:true, opacity:.9, blending:THREE.AdditiveBlending, depthWrite:false })); planet.scale.setScalar(340); planet.position.set(-90,150,-420); scene.add(planet);
  const SN = 900, sp = new Float32Array(SN*3);
  for(let i=0;i<SN;i++){ const a = Math.random()*Math.PI*2, r = 260+Math.random()*420; sp[i*3]=Math.cos(a)*r; sp[i*3+1]=30+Math.random()*380; sp[i*3+2]=Math.sin(a)*r; }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp,3)); scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color:0x9fb4ff, size:.9, transparent:true, opacity:.7, depthWrite:false })));
  const DN = innerWidth < 700 ? 260 : 620, dp = new Float32Array(DN*3);
  for(let i=0;i<DN;i++){ dp[i*3]=(Math.random()-.5)*260; dp[i*3+1]=Math.random()*90; dp[i*3+2]=(Math.random()-.5)*260; }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp,3));
  dust = new THREE.Points(dg, new THREE.PointsMaterial({ color:COL.holo, size:.55, transparent:true, opacity:.55, map:glowTexture('rgba(120,230,255,1)'), blending:THREE.AdditiveBlending, depthWrite:false })); scene.add(dust);
}
async function boot(){
  renderer = new THREE.WebGPURenderer({ canvas, antialias:true }); await renderer.init();
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)); renderer.setSize(innerWidth,innerHeight);
  badge.innerHTML = renderer.backend && renderer.backend.isWebGPUBackend ? 'WEBGPU' : 'WEBGL2';
  scene = new THREE.Scene(); scene.background = new THREE.Color(COL.void); scene.fog = new THREE.FogExp2(COL.void,0.0052);
  camera = new THREE.PerspectiveCamera(52,innerWidth/innerHeight,.1,1200); clock = new THREE.Clock();
  buildAtmosphere(); buildCore();
  const R = 68, districts = [COL.uv, COL.holo, COL.signal, COL.audit, COL.mint];
  districts.forEach((hex,i)=>{ const a = -Math.PI/2 + i*(Math.PI*2/5); buildDistrict(Math.cos(a)*R, Math.sin(a)*R, hex, 54); });
  addEventListener('resize',()=>{ camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });
  addEventListener('pointermove',e=>{ mouse.x = (e.clientX/innerWidth-.5)*2; mouse.y = (e.clientY/innerHeight-.5)*2; },{ passive:true });
  updateTargets(); addEventListener('scroll', updateTargets, { passive:true });
  if(reduced){ camPos.copy(tPos); camLook.copy(tLook); camera.position.copy(camPos); camera.lookAt(camLook); renderer.render(scene,camera); addEventListener('scroll',()=>{ camPos.copy(tPos); camLook.copy(tLook); camera.position.copy(camPos); camera.lookAt(camLook); renderer.render(scene,camera); },{ passive:true }); return; }
  renderer.setAnimationLoop(tick);
}
const sections = [...document.querySelectorAll('[data-cam]')];
function updateTargets(){
  const mid = scrollY + innerHeight*.5; let seg = 0, f = 0;
  for(let i=0;i<sections.length;i++){ const el = sections[i], top = el.offsetTop, h = el.offsetHeight; if(mid >= top && mid < top+h){ seg=i; f=THREE.MathUtils.clamp((mid-top)/h,0,1); break; } if(mid >= top+h){ seg=i; f=1; } }
  const a = KEY[Math.min(seg,KEY.length-1)], b = KEY[Math.min(seg+1,KEY.length-1)], e = f*f*(3-2*f);
  tPos.set(THREE.MathUtils.lerp(a[0][0],b[0][0],e),THREE.MathUtils.lerp(a[0][1],b[0][1],e),THREE.MathUtils.lerp(a[0][2],b[0][2],e));
  tLook.set(THREE.MathUtils.lerp(a[1][0],b[1][0],e),THREE.MathUtils.lerp(a[1][1],b[1][1],e),THREE.MathUtils.lerp(a[1][2],b[1][2],e));
}
function tick(){
  const t = clock.getElapsedTime(); camPos.lerp(tPos,.045); camLook.lerp(tLook,.045);
  camera.position.set(camPos.x + mouse.x*4 + Math.sin(t*.22)*1.6, camPos.y - mouse.y*2.5 + Math.sin(t*.31)*.9, camPos.z); camera.lookAt(camLook);
  spinners.forEach(s=> s.obj.rotation.z += s.s*.008); if(glyphRing) glyphRing.rotation.y = t*.08; if(dust) dust.rotation.y = t*.012;
  const pulse = .28 + Math.sin(t*2.1)*.1; if(beamMat) beamMat.opacity = pulse; ringMats.forEach((m,i)=> m.opacity = (.55-.12*i) + Math.sin(t*2.1+i)*.08);
  renderer.render(scene,camera);
}
boot().catch(err=>{ console.warn('[grid] 3D core unavailable — falling back to static sky.', err); badge.innerHTML = 'STATIC'; canvas.style.display = 'none'; });

const io = new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }}); },{ threshold:.12 });
document.querySelectorAll('.rv').forEach(el=> io.observe(el));
function copyClone(){ navigator.clipboard?.writeText(document.getElementById('clone-cmd').textContent.trim()); const c = document.getElementById('copied'); c.classList.add('show'); setTimeout(()=>c.classList.remove('show'),1800); }
document.getElementById('copy-clone').addEventListener('click', copyClone); document.getElementById('copy-hero').addEventListener('click', copyClone);

const GLYPHS = [
  { g:'𐌀', n:'A · AR', s:'ah', f:'Structure', m:'Origin · first spark · initiation', u:'Begins declarations and genesis events.' },
  { g:'𐌁', n:'B · BEL', s:'beh', f:'Structure', m:'Boundary · enclosure · scope', u:'Marks the scope walls of a mandate.' },
  { g:'𐌂', n:'C · CAI', s:'kah', f:'Exchange', m:'Channel · carry · route', u:'Opens a routing path between agents.' },
  { g:'𐌃', n:'D · DUR', s:'duh', f:'Authority', m:'Decree · durable rule', u:'Binds a policy constraint to execution.' },
  { g:'𐌄', n:'E · ETH', s:'eh', f:'Evidence', m:'Witness · observation', u:'Attaches observed state to a claim.' },
  { g:'𐌅', n:'F · FEN', s:'feh', f:'Structure', m:'Gate · checkpoint', u:'Declares a policy gate in the pipeline.' },
  { g:'𐌆', n:'Z · ZAR', s:'zah', f:'Exchange', m:'Value · charge', u:'Carries price, budget, and cost terms.' },
  { g:'𐌇', n:'H · HOL', s:'hah', f:'Evidence', m:'Whole · integrity', u:'Asserts artifact integrity via hash.' },
  { g:'𐌈', n:'Θ · THU', s:'thu', f:'Authority', m:'Seal · closure', u:'Seals a message against mutation.' },
  { g:'𐌉', n:'I · IN', s:'ee', f:'Structure', m:'Identity · self', u:'Names the acting agent identity.' },
  { g:'𐌊', n:'K · KOR', s:'kor', f:'Authority', m:'Key · permission', u:'Grants a scoped, revocable permission.' },
  { g:'𐌋', n:'L · LUN', s:'loo', f:'Structure', m:'Link · dependency', u:'Declares a dependency between skills.' },
  { g:'𐌌', n:'M · MAN', s:'mah', f:'Authority', m:'Mandate · mission', u:'Wraps human intent as a mission object.' },
  { g:'𐌍', n:'N · NAR', s:'nah', f:'Evidence', m:'Narrative · account', u:'Carries the status log of a run.' },
  { g:'𐌎', n:'Ξ · XEN', s:'ksen', f:'Exchange', m:'Foreign · external system', u:'Marks calls that leave the grid.' },
  { g:'𐌏', n:'O · OM', s:'oh', f:'Structure', m:'Cycle · loop', u:'Declares recurring scheduled mandates.' },
  { g:'𐌐', n:'P · PAX', s:'pah', f:'Authority', m:'Accord · acceptance', u:'Records offer acceptance by both sides.' },
  { g:'𐌑', n:'Ś · SAN', s:'shah', f:'Evidence', m:'Sanction · verdict', u:'Carries validator pass/fail verdicts.' },
  { g:'𐌒', n:'Q · QOR', s:'koh', f:'Exchange', m:'Query · request', u:'Requests capability or price discovery.' },
  { g:'𐌓', n:'R · REZ', s:'reh', f:'Exchange', m:'Receipt · proof of work', u:'Issues the signed execution receipt.' },
  { g:'𐌔', n:'S · SOL', s:'soh', f:'Structure', m:'Skill · capability', u:'Declares an executable capability.' },
  { g:'𐌕', n:'T · TOR', s:'tor', f:'Authority', m:'Threshold · limit', u:'Sets budget caps and rate limits.' },
  { g:'𐌖', n:'U · UM', s:'oo', f:'Evidence', m:'Trace · lineage', u:'Chains receipts into an audit spine.' },
  { g:'𐌗', n:'X · XA', s:'ksah', f:'Authority', m:'Revocation · kill switch', u:'Revokes authority and halts execution.' },
];
const grid = document.getElementById('glyph-grid');
GLYPHS.forEach((g,i)=>{ const b = document.createElement('button'); b.type='button'; b.className='gcell'+(i===0?' sel':''); b.setAttribute('role','option'); b.setAttribute('aria-label',g.n); b.textContent = g.g; b.addEventListener('click',()=>{ grid.querySelector('.sel')?.classList.remove('sel'); b.classList.add('sel'); document.getElementById('gi-mark').textContent = g.g; document.getElementById('gi-name').textContent = g.n; document.getElementById('gi-mean').textContent = g.m; document.getElementById('gi-sound').textContent = g.s; document.getElementById('gi-family').textContent = g.f; document.getElementById('gi-use').textContent = g.u; }); grid.appendChild(b); });

const phases = [...document.querySelectorAll('#phase span')];
const out = document.getElementById('con-out');
document.getElementById('compile').addEventListener('click',()=>{
  const intent = document.getElementById('con-in').value.trim() || 'unspecified intent';
  const budget = (intent.match(/(\d+(?:\.\d+)?)\s*(usdc|usd)/i)||[])[1] || '25';
  const readOnly = /read[- ]?only/i.test(intent);
  const id = 'MND_' + Date.now().toString(36).toUpperCase();
  phases.forEach(p=>p.classList.remove('lit'));
  const mandate = `<span class="g">𐌌 MANDATE</span> {
  <span class="k">"atg"</span>:        <span class="v">"1.0"</span>,
  <span class="k">"id"</span>:         <span class="v">"${id}"</span>,
  <span class="k">"intent"</span>:     <span class="v">"${intent.replace(/"/g,'\\"')}"</span>,
  <span class="k">"authority"</span>:  { <span class="k">"mode"</span>: <span class="v">"${readOnly?'read_only':'supervised'}"</span>, <span class="k">"revocable"</span>: <span class="v">true</span> },
  <span class="k">"budget"</span>:     { <span class="k">"cap"</span>: <span class="v">${budget}</span>, <span class="k">"unit"</span>: <span class="v">"USDC"</span> },
  <span class="k">"evidence"</span>:   [<span class="v">"artifact_hash"</span>, <span class="v">"status_log"</span>],
  <span class="k">"settlement"</span>: <span class="v">"receipt_gated"</span>
}
<span class="g">𐌓 RECEIPT_PENDING</span> — awaiting policy gate · route · execution`;
  let step = 0; out.innerHTML = '<span class="v">compiling…</span>';
  const iv = setInterval(()=>{ if(step < phases.length){ phases[step].classList.add('lit'); step++; } else { clearInterval(iv); out.innerHTML = mandate; } }, reduced ? 0 : 380);
});
