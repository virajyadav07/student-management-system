import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Students() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  // Get students from backend
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://student-management-system-ws04.onrender.com/api/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to load students");
        return;
      }

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // Load students when page opens
  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student
  const addStudent = async (e) => {
    e.preventDefault();

    if (!name || !rollNo || !course) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://student-management-system-ws04.onrender.com/api/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            rollNo,
            course,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add student");
        return;
      }

      setStudents([...students, data]);

      setName("");
      setRollNo("");
      setCourse("");

      alert("Student added successfully");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student");
    }
  };

  // Update student
  const updateStudent = async (e) => {
    e.preventDefault();

    if (!name || !rollNo || !course) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://student-management-system-ws04.onrender.com/api/students/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            rollNo,
            course,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update student");
        return;
      }

      setStudents(
        students.map((student) =>
          student._id === editingId ? data : student
        )
      );

      setName("");
      setRollNo("");
      setCourse("");
      setEditingId(null);

      alert("Student updated successfully");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student");
    }
  };

  // Start editing
  const startEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setRollNo(student.rollNo);
    setCourse(student.course);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setRollNo("");
    setCourse("");
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://student-management-system-ws04.onrender.com/api/students/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete student");
        return;
      }

      setStudents(
        students.filter((student) => student._id !== id)
      );

      alert("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    }
  };

  return (
    <div className="students-page">

      <div className="page-header">
        <div>
          <h1>Student Management</h1>
          <p>Add and manage students</p>
        </div>

        <Link to="/admin">
          <button className="secondary-btn">
            Back to Admin
          </button>
        </Link>
      </div>

      <section className="student-form-section">

        <h2>
          {editingId ? "✏️ Edit Student" : "➕ Add Student"}
        </h2>

        <form
          onSubmit={editingId ? updateStudent : addStudent}
          className="student-form"
        >

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <button type="submit" className="primary-btn">
            {editingId ? "Update Student" : "Add Student"}
          </button>

          {editingId && (
            <button
              type="button"
              className="secondary-btn"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}

        </form>

      </section>

      <section className="students-list-section">

        <h2>👨‍🎓 Student List</h2>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="student-table">

            <div className="student-row student-header">
              <span>Name</span>
              <span>Roll No.</span>
              <span>Course</span>
              <span>Action</span>
            </div>

            {students.map((student) => (
              <div
                className="student-row"
                key={student._id}
              >

                <span>{student.name}</span>

                <span>{student.rollNo}</span>

                <span>{student.course}</span>

                <span>

                  <button
                    className="primary-btn"
                    onClick={() => startEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteStudent(student._id)
                    }
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

export default Students;