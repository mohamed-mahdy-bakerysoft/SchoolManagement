
# **School Management System with Role-Based Access Control**

## **Project Description**
The **School Management System** is a full-stack web application that enables the management of student details, library history, and fees history across various roles. The system incorporates **Role-Based Access Control (RBAC)** to manage permissions for the following roles:

1. **Admin**: Full control, including managing staff, students, and records.
2. **Office Staff**: Access to student details and fees history with limited permissions.
3. **Librarian**: Limited access to student details and library history.

### Key Features:
- **CRUD Operations**: Manage student records, library records, and fee histories.
- **Role-Based Dashboards**: Separate dashboards for Admin, Office Staff, and Librarian.
- **Authentication**: Secure user login and role-based access.
- **State Management**: Implemented using **Redux** for global state.
- **Confirmation Dialogs**: Added for critical actions like deletions.
- **Clean UI**: Built with **Tailwind CSS** for a modern and responsive design.

---

## **Project Setup Instructions**

Follow the steps below to set up the project locally:

### Prerequisites
- **Node.js** (v18+)
- **MongoDB Atlas** account or local MongoDB setup
- Package Manager: `npm` 

---

### **Backend Setup**

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `backend` directory and add the following environment variables:
   ```env
   MONGO_URI=mongodb+srv://fadhilhussain12:testSchool@school-data.5bleq.mongodb.net/
   JWT_SECRET=secret
   PORT=5000
   ```

4. **Run the backend server**:
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

---

### **Frontend Setup**

1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `frontend` directory and add the following environment variable:
   ```env
   VITE_BASE_URL=http://localhost:5000
   ```

4. **Run the frontend server**:
   ```bash
   npm run dev
   ```
   The frontend application will be available on `http://localhost:5173`.

---

## **Folder Structure**

The project follows a modular and organized structure.

### **Backend**
```
backend/
│-- models/          # MongoDB schemas for users, students, etc.
│-- routes/          # API endpoints
│-- controllers/     # Business logic for each route
│-- middleware/      # Authentication and role validation
│-- server.js        # Entry point
│-- .env             # Environment variables
│-- package.json     # Backend dependencies
```

### **Frontend**
```
frontend/
│-- src/
    │-- components/    # Reusable components (e.g., InputField, ReusableCard)
    │-- pages/         # Role-based pages (Admin, Staff, Librarian)
    │-- redux/         # Redux store, slices, reducers
    │-- routes/        # Route configuration
    │-- App.jsx        # Main App component
│-- .env              # Frontend environment variables
│-- vite.config.js    # Vite configuration
│-- package.json      # Frontend dependencies
```

---

## **Environment Variables**

### Backend `.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend `.env`:
```env
VITE_BASE_URL=http://localhost:5000
```

---

## **List of Libraries**

### **Frontend**:
| Library               | Purpose                                           |
|-----------------------|--------------------------------------------------|
| **react**             | Core library for building user interfaces.       |
| **react-dom**         | DOM bindings for React.                          |
| **react-router-dom**  | Client-side routing.                             |
| **@reduxjs/toolkit**  | State management with Redux.                     |
| **react-redux**       | Integration of Redux with React.                 |
| **axios**             | HTTP requests to communicate with the backend.   |
| **react-icons**       | Collection of popular icons for React.           |
| **tailwindcss**       | Utility-first CSS framework for styling.         |
| **eslint**            | Linting and enforcing code quality.              |
| **vite**              | Fast and modern build tool.                      |

### **Backend**:
| Library              | Purpose                                           |
|----------------------|--------------------------------------------------|
| **express**          | Web framework for Node.js.                       |
| **mongoose**         | ODM for MongoDB.                                 |
| **bcrypt**           | Password hashing.                                |
| **jsonwebtoken**     | Authentication with JWT.                         |
| **dotenv**           | Load environment variables.                      |
| **cors**             | Allow cross-origin requests.                     |
| **nodemon**          | Development tool for automatic server restarts.  |

---

## **Role-Based Access Control (RBAC)**

The application has three roles:

1. **Admin**:
   - Full access: Manage users, students, library, and fees records.
2. **Office Staff**:
   - Access to student details and fees management.
3. **Librarian**:
   - View library history and student details only.

---

## **State Management**

Redux is used to manage global state with the following slices:
- **`studentReducer`**: Handles student CRUD operations.
- **`libraryReducer`**: Manages library records.
- **`feesReducer`**: Manages fees records.
- **`authReducer`**: Handles authentication and user roles.

---

## **Critical Actions**

All critical actions like **delete** or **modify** prompt a **confirmation dialog** to prevent accidental changes. Confirmation includes:
- **User Message**: Explicit information about the action.
- **Buttons**: Confirm and Cancel.

---

## **Run in Production**

1. **Build the Frontend**:
   ```bash
   npm run build
   ```
2. **Run the Backend**:
   ```bash
   npm start
   ```

The production-ready app can be deployed using services like **Heroku**, **Vercel**, or **Netlify**.

---

## **Contributing**

Contributions are welcome! Feel free to submit a pull request.

---

## **Author**

**Fadhii**  
[LinkedIn](https://www.linkedin.com/in/fadhil-hussain-21414a28b/) | [GitHub](https://github.com/Fadhii/)  
