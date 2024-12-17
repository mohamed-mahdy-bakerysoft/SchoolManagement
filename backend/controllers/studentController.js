const Student = require("../models/Student.js"); // Assuming you're using Mongoose models

// Controller to get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students
    res
      .status(200)
      .json({ message: "Students retrieved successfully", students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to retrieve students" });
  }
};

// Controller to fetch a single student by studentId
const getStudentBystudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const student = await Student.findOne({ studentId }); // Find the student by studentId

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student retrieved successfully", student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Failed to retrieve student" });
  }
};

// Controller to add a student
const addStudent = async (req, res) => {
  try {
    const {
      name,
      class: studentClass,
      contact,
      studentId,
      location,
    } = req.body;

    // Input validation
    if (!name || !studentClass || !contact || !studentId || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\d{10}$/.test(contact)) {
      return res
        .status(400)
        .json({ message: "Contact must be a valid 10-digit number" });
    }

    // Check if studentId is unique
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res
        .status(400)
        .json({
          message: "Student ID already exists. Please use a unique ID.",
        });
    }

    // Create a new student
    const newStudent = new Student({
      name,
      class: studentClass,
      contact,
      studentId,
      location,
    });

    await newStudent.save(); // Save the student to the database
    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Failed to add student" });
  }
};

// Controller to update a student
const updateStudent = async (req, res) => {
  try {
    const { name, class: studentClass, contact, location } = req.body;

    // Input validation
    if (!name || !studentClass || !contact || !location) {
      return res
        .status(400)
        .json({ message: "All fields are required for update" });
    }

    if (!/^\d{10}$/.test(contact)) {
      return res
        .status(400)
        .json({ message: "Contact must be a valid 10-digit number" });
    }

    const { studentId } = req.params;

    const student = await Student.findOneAndUpdate(
      { studentId },
      { name, class: studentClass, contact, location },
      { new: true } // Return the updated document
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Failed to update student" });
  }
};

// Controller to delete a student by studentId
const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const student = await Student.findOneAndDelete({ studentId }); // Delete the student by studentId

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Failed to delete student" });
  }
};

module.exports = {
  getAllStudents,
  getStudentBystudentId,
  addStudent,
  updateStudent,
  deleteStudent,
};
