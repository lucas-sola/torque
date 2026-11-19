const express = require('express');
const auth = require('../middlewares/auth');
const { listar, atualizarData, cadastrar, excluir } = require('../controllers/agendamentoController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(listar));

router.post('/', asyncHandler(cadastrar));

router.put('/:id', asyncHandler(atualizarData));

router.delete('/:id', asyncHandler(excluir));

module.exports = router;