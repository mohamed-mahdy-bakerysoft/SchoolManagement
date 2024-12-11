const mongoose = require('mongoose');

const FeesHistorySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  feeType: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  status: { type: String, enum: ['Paid', 'Pending'], required: true }
});

module.exports = mongoose.model('FeesHistory', FeesHistorySchema);
