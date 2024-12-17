import React from "react";
import Layout from "../../components/Layout/Layout";
import ReusableCard from "../../components/Shared/ReusableCard"; // Import reusable card component
import { HiUserAdd, HiUserGroup } from "react-icons/hi"; // Import icons

const OfficeStaffManagement = () => {
  return (
    <Layout title="Office Staff Management">
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
          iconColor="text-green-500"
        />
      </div>
    </Layout>
  );
};

export default OfficeStaffManagement;
