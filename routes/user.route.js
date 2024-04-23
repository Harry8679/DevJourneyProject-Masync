const express =require('express');
const { register, login, profile } = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuth.middleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isAuthenticated, profile);

module.exports = router;