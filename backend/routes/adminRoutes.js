const express = require("express");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
    "/stats",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            // Total students
            const totalStudents = await Student.countDocuments();

            // Today's date
            const today = new Date().toISOString().split("T")[0];

            // Today's attendance
            const presentToday = await Attendance.countDocuments({
                date: today,
                status: "Present",
            });

            const absentToday = await Attendance.countDocuments({
                date: today,
                status: "Absent",
            });

            // Total assignments
            const assignments = await Task.countDocuments();

            // Recent students
            const recentStudents = await Student.find()
                .sort({ createdAt: -1 })
                .limit(5);

            console.log(
                "DASHBOARD:",
                totalStudents,
                presentToday,
                absentToday,
                assignments
            );


            res.json({
                totalStudents,
                presentToday,
                absentToday,
                assignments,
                recentStudents,
            });

        } catch (error) {
            console.error("Dashboard error:", error);

            res.status(500).json({
                message: "Failed to fetch dashboard statistics",
            });
        }
    }
);

module.exports = router;