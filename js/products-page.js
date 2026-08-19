/* ==========================================================================
   PRODUCTS-PAGE.JS — lógica exclusiva da página de catálogo
   ========================================================================== */

const saState = {
  search: '',
  categories: new Set(),
  maxPrice: 5500,
  sort: 'relevance'
};

document.addEventListener('DOMContentLoaded', () => {
  applyUrlParams();
  renderCategoryFilters();
  bindToolbar();
  bindMobileFilters();
  renderCatalog();
});

function applyUrlParams(){
  const params = new URLSearchParams(location.search);
  const cat = params.get('cat');
  if(cat) saState.categories.add(cat);
}

function renderCategoryFilters(){
  const wrap = document.getElementById('filter-categories');
  wrap.innerHTML = SA_CATEGORIES.map(c => {
    const count = SA_PRODUCTS.filter(p => p.category === c.slug).length;
    const checked = saState.categories.has(c.slug) ? 'checked' : '';
    return `<label class="filter-option">
      <input type="checkbox" value="${c.slug}" data-filter="category" ${checked}>
      ${c.name}<span class="count">${count}</span>
    </label>`;
  }).join('');
  wrap.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', () => {
      input.checked ? saState.categories.add(input.value) : saState.categories.delete(input.value);
      renderCatalog();
    });
  });
}

function bindToolbar(){
  const liveSearch = document.getElementById('liveSearch');
  liveSearch.addEventListener('input', () => {
    saState.search = liveSearch.value.trim().toLowerCase();
    renderCatalog();
  });

  document.getElementById('sortSelect').addEventListener('change', e => {
    saState.sort = e.target.value;
    renderCatalog();
  });

  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  priceRange.addEventListener('input', () => {
    saState.maxPrice = parseInt(priceRange.value, 10);
    priceValue.textContent = `Até ${saFormatPrice(saState.maxPrice)}`;
    renderCatalog();
  });

  document.getElementById('clearFilters').addEventListener('click', () => {
    saState.search = ''; saState.categories.clear();
    saState.maxPrice = 5500;
    document.getElementById('liveSearch').value = '';
    document.getElementById('priceRange').value = 5500;
    document.getElementById('priceValue').textContent = 'Até R$ 5.500,00';
    document.querySelectorAll('#filter-categories input').forEach(i => i.checked = false);
    renderCatalog();
  });
}

function bindMobileFilters(){
  const filters = document.getElementById('filters');
  const openBtn = document.getElementById('openFilters');
  const closeBtn = document.getElementById('closeFilters');
  if(!openBtn) return;
  closeBtn.style.display = 'inline-block';
  const backdrop = document.createElement('div');
  backdrop.className = 'filters-backdrop';
  document.body.appendChild(backdrop);

  const open = () => { filters.classList.add('open'); backdrop.classList.add('open'); };
  const close = () => { filters.classList.remove('open'); backdrop.classList.remove('open'); };
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
}

function renderActiveChips(){
  const wrap = document.getElementById('activeFilters');
  const chips = [];
  saState.categories.forEach(c => chips.push({ label: saCategoryName(c), clear: () => saState.categories.delete(c) }));

  wrap.innerHTML = chips.map((c, i) => `<span class="chip">${c.label} <button data-chip="${i}">✕</button></span>`).join('');
  wrap.querySelectorAll('[data-chip]').forEach(btn => {
    btn.addEventListener('click', () => {
      chips[parseInt(btn.getAttribute('data-chip'), 10)].clear();
      renderCategoryFilters(); renderCatalog();
    });
  });
}

function renderCatalog(){
  let list = SA_PRODUCTS.filter(p => {
    if(saState.search && !(p.name.toLowerCase().includes(saState.search) || p.brand.toLowerCase().includes(saState.search))) return false;
    if(saState.categories.size && !saState.categories.has(p.category)) return false;
    if(p.price > saState.maxPrice) return false;
    return true;
  });

  switch(saState.sort){
    case 'price-asc': list.sort((a,b) => a.price - b.price); break;
    case 'price-desc': list.sort((a,b) => b.price - a.price); break;
    case 'rating': list.sort((a,b) => b.rating - a.rating); break;
    case 'name': list.sort((a,b) => a.name.localeCompare(b.name)); break;
  }

  document.getElementById('resultsCount').textContent = `${list.length} produto${list.length !== 1 ? 's' : ''} encontrado${list.length !== 1 ? 's' : ''}`;
  renderActiveChips();
  saRenderGrid(document.getElementById('productsGrid'), list, '');
}
