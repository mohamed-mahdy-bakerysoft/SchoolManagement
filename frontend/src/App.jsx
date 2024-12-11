import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard/StaffDashboard";
import LibrarianDashboard from "./components/LibrarianDashboard/LibrarianDashboard";
import CommonDashboard from "./components/Shared/CommonDashboard";
import RegisterUserPage from "./pages/RegisterUserPage";

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
            <Route path="*" element={<LoginPage />} />
          </>
        ) : (
          <>
            {/* Role-Based Routes */}
            {userRole === "admin" && (
              <>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="admin/register" element={<RegisterUserPage />} />
            </>
            )}
            {userRole === "Office Staff" && (
              <Route path="/dashboard" element={<StaffDashboard />} />
            )}
            {userRole === "Librarian" && (
              <Route path="/dashboard" element={<LibrarianDashboard />} />
            )}

            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
