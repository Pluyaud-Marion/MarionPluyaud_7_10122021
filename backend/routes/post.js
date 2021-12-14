const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPost);

module.exports = router;