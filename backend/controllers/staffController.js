const User = require("../models/User");

// Controller to fetch all office staff
exports.getAllOfficeStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "Office Staff" }).select("-password");
    res.status(200).json(staff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching staff data", error: error.message });
  }
};

// Controller to fetch all librarians
exports.getAllLibrarian = async (req, res) => {
  try {
    const staff = await User.find({ role: "Librarian" }).select("-password");
    res.status(200).json(staff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching staff data", error: error.message });
  }
};

// General Controller to fetch details of a specific staff member by `staffId`
exports.getStaffByStaffId = async (req, res) => {
  const { staffId } = req.params; // Extract `staffId` from request parameters
  try {
    const staff = await User.findOne({ staffId }).select("-password"); // Query using `staffId`
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching staff details", error: error.message });
  }
};

// Controller to update staff details
exports.updateStaff = async (req, res) => {
  const { staffId } = req.params; // Use `staffId` from the request parameters
  const { name, email, role } = req.body; // Get the data to update from request body

  try {
    const staff = await User.findOne({ staffId }); // Search by staffId
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    // Update staff details
    staff.name = name || staff.name;
    staff.email = email || staff.email;
    staff.role = role || staff.role;

    await staff.save(); // Save updated staff data

    res
      .status(200)
      .json({ message: "Staff details updated successfully", staff });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating staff details", error: error.message });
  }
};

// Controller to delete a staff member
exports.deleteStaff = async (req, res) => {
  const { staffId } = req.params; // Use `staffId` from the request parameters
  try {
    const staff = await User.findOneAndDelete({ staffId }); // Delete staff by staffId
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting staff member", error: error.message });
  }
};
