const Attendance = require("../models/attendance");

const createAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({
        message: "studentId, date, and status are required",
      });
    }

    const attendance = new Attendance({ studentId, date, status });
    const savedAttendance = await attendance.save();

    return res.status(201).json({
      message: "Attendance created successfully",
      data: savedAttendance,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create attendance",
      error: error.message,
    });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const attendanceList = await Attendance.find();

    return res.status(200).json({
      message: "Attendance records fetched successfully",
      data: attendanceList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance records",
      error: error.message,
    });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    return res.status(200).json({
      message: "Attendance fetched successfully",
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    return res.status(200).json({
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    return res.status(200).json({
      message: "Attendance deleted successfully",
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
