// src/utils/api/auth.js
import apiInstance from './apiInstance';  // Import axios instance

export const login = async (data) => {
  try {
    const response = await apiInstance.post('api/auth/login', {
      email: data.email,
      password: data.password,
    });

    if (response.status === 200) {
      const { token, role } = response.data; // Ensure role is being received

      // Log to confirm the structure of the user object
      const user = { role }; 
      console.log('Constructed User Object:', user);

      localStorage.setItem('token', token);

      return { user, token }; // Return user and token
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login request failed');
  }
};


// Register request
export const register = async (data, token) => {
  try {
    const response = await apiInstance.post(
      "api/auth/register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Fetch user info (protected route)
export const getUserInfo = async () => {
  try {
    const response = await apiInstance.get('api/auth/user');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching user info failed');
  }
};

// Logout request
export const logout = () => {
  return (dispatch) => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Dispatch to Redux store
    dispatch({
      type: "LOGOUT",
    });
  };
};
