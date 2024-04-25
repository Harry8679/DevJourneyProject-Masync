const express = require('express');
const isAuthenticated = require('../middlewares/isAuth.middleware');
const { create } = require('../controllers/courseSection.controller');
const router = express.Router();

// router.post("/create", isAuthenticated, create);
router.post("/create/:courseId", isAuthenticated, create);

module.exports = router;