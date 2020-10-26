const express = require('express');
const { getProfile, checkResults, createProfile } = require('./../controllers/profileController');
const auth = require('./../middleware/auth');

const router = express.Router();

router.get('/', auth, getProfile);
router.post('/', auth, checkResults, createProfile);

module.exports = router;
