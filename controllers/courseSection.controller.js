const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const CourseSection = require('../models/courseSection.model');
const Course = require('../models/course.model');

const create = asyncHandler(async (req, res) => {
    //!Find the user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      res.status(404);
      throw new Error("User not found");
    }
    // if (userFound.role !== "instructor") {
    //   res.status(401);
    //   throw new Error(
    //     "You are not authorized to create a course, instructors only"
    //   );
    // }
    //! Get the section name
    const { sectionName } = req.body;
    //! Get the courseID
    const { courseId } = req.params;
    //! Validate the courseid
    if (!mongoose.isValidObjectId(courseId)) {
      throw new Error("Invalid course ID");
    }
    //!Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    //! validate the section name
    if (!sectionName) {
      throw new Error("Please provide section name");
    }
    //! Create the course section
    const sectionCreated = await CourseSection.create({
      sectionName,
      user: req.user,
    });
    //! Add course section to a course
    course.sections.push(sectionCreated._id);
    //! resave
    await course.save();
    res.json({
      message: "Section created successfully",
      data: sectionCreated,
      status: "success",
    });
});

const getAllSections = asyncHandler(async(req, res) => {
    const courseSections = await CourseSection.find();
    res.json(courseSections);
});

const getSectionByID = asyncHandler(async(req, res) => {
    const { sectionID } = req.params;
    // console.log(sectionID);
    const courseSection = await CourseSection.findById(sectionID);

    if (courseSection) {
        res.json(courseSection);
    } else {
        res.status(404);
        throw new Error('Section not found');
    }
});

const updateASection = asyncHandler(async(req, res) => {
    const { sectionID } = req.params;
    // const courseSection = await CourseSection.findById(sectionID);
    const courseSection = await CourseSection.findByIdAndUpdate(sectionID, req.body, { new: true });

    if (courseSection){
        res.json(courseSection);
    } else {
        res.status(404);
        throw new Error('Section not found');
    }
});

module.exports = { create, getAllSections, getSectionByID, updateASection };