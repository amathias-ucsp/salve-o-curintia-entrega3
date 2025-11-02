export const $ = (sel, ctx=document) => ctx.querySelector(sel);
export const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
export const clean = (v='') => (v||'').replace(/\D/g,'');

export function showToast(msg='Ação realizada'){ 
  const t = document.querySelector('.toast'); if(!t) return;
  t.textContent = msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'), 2500);
}
