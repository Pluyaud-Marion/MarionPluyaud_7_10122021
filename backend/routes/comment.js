const express = require("express");

const commentController = require("../controllers/comment");

const multer = require("../middleware/multer-config");
const auth = require("../middleware/authentification");
const limiter = require("../middleware/limiter");

const router = express.Router();


router.post("/comment/:postId", auth, limiter.globalLimiter ,multer, commentController.createComment);

//attention auth retiré
router.get("/comment/:postId", limiter.globalLimiter, commentController.getAllCommentForPost);

router.delete("/comment/:commentId", auth, limiter.globalLimiter,commentController.deleteComment);

module.exports = router;