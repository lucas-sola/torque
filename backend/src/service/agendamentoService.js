const agendamentoRepository = require('../repositories/agendamentoRepository');

async function listar() {
  return agendamentoRepository.listarTodos();
}

async function atualizarData(id, novaData) {
  await agendamentoRepository.atualizarData(id, novaData);
  return { id, data_agendamento: novaData };
}

async function cadastrar(veiculoId, dataAgendamento, servico) {
  const id = await agendamentoRepository.cadastrar(veiculoId, dataAgendamento, servico);
  return { id, veiculo_id: veiculoId, data_agendamento: dataAgendamento, servico };
}

async function excluir(id) {
  await agendamentoRepository.excluir(id);
}

module.exports = { listar, atualizarData, cadastrar, excluir };