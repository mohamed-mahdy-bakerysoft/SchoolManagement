const express = require("express");
const router = express.Router();
const {
  getAllFeesRecords,
  createFeesRecord,
  getFeesHistoryById,
  updateFeesRecord,
  deleteFeesRecord,
  getFeesRecordByTransactionId,
} = require("../controllers/feesController");
const {
  verifyAdmin,
  verifyStaff,
  verifyAdminOrStaff,
} = require("../middlewares/authMiddleware");

// Get all fees records (GET)
router.get("/", verifyAdminOrStaff, getAllFeesRecords);

// Create a new fees record (POST)
router.post("/", verifyAdminOrStaff, createFeesRecord);

// Get fees record by studentId (GET)
router.get("/:studentId", verifyAdminOrStaff, getFeesHistoryById);

// Get fees record by transactionId (GET)
router.get(
  "/transaction/:transactionId",
  verifyAdminOrStaff,
  getFeesRecordByTransactionId
);

// Update a fees record by transactionId (PUT)
router.put("/transaction/:transactionId", verifyAdminOrStaff, updateFeesRecord);

// Delete a fees record by transactionId (DELETE)
router.delete(
  "/transaction/:transactionId",
  verifyAdminOrStaff,
  deleteFeesRecord
);

module.exports = router;
