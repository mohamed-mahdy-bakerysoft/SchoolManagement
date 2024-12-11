const express = require("express");
const router = express.Router();
const {
  getAllOfficeStaff,
  getAllLibrarian,
  getStaffByStaffId,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffController.js");
const { verifyAdmin } = require("../middlewares/authMiddleware");

// Office Staff Routes
router.get("/officestaff", verifyAdmin, getAllOfficeStaff); // Get all office staff

// Librarian Routes
router.get("/librarians", verifyAdmin, getAllLibrarian); // Get all librarians

// General Staff Routes
router.get("/:staffId", verifyAdmin, getStaffByStaffId); // Get specific staff member by staffId
router.put("/:staffId", verifyAdmin, updateStaff); // Update any staff member by staffId
router.delete("/:staffId", verifyAdmin, deleteStaff); // Delete any staff member by staffId

module.exports = router;
