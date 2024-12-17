// src/utils/api/auth.js
import apiInstance from "./apiInstance"; // Import axios instance

/**
 * Login Request
 * @param {Object} data - The login credentials (email, password)
 * @returns {Object} - Contains user object and token
 */
export const login = async (data) => {
  try {
    const response = await apiInstance.post("api/auth/login", {
      email: data.email,
      password: data.password,
    });

    if (response.status === 200) {
      const { token, role } = response.data; // Extract token and role from response

      // Construct the user object based on received role
      const user = { role };
      console.log("Constructed User Object:", user); // Debug log

      // Save token to localStorage for persistence
      localStorage.setItem("token", token);

      return { user, token }; // Return user and token
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    throw new Error(error.response?.data?.message || "Login request failed");
  }
};

/**
 * Register Request
 * @param {Object} data - The registration details (name, email, password, role, staffId)
 * @param {String} token - Admin token for authorization
 * @returns {Object} - Response data from the API
 */
export const register = async (data, token) => {
  try {
    const response = await apiInstance.post(
      "api/auth/register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        staffId: data.staffId, // Include staffId in the request
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );

    return response.data; // Return API response data
  } catch (error) {
    console.error("Registration error:", error); // Log the error
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

/**
 * Fetch User Info
 * @returns {Object} - User data retrieved from the server
 */
export const getUserInfo = async () => {
  try {
    const response = await apiInstance.get("api/auth/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in request
      },
    });

    return response.data; // Return user data
  } catch (error) {
    console.error("Fetch user info error:", error); // Log the error
    throw new Error(
      error.response?.data?.message || "Fetching user info failed"
    );
  }
};

/**
 * Logout Request
 * Clears local storage and resets the Redux store state
 */
export const logout = () => {
  return (dispatch) => {
    // Clear stored token
    localStorage.removeItem("token");

    // Dispatch logout action to Redux
    dispatch({
      type: "LOGOUT",
    });
  };
};
