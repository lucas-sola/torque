require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');

async function autenticar(email, senha) {
  const usuario = await usuarioRepository.buscarPorEmail(email);

  if (!usuario) {
    return null;
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return null;
  }

  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, nome: usuario.nome };
}

module.exports = { autenticar };