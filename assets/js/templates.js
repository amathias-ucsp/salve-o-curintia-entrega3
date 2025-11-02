export const templates = {
  home(){
    return `
    <section class="hero">
      <img src="assets/img/hero.svg" alt="Gradiente roxo">
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
  projetos(){
    return `
    <section class="container mt-3">
      <h2>Campanha Natal Sem Jogador</h2>
      <p>Meta: transformar lágrimas em brinquedos 🎁 — a cada gol perdido, um sorriso garantido.</p>
      <div class="grid-12 cards">
        ${[1,2,3].map(i => `
        <article class="card col-span-4 md:col-span-12">
          <h3>Projeto ${i}</h3>
          <p>Impacto estimado: ${i*37} crianças.</p>
          <button class="btn btn-primary" data-open-modal>Doar agora</button>
        </article>`).join('')}
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
    </div>
    `;
  },
  cadastro(){
    return `
    <section class="container mt-3">
      <h2>Cadastro de Voluntário Sofredor</h2>
      <form id="cadastroForm" novalidate>
        <fieldset class="mt-2">
          <legend>Dados Pessoais</legend>
          <div class="field">
            <label for="nomeCompleto">Nome Completo</label>
            <input id="nomeCompleto" name="nomeCompleto" type="text" placeholder="Seu nome" required minlength="3">
            <span class="error-text" hidden></span>
          </div>
          <div class="field">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" placeholder="voce@email.com" required>
            <span class="error-text" hidden></span>
          </div>
          <div class="field">
            <label for="cpf">CPF</label>
            <input id="cpf" name="cpf" inputmode="numeric" placeholder="000.000.000-00" required>
            <span class="error-text" hidden></span>
          </div>
          <div class="field">
            <label for="telefone">Telefone</label>
            <input id="telefone" name="telefone" inputmode="tel" placeholder="(11) 90000-0000" required>
            <span class="error-text" hidden></span>
          </div>
          <div class="field">
            <label for="nascimento">Data de Nascimento</label>
            <input id="nascimento" name="nascimento" type="date" required>
            <span class="error-text" hidden></span>
          </div>
        </fieldset>
        <fieldset class="mt-2">
          <legend>Endereço</legend>
          <div class="field">
            <label for="cep">CEP</label>
            <input id="cep" name="cep" inputmode="numeric" placeholder="00000-000" required>
            <span class="error-text" hidden></span>
          </div>
          <div class="field">
            <label for="cidade">Cidade</label>
            <input id="cidade" name="cidade" type="text" required>
            <span class="error-text" hidden></span>
          </div>
          <div class="field">
            <label for="estado">Estado</label>
            <select id="estado" name="estado" required>
              <option value="">Selecione...</option>
              ${["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(uf=>`<option>${uf}</option>`).join('')}
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
    <div class="toast" role="status" aria-live="polite" aria-atomic="true">Cadastro salvo!</div>
    `;
  }
};
