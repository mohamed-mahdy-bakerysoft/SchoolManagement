import apiInstance from './apiInstance'; // Import the API instance

// Add a new student
export const addStudent = async (studentData, token) => {
  try {
    const response = await apiInstance.post(
      '/api/students', // API endpoint to add a new student
      studentData, // Send student data in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return the added student data
  } catch (error) {
    console.error('Error adding student:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Failed to add student');
  }
};

// Update an existing student
export const updateStudent = async (studentId, studentData, token) => {
  try {
    const response = await apiInstance.put(
      `/api/students/${studentId}`, // API endpoint to update a student
      studentData, // Send student data in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return updated student data
  } catch (error) {
    console.error('Error updating student:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Failed to update student');
  }
};

// Delete a student
export const deleteStudent = async (studentId, token) => {
  try {
    const response = await apiInstance.delete(
      `/api/students/${studentId}`, // API endpoint to delete a student
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return success message
  } catch (error) {
    console.error('Error deleting student:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Failed to delete student');
  }
};

// Get all students
export const getAllStudents = async (token) => {
  try {
    const response = await apiInstance.get('/api/students', {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in headers
      },
    });
    return response.data; // Return list of students
  } catch (error) {
    console.error('Error fetching students:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Failed to fetch students');
  }
};

// Get a student by ID
export const getStudentById = async (studentId, token) => {
  try {
    const response = await apiInstance.get(`/api/students/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in headers
      },
    });
    return response.data; // Return student data
  } catch (error) {
    console.error('Error fetching student:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Failed to fetch student');
  }
};
