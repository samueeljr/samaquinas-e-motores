/* ==========================================================================
   ACCOUNT.JS
   ========================================================================== */

const SA_FAKE_ORDERS = [
  { id:'PED-8231', date:'22/06/2026', status:'delivered', items:'Motosserra 18" 58cc, Óleo para Corrente 1L', total: 2943.90 },
  { id:'PED-8109', date:'02/05/2026', status:'transit', items:'Roçadeira Lateral 2T 52cc', total: 1899.90 }
];

document.addEventListener('DOMContentLoaded', () => {
  const user = saCurrentUser();
  if(!user){
    document.getElementById('accountRoot').style.display = 'none';
    document.getElementById('accountLoggedOut').style.display = 'block';
    document.getElementById('greetingTitle').textContent = 'Minha conta';
    return;
  }

  document.getElementById('greetingTitle').textContent = `Olá, ${user.firstName}!`;
  document.getElementById('userFullName').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('addrName').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('avatarInitials').textContent = (user.firstName[0] + (user.lastName ? user.lastName[0] : '')).toUpperCase();

  renderOrders();
  renderFavorites();
  bindPanelNav();

  document.getElementById('logoutBtn').addEventListener('click', () => {
    saLogout();
    saToast('Você saiu da sua conta.');
    setTimeout(() => location.href = '../index.html', 700);
  });
});

function renderOrders(){
  const wrap = document.getElementById('ordersList');
  wrap.innerHTML = SA_FAKE_ORDERS.map(o => `
    <div class="order-card">
      <div class="order-head">
        <b>${o.id}</b>
        <span class="order-status ${o.status}">${o.status === 'delivered' ? 'Entregue' : 'Em trânsito'}</span>
      </div>
      <div class="order-items">${o.items}</div>
      <div class="order-foot"><span>Pedido em ${o.date}</span><span>${saFormatPrice(o.total)}</span></div>
    </div>
  `).join('');
}

function renderFavorites(){
  const favs = saGetFavorites().map(id => saGetProduct(id)).filter(Boolean);
  const grid = document.getElementById('favoritesGrid');
  if(favs.length === 0){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-7.5-4.9-10-9.3C.4 8 2 4.5 5.6 4c2-.3 3.8.7 6.4 3.2C14.6 4.7 16.4 3.7 18.4 4c3.6.5 5.2 4 3.6 7.7C20 16.1 12 21 12 21z"/></svg>
      <p>Você ainda não favoritou nenhum produto.</p>
    </div>`;
    return;
  }
  saRenderGrid(grid, favs, '');
}

function bindPanelNav(){
  const links = document.querySelectorAll('[data-panel-link]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelectorAll('.account-panel').forEach(p => p.classList.remove('active'));
      document.querySelector(`[data-panel="${link.getAttribute('data-panel-link')}"]`).classList.add('active');
    });
  });
}
