import React from "react";
import { FaBook, FaHistory } from "react-icons/fa"; // Icons from react-icons
import ReusableCard from "../../components/Shared/ReusableCard";
import Layout from "../../components/Layout/Layout";

function LibraryRecordManagement() {
  return (
    <Layout title="Library Record Management">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Record Management */}
        <ReusableCard
          title="Borrow/Return Book"
          description="Enter library records."
          icon={FaBook}
          iconColor="text-blue-500"
          link="/library/addrecords"
        />

        {/* Card 2: Transaction History */}
        <ReusableCard
          title="Transaction History"
          description="View borrowing and return history."
          icon={FaHistory}
          iconColor="text-green-500"
          link="/library/libraryrecords"
        />
      </div>
    </Layout>
  );
}

export default LibraryRecordManagement;
