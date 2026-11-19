const express = require('express');
const auth = require('../middlewares/auth');
const { listar, atualizar, cadastrar, excluir } = require('../controllers/clienteController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(listar));

router.post('/', asyncHandler(cadastrar));

router.put('/:id', asyncHandler(atualizar));

router.delete('/:id', asyncHandler(excluir));

module.exports = router;