const express = require("express");
const router = express.Router();
const {
getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentByAdmissionNumber
} = require("../controllers/studentController");
const { verifyAdmin, verifyStaff , verifyAdminOrStaff } = require("../middlewares/authMiddleware");

// get All student
router.get("/students", verifyAdminOrStaff , getAllStudents); // Route to get all students

// Add student (POST)
router.post("/students", verifyAdminOrStaff, addStudent);  // Only Admin can add student

// get one student
router.get("/students/:admissionNumber", verifyAdminOrStaff, getStudentByAdmissionNumber);

// Update student (PUT)
router.put("/students/:admissionNumber", verifyAdminOrStaff, updateStudent); // Both Admin and Staff can update student

// Delete student (DELETE)
router.delete("/students/:admissionNumber", verifyAdminOrStaff, deleteStudent); // Both Admin and Staff can delete student

module.exports = router;
