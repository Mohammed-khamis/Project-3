const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
} = require('./../controllers/postController');
const auth = require('./../middleware/auth');

const router = express.Router();

router.post('/', auth, createPost);
router.get('/', auth, getAllPosts)
router.get('/:id', auth, getPost);
router.delete('/:id', auth, deletePost);

module.exports = router;
