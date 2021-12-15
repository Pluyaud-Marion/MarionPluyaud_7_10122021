const express = require('express');

const postController = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/authentification');

const router = express.Router();

router.post('/', auth, multer, postController.createPost);
router.get('/', auth, postController.getAllPost);
router.get('/:id', auth, postController.getUserPost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;