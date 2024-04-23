const express = require('express');
const { create, getAllCourses } = require('../controllers/course.controller');
const isAuthenticated = require('../middlewares/isAuth.middleware');

const router = express.Router();

router.post('/create', isAuthenticated, create);
router.get('/', isAuthenticated, getAllCourses);

module.exports = router;