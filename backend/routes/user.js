const express = require("express");

const userController = require("../controllers/user");

const auth = require("../middleware/authentification");

//importation du middleware password après définition du passwordSchema
const password = require("../middleware/password");
const limiter = require("../middleware/limiter");

const router = express.Router();

router.post("/signup", password, userController.signUp);
router.post("/login", limiter.loginLimiter, userController.login);
router.get("/full/:userId", auth, limiter.globalLimiter, userController.getOneProfileFull);
router.get("/:userId", auth, limiter.globalLimiter, userController.getOneProfileSimplify);
router.get("/", auth, limiter.globalLimiter, userController.adminGetAllProfile);
router.put("/:userId", auth, limiter.globalLimiter, userController.modifyProfile);
router.delete("/:userId", auth, limiter.globalLimiter, userController.deleteProfile);

module.exports = router;