const mongoose = require('mongoose');
const Course = require('../models/course');

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseCode, faculty, credits } = req.body;
    if (!courseName || !courseCode || !faculty || credits === undefined) {
      return res.status(400).json({ success: false, message: 'All fields are required', data: null });
    }
    if (typeof credits !== 'number') {
      return res.status(400).json({ success: false, message: 'Credits must be a number', data: null });
    }

    const course = await Course.create({ courseName, courseCode, faculty, credits });
    return res.status(201).json({ success: true, message: 'Course created', data: course });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate field value', data: err.keyValue });
    }
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().lean();
    return res.status(200).json({ success: true, message: 'Courses retrieved', data: courses });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID', data: null });
    }
    const course = await Course.findById(id).lean();
    if (!course) return res.status(404).json({ success: false, message: 'Course not found', data: null });
    return res.status(200).json({ success: true, message: 'Course retrieved', data: course });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID', data: null });
    }
    const updates = req.body;
    if (updates.credits !== undefined && typeof updates.credits !== 'number') {
      return res.status(400).json({ success: false, message: 'Credits must be a number', data: null });
    }
    const updated = await Course.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ success: false, message: 'Course not found', data: null });
    return res.status(200).json({ success: true, message: 'Course updated', data: updated });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate field value', data: err.keyValue });
    }
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID', data: null });
    }
    const deleted = await Course.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ success: false, message: 'Course not found', data: null });
    return res.status(200).json({ success: true, message: 'Course deleted', data: null });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};
