const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initCriticalUI(){
  initReveal();
  initClipboard();
  initGlyphs();
  initCompiler();
}

function initReveal(){
  const items = [...document.querySelectorAll('.rv')];
  if(reduced || !('IntersectionObserver' in window)){
    items.forEach(el=>el.classList.add('in'));
    return;
  }
