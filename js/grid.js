/* =========================================================
   AGENTROPOLIS INTELLIGENCE GRID — WebGPU city (WebGL2 fallback)
   ========================================================= */

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('stage');
const badge = document.getElementById('gpu-mode');
const COL = { void:0x05030a, signal:0xff2941, holo:0x29e0ff, uv:0xa24bff,