import React from "react";
import Layout from "../Layout/Layout";
import ReusableCard from "../Shared/ReusableCard";
import { HiUserAdd, HiUserGroup } from "react-icons/hi"; // Import icons
import { IoLibrary } from "react-icons/io5";
import { FaMoneyCheckAlt,FaUserCog,FaUserPlus } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <Layout title="Welcome, Admin!">
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Add Staff Card */}
        <ReusableCard
          title="Add Staff"
          description="Create a new office staff account"
          icon={HiUserAdd} // Add user icon
          link="/admin/register"
          iconColor="text-blue-500"
        />

        {/* Manage Existing Staff Card */}
        <ReusableCard
          title="Manage Existing Staff"
          description="Manage and edit existing office staff accounts"
          icon={HiUserGroup} // Group icon for managing staff
          link="/officestafflist"
          iconColor="text-purple-500"
        />
        {/* Add Librarian Card */}
        <ReusableCard
          title="Add Librarian"
          description="Create a new librarian account"
          icon={HiUserAdd} // Add user icon
          link="/admin/register"
          iconColor="text-green-500"
        />

        {/* Manage Existing Librarians Card */}
        <ReusableCard
          title="Manage Existing Librarians"
          description="Manage and edit existing librarian accounts"
          icon={HiUserGroup} // Group icon for managing
          link="/librarianlist"
          iconColor="text-orange-500"
        />
        <ReusableCard
          title="Add Student"
          description="Add a new student to the system."
          icon={FaUserPlus}
          iconColor="text-blue-500"
          link="/students/studentform"
        />

        {/* Manage Students */}
        <ReusableCard
          title="Manage Students"
          description="View, edit, or delete student records."
          icon={FaUserCog}
          iconColor="text-green-500"
          link="/students/studentlist"
        />

        {/* Library Records Card */}
        <ReusableCard
          title="Library Records"
          description="View library records"
          icon={IoLibrary} // Add user icon
          link="/libraryrecords"
          iconColor="text-blue-500"
        />

        {/* Fees Records Card */}
        <ReusableCard
          title="Fees Records"
          description="Manage Fee payment records"
          icon={FaMoneyCheckAlt} // Group icon for managing
          link="/feesrecords"
          iconColor="text-green-500"
        />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
