const usuarioService = require('../service/usuarioService');

async function login(req, res) {
  const { email, senha } = req.body;

  const resultado = await usuarioService.autenticar(email, senha);

  if (!resultado) {
    return res.status(401).json({ mensagem: 'E-mail ou senha inválidos.' });
  }

  res.json(resultado);
}

module.exports = { login };