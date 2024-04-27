const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Course = require('../models/course.model');

/************* Apply to a course *************/
const applyToCourse = asyncHandler(async(req, res) => {
    const userId = req.user;
    const { courseId } = req.body;
    //! Find a user
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    //! Check if user is already enrolled in the course
    const isAlreadyEnrolled = user.progress.some((progress) => progress.courseId.toString() === courseId.toString());

    if (isAlreadyEnrolled) {
        return res.status(400).json({ message: 'You have already enrolled in this is course' });
    }
    //! Validate the course
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    //! Add the course to user's progress
    user.progress.push({ courseId, sections: [] });
    //!resave
    await user.save();
    //! Push the user to the course
    course.students.push(userId);
    res.status(200).json({ message: 'Application to course successful' });

});

module.exports = { applyToCourse };