/* ==========================================================================
   PRODUCT-PAGE.JS
   ========================================================================== */

let saCurrentProduct = null;
let saQty = 1;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  saCurrentProduct = saGetProduct(id) || SA_PRODUCTS[0];
  renderProduct(saCurrentProduct);
  bindTabs();
  bindQty();
  bindActions();
  renderRelated(saCurrentProduct);
});

function renderProduct(p){
  document.title = `${p.name} | SA Máquinas e Motores`;
  document.getElementById('pageTitle').textContent = `${p.name} | SA Máquinas e Motores`;
  document.getElementById('crumbName').textContent = p.name;

  const icon = SA_ICONS[(SA_CATEGORIES.find(c => c.slug === p.category) || {}).icon] || SA_ICONS.peca;
  const photoSrc = saProductImagePath(p, '');
  document.getElementById('galleryMain').innerHTML = `${icon}<img class="media-photo" src="${photoSrc}" alt="${p.name}" onerror="this.remove()">`;
  document.getElementById('galleryMain').addEventListener('click', function(){ this.classList.toggle('zoomed'); });
  document.getElementById('galleryThumbs').innerHTML = [1,2,3].map((n,i) => `<button class="${i===0?'active':''}" data-thumb="${i}">${icon}<img class="media-photo" src="${photoSrc}" alt="${p.name}" onerror="this.remove()"></button>`).join('');
  document.querySelectorAll('[data-thumb]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-thumb]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('pdBrand').textContent = p.brand;
  document.getElementById('pdName').textContent = p.name;
  document.getElementById('pdStars').textContent = saStars(p.rating);
  document.getElementById('pdRatingNum').textContent = `${p.rating.toFixed(1)} (${p.reviews} avaliações)`;

  document.getElementById('pdOldPrice').textContent = p.oldPrice ? saFormatPrice(p.oldPrice) : '';
  document.getElementById('pdPrice').textContent = saFormatPrice(p.price);
  document.getElementById('pdInstallment').textContent = `ou ${p.installments}x de ${saFormatPrice(p.price / p.installments)} sem juros`;

  const stockEl = document.getElementById('pdStock');
  if(p.stock === 0){ stockEl.textContent = 'Produto esgotado no momento'; stockEl.className = 'pd-stock out'; }
  else if(p.stock <= 5){ stockEl.textContent = `Apenas ${p.stock} unidades em estoque`; stockEl.className = 'pd-stock low'; }
  else{ stockEl.textContent = `${p.stock} unidades disponíveis em estoque`; stockEl.className = 'pd-stock'; }

  document.getElementById('pdDesc').textContent = p.desc;
  document.getElementById('pdFullDesc').textContent = p.desc + ' Todos os equipamentos passam por checagem técnica antes do envio e contam com suporte pós-venda da SA Máquinas e Motores.';

  document.getElementById('pdMeta').innerHTML = `
    <div><span>SKU</span><span>${p.id.toUpperCase()}</span></div>
    <div><span>Categoria</span><span>${saCategoryName(p.category)}</span></div>
    <div><span>Marca</span><span>${p.brand}</span></div>
  `;

  document.getElementById('specTable').innerHTML = `
    <tr><td>Marca</td><td>${p.brand}</td></tr>
    <tr><td>Categoria</td><td>${saCategoryName(p.category)}</td></tr>
    <tr><td>Potência</td><td>${p.power}</td></tr>
    <tr><td>Peso</td><td>${p.weight}</td></tr>
    <tr><td>Avaliação média</td><td>${p.rating.toFixed(1)} / 5</td></tr>
    <tr><td>Garantia</td><td>90 dias contra defeitos de fabricação</td></tr>
  `;

  renderReviews(p);

  const favBtn = document.getElementById('favToggleBtn');
  favBtn.classList.toggle('active', saIsFavorite(p.id));

  const addBtn = document.getElementById('addToCartBtn');
  const buyBtn = document.getElementById('buyNowBtn');
  if(p.stock === 0){
    addBtn.disabled = true; addBtn.style.opacity = .5; addBtn.textContent = 'Indisponível';
    buyBtn.disabled = true; buyBtn.style.opacity = .5;
  }
}

function renderReviews(p){
  const samples = [
    { name:'José Rodrigues', text:'Equipamento robusto, chegou bem embalado e funcionando perfeitamente.' },
    { name:'Ana Paula Souza', text:'Ótimo custo-benefício, recomendo para quem trabalha na roça.' },
    { name:'Fernando Lima', text:'Comprei pela loja e o atendimento pós-venda foi muito bom quando precisei de suporte.' }
  ];
  document.getElementById('reviewsList').innerHTML = samples.map(r => `
    <div class="review-item">
      <div class="review-head"><b>${r.name}</b><span>${saStars(4 + Math.round(Math.random()))}</span></div>
      <p style="font-size:.9rem;color:var(--text-body);">${r.text}</p>
    </div>
  `).join('');
}

function bindTabs(){
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`[data-panel="${btn.getAttribute('data-tab')}"]`).classList.add('active');
    });
  });
}

function bindQty(){
  const input = document.getElementById('qtyInput');
  document.getElementById('qtyMinus').addEventListener('click', () => {
    saQty = Math.max(1, saQty - 1);
    input.value = saQty;
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    const max = saCurrentProduct.stock || 99;
    saQty = Math.min(max, saQty + 1);
    input.value = saQty;
  });
}

function bindActions(){
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    saAddToCart(saCurrentProduct.id, saQty);
  });
  document.getElementById('buyNowBtn').addEventListener('click', () => {
    saAddToCart(saCurrentProduct.id, saQty);
    location.href = 'cart.html';
  });
  document.getElementById('favToggleBtn').addEventListener('click', function(){
    const active = saToggleFavorite(saCurrentProduct.id);
    this.classList.toggle('active', active);
  });
}

function renderRelated(p){
  const related = SA_PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  saRenderGrid(document.getElementById('relatedGrid'), related, '');
}
