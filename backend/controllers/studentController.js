const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  const { name, className, age } = req.body;
  try {
    const newStudent = new Student({ name, className, age });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating student' });
  }
};
