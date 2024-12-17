import apiInstance from "./apiInstance"; // Import the API instance

// Add a new book
export const addBook = async (bookData, token) => {
  try {
    const response = await apiInstance.post(
      "/api/library/books", // Correct endpoint for adding a book
      bookData, // Send book data in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return the added book data
  } catch (error) {
    console.error("Error adding book:", error); // Log the error
    throw new Error(error.response?.data?.message || "Failed to add book");
  }
};

// Get all books
export const fetchBooks = async (token) => {
  try {
    const response = await apiInstance.get("/api/library/books", {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in headers
      },
    });
    return response.data; // Return list of books
  } catch (error) {
    console.error("Error fetching books:", error); // Log the error
    throw new Error(error.response?.data?.message || "Failed to fetch books");
  }
};

// Delete a book by book ID
export const deleteBook = async (bookId, token) => {
  try {
    const response = await apiInstance.delete(
      `/api/library/books/${bookId}`, // Correct endpoint for deleting a book
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return success message
  } catch (error) {
    console.error("Error deleting book:", error); // Log the error
    throw new Error(error.response?.data?.message || "Failed to delete book");
  }
};

// Borrow a book
export const borrowBook = async (bookId, studentId, token) => {
  try {
    const response = await apiInstance.post(
      "/api/library/books/borrow", // Correct endpoint for borrowing a book
      { bookId, studentId }, // Send bookId and studentId in request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return borrow confirmation
  } catch (error) {
    console.error("Error borrowing book:", error); // Log the error
    throw new Error(error.response?.data?.message || "Failed to borrow book");
  }
};

// Return a book
export const returnBook = async (bookId, token) => {
  try {
    const response = await apiInstance.put(
      `/api/library/books/return/${bookId}`, // Correct endpoint for returning a book
      {}, // No body data required for this endpoint
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return return confirmation
  } catch (error) {
    console.error("Error returning book:", error); // Log the error
    throw new Error(error.response?.data?.message || "Failed to return book");
  }
};

// Fetch all transactions
export const fetchAllTransactions = async (token) => {
  try {
    const response = await apiInstance.get("/api/library/transactions", {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in headers
      },
    });
    return response.data; // Return list of all transactions
  } catch (error) {
    console.error("Error fetching transactions:", error); // Log the error
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions"
    );
  }
};

// Fetch transactions by student ID
export const fetchTransactionsByStudentId = async (studentId, token) => {
  try {
    const response = await apiInstance.get(
      `/api/library/transactions/${studentId}`, // Correct endpoint for fetching transactions by studentId
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return list of transactions for the student
  } catch (error) {
    console.error("Error fetching transactions by student ID:", error); // Log the error
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch transactions for the student"
    );
  }
};
