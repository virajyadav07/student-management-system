const express = require("express");
const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // Admin can see all tasks
      tasks = await Task.find().sort({ createdAt: -1 });
    } else {
      // Student can see only their own tasks
      tasks = await Task.find({
        studentEmail: req.user.email,
      }).sort({ createdAt: -1 });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});
// Add task
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      title,
      subject,
      student,
      studentEmail,
      dueDate,
      status,
    } = req.body;

    const task = await Task.create({
      title,
      subject,
      student,
      studentEmail,
      dueDate,
      status,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add task",
      error: error.message,
    });
  }
});

// Delete task
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;