const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion){
  document.body.insertAdjacentHTML('beforeend','<div class="motion-beam" aria-hidden="true"></div>');
  const symbols=['𐌀','𐌍','𐌊','𐌔','◉','⌬','𐌗','𐌖̇'];
  symbols.forEach((symbol,index)=>{const el=document.createElement('span');el.className='orbital-glyph '+(index%3===0?'red':index%3===1?'green':'');el.textContent=symbol;el.style.left=`${(index*13)%90}%`;el.style.setProperty('--dur',`${16+index*2}s`);el.style.animationDelay=`-${index*2.2}s`;document.body.appendChild(el)});
  document.querySelectorAll('[data-tilt]').forEach(card=>{
    card.addEventListener('pointermove',event=>{const box=card.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5;const y=(event.clientY-box.top)/box.height-.5;card.style.transform=`rotateX(${-y*8}deg) rotateY(${x*10}deg) translateY(-5px)`});
    card.addEventListener('pointerleave',()=>card.style.transform='rotateX(0) rotateY(0) translateY(0)');
  });
  addEventListener('pointermove',event=>{const x=(event.clientX/innerWidth-.5)*10;const y=(event.clientY/innerHeight-.5)*8;document.querySelector('.holo-stone')?.style.setProperty('transform',`translate3d(${x}px,${y}px,0)`)});
}
addEventListener('scroll',()=>document.querySelector('.site-header')?.classList.toggle('scrolled',scrollY>24),{passive:true});