import { initRouter } from './router.js';

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if(toggle && nav){
  toggle.addEventListener('click', ()=>{
    const exp = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!exp));
    nav.classList.toggle('active');
  });
}

// Enhance keyboard for dropdown
document.querySelectorAll('.nav-links > li > a').forEach(a=>{
  a.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'){
      const m=a.parentElement.querySelector('.submenu'); if(m){ m.style.display='block'; m.querySelector('a')?.focus(); }
    }
  });
});

// Init SPA
initRouter();
