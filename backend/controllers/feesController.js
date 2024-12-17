const FeesHistory = require("../models/FeesHistory");
const Student = require("../models/Student"); // Make sure to import the Student model

// Get all fees records
exports.getAllFeesRecords = async (req, res) => {
  try {
    const feesRecords = await FeesHistory.find().populate(
      "studentId",
      "name studentId"
    );
    res.status(200).json(feesRecords);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch fees records", error: error.message });
  }
};

// Create a new fees record
exports.createFeesRecord = async (req, res) => {
  const {
    transactionId,
    studentId,
    feeType,
    amount,
    paymentDate,
    status,
    remarks,
  } = req.body;

  if (!studentId || !feeType || !amount || !paymentDate || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate that 'amount' is a number and greater than 0
  if (isNaN(amount) || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount should be a positive number" });
  }

  try {
    // Ensure the student exists using the studentId
    const studentExists = await Student.findOne({ studentId });
    const transactionExists = await FeesHistory.findOne({ transactionId });
    if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Ensure the trasaction not exists using the transactionId
    if (transactionExists) {
      return res.status(404).json({ message: "Transaction ID already exists" });
    }

    const feesRecord = new FeesHistory({
      transactionId,
      studentId,
      feeType,
      amount,
      paymentDate,
      status,
      remarks,
    });
    await feesRecord.save();
    res.status(201).json(feesRecord);
  } catch (err) {
    console.error("Error details:", err); // Log the exact error details
    res.status(500).json({ message: "Error creating fees record" });
  }
};

// Get all fees records for a student by studentId
exports.getFeesHistoryById = async (req, res) => {
  const { studentId } = req.params;
  try {
    // Query using the correct studentId (which is a string)
    const feesRecords = await FeesHistory.find({ studentId }); // Find all records for the student
    if (feesRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No fees records found for this student" });
    }
    res.status(200).json(feesRecords); // Return the array of fees records
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch fees records", error: error.message });
  }
};

// Get a single fees record by transactionId
exports.getFeesRecordByTransactionId = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const feesRecord = await FeesHistory.findOne({ transactionId }).populate(
      "studentId",
      "name studentId"
    );
    if (!feesRecord) {
      return res.status(404).json({ message: "Fees record not found" });
    }
    res.status(200).json(feesRecord);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch fees record", error: error.message });
  }
};

// Update a fees record by transactionId
exports.updateFeesRecord = async (req, res) => {
  const { transactionId } = req.params;
  const updates = req.body;

  try {
    // Validate that studentId exists if it's being updated
    if (updates.studentId) {
      const studentExists = await Student.findOne({
        studentId: updates.studentId,
      });
      if (!studentExists) {
        return res.status(404).json({ message: "Student not found" });
      }
    }

    // Update the fees record
    const updatedRecord = await FeesHistory.findOneAndUpdate(
      { transactionId },
      updates,
      { new: true }
    ).populate("studentId", "name studentId");

    if (!updatedRecord) {
      return res.status(404).json({ message: "Fees record not found" });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update fees record", error: error.message });
  }
};

// Delete a fees record by transactionId
exports.deleteFeesRecord = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const deletedRecord = await FeesHistory.findOneAndDelete({ transactionId });
    if (!deletedRecord) {
      return res.status(404).json({ message: "Fees record not found" });
    }
    res.status(200).json({ message: "Fees record deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete fees record", error: error.message });
  }
};
