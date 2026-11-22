import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [attendanceResponse, tasksResponse] = await Promise.all([
          fetch("http://localhost:5000/api/attendance", {
            headers,
          }),
          fetch("http://localhost:5000/api/tasks", {
            headers,
          }),
        ]);

        const attendanceData = await attendanceResponse.json();
        const tasksData = await tasksResponse.json();

        if (!attendanceResponse.ok) {
          alert(
            attendanceData.message || "Failed to load attendance"
          );
          return;
        }

        if (!tasksResponse.ok) {
          alert(tasksData.message || "Failed to load tasks");
          return;
        }

        setAttendance(attendanceData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Dashboard error:", error);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const totalClasses = attendance.length;

  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const attendancePercentage =
    totalClasses > 0
      ? Math.round((presentCount / totalClasses) * 100)
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🎓 Student</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/tasks">Assignments</Link>
          <Link to="/">Home</Link>
        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        <div className="dashboard-header">
          <div>
            <h1>Student Dashboard</h1>
            <p>
              Welcome back, {user?.name || "Student"} 👋
            </p>
          </div>
        </div>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* Statistics */}
            <div className="stats-container">

              <div className="stat-card">
                <h3>Total Classes</h3>
                <h2>{totalClasses}</h2>
              </div>

              <div className="stat-card">
                <h3>Present</h3>
                <h2>{presentCount}</h2>
              </div>

              <div className="stat-card">
                <h3>Absent</h3>
                <h2>{absentCount}</h2>
              </div>

              <div className="stat-card">
                <h3>Attendance</h3>
                <h2>{attendancePercentage}%</h2>
              </div>

            </div>

            {/* Assignments */}
            <section className="dashboard-section">

              <h2>📝 My Assignments</h2>

              <div className="assignment-list">

                {tasks.length === 0 ? (
                  <p>No assignments found.</p>
                ) : (
                  tasks.slice(0, 5).map((task) => (
                    <div
                      className="assignment-card"
                      key={task._id}
                    >
                      <div>
                        <h3>{task.title}</h3>
                        <p>
                          {task.subject} | Submission:{" "}
                          {task.dueDate}
                        </p>
                      </div>

                      <span
                        className={
                          task.status === "Completed"
                            ? "completed"
                            : "pending"
                        }
                      >
                        {task.status}
                      </span>
                    </div>
                  ))
                )}

              </div>

            </section>

            {/* Recent Attendance */}
            <section className="dashboard-section">

              <h2>📊 Recent Attendance</h2>

              <div className="attendance-table">

                <div className="table-row table-header">
                  <span>Date</span>
                  <span>Subject</span>
                  <span>Status</span>
                </div>

                {attendance.length === 0 ? (
                  <div className="table-row">
                    <span>No attendance</span>
                    <span>-</span>
                    <span>-</span>
                  </div>
                ) : (
                  attendance.slice(0, 5).map((record) => (
                    <div
                      className="table-row"
                      key={record._id}
                    >
                      <span>{record.date}</span>
                      <span>{record.subject}</span>

                      <span
                        className={
                          record.status === "Present"
                            ? "present"
                            : "absent"
                        }
                      >
                        {record.status}
                      </span>
                    </div>
                  ))
                )}

              </div>

            </section>
          </>
        )}

      </main>

    </div>
  );
}

export default StudentDashboard;