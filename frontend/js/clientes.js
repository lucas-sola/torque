if (!localStorage.getItem('token')) {
  window.location.href = 'index.html';
}

const tabelaClientes = document.getElementById('tabelaClientes');
const formCadastrar = document.getElementById('formCadastrar');
const formEditar = document.getElementById('formEditar');
const mensagemErro = document.getElementById('mensagemErro');

function desenharTabela(clientes) {
  tabelaClientes.innerHTML = '';

  clientes.forEach((cliente) => {
    const linha = document.createElement('tr');
    [cliente.nome, cliente.cpf, cliente.telefone, cliente.email].forEach((valor) => {
      const celula = document.createElement('td');
      celula.textContent = valor ?? '';
      linha.appendChild(celula);
    });

    const celulaAcoes = document.createElement('td');
    const botaoEditar = document.createElement('button');
    botaoEditar.className = 'botaoEditar';
    botaoEditar.dataset.id = cliente.id;
    botaoEditar.textContent = 'Editar';

    const botaoExcluir = document.createElement('button');
    botaoExcluir.className = 'botaoExcluir secundario';
    botaoExcluir.dataset.id = cliente.id;
    botaoExcluir.textContent = 'Excluir';

    celulaAcoes.append(botaoEditar, botaoExcluir);
    linha.appendChild(celulaAcoes);
    tabelaClientes.appendChild(linha);
  });

  document.querySelectorAll('.botaoEditar').forEach((botao) => {
    botao.addEventListener('click', () => preencherFormulario(clientes, botao.dataset.id));
  });

  document.querySelectorAll('.botaoExcluir').forEach((botao) => {
    botao.addEventListener('click', async () => {
      const resposta = await apiFetch(`/clientes/${botao.dataset.id}`, { method: 'DELETE' });
      if (!resposta.ok) {
        const dados = await resposta.json();
        mensagemErro.textContent = dados.mensagem || 'Não foi possível remover o cliente.';
        return;
      }

      buscarClientes();
    });
  });
}

async function buscarClientes(termo = '') {
  mensagemErro.textContent = '';
  try {
    const resposta = await apiFetch(`/clientes?busca=${encodeURIComponent(termo)}`);
    const clientes = await resposta.json();
    if (!resposta.ok) {
      throw new Error(clientes.mensagem || 'Não foi possível carregar os clientes.');
    }

    desenharTabela(clientes);
  } catch (erro) {
    mensagemErro.textContent = erro.message;
    console.error('Falha ao carregar clientes:', erro);
  }
}

function preencherFormulario(clientes, id) {
  const cliente = clientes.find((item) => String(item.id) === String(id));
  document.getElementById('editarId').value = cliente.id;
  document.getElementById('editarNome').value = cliente.nome;
  document.getElementById('editarCpf').value = cliente.cpf;
  document.getElementById('editarTelefone').value = cliente.telefone ?? '';
  document.getElementById('editarEmail').value = cliente.email ?? '';
}

document.getElementById('botaoBuscar').addEventListener('click', () => {
  buscarClientes(document.getElementById('termoBusca').value);
});

formCadastrar.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const corpo = {
    nome: document.getElementById('cadastrarNome').value,
    cpf: document.getElementById('cadastrarCpf').value,
    telefone: document.getElementById('cadastrarTelefone').value,
    email: document.getElementById('cadastrarEmail').value,
  };

  const resposta = await apiFetch('/clientes', { method: 'POST', body: JSON.stringify(corpo) });
  if (!resposta.ok) {
    const dados = await resposta.json();
    mensagemErro.textContent = dados.mensagem || 'Não foi possível cadastrar o cliente.';
    return;
  }

  formCadastrar.reset();
  buscarClientes();
});

formEditar.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const id = document.getElementById('editarId').value;
  const corpo = {
    nome: document.getElementById('editarNome').value,
    cpf: document.getElementById('editarCpf').value,
    telefone: document.getElementById('editarTelefone').value,
    email: document.getElementById('editarEmail').value,
  };

  const resposta = await apiFetch(`/clientes/${id}`, { method: 'PUT', body: JSON.stringify(corpo) });
  if (!resposta.ok) {
    const dados = await resposta.json();
    mensagemErro.textContent = dados.mensagem || 'Não foi possível atualizar o cliente.';
    return;
  }

  formEditar.reset();
  buscarClientes();
});

buscarClientes();