import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../Shared/Sidebar";
import Header from "../Shared/Header";

const roleBasedLinks = {
  admin: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "OfficeStaff Management", path: "/admin/OfficeStaff" },
    { label: "Librarian Management", path: "/admin/Librarian" },
    { label: "Student Management", path: "/students" },
    { label: "Library Records", path: "/libraryrecords" },
    { label: "Fees History", path: "/feesrecords" },
  ],
  Librarian: [    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Books", path: "/library" },
    { label: "Manage Records", path: "/library/managerecords" }
  ],
  "Office Staff": [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Fees", path: "/fee" },
    { label: "Library Records", path: "/libraryrecords" },
    { label: "Manage Students", path: "/students" },
  ],
};

const Layout = ({ title, children }) => {
  const role = useSelector((state) => state.auth.user?.role); // Get role from Redux state
  const links = role && roleBasedLinks[role] ? roleBasedLinks[role] : []; // Fallback to empty array if no role or role doesn't exist

  return (
    <div className="flex bg-gray-200">
      <Sidebar links={links} />
      <main className="flex-grow p-6">
        <Header title={title} />
        <section className="mt-4">{children}</section>
      </main>
    </div>
  );
};

export default Layout;
