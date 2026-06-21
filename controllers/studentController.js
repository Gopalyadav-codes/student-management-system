const mongoose = require('mongoose');
const Student = require('../models/student');

exports.createStudent = async (req, res) => {
  try {
    const { name, rollNumber, department, year } = req.body;
    if (!name || !rollNumber || !department || !year) {
      return res.status(400).json({ success: false, message: 'All fields are required', data: null });
    }

    const student = await Student.create({ name, rollNumber, department, year });
    return res.status(201).json({ success: true, message: 'Student created', data: student });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate field value', data: err.keyValue });
    }
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().lean();
    return res.status(200).json({ success: true, message: 'Students retrieved', data: students });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID', data: null });
    }
    const student = await Student.findById(id).lean();
    if (!student) return res.status(404).json({ success: false, message: 'Student not found', data: null });
    return res.status(200).json({ success: true, message: 'Student retrieved', data: student });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID', data: null });
    }
    const updates = req.body;
    const updated = await Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ success: false, message: 'Student not found', data: null });
    return res.status(200).json({ success: true, message: 'Student updated', data: updated });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate field value', data: err.keyValue });
    }
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID', data: null });
    }
    const deleted = await Student.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ success: false, message: 'Student not found', data: null });
    return res.status(200).json({ success: true, message: 'Student deleted', data: null });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
};
