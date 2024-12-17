import React from "react";
import { FaUserPlus, FaUserCog } from "react-icons/fa"; // Icons for Add Student and Manage Students
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import ReusableCard from "../../components/Shared/ReusableCard"; // Reusable Card component

const StudentManagement = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Student Management">
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Add Student */}
        <div onClick={() => navigate("/students/studentform")}>
          <ReusableCard
            title="Add Student"
            description="Add a new student to the system."
            icon={FaUserPlus}
            iconColor="text-blue-500"
            link="/students/studentform"
          />
        </div>

        {/* Card 2: Manage Students */}
        <div onClick={() => navigate("/students/studentlist")}>
          <ReusableCard
            title="Manage Students"
            description="View, edit, or delete student records."
            icon={FaUserCog}
            iconColor="text-green-500"
            link="/students/studentlist"
          />
        </div>
      </div>
    </Layout>
  );
};

export default StudentManagement;
