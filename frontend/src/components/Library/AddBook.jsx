import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook as addBookAction } from "../../redux/slices/librarySlice"; // Import the addBook action
import { addBook } from "../../api/book"; // Import the API function
import Layout from "../Layout/Layout";

function AddBook({ token }) {
  const [formData, setFormData] = useState({
    bookId: "", // bookId will be entered manually
    bookName: "", // bookName will be entered manually
    author: "", // author will be entered manually
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Prepare the book data with fixed status
    const bookData = {
      bookId: formData.bookId,
      bookName: formData.bookName,
      author: formData.author,
      status: "Available", // Fixed status
    };

    try {
      // Call API to add the book
      const addedBook = await addBook(bookData, token);
      dispatch(addBookAction(addedBook)); // Dispatch the action to add book to Redux store
      setSuccess("Book added successfully!");
      setFormData({
        bookId: "",
        bookName: "",
        author: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout title="Add a New Book">
      <div className="p-4 max-w-3xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label
              htmlFor="bookId"
              className="block text-gray-700 font-bold mb-1"
            >
              Book ID
            </label>
            <input
              id="bookId"
              name="bookId"
              type="text"
              value={formData.bookId}
              onChange={handleChange}
              placeholder="Book ID"
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="bookName"
              className="block text-gray-700 font-bold mb-1"
            >
              Book Name
            </label>
            <input
              id="bookName"
              name="bookName"
              type="text"
              value={formData.bookName}
              onChange={handleChange}
              placeholder="Book Name"
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-1"
            >
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddBook;
