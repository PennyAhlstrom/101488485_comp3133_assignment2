# 🧑‍💼 Employee Management System  
**COMP3133 – Assignment II (Frontend + Backend Integration)**

---

## 📌 Overview

This project is a full-stack **Employee Management System** built using:

- **Frontend:** Angular (Standalone Components, Material UI, Bootstrap)
- **Backend:** Node.js + Express + GraphQL + MongoDB
- **Communication:** Apollo Angular (GraphQL client)

The application allows users to:
- Register and log in
- View all employees
- Search employees by department/designation
- Add, edit, and delete employees
- View detailed employee information

---

## Features

- Signup
- Login
- Logout
- Session persistence with token storage
- List all employees
- Search employees by department or designation
- Add employee
- View employee details
- Update employee
- Delete employee
- Upload employee photo
- Validation messages on auth and employee forms
- Protected employee routes

---

## UI / UX Notes

The frontend uses Bootstrap for:
- responsive layout
- navbar
- cards
- tables
- forms
- buttons
- alerts
- toasts

---

## 🧱 Tech Stack

### Frontend
- Angular standalone components
- Apollo Angular
- GraphQL
- Bootstrap 5
- Reactive Forms

### Backend
- Node.js
- Express
- GraphQL
- MongoDB / Mongoose
- JWT authentication

---

## 📁 Project Structure

### Frontend (`assignment2`)
```
src/app
├── core
│   ├── constants
│   ├── guards
│   ├── interceptors
│   ├── models
│   └── services
├── features
│   ├── auth
│   │   ├── login
│   │   └── signup
│   └── employees
│       ├── employee-list
│       ├── employee-form
│       ├── employee-details
│       └── employee-search-bar
├── layout
│   ├── app-shell
│   └── header
├── shared
│   ├── components
│   ├── directives
│   └── pipes
└── graphql
```

### Backend (`assignment1`)
```
├── models
├── resolvers
├── schemas
├── EmployeeData.json
├── UserData.json
├── seedUsers.js
├── seedEmployees.js
└── index.js
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

## ⚙️ Backend Setup

Navigate to backend:

```bash
cd comp3133_101488485_assignment1
```

### Install dependencies
```bash
npm install
```

### Configure environment variables
Create `.env`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Seed the database

```bash
npm run seed:users
npm run seed:employees
```

---

### Start backend server

```bash
npm start
```

Server runs at:
```
http://localhost:8081/graphql
```

---

## 💻 Frontend Setup

Navigate to frontend:

```bash
cd ../101488485_comp3133_assignment2
```

### Install dependencies

```bash
npm install
```

---

### Run Angular app

```bash
ng serve
```

App runs at:
```
http://localhost:4200
```

---

## 🔐 Authentication

- Users must **sign up or use seeded users**
- JWT token is stored in **localStorage**
- Route guards protect `/employees`

---

## 👥 Features

### 🔑 Authentication
- Login / Signup with validation
- Session persistence across refresh
- Logout functionality

### 📋 Employee Management
- View all employees (table view)
- View employee details
- Add new employee
- Edit employee
- Delete employee

### 🔎 Search
- Search by:
  - Department
  - Designation
- Reset to view all employees

### 🎨 UI/UX
- Material UI components
- Responsive layout
- Centralized styling (CSS variables)
- Loading, error, and empty states

---

## 📡 GraphQL Operations

### Queries
- `getEmployees`
- `getEmployeeById`
- `searchEmployees`

### Mutations
- `addEmployee`
- `updateEmployee`
- `deleteEmployee`
- `login`
- `signup`

---

## 📷 Screenshots

> Add screenshots here

```
public/screenshots/login.png
public/screenshots/employee-list.png
public/screenshots/employee-form.png
```

---

## ⚠️ Known Issues / Notes

- SSR was disabled/simplified to avoid session issues
- Seeded users must be created via script (for password hashing)
- Search is triggered via explicit submit (not live typing)

---

## 🧪 Testing

Backend tested using:
- Postman (GraphQL queries/mutations)

Frontend tested via:
- Browser interaction

---

## 📌 Submission Links

- **GitHub Repo:** <your-repo-link>
- **Backend Endpoint:** http://localhost:8081/graphql
- **Frontend App:** http://localhost:4200

---

## ✨ Future Improvements

- Pagination & sorting
- Material dialog for delete confirmation
- Profile image upload to cloud storage
- Role-based authentication
- Improved animations & UX polish

---

## 👤 Author

**Penny Ahlstrom**  
COMP3133 – Full Stack Development

---

## 📄 License

This project is for academic purposes only.