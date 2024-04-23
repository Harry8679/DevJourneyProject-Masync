const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String },
    difficulty: { type: String, required: true},
    duration: { type: String, required: true},
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseSection' }],
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
});

// Compile to form the model
module.exports = mongoose.model('Course', courseSchema);