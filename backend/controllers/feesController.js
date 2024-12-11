const FeesHistory = require('../models/FeesHistory');

exports.createFeesRecord = async (req, res) => {
  const { studentId, feeType, amount, paymentDate, status } = req.body;
  try {
    const feesRecord = new FeesHistory({ studentId, feeType, amount, paymentDate, status });
    await feesRecord.save();
    res.status(201).json(feesRecord);
  } catch (err) {
    res.status(500).json({ message: 'Error creating fees record' });
  }
};
