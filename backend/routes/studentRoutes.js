const express = require("express");
const Student = require("../models/Student");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all students
router.get("/", authMiddleware, async (req, res) => {
    
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
});

// Add student
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, rollNo, course } = req.body;

    const student = await Student.create({
      name,
      rollNo,
      course,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, rollNo, course } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        rollNo,
        course,
      },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
});
// Delete student
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) =>  {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
    });
  }
});

module.exports = router;