const express = require("express");
const Attendance = require("../models/Attendance");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

// Get all attendance records
router.get("/", authMiddleware, async (req, res) => {
  try {
    let records;

    if (req.user.role === "admin") {
      // Admin can see all attendance records
      records = await Attendance.find().sort({ createdAt: -1 });
    } else {
      // Student can see only their own attendance
      records = await Attendance.find({
        studentEmail: req.user.email,
      }).sort({ createdAt: -1 });
    }

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
});
// Add attendance
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, rollNo, studentEmail, subject, date, status } = req.body;

    const attendance = await Attendance.create({
      name,
      rollNo,
      studentEmail,
      subject,
      date,
      status,
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add attendance",
      error: error.message,
    });
  }
});

// Update attendance
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      name,
      rollNo,
      studentEmail,
      subject,
      date,
      status,
    } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      {
        name,
        rollNo,
        studentEmail,
        subject,
        date,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update attendance",
      error: error.message,
    });
  }
});

// Delete attendance
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete attendance",
    });
  }
});

module.exports = router;