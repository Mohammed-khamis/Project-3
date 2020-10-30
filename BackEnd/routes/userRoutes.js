const express = require('express');
const { register, checkResults } = require('./../controllers/userController');

const router = express.Router();

router.post('/', checkResults, register);

module.exports = router;
