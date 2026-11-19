const clienteRepository = require('../repositories/clienteRepository');
const { criptografarCpf, descriptografarCpf } = require('../utils/cripto');

function descriptografarLista(clientes) {
  return clientes.map((cliente) => ({
    ...cliente,
    cpf: descriptografarCpf(cliente.cpf),
  }));
}

async function listar(busca) {
  const clientes = busca
    ? await clienteRepository.buscarPorNome(busca)
    : await clienteRepository.listarTodos();

  return descriptografarLista(clientes);
}

async function atualizar(id, nome, cpf, telefone, email) {
  const cpfCriptografado = criptografarCpf(cpf);
  await clienteRepository.atualizar(id, nome, cpfCriptografado, telefone, email);

  const clienteAtualizado = await clienteRepository.buscarPorId(id);
  return { ...clienteAtualizado, cpf: descriptografarCpf(clienteAtualizado.cpf) };
}

async function cadastrar(nome, cpf, telefone, email) {
  const cpfCriptografado = criptografarCpf(cpf);
  const id = await clienteRepository.cadastrar(nome, cpfCriptografado, telefone, email);
  return { id, nome, cpf, telefone, email };
}

async function excluir(id) {
  await clienteRepository.excluir(id);
}

module.exports = { listar, atualizar, cadastrar, excluir };