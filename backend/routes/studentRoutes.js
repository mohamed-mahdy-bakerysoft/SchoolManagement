const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentBystudentId,
} = require("../controllers/studentController");
const {
  verifyAdmin,
  verifyStaff,
  verifyAdminOrStaff,
  verifyLibrarian,
  verifyAll,
} = require("../middlewares/authMiddleware");

// get All student
router.get("/", verifyAdminOrStaff, getAllStudents); // Route to get all students

// Add student (POST)
router.post("/", verifyAdminOrStaff, addStudent);

// get one student
router.get("/:studentId", verifyAll, getStudentBystudentId);

// Update student (PUT)
router.put("/:studentId", verifyAdminOrStaff , updateStudent); // Both Admin and Staff can update student

// Delete student (DELETE)
router.delete("/:studentId", verifyAdminOrStaff, deleteStudent); // Both Admin and Staff can delete student

module.exports = router;
