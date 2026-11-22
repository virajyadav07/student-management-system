1. Student Task & Attendance Management System

A full-stack web application for managing students, attendance, assignments, and user authentication with role-based access control.

2.  Project Overview

The **Student Task & Attendance Management System** is designed to simplify student management for administrators and provide students with an easy way to view their attendance and assignments.

The system provides separate access for:

- 👨‍💼 Admin
- 👨‍🎓 Student

Admins can manage students, attendance, and assignments, while students can view their personal attendance records and assigned tasks.

---

✨ Features

 👨‍💼 Admin Features

- Admin Login
- Admin Dashboard
- View total students
- View today's present students
- View today's absent students
- View total assignments
- Add students
- Edit student details
- Delete students
- Mark attendance
- Edit attendance
- Delete attendance
- Create assignments
- Edit assignments
- Delete assignments
- View student list
- View attendance records
- View assignment list

### 👨‍🎓 Student Features

- Student Registration
- Student Login
- Student Dashboard
- View attendance statistics
- View total classes
- View present classes
- View absent classes
- View attendance percentage
- View assignments
- View assignment status
- View recent attendance
- Secure logout

---

 3. Authentication & Authorization

The project uses **JWT (JSON Web Token)** for authentication.

### Roles

| Role | Access |
|------|--------|
| Student | Student Dashboard, Attendance, Assignments |
| Admin | Full management access |

Role-based authorization prevents students from accessing admin-only features.

---

4. Technologies Used

### Frontend

- React.js
- Vite
- React Router
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication

- JWT
- bcryptjs

### Development Tools

- VS Code
- Git
- GitHub
- Postman

---

 5. Project Structure

```text
student-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Attendance.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── student-management-system/
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       │
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
├── .gitignore
├── package.json
└── README.md
