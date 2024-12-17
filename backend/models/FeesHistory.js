const mongoose = require("mongoose");

const FeesHistorySchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true, // Ensure transactionId is unique
    },
    studentId: {
      type: String, // Ensure studentId is a string
      required: true,
    },
    feeType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Partially Paid", "Pending"],
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true, // Optional: add timestamps (createdAt and updatedAt)
  }
);

// Create an index on studentId to optimize lookups by studentId
FeesHistorySchema.index({ studentId: 1 });

module.exports = mongoose.model("FeesHistory", FeesHistorySchema);
