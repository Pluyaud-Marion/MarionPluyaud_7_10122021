const express = require("express");

const commentController = require("../controllers/comment");

const multer = require("../middleware/multer-config");
const auth = require("../middleware/authentification");
const limiter = require("../middleware/limiter");

const router = express.Router();

//attention route modifiée dans controller
//ATTENTION AUTH RETIRE
router.post("/comment/:postId", limiter.globalLimiter ,multer, commentController.createComment);

//attention auth retiré
router.get("/comment/:postId", limiter.globalLimiter, commentController.getAllCommentForPost);

router.delete("/comment/:commentId", auth, limiter.globalLimiter,commentController.deleteComment);

module.exports = router;