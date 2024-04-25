const express = require('express');
const isAuthenticated = require('../middlewares/isAuth.middleware');
const { create, getAllSections, getSectionByID, updateASection, deleteASection } = require('../controllers/courseSection.controller');
const router = express.Router();

router.post("/create/:courseId", isAuthenticated, create);
router.get("/", isAuthenticated, getAllSections);
router.get("/:sectionID", isAuthenticated, getSectionByID);
router.put("/:sectionID", isAuthenticated, updateASection);
router.delete("/:sectionID", isAuthenticated, deleteASection);

module.exports = router;