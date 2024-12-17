import apiInstance from "./apiInstance"; // Import the API instance

// Add a new fees remark
export const addFeesRemark = async (feesData, token) => {
  try {
    console.log(feesData);
    const response = await apiInstance.post(
      "/api/fees", // API endpoint to add a new fees remark
      feesData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return the added fees remark data
  } catch (error) {
    console.error("Error adding fees remark:", error);
    throw new Error(
      error.response?.data?.message || "Failed to add fees remark"
    );
  }
};

// Update an existing fees record by transactionId
export const updateFeesRecordapi = async (transactionId, formData, token) => {
  try {
    const response = await apiInstance.put(
      `/api/fees/transaction/${transactionId}`, // API endpoint to update fees record
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return updated fees record data
  } catch (error) {
    console.error("Error updating fees record:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update fees record"
    );
  }
};

// Delete a fees record by transactionId
export const deleteFeesRecordapi = async (transactionId, token) => {
  try {
    const response = await apiInstance.delete(
      `/api/fees/transaction/${transactionId}`, // API endpoint to delete fees record
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return success message
  } catch (error) {
    console.error("Error deleting fees record:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete fees record"
    );
  }
};

// Get all fees records
export const fetchFeesHistory = async (token) => {
  try {
    const response = await apiInstance.get("/api/fees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return list of all fees records
  } catch (error) {
    console.error("Error fetching fees records:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch fees records"
    );
  }
};

// Get a fees record by transactionId
export const fetchFeesRecordByTransactionId = async (transactionId, token) => {
  try {
    const response = await apiInstance.get(
      `/api/fees/transaction/${transactionId}`, // Fetch specific fees record
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return fees record data
  } catch (error) {
    console.error("Error fetching fees record:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch fees record"
    );
  }
};

// Get fees history for a specific student by studentId
export const fetchFeesByStudentId = async (studentId, token) => {
  try {
    const response = await apiInstance.get(
      `/api/fees/${studentId}`, // Fetch student-specific fee records
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return fees history for the student
  } catch (error) {
    console.error("Error fetching student fees history:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch student fees history"
    );
  }
};
