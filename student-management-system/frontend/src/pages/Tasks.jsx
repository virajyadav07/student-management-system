import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [student, setStudent] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const [loading, setLoading] = useState(true);

  // Get tasks from backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to load tasks");
        return;
      }

      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !subject ||
      !student ||
      !studentEmail ||
      !dueDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            subject,
            student,
            studentEmail,
            dueDate,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create assignment");
        return;
      }

      setTasks([data, ...tasks]);

      setTitle("");
      setSubject("");
      setStudent("");
      setStudentEmail("");
      setDueDate("");
      setStatus("Pending");

      alert("Assignment created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create assignment");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete task");
        return;
      }

      setTasks(tasks.filter((task) => task._id !== id));

      alert("Assignment deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete assignment");
    }
  };

  return (
    <div className="tasks-page">

      <div className="page-header">
        <div>
          <h1>Task & Assignment Management</h1>
          <p>Create and manage student assignments</p>
        </div>

        <Link to="/admin">
          <button className="secondary-btn">
            Back to Admin
          </button>
        </Link>
      </div>

      {/* Add Assignment */}

      <section className="task-form-section">

        <h2>📝 Create Assignment</h2>

        <form onSubmit={addTask} className="task-form">

          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="DBMS">DBMS</option>
            <option value="DSA">DSA</option>
            <option value="Data Science">Data Science</option>
            <option value="Java">Java</option>
            <option value="Web Development">
              Web Development
            </option>
          </select>

          <input
            type="text"
            placeholder="Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />

          <input
            type="email"
            placeholder="Student Email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            type="submit"
            className="primary-btn"
          >
            Create Assignment
          </button>

        </form>

      </section>

      {/* Assignment List */}

      <section className="task-list-section">

        <h2>📚 Assignment List</h2>

        {loading ? (
          <p>Loading assignments...</p>
        ) : tasks.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          <div className="task-table">

            <div className="task-row task-header">
              <span>Assignment</span>
              <span>Subject</span>
              <span>Student</span>
              <span>Due Date</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {tasks.map((task) => (
              <div
                className="task-row"
                key={task._id}
              >

                <span>{task.title}</span>

                <span>{task.subject}</span>

                <span>{task.student}</span>

                <span>{task.dueDate}</span>

                <span>
                  <span
                    className={
                      task.status === "Completed"
                        ? "task-completed"
                        : "task-pending"
                    }
                  >
                    {task.status}
                  </span>
                </span>

                <span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </span>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Tasks;