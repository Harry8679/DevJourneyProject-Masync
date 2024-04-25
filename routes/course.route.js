const express = require('express');
const { create, getAllCourses, getACourse, updateACourse, deleteACourse } = require('../controllers/course.controller');
const isAuthenticated = require('../middlewares/isAuth.middleware');

const router = express.Router();

router.post('/create', isAuthenticated, create);
router.get('/', isAuthenticated, getAllCourses);
router.get('/:courseId', isAuthenticated, getACourse);
router.put('/:courseId', isAuthenticated, updateACourse);
router.delete('/:courseId', isAuthenticated, deleteACourse);

module.exports = router;