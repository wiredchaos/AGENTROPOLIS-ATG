const glyphs=[
{l:'A',n:'AR',s:'𐌀',sound:'ah',meaning:'Origin · first spark · initiation',family:'Structure',use:'Begins declarations and genesis events.'},
{l:'B',n:'BEL',s:'𐌁',sound:'beh',meaning:'Body · vessel · embodied runtime',family:'Structure',use:'Marks an agent body, host, or execution vessel.'},
{l:'D',n:'DOR',s:'𐌃',sound:'dor',meaning:'Gate · threshold · permission boundary',family:'Structure',use:'Marks entry, exit, access, and authorization gates.'},
{l:'E',n:'ESH',s:'𐌄',sound:'eh',meaning:'Current · motion · active transfer',family:'Flow',use:'Signals movement of data, value, or control.'},
{l:'F',n:'FEN',s:'𐌅',sound:'fen',meaning:'Weave · network · shared mesh',family:'Flow',use:'Represents agent networks, chains, and routing fabric.'},
{l:'G',n:'GHAR',s:'𐌂',sound:'gar',meaning:'Force · engine · execution power',family:'Force',use:'Marks compute, actuation, and powered execution.'},
{l:'H',n:'HEL',s:'𐌇',sound:'hel',meaning:'Breath · signal life · active presence',family:'Flow',use:'Indicates a live agent, heartbeat, or active process.'},
{l:'I',n:'IR',s:'𐌉',sound:'ee',meaning:'Sight · signal · observed state',family:'Flow',use:'Marks perception, telemetry, and visible evidence.'},
{l:'K',n:'KOR',s:'𐌊',sound:'kor',meaning:'Edge · command · directed authority',family:'Structure',use:'Defines commands and bounded execution intent.'},
{l:'L',n:'LUN',s:'𐌋',sound:'loon',meaning:'Line · law · governing constraint',family:'Structure',use:'Represents policy, rules, and enforceable limits.'},
{l:'M',n:'MOR',s:'𐌌',sound:'mor',meaning:'Memory · archive · retained state',family:'Structure',use:'Marks memory, records, provenance, and history.'},
{l:'N',n:'NAR',s:'𐌍',sound:'nar',meaning:'Name · identity · declared self',family:'Structure',use:'Begins identity and role declarations.'},
{l:'O',n:'OR',s:'𐌏',sound:'or',meaning:'Whole · sphere · complete system',family:'Structure',use:'Represents a complete protocol object or system.'},
{l:'P',n:'PRA',s:'𐌐',sound:'prah',meaning:'Projection · publication · outward claim',family:'Flow',use:'Marks published capability, offer, or attestation.'},
{l:'R',n:'RHE',s:'𐌓',sound:'ray',meaning:'Flow · will · chosen direction',family:'Flow',use:'Represents routing, priority, and selected action.'},
{l:'S',n:'SYN',s:'𐌔',sound:'sin',meaning:'Link · bind · negotiated relationship',family:'Flow',use:'Marks agreements, chains, and agent coalitions.'},
{l:'T',n:'TOR',s:'𐌕',sound:'tor',meaning:'Pillar · structure · stable protocol',family:'Structure',use:'Represents schema, contract, and durable structure.'},
{l:'U',n:'UR',s:'𐌖',sound:'oor',meaning:'Root · foundation · source authority',family:'Structure',use:'Marks base policy, root identity, and origin state.'},
{l:'V',n:'VAEL',s:'𐌖̇',sound:'vayl',meaning:'Watch · verification · guarded perception',family:'Force',use:'Marks audit, validation, and continuous monitoring.'},
{l:'X',n:'XEN',s:'𐌗',sound:'ksen',meaning:'Anomaly · unknown · untrusted input',family:'Force',use:'Flags unresolved, external, or adversarial state.'},
{l:'Y',n:'YRA',s:'𐌙',sound:'ee-rah',meaning:'Echo · reflection · transformed return',family:'Flow',use:'Marks responses, mirrors, summaries, and derived output.'},
{l:'Z',n:'ZOR',s:'𐌆',sound:'zor',meaning:'Fire · urgency · critical intensity',family:'Force',use:'Escalates risk, priority, or irreversible action.'},
{l:'Q',n:'QEL',s:'◉',sound:'kel',meaning:'Seal · key · protected authority',family:'Force',use:'Marks signatures, credentials, and gated power.'},
{l:'C',n:'CYR',s:'⌬',sound:'seer',meaning:'Cipher · transformation · encoded change',family:'Force',use:'Marks translation, conversion, and protocol adaptation.'}
];

