const express = require('express');
const { login } = require('../controllers/loginController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', asyncHandler(login));

module.exports = router;