const express = require('express');

const postController = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/authentification');
const limiter = require('../middleware/limiter');
const router = express.Router();

router.post('/', auth, limiter.globalLimiter, multer, postController.createPost);
router.get('/', auth, limiter.globalLimiter, postController.getAllPost);
router.get('/:id', auth, limiter.globalLimiter, postController.getUserPost);
router.delete('/:id', auth, limiter.globalLimiter, postController.deletePost);


module.exports = router;