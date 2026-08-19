/* ==========================================================================
   SERVICE.JS — validação do formulário de orçamento
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const phone = document.getElementById('qPhone');
  phone.addEventListener('input', () => { phone.value = saMaskPhone(phone.value); });

  document.getElementById('quoteForm').addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    valid = sValidate('qFieldName', document.getElementById('qName').value.trim().length >= 3) && valid;
    valid = sValidate('qFieldPhone', phone.value.replace(/\D/g,'').length >= 10) && valid;
    valid = sValidate('qFieldEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('qEmail').value)) && valid;
    valid = sValidate('qFieldEquip', document.getElementById('qEquip').value !== '') && valid;
    valid = sValidate('qFieldMsg', document.getElementById('qMsg').value.trim().length >= 5) && valid;

    if(!valid) return;

    saToast('Solicitação enviada! Nossa equipe entrará em contato em até 48h úteis.');
    document.getElementById('quoteForm').reset();
  });
});

function sValidate(fieldId, isValid){
  const field = document.getElementById(fieldId);
  field.classList.toggle('error', !isValid);
  return isValid;
}
