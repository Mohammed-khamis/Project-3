const express = require('express');
const auth = require('./../middleware/auth');
const { protected, checkResults, login } = require('./../controllers/authController');

const router = express.Router();

router.get('/', auth, protected);
router.post('/', checkResults, login);

module.exports = router;