const grid=document.querySelector('#glyph-grid');
const active={symbol:document.querySelector('#active-glyph'),letter:document.querySelector('#glyph-letter'),name:document.querySelector('#glyph-name'),meaning:document.querySelector('#glyph-meaning'),sound:document.querySelector('#glyph-sound'),family:document.querySelector('#glyph-family'),use:document.querySelector('#glyph-use')};
function selectGlyph(g,index){document.querySelectorAll('.glyph-button').forEach((b,i)=>b.classList.toggle('active',i===index));active.symbol.textContent=g.s;active.letter.textContent=g.l;active.name.textContent=g.n;active.meaning.textContent=g.meaning;active.sound.textContent=g.sound;active.family.textContent=g.family;active.use.textContent=g.use;}
glyphs.forEach((g,i)=>{const button=document.createElement('button');button.className='glyph-button'+(i===0?' active':'');button.innerHTML=`<span class="glyph-symbol">${g.s}</span><span class="glyph-code">${g.l} · ${g.n}</span>`;button.addEventListener('click',()=>selectGlyph(g,i));grid.appendChild(button)});

const reduceMotionLocal=matchMedia('(prefers-reduced-motion: reduce)').matches;
const output=document.querySelector('#console-output');
const compile=document.querySelector('#compile');
const consoleSteps=['compiling mandate envelope','negotiating capabilities','routing to policy-gated workers','generating simulated receipt'];
let terminalTimer;
function writeTerminal(text){
  clearInterval(terminalTimer);
  if(reduceMotionLocal){output.textContent=text;return;}
  output.textContent='';
  let index=0;
  terminalTimer=setInterval(()=>{output.textContent=text.slice(0,++index);if(index>=text.length)clearInterval(terminalTimer)},7);
}
function renderMandate(){
  const intent=document.querySelector('#intent-input').value.trim();
  const highRisk=/secret|wallet|payment|delete|deploy|credential|private/i.test(intent);
  const budget=(intent.match(/(\d+(?:\.\d+)?)\s*(USDC|USD|ETH|BTC|DOGE)/i)||[]);
  const payload={protocol:'atranic/0.1',message_type:'mandate',phase:'live_mandate_compilation',glyph_header:'NAR · KOR · LUN · VAEL · RECP',trace:consoleSteps.map((step,index)=>({step:index+1,status:'simulated_ok',event:step})),intent,authority:{mode:/read.only|read only|audit/i.test(intent)?'observe':'draft',allowed_actions:/audit|repository/i.test(intent)?['read_repository','run_static_analysis','emit_findings']:['analyze','draft','request_capability'],forbidden_actions:['exceed_authority','hide_side_effects','settle_without_receipt']},economics:budget[1]?{currency:(budget[2]||'').toUpperCase(),maximum_amount:Number(budget[1])}:null,evidence:{required:true,types:['artifact','receipt','routing_log']},risk:{level:highRisk?'high':'moderate',human_review_required:highRisk},routing:{visualization:'simulated_policy_route',hops:['mandate_builder','capability_registry','policy_gate','receipt_engine']},receipt_preview:{id:'recp_sim_'+Math.random().toString(16).slice(2,10),settlement:'pending_simulated_verification',signature:'pending_simulated_signature'}};
  writeTerminal(JSON.stringify(payload,null,2));
}
compile.addEventListener('click',renderMandate);
renderMandate();

document.querySelectorAll('.copy-button').forEach(button=>button.addEventListener('click',async()=>{const text=button.dataset.copy;try{await navigator.clipboard.writeText(text);const before=button.textContent;button.textContent='COPIED';setTimeout(()=>button.textContent=before,1400)}catch{button.textContent='COPY FAILED'}}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const end=Number(el.dataset.count);let value=0;const step=Math.max(1,Math.ceil(end/28));const timer=setInterval(()=>{value=Math.min(end,value+step);el.textContent=value;if(value===end)clearInterval(timer)},35);countObserver.unobserve(el)}),{threshold:.5});document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));

const canvas=document.querySelector('#signal-field'),ctx=canvas.getContext('2d');let points=[];function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);points=Array.from({length:Math.min(90,Math.floor(innerWidth/15))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}function drawSignalField(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of points){ctx.fillStyle='rgba(96,239,255,.34)';ctx.fillRect(p.x,p.y,1,1)}for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<125){ctx.strokeStyle=`rgba(96,239,255,${(1-d/125)*.07})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}function animate(){for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1}drawSignalField();requestAnimationFrame(animate)}addEventListener('resize',()=>{resize();drawSignalField()});resize();if(reduceMotionLocal){drawSignalField()}else{animate()}
