const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const libraryController = require("../controllers/libraryController");
const {
  verifyAdmin,
  verifyStaff,
  verifyLibrarian,
  verifyAdminOrStaff,
  verifyAll,
} = require("../middlewares/authMiddleware"); // Adjust the path based on your project structure

// Book routes
router.post("/books", verifyLibrarian, libraryController.addBook); // Admin or Staff can add books
router.get("/books", verifyLibrarian, libraryController.fetchBooks); // Librarian can view all books
router.delete("/books/:bookId", verifyLibrarian, libraryController.deleteBook); // Only Admin can delete books

// Borrow/Return routes
router.post("/books/borrow", verifyLibrarian, libraryController.borrowBook); // Only Librarian can allow borrowing
router.put(
  "/books/return/:bookId",
  verifyLibrarian,
  libraryController.returnBook
); // Only Librarian can allow returns

// Transaction routes
router.get("/transactions", verifyAll, libraryController.fetchAllTransactions); // Admin or Staff can view all transactions
router.get(
  "/transactions/:studentId",
  verifyAll,
  libraryController.fetchTransactionsByStudentId
); // Admin or Staff can view transactions by student ID

module.exports = router;
