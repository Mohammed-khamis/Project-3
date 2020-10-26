const express = require('express');
const {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfilebyUserID,
  deleteProfile,
} = require('./../controllers/profileController');
const auth = require('./../middleware/auth');

const router = express.Router();

router.post('/', auth, createProfile);
router.get('/', auth, getProfile);
router.get('/profiles', getAllProfiles);
router.get('/user/:user_id', getProfilebyUserID);
router.delete('/', auth, deleteProfile);

module.exports = router;
