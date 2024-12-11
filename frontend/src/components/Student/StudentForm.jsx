import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent, setCurrentStudent, deleteStudent } from '../../redux/slices/studentSlice'; // Import actions
import InputField from '../Shared/InputField';
import { addStudent as apiAddStudent, updateStudent as apiUpdateStudent, deleteStudent as apiDeleteStudent } from '../../api/student'; // Import API functions

const StudentForm = ({ studentId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Get the token from the Redux store
  const currentStudent = useSelector((state) => state.student.currentStudent);

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    contact: '',
    admissionNumber: '',
    location: '',
    image: '',
  });

  // If editing, pre-fill form with current student data
  useEffect(() => {
    if (studentId && currentStudent) {
      setFormData({
        name: currentStudent.name || '',
        class: currentStudent.class || '',
        contact: currentStudent.contact || '',
        admissionNumber: currentStudent.admissionNumber || '',
        location: currentStudent.location || '',
        image: currentStudent.image || '',
      });
    }
  }, [studentId, currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // Set base64 string for image
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('You must be logged in to perform this action.');
      return;
    }

    try {
      if (studentId) {
        // Update student
        const updatedStudent = await apiUpdateStudent(studentId, formData, token);
        dispatch(updateStudent(updatedStudent)); // Dispatch Redux action
      } else {
        // Add new student
        const newStudent = await apiAddStudent(formData, token);
        dispatch(addStudent(newStudent)); // Dispatch Redux action
      }
      setFormData({
        name: '',
        class: '',
        contact: '',
        admissionNumber: '',
        location: '',
        image: '',
      }); // Reset the form
    } catch (error) {
      console.error('Error handling student data:', error);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      alert('You must be logged in to delete this student.');
      return;
    }

    try {
      await apiDeleteStudent(studentId, token); // Delete student via API
      dispatch(deleteStudent(studentId)); // Dispatch Redux action
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <InputField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter student name"
      />
      <InputField
        label="Class"
        type="text"
        name="class"
        value={formData.class}
        onChange={handleChange}
        placeholder="Enter student class"
      />
      <InputField
        label="Contact"
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Enter contact number"
      />
      <InputField
        label="Admission Number"
        type="text"
        name="admissionNumber"
        value={formData.admissionNumber}
        onChange={handleChange}
        placeholder="Enter admission number"
      />
      <InputField
        label="Location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Enter location"
      />

      {/* Image Upload Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Student Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500"
        />
        {formData.image && (
          <img src={formData.image} alt="Student" className="mt-2 w-24 h-24 object-cover" />
        )}
      </div>

      <button type="submit" className="btn-primary mt-4">
        {studentId ? 'Update Student' : 'Add Student'}
      </button>

      {studentId && (
        <button
          type="button"
          onClick={handleDelete}
          className="btn-danger mt-4 ml-4"
        >
          Delete Student
        </button>
      )}
    </form>
  );
};

export default StudentForm;
