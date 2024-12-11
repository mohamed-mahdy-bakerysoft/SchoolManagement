const LibraryHistory = require('../models/LibraryHistory.js');

exports.createLibraryRecord = async (req, res) => {
  const { studentId, bookName, borrowDate, returnDate, status } = req.body;
  try {
    const record = new LibraryHistory({ studentId, bookName, borrowDate, returnDate, status });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Error creating library record' });
  }
};
