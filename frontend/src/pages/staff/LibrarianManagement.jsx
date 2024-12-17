import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import ReusableCard from "../../components/Shared/ReusableCard"; // Import reusable card component
import { HiUserAdd, HiUserGroup } from "react-icons/hi"; // Import icons

const LibrarianManagement = () => {
  return (
    <Layout title="Librarian Management">
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Add Librarian Card */}
        <ReusableCard
          title="Add Librarian"
          description="Create a new librarian account"
          icon={HiUserAdd} // Add user icon
          link="/admin/register"
          iconColor="text-blue-500"
        />

        {/* Manage Existing Librarians Card */}
        <ReusableCard
          title="Manage Existing Librarians"
          description="Manage and edit existing librarian accounts"
          icon={HiUserGroup} // Group icon for managing
          link="/librarianlist"
          iconColor="text-green-500"
        />
      </div>
    </Layout>
  );
};

export default LibrarianManagement;
