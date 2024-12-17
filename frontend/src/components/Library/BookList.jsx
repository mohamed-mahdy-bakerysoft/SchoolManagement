import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../../api/book"; // API functions
import { setBooks } from "../../redux/slices/librarySlice";
import ReusableTable from "../Shared/ReusableTable";
import ConfirmationModal from "../Shared/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const BookList = ({ token }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.library.books);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const navigate = useNavigate();

  // Function to load the books
  const loadBooks = async () => {
    try {
      const booksData = await fetchBooks(token); // Fetch books from API
      dispatch(setBooks(booksData)); // Update Redux state
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    loadBooks(); // Initial load of books
  }, [dispatch, token]);

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (bookToDelete) {
      try {
        await deleteBook(bookToDelete.bookId, token); // Delete the book
        await loadBooks(); // Re-fetch the updated book list
        setIsModalOpen(false);
        setBookToDelete(null);
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setBookToDelete(null);
  };

  const handleStudentClick = (studentId) => {
    navigate(`/students/${studentId}`);
  };

  // Process books data for dynamic "status"
  const processedBooks = books.map((book) => ({
    ...book,
    status:
      book.status === "Available" ? (
        "Available"
      ) : (
        <span
          className="text-blue-500 cursor-pointer underline"
          onClick={() => handleStudentClick(book.status)}
        >
          {book.status}
        </span>
      ),
  }));

  const columns = [
    { key: "bookId", label: "Book ID" },
    { key: "bookName", label: "Book Name" },
    { key: "author", label: "Author" },
    { key: "status", label: "Status" },
  ];

  const actions = [
    {
      label: "Delete",
      onClick: (book) => handleDeleteClick(book),
    },
  ];

  return (
    <Layout title="List of Books">
    <div className="p-4">
      <ReusableTable columns={columns} data={processedBooks} actions={actions} />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the book "${bookToDelete?.bookName}"?`}
      />
    </div>
    </Layout>
  );
};

export default BookList;
