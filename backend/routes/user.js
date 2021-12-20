const express = require('express');

const userController = require('../controllers/user');

const auth = require('../middleware/authentification');

//importation du middleware password après définition du passwordSchema
const password = require('../middleware/password');
const limiter = require('../middleware/limiter');

const router = express.Router();

router.post('/signup', password, userController.signUp);
router.post('/login', limiter.loginLimiter, userController.login);
router.get('/:id', auth, limiter.globalLimiter, userController.getOneProfile);
router.get('/', auth, limiter.globalLimiter, userController.getAllProfile);
router.delete('/:id', auth, limiter.globalLimiter, userController.deleteProfile);

module.exports = router;