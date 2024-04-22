const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // validate
    if (!username || !email || !password) {
        throw new Error('Please all fields are required');
    }
    // Check if user already exists
    userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }
    // Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create the user
    const userCreated = await User.create({ username, email, password: hashedPassword });

    res.json(userCreated);
});

module.exports = { register };