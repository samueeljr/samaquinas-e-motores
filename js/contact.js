/* ==========================================================================
   CONTACT.JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    valid = cValidate('cFieldName', document.getElementById('cName').value.trim().length >= 3) && valid;
    valid = cValidate('cFieldEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('cEmail').value)) && valid;
    valid = cValidate('cFieldSubject', document.getElementById('cSubject').value !== '') && valid;
    valid = cValidate('cFieldMsg', document.getElementById('cMsg').value.trim().length >= 5) && valid;
    if(!valid) return;

    saToast('Mensagem enviada com sucesso! Responderemos em breve.');
    document.getElementById('contactForm').reset();
  });
});

function cValidate(fieldId, isValid){
  const field = document.getElementById(fieldId);
  field.classList.toggle('error', !isValid);
  return isValid;
}
