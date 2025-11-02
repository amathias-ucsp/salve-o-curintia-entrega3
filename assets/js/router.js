import { templates } from './templates.js';
import { attachFormValidation } from './formValidator.js';

const routes = {
  '/': templates.home,
  '/projetos': templates.projetos,
  '/cadastro': templates.cadastro,
};

export function initRouter(){
  window.addEventListener('hashchange', renderRoute);
  renderRoute(); // first load
}

function getPath(){ 
  const hash = location.hash || '#/';
  const path = hash.replace(/^#/, '');
  return routes[path] ? path : '/';
}

function renderRoute(){
  const path = getPath();
  const view = routes[path]();
  const outlet = document.getElementById('app');
  outlet.innerHTML = view;

  // features that need JS after render
  if(path==='/cadastro') attachFormValidation();

  // modal wiring on projetos
  if(path==='/projetos'){
    const open = document.querySelectorAll('[data-open-modal]');
    const backdrop = document.getElementById('modal-donate');
    const closeBtn = backdrop?.querySelector('.modal-close');
    open.forEach(btn => btn.addEventListener('click', ()=> backdrop.classList.add('show')));
    closeBtn?.addEventListener('click', ()=> backdrop.classList.remove('show'));
  }
}
