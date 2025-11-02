/* ========= utils ========= */
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clean = (v = "") => (v || "").replace(/\D/g, "");

  function showToast(msg = "Ação realizada") {
    const t = document.querySelector(".toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
  }

  window.SOC = window.SOC || {};
  Object.assign(window.SOC, { $, $$, clean, showToast });
})();

/* ========= storage (LocalStorage) ========= */
(function () {
  const KEY = "soc_voluntarios_v1";
  const getVoluntarios = () => JSON.parse(localStorage.getItem(KEY) || "[]");
  function addVoluntario(v) {
    const all = getVoluntarios();
    all.push(v);
    localStorage.setItem(KEY, JSON.stringify(all));
  }

  Object.assign(window.SOC, { getVoluntarios, addVoluntario });
})();

/* ========= templates (SPA views) ========= */
(function () {
  const templates = {
    home() {
      return `
      <section class="hero">
        <img src="assets/img/hero.svg" alt="Gradiente roxo" />
        <div class="overlay">
          <div>
            <h1>“Aqui é Sofrimento, aqui é Fiel!”</h1>
            <p>Preto e branco na alma, com um toque roxo no coração 💜</p>
            <div style="display:flex;gap:12px;justify-content:center;">
              <a href="#/projetos" data-link class="btn btn-primary">Campanha Natal Sem Jogador</a>
              <a href="#/cadastro" data-link class="btn btn-outline">Virar Voluntário Sofredor</a>
            </div>
          </div>
        </div>
      </section>

      <section class="container cards">
        <div class="grid-12">
          <article class="card col-span-4 md:col-span-12">
            <h3>ONG</h3>
            <p>Plataforma fictícia, propósito real: aprender, praticar e rir um pouco de sofrimento.</p>
            <div class="badges"><span class="badge dark">ONG</span><span class="badge purple">Humor</span></div>
          </article>
          <article class="card col-span-4 md:col-span-12">
            <h3>Transparência</h3>
            <p>Relatórios e prestação de contas (de zueira e aprendizado) com total integridade.</p>
            <div class="badges"><span class="badge">Relatórios</span><span class="badge purple">Didático</span></div>
          </article>
          <article class="card col-span-4 md:col-span-12">
            <h3>Voluntários</h3>
            <p>Entre para o time dos sofredores do bem — cadastro rápido e com certificado (moral)!</p>
            <div class="badges"><span class="badge">Cadastro</span><span class="badge purple">LocalStorage</span></div>
          </article>
        </div>
      </section>`;
    },
    projetos() {
      return `
      <section class="container mt-3">
        <h2>Campanha Natal Sem Jogador</h2>
        <p>Meta: transformar lágrimas em brinquedos 🎁 — a cada gol perdido, um sorriso garantido.</p>
        <div class="grid-12 cards">
          ${[1, 2, 3]
            .map(
              (i) => `
            <article class="card col-span-4 md:col-span-12">
              <h3>Projeto ${i}</h3>
              <p>Impacto estimado: ${i * 37} crianças.</p>
              <button class="btn btn-primary" data-open-modal>Doar agora</button>
            </article>`
            )
            .join("")}
        </div>
      </section>

      <div class="modal-backdrop" id="modal-donate">
        <div class="modal">
          <div class="modal-header">
            <h3>Doação Rápida</h3>
            <button class="modal-close" aria-label="Fechar">Fechar</button>
          </div>
          <p>Obrigado por tentar ajudar. Ainda é uma simulação 😉</p>
        </div>
      </div>`;
    },
    cadastro() {
      return `
      <section class="container mt-3">
        <h2>Cadastro de Voluntário Sofredor</h2>
        <form id="cadastroForm" novalidate>
          <fieldset class="mt-2">
            <legend>Dados Pessoais</legend>
            <div class="field">
              <label for="nomeCompleto">Nome Completo</label>
              <input id="nomeCompleto" name="nomeCompleto" type="text" placeholder="Seu nome" required minlength="3" />
              <span class="error-text" hidden></span>
            </div>
            <div class="field">
              <label for="email">E-mail</label>
              <input id="email" name="email" type="email" placeholder="voce@email.com" required />
              <span class="error-text" hidden></span>
            </div>
            <div class="field">
              <label for="cpf">CPF</label>
              <input id="cpf" name="cpf" inputmode="numeric" placeholder="000.000.000-00" required />
              <span class="error-text" hidden></span>
            </div>
            <div class="field">
              <label for="telefone">Telefone</label>
              <input id="telefone" name="telefone" inputmode="tel" placeholder="(11) 90000-0000" required />
              <span class="error-text" hidden></span>
            </div>
            <div class="field">
              <label for="nascimento">Data de Nascimento</label>
              <input id="nascimento" name="nascimento" type="date" required />
              <span class="error-text" hidden></span>
            </div>
          </fieldset>

          <fieldset class="mt-2">
            <legend>Endereço</legend>
            <div class="field">
              <label for="cep">CEP</label>
              <input id="cep" name="cep" inputmode="numeric" placeholder="00000-000" required />
              <span class="error-text" hidden></span>
            </div>
            <div class="field">
              <label for="cidade">Cidade</label>
              <input id="cidade" name="cidade" type="text" required />
              <span class="error-text" hidden></span>
            </div>
            <div class="field">
              <label for="estado">Estado</label>
              <select id="estado" name="estado" required>
                <option value="">Selecione...</option>
                ${[
                  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
                ]
                  .map((uf) => `<option>${uf}</option>`)
                  .join("")}
              </select>
              <span class="error-text" hidden></span>
            </div>
          </fieldset>

          <div class="mt-3" style="display:flex;gap:12px;justify-content:flex-end">
            <button type="reset" class="btn btn-outline">Limpar</button>
            <button type="submit" class="btn btn-primary">Salvar cadastro</button>
          </div>
        </form>
      </section>
      <div class="toast" role="status" aria-live="polite" aria-atomic="true">Cadastro salvo!</div>`;
    },
  };

  Object.assign(window.SOC, { templates });
})();

