const Student = require("../models/Student.js"); // Assuming you're using Mongoose models

// Controller to get all students
const getAllStudents = async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find();
    res
      .status(200)
      .json({ message: "Students retrieved successfully", students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to retrieve students" });
  }
};

// Controller to fetch a single student by admissionNumber
const getStudentByAdmissionNumber = async (req, res) => {
  try {
    const { admissionNumber } = req.params;

    // Find the student by admissionNumber
    const student = await Student.findOne({ admissionNumber });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student retrieved successfully", student });
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
      admissionNumber,
      location,
      image,
    } = req.body;

    // Check if admissionNumber is unique
    const existingStudent = await Student.findOne({ admissionNumber });
    if (existingStudent) {
      return res
        .status(400)
        .json({
          message: "Admission number already exists. Please use a unique number.",
        });
    }

    // Create a new student
    const newStudent = new Student({
      name,
      class: studentClass,
      contact,
      admissionNumber,
      location,
      image,
    });

    // Save the student to the database
    await newStudent.save();
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
    const {
      name,
      class: studentClass,
      contact,
      admissionNumber,
      location,
      image,
    } = req.body;

    // Update the student details by admissionNumber
    const student = await Student.findOneAndUpdate(
      { admissionNumber: req.params.admissionNumber },
      { name, class: studentClass, contact, admissionNumber, location, image },
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

// Controller to delete a student by admissionNumber
const deleteStudent = async (req, res) => {
  try {
    const { admissionNumber } = req.params;

    // Delete the student by admissionNumber
    const student = await Student.findOneAndDelete({ admissionNumber });

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
  getStudentByAdmissionNumber,
  addStudent,
  updateStudent,
  deleteStudent,
};
