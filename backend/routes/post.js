const express = require("express");

const postController = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/authentification");
const limiter = require("../middleware/limiter");
const router = express.Router();

//ATTENTION AUTH RETIRE
//router.post("/:userId", limiter.globalLimiter, multer, postController.createPost);
router.post("/", limiter.globalLimiter, multer, postController.createPost);
//ATTENTION AUTH RETIRE
router.get("/", limiter.globalLimiter, postController.getAllPost);
router.get("/:userId", auth, limiter.globalLimiter, postController.getUserPost);
router.put("/:postId", auth, limiter.globalLimiter, multer, postController.updatePost);
router.delete("/:postId", auth, limiter.globalLimiter, postController.deletePost);


module.exports = router;