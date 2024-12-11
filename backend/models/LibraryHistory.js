const mongoose = require("mongoose");

const LibraryHistorySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  bookName: { type: String, required: true },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ["Borrowed", "Returned"], required: true },
});

module.exports = mongoose.model("LibraryHistory", LibraryHistorySchema);
