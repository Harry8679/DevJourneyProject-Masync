const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: {
        type: String,
        enum: ['admin', 'instructor', 'student'],
        default: 'student',
    },
    progress: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        sections: [{
            sectionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CourseSection',
                required: true,
            },
            status: {
                type: String,
                enum: ['Not started', 'In Progress', 'Completed'],
                default: 'Not started',
            }
        }]
    }],
    courseCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    courseApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    lastLogin: Date,
});

// Compile to form the model
module.exports = mongoose.model('User', userSchema);