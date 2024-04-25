const express = require('express');
const isAuthenticated = require('../middlewares/isAuth.middleware');
const { create, getAllSections } = require('../controllers/courseSection.controller');
const router = express.Router();

// router.post("/create", isAuthenticated, create);
router.post("/create/:courseId", isAuthenticated, create);
router.get("/", isAuthenticated, getAllSections);

module.exports = router;