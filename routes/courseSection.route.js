const express = require('express');
const isAuthenticated = require('../middlewares/isAuth.middleware');
const { create, getAllSections, getSectionByID } = require('../controllers/courseSection.controller');
const router = express.Router();

router.post("/create/:courseId", isAuthenticated, create);
router.get("/", isAuthenticated, getAllSections);
router.get("/:sectionID", isAuthenticated, getSectionByID);

module.exports = router;