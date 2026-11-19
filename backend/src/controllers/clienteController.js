const clienteService = require('../service/clienteService');

async function listar(req, res) {
  const { busca } = req.query;
  const clientes = await clienteService.listar(busca);
  res.json(clientes);
}

async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, cpf, telefone, email } = req.body;

  const clienteAtualizado = await clienteService.atualizar(id, nome, cpf, telefone, email);
  res.json(clienteAtualizado);
}

async function cadastrar(req, res) {
  const { nome, cpf, telefone, email } = req.body;

  const cliente = await clienteService.cadastrar(nome, cpf, telefone, email);
  res.status(201).json(cliente);
}

async function excluir(req, res) {
  const { id } = req.params;

  await clienteService.excluir(id);
  res.json({ mensagem: 'Cliente removido.' });
}

module.exports = { listar, atualizar, cadastrar, excluir };