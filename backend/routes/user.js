const express = require('express');

const userController = require('../controllers/user');
const auth = require('../middleware/authentification');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/:id', auth, userController.getOneProfile);
router.get('/', auth, userController.getAllProfile);
router.delete('/:id', auth, userController.deleteProfile);

module.exports = router;