const express = require("express");
const {
  createMarks,
  getAllMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
} = require("../controllers/marksController");

const router = express.Router();

router.post("/", createMarks);
router.get("/", getAllMarks);
router.get("/:id", getMarksById);
router.put("/:id", updateMarks);
router.delete("/:id", deleteMarks);

module.exports = router;
