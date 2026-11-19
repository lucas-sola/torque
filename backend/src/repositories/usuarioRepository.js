const db = require('../config/db');

async function buscarPorEmail(email) {
  const [linhas] = await db.query(
    'SELECT id, nome, email, senha FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );
  return linhas[0];
}

module.exports = { buscarPorEmail };
