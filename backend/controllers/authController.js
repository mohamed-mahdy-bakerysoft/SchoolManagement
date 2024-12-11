// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Logout function
exports.logout = (req, res) => {
  // In a stateless JWT setup, there's no need to invalidate the token on the server.
  // Just send a success message and let the client remove the token.
  res.status(200).json({ message: 'Logged out successfully' });
};

// Register function
exports.register = async (req, res) => {
    const { name, email, password, role, staffId } = req.body;
  
    // Validate required fields
    if (!name || !email || !password || !role || !staffId) {
      return res.status(400).json({ message: 'All fields, including staffId, are required' });
    }
  
    // Ensure role is valid
    const validRoles = ['admin', 'Office Staff', 'Librarian'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
  
    try {
      // Check if the user already exists by email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      // Check if staffId is unique
      const existingStaffId = await User.findOne({ staffId });
      if (existingStaffId) {
        return res.status(400).json({ message: 'Staff ID already exists. Please use a unique ID.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        staffId, // Include the manually provided staffId
      });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ 
        message: `User registered successfully as ${role}`, 
        staffId: user.staffId // Return the staffId in the response
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
