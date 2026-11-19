const formLogin = document.getElementById('formLogin');
const mensagemErro = document.getElementById('mensagemErro');

formLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensagemErro.textContent = '';

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mensagemErro.textContent = dados.mensagem || 'Não foi possível entrar.';
      return;
    }

    localStorage.setItem('token', dados.token);
    localStorage.setItem('nome', dados.nome);
    window.location.href = 'main.html';
  } catch (erro) {
    mensagemErro.textContent = 'Não foi possível conectar ao servidor. Verifique se ele está em execução.';
    console.error('Falha ao entrar:', erro);
  }
});