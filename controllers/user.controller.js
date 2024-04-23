const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

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

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // !Check if user email already exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email or password is invalid');
    }

    //! Check if user password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(410);
        throw new Error('Email or password is invalid');
    }
    //! Generate the token
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    // Send the response
    res.json({
        message: 'Login Success',
        token,
        id: user._id,
        email: user.email
    });
});

const profile = asyncHandler(async(req, res) => {
    res.json({ mesage: 'Welcome to your profile' });
});

module.exports = { register, login, profile };