/* ========= formValidator ========= */
(function () {
  const { $, clean, showToast, addVoluntario } = window.SOC;

  const patterns = {
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
    telefone: /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/,
    cep: /^\d{5}-?\d{3}$/,
  };

  function attachFormValidation() {
    const form = $("#cadastroForm");
    if (!form) return;

    const fields = {
      nomeCompleto: $("#nomeCompleto"),
      email: $("#email"),
      cpf: $("#cpf"),
      telefone: $("#telefone"),
      nascimento: $("#nascimento"),
      cep: $("#cep"),
      cidade: $("#cidade"),
      estado: $("#estado"),
    };

    // máscaras
    fields.cpf.addEventListener("input", (e) => (e.target.value = maskCPF(e.target.value)));
    fields.telefone.addEventListener("input", (e) => (e.target.value = maskPhone(e.target.value)));
    fields.cep.addEventListener("input", (e) => (e.target.value = maskCEP(e.target.value)));

    // validação em blur
    Object.values(fields).forEach((input) => input.addEventListener("blur", () => validateField(input)));

    // submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const allValid = Object.values(fields).every(validateField);
      if (!allValid) {
        showToast("Corrija os campos destacados.");
        return;
      }

      const payload = Object.fromEntries(new FormData(form).entries());
      payload.cpf = clean(payload.cpf);
      payload.telefone = clean(payload.telefone);
      payload.cep = clean(payload.cep);
      addVoluntario(payload);
      form.reset();
      showToast("Cadastro salvo no seu navegador!");
    });
  }

  function validateField(input) {
    const name = input.name;
    const val = (input.value || "").trim();
    let valid = true;
    let msg = "";

    if (input.required && !val) {
      valid = false;
      msg = "Campo obrigatório.";
    } else if (name === "email" && !patterns.email.test(val)) {
      valid = false;
      msg = "E-mail inválido.";
    } else if (name === "cpf" && !isCPFValid(val)) {
      valid = false;
      msg = "CPF inválido.";
    } else if (name === "telefone" && !patterns.telefone.test(val)) {
      valid = false;
      msg = "Telefone inválido.";
    } else if (name === "cep" && !patterns.cep.test(val)) {
      valid = false;
      msg = "CEP inválido.";
    }

    const hint = input.parentElement.querySelector(".error-text");
    if (!hint) return true;

    if (valid) {
      input.classList.remove("input-error");
      input.classList.add("input-success");
      hint.hidden = true;
      hint.textContent = "";
    } else {
      input.classList.remove("input-success");
      input.classList.add("input-error");
      hint.hidden = false;
      hint.textContent = msg;
    }
    return valid;
  }

  // helpers de máscara/CPF
  function maskCPF(v) {
    v = clean(v).slice(0, 11);
    return v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  function maskPhone(v) {
    v = clean(v).slice(0, 11);
    if (v.length <= 10) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    return v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
  function maskCEP(v) {
    v = clean(v).slice(0, 8);
    return v.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  }
  function isCPFValid(str) {
    const cpf = clean(str);
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let d1 = 11 - (sum % 11);
    if (d1 > 9) d1 = 0;
    if (d1 !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    let d2 = 11 - (sum % 11);
    if (d2 > 9) d2 = 0;
    return d2 === parseInt(cpf.charAt(10));
  }

  Object.assign(window.SOC, { attachFormValidation });
})();

/* ========= router (hash SPA) ========= */
(function () {
  const { templates, attachFormValidation } = window.SOC;

  const routes = {
    "/": templates.home,
    "/projetos": templates.projetos,
    "/cadastro": templates.cadastro,
  };

  function getPath() {
    const hash = location.hash || "#/";
    const path = hash.replace(/^#/, "");
    return routes[path] ? path : "/";
  }

  function renderRoute() {
    const path = getPath();
    const view = routes[path]();
    const outlet = document.getElementById("app");
    outlet.innerHTML = view;

    if (path === "/cadastro") attachFormValidation();

    if (path === "/projetos") {
      const open = document.querySelectorAll("[data-open-modal]");
      const backdrop = document.getElementById("modal-donate");
      const closeBtn = backdrop ? backdrop.querySelector(".modal-close") : null;
      open.forEach((btn) => btn.addEventListener("click", () => backdrop.classList.add("show")));
      closeBtn && closeBtn.addEventListener("click", () => backdrop.classList.remove("show"));
    }
  }

  function initRouter() {
    window.addEventListener("hashchange", renderRoute);
    renderRoute();
  }

  Object.assign(window.SOC, { initRouter });
})();

/* ========= boot (menu + SPA init) ========= */
(function () {
  const { initRouter } = window.SOC;

  function initMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const exp = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!exp));
        nav.classList.toggle("active");
      });
    }

    // Acessibilidade: abrir submenu com seta ↓
    document.querySelectorAll(".nav-links > li > a").forEach((a) => {
      a.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          const m = a.parentElement.querySelector(".submenu");
          if (m) {
            m.style.display = "block";
            const first = m.querySelector("a");
            first && first.focus();
          }
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initRouter();
  });
})();
