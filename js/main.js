/* ==========================================================================
   MAIN.JS — comportamentos globais (navbar, menu, busca, ripple, toast)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initSearchOverlay();
  initRipple();
  initFooterYear();
  saUpdateBadges();
});

/* ---- Navbar muda ao rolar ---- */
function initNavbarScroll(){
  const nav = document.querySelector('.navbar');
  if(!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---- Menu mobile ---- */
function initMobileMenu(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* ---- Busca inteligente (overlay) ---- */
function initSearchOverlay(){
  const openBtns = document.querySelectorAll('[data-open-search]');
  const overlay = document.querySelector('.search-overlay');
  if(!overlay) return;
  const input = overlay.querySelector('input');
  const closeBtn = overlay.querySelector('.search-close');
  const results = overlay.querySelector('.search-results');

  const open = () => {
    overlay.classList.add('open');
    setTimeout(() => input.focus(), 200);
  };
  const close = () => overlay.classList.remove('open');

  openBtns.forEach(btn => btn.addEventListener('click', open));
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', e => { if(e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') close();
    if((e.ctrlKey || e.metaKey) && e.key === 'k'){ e.preventDefault(); open(); }
  });

  if(!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if(q.length < 1){ return; }
    const matches = SA_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      saCategoryName(p.category).toLowerCase().includes(q)
    ).slice(0, 8);

    if(matches.length === 0){
      results.innerHTML = `<p class="search-hint">Nenhum produto encontrado para "${q}".</p>`;
      return;
    }
    const basePath = location.pathname.includes('/pages/') ? '' : 'pages/';
    matches.forEach(p => {
      const a = document.createElement('a');
      a.href = `${basePath}product.html?id=${p.id}`;
      a.innerHTML = `<span>${p.name} <span style="color:var(--steel)">— ${p.brand}</span></span><span>${saFormatPrice(p.price)}</span>`;
      results.appendChild(a);
    });
  });
}

/* ---- Efeito ripple em botões ---- */
function initRipple(){
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn, .icon-only, .icon-btn');
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    circle.className = 'ripple';
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size/2}px`;
    circle.style.top = `${e.clientY - rect.top - size/2}px`;
    btn.style.position = btn.style.position || 'relative';
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  });
}

function initFooterYear(){
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}

/* ---- Toasts ---- */
function saToast(message){
  let wrap = document.querySelector('.toast-wrap');
  if(!wrap){
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  wrap.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

/* ---- Badges de carrinho / favoritos (contadores no navbar) ---- */
function saUpdateBadges(){
  const cart = saGetCart();
  const favs = saGetFavorites();
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount > 0 ? 'grid' : 'none';
  });
  document.querySelectorAll('[data-fav-count]').forEach(el => {
    el.textContent = favs.length;
    el.style.display = favs.length > 0 ? 'grid' : 'none';
  });
}
