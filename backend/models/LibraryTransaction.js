const mongoose = require("mongoose");

// LibraryTransaction schema to track borrowing and returning history
const LibraryTransactionSchema = new mongoose.Schema({
  studentId: {
    type: String, // Change from ObjectId to String for custom IDs
    required: true,
  },
  bookId: {
    type: String, // Change from ObjectId to String for consistency with LibraryBook's bookId
    required: true,
  },
  action: { type: String, enum: ["Borrow", "Return"], required: true }, // Action type: Borrow or Return
  date: { 
    type: String, 
    default: () => new Date().toISOString().split('T')[0] // Extract only the date part
  },
  });

module.exports = mongoose.model("LibraryTransaction", LibraryTransactionSchema);
