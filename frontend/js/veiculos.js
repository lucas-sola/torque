if (!localStorage.getItem('token')) {
  window.location.href = 'index.html';
}

const tabelaVeiculos = document.getElementById('tabelaVeiculos');
const campoCliente = document.getElementById('campoCliente');
const mensagemErro = document.getElementById('mensagemErro');
const formVeiculo = document.getElementById('formVeiculo');
const tituloFormulario = document.getElementById('tituloFormulario');
const botaoSalvarVeiculo = document.getElementById('botaoSalvarVeiculo');

async function listarVeiculos() {
  const resposta = await apiFetch('/veiculos');
  const veiculos = await resposta.json();

  tabelaVeiculos.innerHTML = '';
  veiculos.forEach((veiculo) => {
    const linha = document.createElement('tr');
    [veiculo.placa, veiculo.marca, veiculo.modelo, veiculo.ano, veiculo.cliente_nome]
      .forEach((valor) => {
        const celula = document.createElement('td');
        celula.textContent = valor ?? '';
        linha.appendChild(celula);
      });

    const celulaAcoes = document.createElement('td');
    const botaoEditar = document.createElement('button');
    botaoEditar.className = 'botaoEditar';
    botaoEditar.dataset.id = veiculo.id;
    botaoEditar.textContent = 'Editar';

    const botaoExcluir = document.createElement('button');
    botaoExcluir.className = 'botaoExcluir secundario';
    botaoExcluir.dataset.id = veiculo.id;
    botaoExcluir.textContent = 'Excluir';

    celulaAcoes.append(botaoEditar, botaoExcluir);
    linha.appendChild(celulaAcoes);
    tabelaVeiculos.appendChild(linha);
  });

  document.querySelectorAll('.botaoEditar').forEach((botao) => {
    botao.addEventListener('click', () => preencherFormulario(veiculos, botao.dataset.id));
  });

  document.querySelectorAll('.botaoExcluir').forEach((botao) => {
    botao.addEventListener('click', async () => {
      await apiFetch(`/veiculos/${botao.dataset.id}`, { method: 'DELETE' });
      listarVeiculos();
    });
  });
}

function preencherFormulario(veiculos, id) {
  const veiculo = veiculos.find((item) => String(item.id) === String(id));

  document.getElementById('campoId').value = veiculo.id;
  campoCliente.value = veiculo.cliente_id;
  document.getElementById('campoPlaca').value = veiculo.placa;
  document.getElementById('campoMarca').value = veiculo.marca ?? '';
  document.getElementById('campoModelo').value = veiculo.modelo ?? '';
  document.getElementById('campoAno').value = veiculo.ano ?? '';

  tituloFormulario.textContent = 'Editar veículo';
  botaoSalvarVeiculo.textContent = 'Salvar';
}

async function carregarClientes() {
  const resposta = await apiFetch('/clientes');
  const clientes = await resposta.json();

  clientes.forEach((cliente) => {
    const opcao = document.createElement('option');
    opcao.value = cliente.id;
    opcao.textContent = cliente.nome;
    campoCliente.appendChild(opcao);
  });
}

formVeiculo.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensagemErro.textContent = '';

  const id = document.getElementById('campoId').value;
  const corpo = {
    cliente_id: campoCliente.value,
    placa: document.getElementById('campoPlaca').value,
    marca: document.getElementById('campoMarca').value,
    modelo: document.getElementById('campoModelo').value,
    ano: document.getElementById('campoAno').value,
  };

  const resposta = id
    ? await apiFetch(`/veiculos/${id}`, { method: 'PUT', body: JSON.stringify(corpo) })
    : await apiFetch('/veiculos', { method: 'POST', body: JSON.stringify(corpo) });
  const dados = await resposta.json();

  if (!resposta.ok) {
    mensagemErro.textContent = dados.mensagem;
    return;
  }

  formVeiculo.reset();
  tituloFormulario.textContent = 'Cadastrar veículo';
  botaoSalvarVeiculo.textContent = 'Cadastrar';
  listarVeiculos();
});

listarVeiculos();
carregarClientes();