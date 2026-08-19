/* ==========================================================================
   AUTH.JS — autenticação simulada com LocalStorage
   ========================================================================== */

const SA_USERS_KEY = 'sa_users_v1';
const SA_SESSION_KEY = 'sa_session_v1';

function saGetUsers(){
  try{ return JSON.parse(localStorage.getItem(SA_USERS_KEY)) || []; }
  catch(e){ return []; }
}
function saSaveUsers(users){ localStorage.setItem(SA_USERS_KEY, JSON.stringify(users)); }

function saRegisterUser(user){
  const users = saGetUsers();
  if(users.some(u => u.email.toLowerCase() === user.email.toLowerCase())){
    return { ok:false, error:'Este e-mail já está cadastrado.' };
  }
  users.push(user);
  saSaveUsers(users);
  return { ok:true };
}

function saLoginUser(email, password, remember){
  const users = saGetUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if(!user) return { ok:false, error:'E-mail ou senha inválidos.' };
  const session = { email: user.email, firstName: user.firstName, lastName: user.lastName };
  localStorage.setItem(SA_SESSION_KEY, JSON.stringify(session));
  return { ok:true, session };
}

function saCurrentUser(){
  try{ return JSON.parse(localStorage.getItem(SA_SESSION_KEY)); }
  catch(e){ return null; }
}

function saLogout(){
  localStorage.removeItem(SA_SESSION_KEY);
}

/* ---- Atualiza o link de login do navbar conforme sessão ---- */
function saRefreshAuthUI(){
  const user = saCurrentUser();
  document.querySelectorAll('[data-auth-slot]').forEach(el => {
    const basePath = location.pathname.includes('/pages/') ? '' : 'pages/';
    if(user){
      el.innerHTML = `<a href="${basePath}account.html" class="icon-btn" aria-label="Minha conta" title="Olá, ${user.firstName}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
      </a>`;
    }else{
      el.innerHTML = `<a href="${basePath}login.html" class="icon-btn" aria-label="Entrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
      </a>`;
    }
  });
}
document.addEventListener('DOMContentLoaded', saRefreshAuthUI);

/* ---- Máscara simples de CPF e telefone ---- */
function saMaskCPF(value){
  return value.replace(/\D/g,'').slice(0,11)
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d{1,2})$/,'$1-$2');
}
function saMaskPhone(value){
  return value.replace(/\D/g,'').slice(0,11)
    .replace(/(\d{2})(\d)/,'($1) $2')
    .replace(/(\d{5})(\d{1,4})$/,'$1-$2');
}
