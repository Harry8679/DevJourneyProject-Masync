const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Course = require('../models/course.model');

/************* Create a New Course *************/
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

/************* Get All Courses *************/
const getAllCourses = asyncHandler(async(req, res) => {
    const courses = await Course.find().populate('sections').populate({ path: 'user', model: 'User', select: 'username email' });
    res.json(courses);
});

/************* Get a Course By ID *************/
const getACourse = asyncHandler(async(req, res) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate('sections').populate({ path: 'user', model: 'User', select: 'username email' });

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    res.json(course);
});

/************* Update a Course *************/
const updateACourse = asyncHandler(async(req, res) => {
    const { courseId } = req.params;
    const course = await Course.findByIdAndUpdate(courseId, req.body, { new: true });

    if (course) {
        res.json(course);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

/************* Delete a Course *************/
const deleteACourse = asyncHandler(async(req, res) => {
    const { courseId } = req.params;
    
    //! Find the Course
    const courseFound = await Course.findById(courseId);
    //! Prevent deletion if a course a student
    if (courseFound && courseFound.students.length < 0) {
        res.status(400);
        res.json({ message: 'Course has studentsn cannot delete' });
        return;
    }
    //! Proceed to delete
    const course = await Course.findByIdAndDelete(courseId);
    if (course) {
        //* Remove from the user's course created
        await User.updateMany({ coursesCreated: courseId }, {
            $pull: { coursesCreated: courseId }
        });

        //! Send the response
        res.json(course);
    } else {
        res.json({ message: 'Course not found' });
    }
});

module.exports = { create, getAllCourses, getACourse, updateACourse, deleteACourse };