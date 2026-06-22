const Marks = require("../models/marks");

const createMarks = async (req, res) => {
  try {
    const { studentId, subject, marks } = req.body;

    if (!studentId || !subject || marks === undefined) {
      return res.status(400).json({
        message: "studentId, subject, and marks are required",
      });
    }

    const mark = new Marks({ studentId, subject, marks });
    const savedMark = await mark.save();

    return res.status(201).json({
      message: "Marks created successfully",
      data: savedMark,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create marks",
      error: error.message,
    });
  }
};

const getAllMarks = async (req, res) => {
  try {
    const marksList = await Marks.find();

    return res.status(200).json({
      message: "Marks records fetched successfully",
      data: marksList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch marks records",
      error: error.message,
    });
  }
};

const getMarksById = async (req, res) => {
  try {
    const mark = await Marks.findById(req.params.id);

    if (!mark) {
      return res.status(404).json({ message: "Marks not found" });
    }

    return res.status(200).json({
      message: "Marks fetched successfully",
      data: mark,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch marks",
      error: error.message,
    });
  }
};

const updateMarks = async (req, res) => {
  try {
    const mark = await Marks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!mark) {
      return res.status(404).json({ message: "Marks not found" });
    }

    return res.status(200).json({
      message: "Marks updated successfully",
      data: mark,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update marks",
      error: error.message,
    });
  }
};

const deleteMarks = async (req, res) => {
  try {
    const mark = await Marks.findByIdAndDelete(req.params.id);

    if (!mark) {
      return res.status(404).json({ message: "Marks not found" });
    }

    return res.status(200).json({
      message: "Marks deleted successfully",
      data: mark,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete marks",
      error: error.message,
    });
  }
};

module.exports = {
  createMarks,
  getAllMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
};
