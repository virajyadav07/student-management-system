import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    assignments: 0,
    recentStudents: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
      const response = await fetch(
        "https://student-management-system-ws04.onrender.com/api/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Dashboard API response:", data);
      if (!response.ok) {
        alert(data.message || "Failed to load dashboard");
        return;
      }

      setStats(data);
    } catch (error) {
      console.error("Dashboard error:", error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2>⚙️ Admin Panel</h2>

        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/students">Students</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/tasks">Assignments</Link>
          <Link to="/">Home</Link>
        </nav>

        <Link to="/login">
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Link>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        <div className="dashboard-header">

          <h1>Admin Dashboard</h1>

          <p>
            Manage students, attendance and assignments.
          </p>

        </div>


        {/* Statistics */}
        <div className="stats-container">

          <div className="stat-card">

            <h3>Total Students</h3>

            <h2>
              {loading ? "..." : stats.totalStudents}
            </h2>

          </div>


          <div className="stat-card">

            <h3>Present Today</h3>

            <h2>
              {loading ? "..." : stats.presentToday}
            </h2>

          </div>


          <div className="stat-card">

            <h3>Absent Today</h3>

            <h2>
              {loading ? "..." : stats.absentToday}
            </h2>

          </div>


          <div className="stat-card">

            <h3>Assignments</h3>

            <h2>
              {loading ? "..." : stats.assignments}
            </h2>

          </div>

        </div>


        {/* Quick Actions */}
        <section className="dashboard-section">

          <h2>⚡ Quick Actions</h2>

          <div className="admin-actions">

            <Link to="/students">
              <button className="primary-btn">
                + Add Student
              </button>
            </Link>

            <Link to="/attendance">
              <button className="primary-btn">
                📊 Mark Attendance
              </button>
            </Link>

            <Link to="/tasks">
              <button className="primary-btn">
                📝 Create Assignment
              </button>
            </Link>

          </div>

        </section>


        {/* Recent Students */}
        <section className="dashboard-section">

          <h2>👨‍🎓 Recent Students</h2>

          {loading ? (

            <p>Loading students...</p>

          ) : stats.recentStudents.length === 0 ? (

            <p>No students found.</p>

          ) : (

            <div className="attendance-table">

              <div className="table-row table-header">

                <span>Name</span>

                <span>Roll No.</span>

                <span>Course</span>

              </div>


              {stats.recentStudents.map((student) => (

                <div
                  className="table-row"
                  key={student._id}
                >

                  <span>
                    {student.name}
                  </span>

                  <span>
                    {student.rollNo}
                  </span>

                  <span>
                    {student.course}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;