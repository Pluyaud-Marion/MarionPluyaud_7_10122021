const express = require('express');

const commentController = require('../controllers/comment');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/authentification');
const limiter = require('../middleware/limiter');

const router = express.Router();

router.post('/:postId/comment', auth, limiter.globalLimiter ,multer, commentController.createComment);
//router.post('/', auth, limiter.globalLimiter ,multer, commentController.createComment);
router.get('/comment/:postId', auth, limiter.globalLimiter, commentController.getAllCommentForPost);
router.delete('/comment/:commentId', auth, limiter.globalLimiter,commentController.deleteComment);

module.exports = router;