# 🧑‍💼 Employee Management System

**COMP3133 – Assignment II (Frontend + Backend Integration)**

---

## 📌 Overview

This project is a full-stack **Employee Management System** built using Angular and GraphQL.

It allows authenticated users to manage employee records through a clean, responsive dashboard with full CRUD functionality.

### Key Capabilities

* User authentication (signup, login, logout)
* Employee dashboard with full CRUD operations
* Search by department or designation
* Profile photo upload with client-side compression
* Responsive UI with consistent design system

---

## ✨ Features

### 🔑 Authentication

* Signup and login using GraphQL
* JWT-based session management
* Persistent login using localStorage
* Logout with session clearing
* Protected routes using Angular guards

### 👥 Employee Management

* View all employees in a table
* View detailed employee profile
* Add new employee with validation
* Edit employee with pre-filled form values
* Delete employee with confirmation

### 🔎 Search

* Search using a **single input + dropdown**
* Search by:

  * Department
  * Position / Designation
  * Combined (Any)
* Reset search to reload full list

### 🖼️ Image Upload

* Upload employee photo via file input
* Images are **compressed client-side**
* Stored as base64 in database
* Preview before saving
* Remove photo clears file input

### ✅ Validation

* Field-level validation for all forms
* Required fields enforced
* Email format validation
* Salary minimum validation
* Inline error messages

---

## 🎨 UI / UX Design

* Built using **Bootstrap 5**
* Fully responsive layout (desktop + mobile)
* Custom **design system using CSS tokens**
* Muted blue-gray theme for professional look
* Consistent button styles (primary / secondary / danger)
* Improved navigation with mobile hamburger menu
* Clear visual hierarchy (cards, tables, forms)

---

## 🧱 Tech Stack

### Frontend

* Angular (Standalone Components)
* Apollo Angular (GraphQL client)
* Bootstrap 5
* Reactive Forms

### Backend

* Node.js
* Express
* GraphQL (Apollo Server)
* MongoDB (Mongoose)
* JWT Authentication

---

## 🎯 Design System

* All colors are defined using **CSS variables (tokens)**
* No hardcoded colors in components
* Centralized styling for:

  * Buttons
  * Forms
  * Tables
  * Alerts
* Enables consistent UI and easy theme updates

---

## 📁 Project Structure

### Frontend (`101488485_comp3133_assignment2`)

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

### Backend (`comp3133_101488485_assignment1`)

```
├── models
├── resolvers
├── schemas
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

```bash
cd comp3133_101488485_assignment1
npm install
```

### Create `.env`

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Seed data

```bash
npm run seed:users
npm run seed:employees
```

### Start server

```bash
npm start
```

Backend runs at:

```
http://localhost:8081/graphql
```

---

## 💻 Frontend Setup

```bash
cd ../101488485_comp3133_assignment2
npm install
ng serve
```

Frontend runs at:

```
http://localhost:4200
```

---

## 📡 GraphQL Operations

### Queries

* `getEmployees`
* `getEmployeeById`
* `searchEmployees`

### Mutations

* `addEmployee`
* `updateEmployee`
* `deleteEmployee`
* `login`
* `signup`

---

## 📸 Screenshots

> Place screenshots in: `public/screenshots/`

### 🔐 Authentication

* Login screen
  `public/screenshots/login.png`
* Signup screen
  `public/screenshots/signup.png`

### 📋 Dashboard

* Employee list (default view)
  `public/screenshots/employee-list.png`
* Employee list (mobile view with hamburger menu open)
  `public/screenshots/mobile-navbar.png`

### 🔎 Search

* Search bar with dropdown
  `public/screenshots/search-bar.png`
* Search results (filtered by department/designation)
  `public/screenshots/search-results.png`

### 👥 Employee Actions

* Add employee form
  `public/screenshots/add-employee.png`
* Edit employee form (pre-filled data)
  `public/screenshots/edit-employee.png`
* Employee details view
  `public/screenshots/employee-details.png`

### 🖼️ Image Upload

* Photo selection + preview
  `public/screenshots/photo-preview.png`
* Photo removed state
  `public/screenshots/photo-removed.png`

### ⚠️ Validation

* Form validation errors
  `public/screenshots/form-validation.png`

### 🗑️ Delete

* Delete confirmation (browser dialog)
  `public/screenshots/delete-confirmation.png`

---

## ⚠️ Notes

* Native `<select>` dropdown uses OS styling for open options
* Images are stored as base64 (not cloud storage)
* Search is triggered on submit (not live typing)

---

## 🧪 Testing

### Backend

* Tested using Postman (GraphQL queries & mutations)

### Frontend

* Tested via browser interactions across different screen sizes

---

## 📌 Submission Links

* **GitHub Repository:** <your-repo-link>
* **Backend Endpoint:** http://localhost:8081/graphql
* **Frontend App:** http://localhost:4200

---

## ✨ Future Improvements

* Pagination and sorting for employee list
* Server-side image storage (Cloudinary / S3)
* Role-based authentication
* Advanced filtering (multi-field)
* UI animations and micro-interactions

---

## 👤 Author

**Penny Ahlstrom**
COMP3133 – Full Stack Development

---

## 📄 License

This project is for academic purposes only.
