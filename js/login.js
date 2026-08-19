/* ==========================================================================
   LOGIN.JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const icon = document.getElementById('authIcon');
  if(icon) icon.innerHTML = SA_ICONS.motosserra;

  if(saCurrentUser()){
    saToast('Você já está conectado.');
  }

  const form = document.getElementById('loginForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    valid = validateField('fieldEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) && valid;
    valid = validateField('fieldPassword', password.value.length >= 6) && valid;
    if(!valid) return;

    const result = saLoginUser(email.value, password.value, document.getElementById('remember').checked);
    if(result.ok){
      saToast(`Bem-vindo(a) de volta, ${result.session.firstName}!`);
      setTimeout(() => location.href = 'account.html', 900);
    }else{
      validateField('fieldPassword', false, result.error);
    }
  });

  document.getElementById('googleLoginBtn').addEventListener('click', () => {
    const fakeUser = { email: 'google.demo@samaquinas.com', firstName: 'Cliente', lastName: 'Google', password: '' };
    if(!saGetUsers().some(u => u.email === fakeUser.email)) saRegisterUser(fakeUser);
    localStorage.setItem(SA_SESSION_KEY, JSON.stringify({ email: fakeUser.email, firstName: fakeUser.firstName, lastName: fakeUser.lastName }));
    saToast('Login simulado com Google realizado.');
    setTimeout(() => location.href = 'account.html', 900);
  });

  document.getElementById('forgotLink').addEventListener('click', e => {
    e.preventDefault();
    saToast('Um link de recuperação seria enviado ao seu e-mail.');
  });
});

function validateField(fieldId, isValid, customMsg){
  const field = document.getElementById(fieldId);
  field.classList.toggle('error', !isValid);
  if(customMsg) field.querySelector('.error-msg').textContent = customMsg;
  return isValid;
}
