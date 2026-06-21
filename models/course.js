const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, trim: true },
  courseCode: { type: String, required: true, unique: true, trim: true },
  faculty: { type: String, required: true, trim: true },
  credits: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
