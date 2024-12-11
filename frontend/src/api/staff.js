import apiInstance from './apiInstance';

// Fetch all office staff
export const fetchAllStaff = async (token) => {
  try {
    const response = await apiInstance.get('/api/staff/officestaff', {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in headers
      },
    });
    return response.data; // Return staff data
  } catch (error) {
    console.error('Error fetching staff:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Failed to fetch staff');
  }
};

// Fetch all librarian
export const fetchAllLibrarian = async (token) => {
    try {
      const response = await apiInstance.get('/api/staff/librarians', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      });
      return response.data; // Return staff data
    } catch (error) {
      console.error('Error fetching librarians:', error); // Log the error
      throw new Error(error.response?.data?.message || 'Failed to fetch librarians');
    }
  };

// Fetch staff details by staffId
export const fetchStaffById = async (staffId, token) => {
  try {
    const response = await apiInstance.get(`/api/staff/${staffId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in headers
      },
    });
    return response.data; // Return staff details
  } catch (error) {
    console.error('Fetch staff info error:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Fetching staff info failed');
  }
};

// Update staff details by staffId
export const updateStaff = async (staffId, staffDetails, token) => {
  try {
    const response = await apiInstance.put(
      `/api/staff/${staffId}`,
      {
        name: staffDetails.name,
        email: staffDetails.email,
        role: staffDetails.role,
        staffId: staffDetails.staffId, // Include staffId in the request body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return updated staff data
  } catch (error) {
    console.error('Error updating staff:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Failed to update staff details');
  }
};

// Delete staff member by staffId
export const deleteStaff = async (staffId, token) => {
  try {
    const response = await apiInstance.delete(`/api/staff/${staffId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in headers
      },
    });
    return response.data; // Return success message
  } catch (error) {
    console.error('Error deleting staff:', error); // Log the error
    throw new Error(error.response?.data?.message || 'Failed to delete staff member');
  }
};
