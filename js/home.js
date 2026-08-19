/* ==========================================================================
   HOME.JS — inicialização de conteúdo dinâmico da página inicial
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderHeroIcon();
  renderCategoryStrip();
  renderFeaturedProducts();
  renderTestimonials();
});

function renderHeroIcon(){
  const field = document.getElementById('hero-icon-field');
  if(field) field.innerHTML = SA_ICONS.motosserra;
}

function renderCategoryStrip(){
  const strip = document.getElementById('cat-strip');
  if(!strip) return;
  strip.innerHTML = SA_CATEGORIES.map(c => `
    <a class="cat-item" href="pages/products.html?cat=${c.slug}">
      ${SA_ICONS[c.icon]}
      <span>${c.name}</span>
    </a>
  `).join('');
}

function renderFeaturedProducts(){
  const grid = document.getElementById('featured-grid');
  if(!grid) return;
  const featured = SA_PRODUCTS.filter(p => p.tag === 'promo' || p.tag === 'new').slice(0, 8);
  saRenderGrid(grid, featured, 'pages/');
}

function renderTestimonials(){
  const grid = document.getElementById('testimonials-grid');
  if(!grid) return;
  grid.innerHTML = SA_TESTIMONIALS.map(t => `
    <div class="testi-card" data-reveal>
      <span class="stars">${saStars(t.stars)}</span>
      <p>"${t.text}"</p>
      <div class="testi-who">
        <div class="testi-avatar">${t.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
        <div><b>${t.name}</b><span>${t.role}</span></div>
      </div>
    </div>
  `).join('');
}
