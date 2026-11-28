# 🎓 Student Task & Attendance Management System

A full-stack web application designed to simplify student management, attendance tracking, and assignment management through dedicated Admin and Student dashboards.

The application provides secure authentication, role-based access control, student records management, attendance monitoring, and assignment tracking.

## 🌐 Live Demo

**Frontend:** https://student-management-frontend-c2fb.onrender.com

**GitHub Repository:** https://github.com/atulverma-0312/student-management-system

---

## ✨ Features

### 👨‍💼 Admin Dashboard

- Secure Admin Login
- Admin Dashboard with statistics
- View total registered students
- View today's present students
- View today's absent students
- View total assignments
- Add new students
- Update student details
- Delete student records
- Mark student attendance
- Update attendance records
- Delete attendance records
- Create assignments
- Edit assignments
- Delete assignments
- View student lists
- Monitor attendance records
- Manage assignments

### 👨‍🎓 Student Dashboard

- Student Registration
- Secure Student Login
- Personalized Student Dashboard
- View attendance statistics
- View total classes
- View present classes
- View absent classes
- Calculate attendance percentage
- View assigned tasks
- Check assignment status
- View recent attendance records
- Secure Logout

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Token) for authentication and bcryptjs for password hashing.

**User Roles:**

| Role | Permissions |
|---|---|
| Admin | Full access to student, attendance and assignment management |
| Student | Access to personal dashboard, attendance and assignments |

Role-based middleware protects administrative routes from unauthorized student access.

## 🛠️ Technologies Used

### Frontend
- React.js 19
- Vite
- React Router DOM
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js 5
- REST API
- JavaScript

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman
- npm

## 📁 Project Structure

```text
student-management-system/
│
├── backend/
│   │
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
│   │
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       │
│       ├── package.json
│       └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 📌 Important Files Explained

| File | Description |
|---|---|
| `server.js` | Starts the Express backend server |
| `config/db.js` | Establishes MongoDB connection |
| `models/User.js` | Defines user schema |
| `models/Student.js` | Defines student schema |
| `models/Attendance.js` | Stores attendance information |
| `models/Task.js` | Defines assignment/task schema |
| `authMiddleware.js` | Verifies JWT authentication |
| `adminMiddleware.js` | Restricts admin-only operations |
| `authRoutes.js` | Authentication-related routes |
| `adminRoutes.js` | Admin management routes |
| `studentRoutes.js` | Student-related routes |
| `attendanceRoutes.js` | Attendance management routes |
| `taskRoutes.js` | Assignment management routes |
| `App.jsx` | Main React application component |
| `main.jsx` | Frontend entry point |
| `vite.config.js` | Vite development configuration |

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/atulverma-0312/student-management-system.git
```

### 2. Navigate to Project Directory

```bash
cd student-management-system
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the example values with your actual configuration.

Start the backend server:

```bash
npm run dev
```

Backend will run on the configured port.

### 4. Frontend Setup

Open another terminal.

```bash
cd student-management-system/frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🗄️ Database

The application uses MongoDB for storing:

- User information
- Student records
- Attendance records
- Assignment details

MongoDB Atlas can be used for cloud database hosting.

## 🔒 Security Features

- JWT-based authentication
- Password hashing using bcryptjs
- Role-based access control
- Protected routes
- Environment-based configuration
- CORS configuration

**Important:** Never upload `.env` files, database credentials, JWT secrets, or other sensitive information to GitHub.

## 🚀 Future Enhancements

- Email notifications for assignments
- Attendance reports in PDF format
- Student performance analytics
- Advanced search and filtering
- Export student records to Excel
- Assignment submission functionality
- Improved mobile responsiveness

## 👨‍💻 Author

**Atul Verma and Viraj Yadav**

GitHub: https://github.com/atulverma-0312

https://github.com/virajyadav07/student-management-system.git


## 📄 License

This project is available for educational and learning purposes.

---

⭐ If you find this project useful, consider giving the repository a star 
