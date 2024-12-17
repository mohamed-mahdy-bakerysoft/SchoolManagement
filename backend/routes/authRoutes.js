// src/routes/authRoutes.js
const express = require("express");
const { login, logout, register } = require("../controllers/authController");
const { verifyAdmin } = require("../middlewares/authMiddleware"); // Import verifyAdmin middleware
const router = express.Router();

// Login route (no admin check needed for login)
router.post("/login", login);

// Logout route
router.post("/logout", logout);

// Register route (only accessible by admin)
router.post("/register", verifyAdmin, register);

module.exports = router;
