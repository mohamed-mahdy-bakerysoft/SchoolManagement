import React from "react";
import Layout from "../Layout/Layout";
import ReusableCard from "../Shared/ReusableCard"; // Import the reusable card
import {
  FaBook,
  FaHistory,
  FaUserPlus,
  FaUserCog,
  FaMoneyCheckAlt,
} from "react-icons/fa"; // Import icons

const StaffDashboard = () => {
  return (
    <Layout title="Welcome, Office Staff!">
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <ReusableCard
          title="Add Fee"
          description="Add new fee records to the system."
          icon={FaMoneyCheckAlt}
          iconColor="text-blue-500"
          link="/fee/addfee"
        />

        <ReusableCard
          title="Fee History"
          description="View and manage fee payment history."
          icon={FaHistory}
          iconColor="text-orange-500"
          link="/fee/feehistory"
        />

        <div onClick={() => navigate("/students/studentform")}>
          <ReusableCard
            title="Add Student"
            description="Add a new student to the system."
            icon={FaUserPlus}
            iconColor="text-purple-500"
            link="/students/studentform"
          />
        </div>

        <div onClick={() => navigate("/students/studentlist")}>
          <ReusableCard
            title="Manage Students"
            description="View, edit, or delete student records."
            icon={FaUserCog}
            iconColor="text-green-500"
            link="/students/studentlist"
          />
        </div>

        <ReusableCard
          title="Library Records"
          description="View library records."
          icon={FaBook}
          iconColor="text-blue-500"
          link="/library"
        />
      </div>
    </Layout>
  );
};

export default StaffDashboard;
