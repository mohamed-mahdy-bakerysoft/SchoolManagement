const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }, // 'class' field
  contact: { type: String, required: true }, // Contact number
  studentId: { type: String, required: true, unique: true }, // Student ID
  location: { type: String, required: true }, // Student location
});

module.exports = mongoose.model("Student", StudentSchema);
