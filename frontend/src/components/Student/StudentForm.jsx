import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent as apiAddStudent } from "../../api/student"; // Import the API function
import { addStudent } from "../../redux/slices/studentSlice"; // Import addStudent action
import { useDispatch } from "react-redux"; // Import useDispatch hook
import InputField from "../Shared/InputField"; // Import InputField component
import Layout from "../Layout/Layout";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To redirect after adding the student

  // State for the student data
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    contact: "",
    studentId: "",
    location: "",
  });

  // State for success and error messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validate form inputs
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (!formData.class.trim()) {
      setError("Class is required.");
      return false;
    }
    if (!formData.contact.trim()) {
      setError("Contact is required.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      setError("Contact must be a valid 10-digit number.");
      return false;
    }
    if (!formData.studentId.trim()) {
      setError("Student ID is required.");
      return false;
    }
    if (!formData.location.trim()) {
      setError("Location is required.");
      return false;
    }
    return true;
  };

  // Handle input change and update the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear the error when the user starts typing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return; // Validate the form inputs before submission

    try {
      // Call the API to add a new student
      const newStudent = await apiAddStudent(formData);
      dispatch(addStudent(newStudent)); // Dispatch the action to add the student in Redux
      setSuccess("Student added successfully!");

      // Reset the form after submission
      setFormData({
        name: "",
        class: "",
        contact: "",
        studentId: "",
        location: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error adding student.");
    }
  };

  return (
    <Layout title="Add Student">
      <div className="flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-lg w-96"
        >
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          {/* Name Field */}
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />

          {/* Class Field */}
          <InputField
            label="Class"
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            placeholder="Enter class"
          />

          {/* Contact Field */}
          <InputField
            label="Contact"
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
          />

          {/* Student ID Field */}
          <InputField
            label="Student ID"
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter Student ID"
          />

          {/* Location Field */}
          <InputField
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded btn-primary w-full"
          >
            Add Student
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default StudentForm;
