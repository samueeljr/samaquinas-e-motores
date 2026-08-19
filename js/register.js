/* ==========================================================================
   REGISTER.JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const icon = document.getElementById('authIcon');
  if(icon) icon.innerHTML = SA_ICONS.rocadeira;

  const cpf = document.getElementById('cpf');
  cpf.addEventListener('input', () => { cpf.value = saMaskCPF(cpf.value); });

  const phone = document.getElementById('phone');
  phone.addEventListener('input', () => { phone.value = saMaskPhone(phone.value); });

  document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');
    const terms = document.getElementById('terms');

    let valid = true;
    valid = rValidate('fieldFirstName', firstName.value.trim().length >= 2) && valid;
    valid = rValidate('fieldLastName', lastName.value.trim().length >= 2) && valid;
    valid = rValidate('fieldCpf', cpf.value.replace(/\D/g,'').length === 11) && valid;
    valid = rValidate('fieldPhone', phone.value.replace(/\D/g,'').length >= 10) && valid;
    valid = rValidate('fieldEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) && valid;
    valid = rValidate('fieldPassword', password.value.length >= 6) && valid;
    valid = rValidate('fieldConfirm', confirm.value === password.value && confirm.value.length > 0) && valid;
    valid = rValidate('fieldTerms', terms.checked) && valid;

    if(!valid) return;

    const result = saRegisterUser({
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      cpf: cpf.value,
      phone: phone.value,
      email: email.value.trim(),
      password: password.value
    });

    if(!result.ok){
      rValidate('fieldEmail', false, result.error);
      return;
    }

    saLoginUser(email.value.trim(), password.value, true);
    saToast('Conta criada com sucesso! Bem-vindo(a).');
    setTimeout(() => location.href = 'account.html', 900);
  });
});

function rValidate(fieldId, isValid, customMsg){
  const field = document.getElementById(fieldId);
  field.classList.toggle('error', !isValid);
  if(customMsg) field.querySelector('.error-msg').textContent = customMsg;
  return isValid;
}
