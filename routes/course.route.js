const express = require('express');
const { create } = require('../controllers/course.controller');
const isAuthenticated = require('../middlewares/isAuth.middleware');

const router = express.Router();

router.post('/create', isAuthenticated, create);

module.exports = router;