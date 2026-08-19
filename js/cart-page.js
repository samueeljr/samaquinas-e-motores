/* ==========================================================================
   CART-PAGE.JS
   ========================================================================== */

const SA_COUPONS = { 'SAMAQUINAS10': 0.10, 'FRETEGRATIS': 'freight' };
let saAppliedCoupon = null;

document.addEventListener('DOMContentLoaded', renderCartPage);

function renderCartPage(){
  const root = document.getElementById('cartRoot');
  const items = saCartDetailed();

  if(items.length === 0){
    root.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M2 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6"/></svg>
        <h3>Seu carrinho está vazio</h3>
        <p style="color:var(--text-body);margin-bottom:24px;">Explore nosso catálogo e encontre o equipamento certo para o seu trabalho.</p>
        <a href="products.html" class="btn btn-primary">Ver catálogo</a>
      </div>`;
    return;
  }

  root.innerHTML = `
    <div class="cart-layout">
      <div id="cartItemsList"></div>
      <aside class="summary-box">
        <h3>Resumo do pedido</h3>
        <div class="summary-row"><span>Subtotal</span><span id="sumSubtotal"></span></div>
        <div class="summary-row"><span>Frete</span><span id="sumShipping"></span></div>
        <div class="summary-row" id="sumDiscountRow" style="display:none;"><span>Desconto</span><span id="sumDiscount"></span></div>
        <div class="coupon-row">
          <input type="text" id="couponInput" placeholder="Cupom de desconto">
          <button class="btn btn-outline dark btn-sm" id="applyCoupon">Aplicar</button>
        </div>
        <p class="coupon-msg" id="couponMsg"></p>
        <div class="summary-row total"><span>Total</span><span id="sumTotal"></span></div>
        <button class="btn btn-primary btn-block" id="checkoutBtn" style="margin-top:16px;">Finalizar compra</button>
        <p style="font-family:var(--f-mono);font-size:.7rem;color:var(--text-body);margin-top:12px;">Experimente o cupom <b>SAMAQUINAS10</b> para 10% off.</p>
      </aside>
    </div>`;

  renderCartItems();
  bindCouponAndCheckout();
  updateSummary();
}

function renderCartItems(){
  const list = document.getElementById('cartItemsList');
  const items = saCartDetailed();
  list.innerHTML = items.map(i => {
    const icon = SA_ICONS[(SA_CATEGORIES.find(c => c.slug === i.product.category) || {}).icon] || SA_ICONS.peca;
    const photoSrc = saProductImagePath(i.product, '');
    return `
    <div class="cart-item" data-id="${i.id}">
      <div class="cart-item-media">${icon}<img class="media-photo" src="${photoSrc}" alt="${i.product.name}" onerror="this.remove()"></div>
      <div class="cart-item-info">
        <h4>${i.product.name}</h4>
        <span>${i.product.brand} · ${saCategoryName(i.product.category)}</span>
        <div class="cart-qty">
          <button data-qty-minus="${i.id}">−</button>
          <input type="text" readonly value="${i.qty}" data-qty-value="${i.id}">
          <button data-qty-plus="${i.id}">+</button>
        </div>
      </div>
      <div class="cart-item-price">${saFormatPrice(i.product.price * i.qty)}</div>
      <button class="cart-item-remove" data-remove="${i.id}" aria-label="Remover">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
      </button>
    </div>`;
  }).join('');

  list.querySelectorAll('[data-qty-plus]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-qty-plus');
    const item = saGetCart().find(i => i.id === id);
    saSetQty(id, item.qty + 1);
    refreshAfterChange();
  }));
  list.querySelectorAll('[data-qty-minus]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-qty-minus');
    const item = saGetCart().find(i => i.id === id);
    if(item.qty <= 1){ saRemoveFromCart(id); }
    else{ saSetQty(id, item.qty - 1); }
    refreshAfterChange();
  }));
  list.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
    saRemoveFromCart(btn.getAttribute('data-remove'));
    saToast('Item removido do carrinho.');
    refreshAfterChange();
  }));
}

function refreshAfterChange(){
  if(saCartDetailed().length === 0){ renderCartPage(); return; }
  renderCartItems();
  updateSummary();
}

function bindCouponAndCheckout(){
  document.getElementById('applyCoupon').addEventListener('click', () => {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    const msg = document.getElementById('couponMsg');
    if(SA_COUPONS[code] !== undefined){
      saAppliedCoupon = code;
      msg.textContent = 'Cupom aplicado com sucesso!';
      msg.className = 'coupon-msg ok';
    }else{
      saAppliedCoupon = null;
      msg.textContent = 'Cupom inválido ou expirado.';
      msg.className = 'coupon-msg err';
    }
    updateSummary();
  });

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if(!saCurrentUser()){
      saToast('Faça login para finalizar a compra.');
      setTimeout(() => location.href = 'login.html', 900);
      return;
    }
    saToast('Pedido simulado com sucesso! Nossa equipe entrará em contato.');
    localStorage.removeItem(SA_CART_KEY);
    saUpdateBadges();
    setTimeout(() => renderCartPage(), 900);
  });
}

function updateSummary(){
  const subtotal = saCartSubtotal();
  let shipping = subtotal > 1500 ? 0 : 79.90;
  let discount = 0;

  if(saAppliedCoupon === 'SAMAQUINAS10') discount = subtotal * 0.10;
  if(saAppliedCoupon === 'FRETEGRATIS') shipping = 0;

  const total = subtotal - discount + shipping;

  document.getElementById('sumSubtotal').textContent = saFormatPrice(subtotal);
  document.getElementById('sumShipping').textContent = shipping === 0 ? 'Grátis' : saFormatPrice(shipping);
  if(discount > 0){
    document.getElementById('sumDiscountRow').style.display = 'flex';
    document.getElementById('sumDiscount').textContent = `- ${saFormatPrice(discount)}`;
  }
  document.getElementById('sumTotal').textContent = saFormatPrice(total);
}
