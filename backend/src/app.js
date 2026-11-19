require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./config/db');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const loginRoutes = require('./routes/loginRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');

const app = express();
const pastaFrontend = path.join(__dirname, '..', '..', 'frontend');

app.use(express.json());
app.use(express.static(pastaFrontend));

app.use('/login', loginRoutes);
app.use('/clientes', clienteRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/agendamentos', agendamentoRoutes);

app.use((erro, req, res, next) => {
  console.error('Erro ao processar a solicitação:', erro);
  res.status(500).json({ mensagem: 'Ocorreu um erro interno. Tente novamente.' });
});

async function iniciarServidor() {
  try {
    const obrigatorias = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET', 'CRIPTO_CHAVE', 'CRIPTO_IV'];
    const ausentes = obrigatorias.filter((nome) => !process.env[nome]);
    if (ausentes.length > 0) {
      throw new Error(`Configure as variáveis no arquivo .env: ${ausentes.join(', ')}`);
    }

    if (Buffer.byteLength(process.env.CRIPTO_CHAVE, 'utf8') !== 32) {
      throw new Error('CRIPTO_CHAVE deve conter exatamente 32 bytes.');
    }
    if (Buffer.byteLength(process.env.CRIPTO_IV, 'utf8') !== 16) {
      throw new Error('CRIPTO_IV deve conter exatamente 16 bytes.');
    }

    await db.query('SELECT 1');
    const porta = Number(process.env.PORT) || 3000;

    app.listen(porta, () => {
      console.log(`Sistema disponível em http://localhost:${porta}`);
    });
  } catch (erro) {
    console.error('Não foi possível iniciar o sistema:', erro.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  iniciarServidor();
}

module.exports = app;
