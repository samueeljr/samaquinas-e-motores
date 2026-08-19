/* ==========================================================================
   PRODUCTS.JS — carrinho, favoritos e renderização de cards de produto
   ========================================================================== */

const SA_CART_KEY = 'sa_cart_v1';
const SA_FAV_KEY = 'sa_favorites_v1';

/* ---- Carrinho (localStorage) ---- */
function saGetCart(){
  try{ return JSON.parse(localStorage.getItem(SA_CART_KEY)) || []; }
  catch(e){ return []; }
}
function saSaveCart(cart){
  localStorage.setItem(SA_CART_KEY, JSON.stringify(cart));
  saUpdateBadges();
}
function saAddToCart(id, qty = 1){
  const cart = saGetCart();
  const existing = cart.find(i => i.id === id);
  if(existing){ existing.qty += qty; }
  else{ cart.push({ id, qty }); }
  saSaveCart(cart);
  const p = saGetProduct(id);
  saToast(`"${p ? p.name : 'Produto'}" adicionado ao carrinho.`);
}
function saRemoveFromCart(id){
  saSaveCart(saGetCart().filter(i => i.id !== id));
}
function saSetQty(id, qty){
  const cart = saGetCart();
  const item = cart.find(i => i.id === id);
  if(item){ item.qty = Math.max(1, qty); }
  saSaveCart(cart);
}
function saCartDetailed(){
  return saGetCart().map(i => ({ ...i, product: saGetProduct(i.id) })).filter(i => i.product);
}
function saCartSubtotal(){
  return saCartDetailed().reduce((sum, i) => sum + i.product.price * i.qty, 0);
}

/* ---- Favoritos (localStorage) ---- */
function saGetFavorites(){
  try{ return JSON.parse(localStorage.getItem(SA_FAV_KEY)) || []; }
  catch(e){ return []; }
}
function saToggleFavorite(id){
  let favs = saGetFavorites();
  const has = favs.includes(id);
  favs = has ? favs.filter(f => f !== id) : [...favs, id];
  localStorage.setItem(SA_FAV_KEY, JSON.stringify(favs));
  saUpdateBadges();
  saToast(has ? 'Removido dos favoritos.' : 'Adicionado aos favoritos.');
  return !has;
}
function saIsFavorite(id){ return saGetFavorites().includes(id); }

/* ---- Estrelas de avaliação ---- */
function saStars(rating){
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

/* ---- Card de produto (HTML) ---- */
function saProductCardHTML(p, basePath = ''){
  const isOut = p.stock === 0;
  const stockLabel = isOut ? 'Esgotado' : (p.stock <= 5 ? `Últimas ${p.stock} unid.` : 'Em estoque');
  const stockClass = isOut ? 'out' : (p.stock <= 5 ? 'low' : '');
  const tagHTML = p.tag === 'promo' ? '<span class="tag promo">Promoção</span>'
    : p.tag === 'new' ? '<span class="tag new">Novidade</span>'
    : isOut ? '<span class="tag out">Esgotado</span>' : '';
  const fav = saIsFavorite(p.id);
  const installmentVal = (p.price / p.installments).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });

  return `
  <article class="product-card" data-id="${p.id}" data-category="${p.category}" data-brand="${p.brand}" data-price="${p.price}">
    <span class="rivet tl"></span><span class="rivet tr"></span>
    <a href="${basePath}product.html?id=${p.id}" class="product-media">
      ${tagHTML}
      <button class="fav-btn ${fav ? 'active' : ''}" data-fav-toggle="${p.id}" aria-label="Favoritar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.9-10-9.3C.4 8 2 4.5 5.6 4c2-.3 3.8.7 6.4 3.2C14.6 4.7 16.4 3.7 18.4 4c3.6.5 5.2 4 3.6 7.7C20 16.1 12 21 12 21z"/></svg>
      </button>
      ${SA_ICONS[(SA_CATEGORIES.find(c=>c.slug===p.category)||{}).icon || 'peca']}
      <img class="media-photo" src="${saProductImagePath(p, basePath)}" alt="${p.name}" loading="lazy" onerror="this.remove()">
    </a>
    <div class="product-info">
      <span class="product-brand">${p.brand}</span>
      <h3 class="product-name"><a href="${basePath}product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-rating"><span class="stars">${saStars(p.rating)}</span><span>${p.rating.toFixed(1)} (${p.reviews})</span></div>
      <span class="product-stock ${stockClass}">${stockLabel}</span>
      <div class="product-price-row">
        <div class="price-block">
          ${p.oldPrice ? `<div class="old-price">${saFormatPrice(p.oldPrice)}</div>` : ''}
          <div class="price">${saFormatPrice(p.price)}</div>
          <div class="installment">ou ${p.installments}x de ${installmentVal}</div>
        </div>
        <div class="product-actions">
          <button class="icon-only" data-add-cart="${p.id}" aria-label="Adicionar ao carrinho" ${isOut ? 'disabled style="opacity:.4;cursor:not-allowed;"' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M2 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6"/></svg>
          </button>
        </div>
      </div>
    </div>
  </article>`;
}

function saRenderGrid(container, products, basePath = ''){
  if(!container) return;
  if(products.length === 0){
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
      <p>Nenhum produto encontrado com esses filtros.</p>
    </div>`;
    return;
  }
  container.innerHTML = products.map(p => saProductCardHTML(p, basePath)).join('');
}

/* ---- Delegação global de eventos: adicionar ao carrinho / favoritar ---- */
document.addEventListener('click', e => {
  const addBtn = e.target.closest('[data-add-cart]');
  if(addBtn && !addBtn.disabled){
    e.preventDefault();
    saAddToCart(addBtn.getAttribute('data-add-cart'), 1);
  }
  const favBtn = e.target.closest('[data-fav-toggle]');
  if(favBtn){
    e.preventDefault();
    const active = saToggleFavorite(favBtn.getAttribute('data-fav-toggle'));
    favBtn.classList.toggle('active', active);
  }
});
