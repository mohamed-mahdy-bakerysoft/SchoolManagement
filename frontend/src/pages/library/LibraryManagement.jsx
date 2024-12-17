import React from "react";
import { FaListAlt } from "react-icons/fa"; // Icons from react-icons
import { BiSolidBookAdd } from "react-icons/bi";
import ReusableCard from "../../components/Shared/ReusableCard";
import Layout from "../../components/Layout/Layout";

function LibraryManagement() {
  return (
    <Layout title="Library Record Management">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Add a New Book */}
        <ReusableCard
          title="Add a New Book"
          description="Add a new book to the library collection."
          icon={BiSolidBookAdd} // Pass the icon component
          iconColor="text-blue-500"
          link="/library/addbooks"
        />

        {/* Card 2: List of Books */}
        <ReusableCard
          title="List of Books"
          description="View or delete existing books in the collection."
          icon={FaListAlt} // Pass the icon component
          iconColor="text-green-500"
          link="/library/booklist"
        />
      </div>
    </Layout>
  );
}

export default LibraryManagement;
