const express = require('express');

const postController = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/authentification');
const limiter = require('../middleware/limiter');
const router = express.Router();

//VERSION 1
//router.post('/', auth, limiter.globalLimiter, multer, postController.createPost);
//VERSION 2
router.post('/:userId', auth, limiter.globalLimiter, multer, postController.createPost);
router.get('/', auth, limiter.globalLimiter, postController.getAllPost);
router.get('/:userId', auth, limiter.globalLimiter, postController.getUserPost);
router.delete('/:postId', auth, limiter.globalLimiter, postController.deletePost);


module.exports = router;