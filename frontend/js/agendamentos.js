if (!localStorage.getItem('token')) {
  window.location.href = 'index.html';
}

const tabelaAgendamentos = document.getElementById('tabelaAgendamentos');
const campoVeiculo = document.getElementById('campoVeiculo');
const formAgendamento = document.getElementById('formAgendamento');
const mensagemErro = document.getElementById('mensagemErro');

function paraDatetimeLocal(data) {
  return data.slice(0, 16).replace(' ', 'T');
}

async function listarAgendamentos() {
  try {
    const resposta = await apiFetch('/agendamentos');
    const agendamentos = await resposta.json();
    if (!resposta.ok) {
      throw new Error(agendamentos.mensagem || 'Não foi possível carregar os agendamentos.');
    }

    tabelaAgendamentos.replaceChildren();

    agendamentos.forEach((agendamento) => {
      const linha = document.createElement('tr');
      const data = document.createElement('td');
      data.textContent = new Date(agendamento.data_agendamento.replace(' ', 'T')).toLocaleString('pt-BR');
      linha.appendChild(data);

      [agendamento.servico, `${agendamento.placa} - ${agendamento.marca ?? ''} ${agendamento.modelo ?? ''}`, agendamento.cliente_nome]
        .forEach((valor) => {
          const celula = document.createElement('td');
          celula.textContent = valor ?? '';
          linha.appendChild(celula);
        });

      const celulaData = document.createElement('td');
      const campoData = document.createElement('input');
      campoData.type = 'datetime-local';
      campoData.value = paraDatetimeLocal(agendamento.data_agendamento);
      campoData.dataset.id = agendamento.id;

      const botaoSalvar = document.createElement('button');
      botaoSalvar.className = 'botaoSalvarData';
      botaoSalvar.dataset.id = agendamento.id;
      botaoSalvar.textContent = 'Salvar';

      celulaData.append(campoData, botaoSalvar);
      linha.appendChild(celulaData);

      const celulaAcoes = document.createElement('td');
      const botaoExcluir = document.createElement('button');
      botaoExcluir.className = 'botaoExcluir secundario';
      botaoExcluir.dataset.id = agendamento.id;
      botaoExcluir.textContent = 'Excluir';
      celulaAcoes.appendChild(botaoExcluir);
      linha.appendChild(celulaAcoes);

      tabelaAgendamentos.appendChild(linha);
    });

    tabelaAgendamentos.querySelectorAll('.botaoSalvarData').forEach((botao) => {
      botao.addEventListener('click', async () => {
        const campo = tabelaAgendamentos.querySelector(`input[data-id="${botao.dataset.id}"]`);
        const resposta = await apiFetch(`/agendamentos/${botao.dataset.id}`, {
          method: 'PUT',
          body: JSON.stringify({ data_agendamento: campo.value.replace('T', ' ') }),
        });
        if (!resposta.ok) {
          const dados = await resposta.json();
          mensagemErro.textContent = dados.mensagem || 'Não foi possível alterar a data.';
          return;
        }

        listarAgendamentos();
      });
    });

    tabelaAgendamentos.querySelectorAll('.botaoExcluir').forEach((botao) => {
      botao.addEventListener('click', async () => {
        const resposta = await apiFetch(`/agendamentos/${botao.dataset.id}`, { method: 'DELETE' });
        if (!resposta.ok) {
          const dados = await resposta.json();
          mensagemErro.textContent = dados.mensagem || 'Não foi possível remover o agendamento.';
          return;
        }

        listarAgendamentos();
      });
    });
    mensagemErro.textContent = '';
  } catch (erro) {
    mensagemErro.textContent = erro.message;
    console.error('Falha ao carregar agendamentos:', erro);
  }
}

async function carregarVeiculos() {
  try {
    const resposta = await apiFetch('/veiculos');
    const veiculos = await resposta.json();
    if (!resposta.ok) {
      throw new Error(veiculos.mensagem || 'Não foi possível carregar os veículos.');
    }

    veiculos.forEach((veiculo) => {
      const opcao = document.createElement('option');
      opcao.value = veiculo.id;
      opcao.textContent = `${veiculo.placa} - ${veiculo.marca ?? ''} ${veiculo.modelo ?? ''}`;
      campoVeiculo.appendChild(opcao);
    });
  } catch (erro) {
    mensagemErro.textContent = erro.message;
    console.error('Falha ao carregar veículos:', erro);
  }
}

formAgendamento.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const corpo = {
    veiculo_id: campoVeiculo.value,
    data_agendamento: document.getElementById('campoData').value.replace('T', ' '),
    servico: document.getElementById('campoServico').value,
  };

  const resposta = await apiFetch('/agendamentos', { method: 'POST', body: JSON.stringify(corpo) });
  if (!resposta.ok) {
    const dados = await resposta.json();
    mensagemErro.textContent = dados.mensagem || 'Não foi possível cadastrar o agendamento.';
    return;
  }

  formAgendamento.reset();
  listarAgendamentos();
});

listarAgendamentos();
carregarVeiculos();