import React, { useState } from "react";
import InputField from "../Shared/InputField";
import { borrowBook, returnBook } from "../../api/book"; // Ensure both functions are imported
import Layout from "../Layout/Layout";

const BookAction = ({ token }) => {
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [actionType, setActionType] = useState("borrow");
  const [message, setMessage] = useState({ text: "", type: "" }); // Track feedback messages

  const validateInputs = () => {
    if (!bookId.trim()) {
      return "Book ID is required.";
    }
    if (actionType === "borrow" && !studentId.trim()) {
      return "Student ID is required for borrowing a book.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const error = validateInputs();
    if (error) {
      setMessage({ text: error, type: "error" });
      return;
    }

    try {
      let response;
      if (actionType === "borrow") {
        // Borrow Book
        response = await borrowBook(bookId.trim(), studentId.trim(), token);
      } else if (actionType === "return") {
        // Return Book
        response = await returnBook(bookId.trim(), token);
      }

      // Show success message
      setMessage({
        text: response?.data?.message || "Action successful!",
        type: "success",
      });

      // Clear inputs after submission
      setStudentId("");
      setBookId("");
    } catch (error) {
      // Check for error response and display message
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Server error. Please try again.";

      setMessage({
        text: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <Layout title="Borrow or Return a Book">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 shadow-md bg-white rounded"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">Action</label>
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          >
            <option value="borrow">Borrow</option>
            <option value="return">Return</option>
          </select>
        </div>
        <InputField
          label="Book ID"
          type="text"
          name="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter Book ID"
        />
        {actionType !== "return" && (
          <InputField
            label="Student ID"
            type="text"
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {actionType === "borrow" ? "Borrow Book" : "Return Book"}
        </button>
        {message.text && (
          <div
            className={`mt-4 p-2 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </Layout>
  );
};

export default BookAction;
