const Student = require("../models/Student");
const LibraryBook = require("../models/LibraryBook");
const LibraryTransaction = require("../models/LibraryTransaction");

// Add a new book
exports.addBook = async (req, res) => {
  const { bookId, bookName, author } = req.body;

  if (!bookId || !bookName || !author) {
    return res.status(400).json({ message: "All fields are required: bookId, bookName, author" });
  }

  try {
    const existingBook = await LibraryBook.findOne({ bookId });
    if (existingBook) {
      return res.status(400).json({ message: "A book with this ID already exists" });
    }

    const newBook = new LibraryBook({ bookId, bookName, author, status: "Available" });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error while adding book", error: error.message });
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  const { studentId, bookId } = req.body;

  if (!studentId || !bookId) {
    return res.status(400).json({ message: "Both studentId and bookId are required" });
  }

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const book = await LibraryBook.findOne({ bookId });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.status !== "Available") {
      return res.status(400).json({ message: "Book is not available for borrowing" });
    }

    book.status = studentId; // Assigning studentId to indicate the book is borrowed
    await book.save();

    const transaction = new LibraryTransaction({
      studentId,
      bookId,
      action: "Borrow",
    });
    await transaction.save();

    res.json({ message: "Book borrowed successfully", book, transaction });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ message: "Internal server error while borrowing book", error: error.message });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ message: "bookId is required" });
  }

  try {
    const book = await LibraryBook.findOne({ bookId });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.status === "Available") {
      return res.status(400).json({ message: "Book is not currently borrowed" });
    }

    const studentId = book.status;

    book.status = "Available"; // Reset the book's status
    await book.save();

    const transaction = new LibraryTransaction({
      studentId,
      bookId,
      action: "Return",
    });
    await transaction.save();

    res.json({ message: "Book returned successfully", book, transaction });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Internal server error while returning book", error: error.message });
  }
};

// Fetch all books
exports.fetchBooks = async (req, res) => {
  try {
    const books = await LibraryBook.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error while fetching books", error: error.message });
  }
};

// Fetch all transactions
exports.fetchAllTransactions = async (req, res) => {
  try {
    const transactions = await LibraryTransaction.find()
      .populate("studentId", "name")
      .populate("bookId", "bookName author");

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error while fetching transactions", error: error.message });
  }
};

// Fetch transactions by studentId
exports.fetchTransactionsByStudentId = async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "studentId is required" });
  }

  try {
    const transactions = await LibraryTransaction.find({ studentId })
      .populate("bookId", "bookName author");

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for the student" });
    }

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error while fetching transactions", error: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ message: "bookId is required" });
  }

  try {
    const deletedBook = await LibraryBook.findOneAndDelete({ bookId });
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error while deleting book", error: error.message });
  }
};
