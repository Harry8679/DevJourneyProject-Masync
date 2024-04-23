const asyncHandler = require('express-async-handler');

const create = asyncHandler(async(req, res) => {
    console.log(req.user);
    //! Find the user
    //! Validate the user input
    //! Check if the course already exists
    //! Create the course
    //! Send the response
    res.json({ 'message': 'Create a new course' });
});

module.exports = { create };