const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Course = require('../models/course.model');

const create = asyncHandler(async(req, res) => {
    const { title, description, difficulty, duration } = req.body;
    //! Find the user
    const userFound = await User.findById(req.user);
    if (!userFound) {
        res.status(404);
        throw new Error('User not found');
    }

    // if (userFound.role !== 'instructor') {
    //     res.status(401);
    //     throw new Error('You are not allowed to create a course, instructor only');
    // }
    //! Validate the user input
    if (!title || !description || !difficulty || !duration) {
        throw new Error('Please provide all fields');
    }
    //! Check if the course already exists
    const courseFound = await Course.findOne({ title });
    if (courseFound) {
        throw new Error('Course already exists');
    }
    //! Create the course
    const courseCreated = await Course.create({ title, description, difficulty, duration, user: req.user });
    //! Push the course
    userFound.coursesCreated.push(courseCreated._id);
    //! Resave the user
    await userFound.save();
    //! Send the response
    res.json(courseCreated);
});

const getAllCourses = asyncHandler(async(req, res) => {
    const courses = await Course.find().populate('sections').populate({ path: 'user', model: 'User', select: 'username email' });
    res.json(courses);
});

const getACourse = asyncHandler(async(req, res) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate('sections').populate({ path: 'user', model: 'User', select: 'username email' });

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    res.json(course);
});

module.exports = { create, getAllCourses, getACourse };