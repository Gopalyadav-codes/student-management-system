const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());

// Import routes
const studentRoutes = require("./routes/studentRoute");
const courseRoutes = require("./routes/courseRoute");
const attendanceRoutes = require("./routes/attendanceRoute");
const marksRoutes = require("./routes/marksRoute");

// Connect DB
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("Server running");
});

// Register routes
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});