import React from "react";
import Layout from "../Layout/Layout";
import ReusableCard from "../Shared/ReusableCard";
import { BiSolidBookAdd } from "react-icons/bi";
import { FaListAlt, FaBook, FaHistory } from "react-icons/fa";
const LibrarianDashboard = () => {
  return (
    <Layout title="Welcome, Librarian!">
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
};

export default LibrarianDashboard;
