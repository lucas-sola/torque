const agendamentoService = require('../service/agendamentoService');

async function listar(req, res) {
  const agendamentos = await agendamentoService.listar();
  res.json(agendamentos);
}

async function atualizarData(req, res) {
  const { id } = req.params;
  const { data_agendamento } = req.body;

  const resultado = await agendamentoService.atualizarData(id, data_agendamento);
  res.json(resultado);
}

async function cadastrar(req, res) {
  const { veiculo_id, data_agendamento, servico } = req.body;

  const agendamento = await agendamentoService.cadastrar(veiculo_id, data_agendamento, servico);
  res.status(201).json(agendamento);
}

async function excluir(req, res) {
  const { id } = req.params;

  await agendamentoService.excluir(id);
  res.json({ mensagem: 'Agendamento removido.' });
}

module.exports = { listar, atualizarData, cadastrar, excluir };