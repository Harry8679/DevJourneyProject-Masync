const mongoose = require('mongoose');

const courseSectionSchema = new mongoose.Schema({
    sectionName: { type: String, required: true },
    sectionsCompleted: [],
    estimatedTime: Number,
    isCompleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true,
});

module.exports = mongoose.model('CourseSection', courseSectionSchema);