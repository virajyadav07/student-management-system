import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Attendance() {
  const [records, setRecords] = useState([]);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/attendance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to load attendance");
        return;
      }

      setRecords(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Add Attendance
  const markAttendance = async (e) => {
    e.preventDefault();

    if (!name || !rollNo || !studentEmail || !subject || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            rollNo,
            studentEmail,
            subject,
            date,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to mark attendance");
        return;
      }

      setRecords([data, ...records]);

      clearForm();

      alert("Attendance marked successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance");
    }
  };

  // Start Edit
  const startEdit = (record) => {
    setEditingId(record._id);

    setName(record.name);
    setRollNo(record.rollNo);
    setStudentEmail(record.studentEmail);
    setSubject(record.subject);
    setDate(record.date);
    setStatus(record.status);
  };

  // Update Attendance
  const updateAttendance = async (e) => {
    e.preventDefault();

    if (!name || !rollNo || !studentEmail || !subject || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/attendance/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            rollNo,
            studentEmail,
            subject,
            date,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update attendance");
        return;
      }

      setRecords(
        records.map((record) =>
          record._id === editingId ? data : record
        )
      );

      clearForm();

      alert("Attendance updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update attendance");
    }
  };

  // Clear Form
  const clearForm = () => {
    setEditingId(null);
    setName("");
    setRollNo("");
    setStudentEmail("");
    setSubject("");
    setDate("");
    setStatus("Present");
  };

  // Delete Attendance
  const deleteRecord = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/attendance/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete attendance");
        return;
      }

      setRecords(
        records.filter((record) => record._id !== id)
      );

      alert("Attendance deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete attendance");
    }
  };

  return (
    <div className="attendance-page">

      <div className="page-header">
        <div>
          <h1>Attendance Management</h1>
          <p>View and manage student attendance</p>
        </div>

        <Link to="/dashboard">
          <button className="secondary-btn">
            Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Admin Form */}
      {user?.role === "admin" && (
        <section className="attendance-form-section">

          <h2>
            {editingId
              ? "✏️ Edit Attendance"
              : "📊 Mark Attendance"}
          </h2>

          <form
            onSubmit={
              editingId
                ? updateAttendance
                : markAttendance
            }
            className="attendance-form"
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
              type="email"
              placeholder="Student Email"
              value={studentEmail}
              onChange={(e) =>
                setStudentEmail(e.target.value)
              }
            />

            <select
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
            >
              <option value="">Select Subject</option>
              <option value="Data Science">
                Data Science
              </option>
              <option value="DBMS">DBMS</option>
              <option value="Java">Java</option>
              <option value="Web Development">
                Web Development
              </option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <button
              type="submit"
              className="primary-btn"
            >
              {editingId
                ? "Update Attendance"
                : "Mark Attendance"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}

          </form>

        </section>
      )}

      {/* Attendance Records */}
      <section className="attendance-list-section">

        <h2>📋 Attendance Records</h2>

        {loading ? (
          <p>Loading attendance...</p>
        ) : records.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <div className="attendance-record-table">

            <div className="attendance-record-row attendance-record-header">
              <span>Name</span>
              <span>Roll No.</span>
              <span>Subject</span>
              <span>Date</span>
              <span>Status</span>

              {user?.role === "admin" && (
                <span>Action</span>
              )}
            </div>

            {records.map((record) => (
              <div
                className="attendance-record-row"
                key={record._id}
              >

                <span>{record.name}</span>

                <span>{record.rollNo}</span>

                <span>{record.subject}</span>

                <span>{record.date}</span>

                <span>
                  <span
                    className={
                      record.status === "Present"
                        ? "attendance-present"
                        : "attendance-absent"
                    }
                  >
                    {record.status}
                  </span>
                </span>

                {user?.role === "admin" && (
                  <span>

                    <button
                      className="primary-btn"
                      onClick={() =>
                        startEdit(record)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteRecord(record._id)
                      }
                    >
                      Delete
                    </button>

                  </span>
                )}

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Attendance;