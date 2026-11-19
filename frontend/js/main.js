const nome = localStorage.getItem('nome');

if (!localStorage.getItem('token')) {
  window.location.href = 'index.html';
}

document.getElementById('saudacao').textContent = `Olá, ${nome || 'usuário'}`;

document.getElementById('botaoSair').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('nome');
  window.location.href = 'index.html';
});