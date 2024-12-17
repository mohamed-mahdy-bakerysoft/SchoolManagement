const mongoose = require("mongoose");

// LibraryBook schema to manage book details
const LibraryBookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  status: {
    type: mongoose.Schema.Types.Mixed, // "Available" or a studentId
    default: "Available",
  },
});

module.exports = mongoose.model("LibraryBook", LibraryBookSchema);
