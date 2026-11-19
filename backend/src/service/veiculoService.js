const veiculoRepository = require('../repositories/veiculoRepository');

async function listar() {
  return veiculoRepository.listarTodos();
}

async function cadastrar(clienteId, placa, marca, modelo, ano) {
  if (!clienteId) {
    return { erro: 'O cliente é obrigatório.' };
  }

  const id = await veiculoRepository.cadastrar(clienteId, placa, marca, modelo, ano);
  return { id, cliente_id: clienteId, placa, marca, modelo, ano };
}

async function atualizar(id, clienteId, placa, marca, modelo, ano) {
  if (!clienteId) {
    return { erro: 'O cliente é obrigatório.' };
  }

  await veiculoRepository.atualizar(id, clienteId, placa, marca, modelo, ano);
  return { id, cliente_id: clienteId, placa, marca, modelo, ano };
}

async function excluir(id) {
  await veiculoRepository.excluir(id);
}

module.exports = { listar, cadastrar, atualizar, excluir };