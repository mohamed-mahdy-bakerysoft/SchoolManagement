import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard/StaffDashboard";
import LibrarianDashboard from "./components/LibrarianDashboard/LibrarianDashboard";
import CommonDashboard from "./components/Shared/CommonDashboard";
import RegisterUserPage from "./pages/RegisterUserPage";
import StaffListPage from "./pages/StaffListPage";
import StaffDetailsPage from "./pages/StaffDetailsPage";
import OfficeStaffManagement from "./pages/OfficeStaffManagement";
import LibrarianManagement from "./pages/LibrarianManagement";
import LibrarianListPage from "./pages/LibrarianListPage";
import StudentManagement from "./pages/StudentManagement";
import StudentForm from "./components/Student/StudentForm";
import StudentList from "./components/Student/StudentList";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("userRole:", userRole);

  return (
    <Router>
      <Routes>
        {/* Unauthenticated Routes */}
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Admin Routes */}
            {userRole === "admin" && (
              <>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route
                  path="/admin/OfficeStaff"
                  element={<OfficeStaffManagement />}
                />
                <Route path="/admin/register" element={<RegisterUserPage />} />
                <Route path="/officestafflist" element={<StaffListPage />} />
                <Route path="/staff/:id" element={<StaffDetailsPage />} />
                <Route
                  path="/admin/Librarian"
                  element={<LibrarianManagement />}
                />
                <Route path="/librarianlist" element={<LibrarianListPage />} />
                <Route path="/students" element={<StudentManagement />} />
                <Route path="/students/studentform" element={<StudentForm />} />
                <Route path="/students/studentlist" element={<StudentList />} />
              </>
            )}

            {/* Office Staff Routes */}
            {userRole === "Office Staff" && (
              <>
                <Route path="/dashboard" element={<StaffDashboard />} />
                <Route path="/students" element={<StudentManagement />} />
                <Route path="/students/studentform" element={<StudentForm />} />
                <Route path="/students/studentlist" element={<StudentList />} />
              </>
            )}

            {/* Librarian Routes */}
            {userRole === "Librarian" && (
              <Route path="/dashboard" element={<LibrarianDashboard />} />
            )}

            {/* Common Routes */}
            <Route path="/dashboard" element={<CommonDashboard />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
