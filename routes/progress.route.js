const express = require('express');
const isAuthenticated = require('../middlewares/isAuth.middleware');
const { applyToCourse } = require('../controllers/progress.controller');
const router = express.Router();

router.post('/:courseId', isAuthenticated, applyToCourse);

module.exports = router;