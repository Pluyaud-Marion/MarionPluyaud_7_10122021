const express = require('express');

const postController = require('../controllers/post');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.post('/', multer, postController.createPost);
router.get('/', postController.getAllPost);

module.exports = router;