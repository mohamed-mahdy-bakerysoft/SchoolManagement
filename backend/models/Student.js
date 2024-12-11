const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }, // 'class' field
  contact: { type: String, required: true }, // Contact number
  admissionNumber: { type: String, required: true, unique: true }, // Admission number
  location: { type: String, required: true }, // Student location
  image: { type: String }, // Image (URL or base64 string)
});

module.exports = mongoose.model('Student', StudentSchema);
