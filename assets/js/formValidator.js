import { $, clean, showToast } from './utils.js';
import { addVoluntario } from './storage.js';

const patterns = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  telefone: /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/,
  cep: /^\d{5}-?\d{3}$/
};

export function attachFormValidation(){
  const form = $('#cadastroForm'); if(!form) return;
  const fields = {
    nomeCompleto: $('#nomeCompleto'),
    email: $('#email'),
    cpf: $('#cpf'),
    telefone: $('#telefone'),
    nascimento: $('#nascimento'),
    cep: $('#cep'),
    cidade: $('#cidade'),
    estado: $('#estado')
  };

  // masks leves
  fields.cpf.addEventListener('input', e => e.target.value = maskCPF(e.target.value));
  fields.telefone.addEventListener('input', e => e.target.value = maskPhone(e.target.value));
  fields.cep.addEventListener('input', e => e.target.value = maskCEP(e.target.value));

  // blur validation
  Object.values(fields).forEach(input => input.addEventListener('blur', () => validateField(input)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = Object.values(fields).every(validateField);
    if(!allValid){ showToast('Corrija os campos destacados.'); return; }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.cpf = clean(payload.cpf);
    payload.telefone = clean(payload.telefone);
    payload.cep = clean(payload.cep);
    addVoluntario(payload);
    form.reset();
    showToast('Cadastro salvo no seu navegador!');
  });
}

function validateField(input){
  const name = input.name;
  const val = input.value.trim();
  let valid = true; let msg = '';

  if(input.required && !val){ valid=false; msg='Campo obrigatório.'; }
  else if(name==='email' && !patterns.email.test(val)){ valid=false; msg='E-mail inválido.'; }
  else if(name==='cpf' && !isCPFValid(val)){ valid=false; msg='CPF inválido.'; }
  else if(name==='telefone' && !patterns.telefone.test(val)){ valid=false; msg='Telefone inválido.'; }
  else if(name==='cep' && !patterns.cep.test(val)){ valid=false; msg='CEP inválido.'; }

  const hint = input.parentElement.querySelector('.error-text');
  if(!hint) return true;

  if(valid){
    input.classList.remove('input-error'); input.classList.add('input-success');
    hint.hidden = true; hint.textContent = '';
  }else{
    input.classList.remove('input-success'); input.classList.add('input-error');
    hint.hidden = false; hint.textContent = msg;
  }
  return valid;
}

// ---- Utils: masks & cpf check ----
function maskCPF(v){ v = clean(v).slice(0,11); return v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'); }
function maskPhone(v){ v = clean(v).slice(0,11); if(v.length<=10){ return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3'); } return v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3'); }
function maskCEP(v){ v = clean(v).slice(0,8); return v.replace(/(\d{5})(\d{0,3})/, '$1-$2'); }

function isCPFValid(str){
  const cpf = clean(str);
  if(!cpf || cpf.length!==11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum=0; for(let i=0;i<9;i++){ sum += parseInt(cpf.charAt(i))*(10-i); }
  let d1 = 11 - (sum % 11); if(d1>9) d1=0; if(d1 !== parseInt(cpf.charAt(9))) return false;
  sum=0; for(let i=0;i<10;i++){ sum += parseInt(cpf.charAt(i))*(11-i); }
  let d2 = 11 - (sum % 11); if(d2>9) d2=0; return d2 === parseInt(cpf.charAt(10));
}
