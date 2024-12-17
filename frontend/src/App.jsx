import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/auth/NotFoundPage";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import StaffDashboard from "./components/Dashboards/StaffDashboard";
import LibrarianDashboard from "./components/Dashboards/LibrarianDashboard";
import RegisterUserPage from "./pages/auth/RegisterUserPage";
import StaffListPage from "./pages/staff/StaffListPage";
import StaffDetailsPage from "./pages/staff/StaffDetailsPage";
import OfficeStaffManagement from "./pages/staff/OfficeStaffManagement";
import LibrarianManagement from "./pages/staff/LibrarianManagement";
import LibrarianListPage from "./pages/staff/LibrarianListPage";
import StudentManagement from "./pages/student/StudentManagement";
import StudentForm from "./components/Student/StudentForm";
import StudentList from "./components/Student/StudentList";
import StudentDetailsPage from "./components/Student/StudentDetails";
import FeesRemarksCreate from "./components/Fees/FeesRemarksCreate";
import FeesHistory from "./components/Fees/FeesHistory";
import AddBook from "./components/Library/AddBook";
import TransactionHistory from "./components/Library/TransactionHistory";
import FeesManagement from "./pages/student/FeesManagement";
import LibraryRecordManagement from "./pages/library/LibraryRecordManagemnet";
import BookAction from "./components/Library/BookAction";
import LibraryManagement from "./pages/library/LibraryManagement";
import BookList from "./components/Library/BookList";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role);

 

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
                <Route path="/admin/OfficeStaff" element={<OfficeStaffManagement />} />
                <Route path="/admin/register" element={<RegisterUserPage />} />
                <Route path="/officestafflist" element={<StaffListPage />} />
                <Route path="/staff/:id" element={<StaffDetailsPage />} />
                <Route path="/admin/Librarian" element={<LibrarianManagement />} />
                <Route path="/librarianlist" element={<LibrarianListPage />} />
                <Route path="/students" element={<StudentManagement />} />
                <Route path="/students/studentform" element={<StudentForm />} />
                <Route path="/students/studentlist" element={<StudentList />} />
                <Route path="/students/:studentId" element={<StudentDetailsPage />} />
                <Route path="/fee/addfee" element={<FeesRemarksCreate />} />
                <Route path="/fee/feehistory" element={<FeesHistory />} />
                <Route path="/transactions/:transactionId" element={<FeesRemarksCreate />} />
                <Route path="/libraryrecords" element={<TransactionHistory />} />
                <Route path="/feesrecords" element={<FeesHistory />} />
                <Route path="/fee/feehistory/:studentId" element={<FeesHistory />} />
                <Route path="/libraryrecords/:studentId" element={<TransactionHistory />} />

              </>
            )}

            {/* Office Staff Routes */}
            {userRole === "Office Staff" && (
              <>
                <Route path="/dashboard" element={<StaffDashboard />} />
                <Route path="/students" element={<StudentManagement />} />
                <Route path="/students/studentform" element={<StudentForm />} />
                <Route path="/students/studentlist" element={<StudentList />} />
                <Route path="/students/:studentId" element={<StudentDetailsPage />} />
                <Route path="/fee" element={<FeesManagement />} />
                <Route path="/fee/addfee" element={<FeesRemarksCreate />} />
                <Route path="/fee/feehistory" element={<FeesHistory />} />
                <Route path="/fee/feehistory/:studentId" element={<FeesHistory />} />
                <Route path="/transactions/:transactionId" element={<FeesRemarksCreate />} />
                <Route path="/libraryrecords/:studentId" element={<TransactionHistory />} />
                <Route path="/libraryrecords" element={<TransactionHistory />} />
              </>
            )}

            {/* Librarian Routes */}
            {userRole === "Librarian" && (
              <>
                <Route path="/dashboard" element={<LibrarianDashboard />} />
                <Route path="/library" element={<LibraryManagement />} />
                <Route path="/library/addbooks" element={<AddBook />} />
                <Route path="/library/booklist" element={<BookList />} />
                <Route path="/library/managerecords" element={<LibraryRecordManagement />} />
                <Route path="/students/:studentId" element={<StudentDetailsPage />} />
                <Route path="/library/libraryrecords" element={<TransactionHistory />} />
                <Route path="/library/addrecords" element={<BookAction />} />
                <Route path="/libraryrecords/:studentId" element={<TransactionHistory />} />

              </>
            )}

            {/* Common Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
