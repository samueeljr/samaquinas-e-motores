/* ==========================================================================
   ANIMATIONS.JS — scroll reveal + contadores animados
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
});

function initScrollReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  if(!items.length) return;
  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
}

function initCounters(){
  const counters = document.querySelectorAll('[data-counter]');
  if(!counters.length) return;
  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      el.textContent = value.toLocaleString('pt-BR') + suffix;
      if(progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('pt-BR') + suffix;
    };
    requestAnimationFrame(step);
  };

  if(!('IntersectionObserver' in window)){
    counters.forEach(animate);
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .5 });
  counters.forEach(el => io.observe(el));
}

/* ---- Slider genérico de banners (usado na home) ---- */
function saInitSlider(root){
  const slides = root.querySelectorAll('.slide');
  const dotsWrap = root.querySelector('.slide-dots');
  if(!slides.length) return;
  let index = 0;
  let timer;

  slides.forEach((s, i) => {
    if(dotsWrap){
      const dot = document.createElement('button');
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => go(i));
      dotsWrap.appendChild(dot);
    }
  });

  function go(i){
    slides[index].classList.remove('active');
    dotsWrap?.children[index]?.classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
    dotsWrap?.children[index]?.classList.add('active');
    resetTimer();
  }
  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 5500);
  }
  root.querySelector('.slide-next')?.addEventListener('click', () => go(index + 1));
  root.querySelector('.slide-prev')?.addEventListener('click', () => go(index - 1));
  resetTimer();
}
