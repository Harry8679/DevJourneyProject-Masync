const express = require('express');
const { create, getAllCourses, getACourse } = require('../controllers/course.controller');
const isAuthenticated = require('../middlewares/isAuth.middleware');

const router = express.Router();

router.post('/create', isAuthenticated, create);
router.get('/', isAuthenticated, getAllCourses);
router.get('/:courseId', isAuthenticated, getACourse);

module.exports = router;