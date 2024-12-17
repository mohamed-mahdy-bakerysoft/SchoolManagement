const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust based on your project structure

// Middleware to verify token and check admin privileges
const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id); // Find user by ID in the decoded token

    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied, admin privileges required" });
    }

    req.user = user; // Add user data to request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to verify token and check staff privileges
const verifyStaff = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id); // Find user by ID in the decoded token

    if (!user || user.role !== "Office Staff") {
      return res
        .status(403)
        .json({ message: "Access denied, staff privileges required" });
    }

    req.user = user; // Add user data to request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to verify token and check librarian privileges
const verifyLibrarian = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id); // Find user by ID in the decoded token

    if (!user || user.role !== "Librarian") {
      return res
        .status(403)
        .json({ message: "Access denied, librarian privileges required" });
    }

    req.user = user; // Add user data to request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to verify token and check admin or staff privileges
const verifyAdminOrStaff = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || (user.role !== "admin" && user.role !== "Office Staff")) {
      return res
        .status(403)
        .json({ message: "Access denied, admin or staff privileges required" });
    }

    req.user = user; // Add user data to request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to verify token and check admin, staff, or librarian privileges
const verifyAll = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id); // Find user by ID in the decoded token

    if (!user || !["admin", "Office Staff", "Librarian"].includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied, valid privileges required" });
    }

    req.user = user; // Add user data to request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = {
  verifyAdmin,
  verifyStaff,
  verifyLibrarian,
  verifyAdminOrStaff,
  verifyAll,
};
