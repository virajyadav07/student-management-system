import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/login";
import Register from "./pages/register";
import StudentDashboard from "./pages/studentdashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Tasks from "./pages/Tasks";


// ===============================
// Protected Route
// ===============================
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ===============================
// Admin Route
// ===============================
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// ===============================
// Home Page
// ===============================
function Home() {
  return (
    <div className="app">

      <nav className="navbar">

        <h2>Student Management System</h2>

        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/students">
            Students
          </Link>

          <Link to="/attendance">
            Attendance
          </Link>

          <Link to="/tasks">
            Tasks
          </Link>

          <Link to="/admin">
            Admin
          </Link>

          <Link to="/login">
            <button>
              Login
            </button>
          </Link>

        </div>

      </nav>


      <section className="hero">

        <div className="hero-content">

          <h1>
            Student Task & Attendance
            <span> Management System</span>
          </h1>

          <p>
            Manage students, attendance and assignments
            from one simple dashboard.
          </p>


          <div className="buttons">

            <Link to="/register">

              <button className="primary-btn">
                Get Started
              </button>

            </Link>


            <Link to="/login">

              <button className="secondary-btn">
                Login
              </button>

            </Link>

          </div>

        </div>

      </section>


      <section className="features">

        <h2>System Features</h2>


        <div className="feature-container">


          <div className="feature-card">

            <h3>
              👨‍🎓 Student Management
            </h3>

            <p>
              Add, update and manage student information.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              📊 Attendance
            </h3>

            <p>
              Mark and track student attendance.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              📝 Assignments
            </h3>

            <p>
              Create and manage student tasks.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              🔐 Secure Login
            </h3>

            <p>
              Secure authentication for students and admins.
            </p>

          </div>


        </div>

      </section>


      <footer>

        <p>
          © 2026 Student Management System
        </p>

      </footer>

    </div>
  );
}


// ===============================
// App
// ===============================
function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        {/* Student Protected Route */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />


        {/* Attendance */}

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />


        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        <Route
          path="/students"
          element={
            <AdminRoute>
              <Students />
            </AdminRoute>
          }
        />


        <Route
          path="/tasks"
          element={
            <AdminRoute>
              <Tasks />
            </AdminRoute>
          }
        />


      </Routes>

    </BrowserRouter>

  );
}

export default App;