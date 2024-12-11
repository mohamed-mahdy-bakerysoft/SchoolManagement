import axios from 'axios';
import  store  from '../redux/store'; // Import the Redux store to access state
import { logout } from '../redux/slices/authSlice'; // Import the logout action

// Create an Axios instance with the base URL
const apiInstance = axios.create({
  baseURL: 'http://localhost:5000/',  // Base URL: http://localhost:5000/
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up a request interceptor to add the token to headers for protected routes
apiInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from Redux store
    const state = store.getState();
    const token = state.auth.token; // Access the token from the auth slice of the Redux store

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle errors in request
  }
);

// Set up a response interceptor to handle token expiration
apiInstance.interceptors.response.use(
  (response) => {
    return response; // If the response is successful, just return it
  },
  (error) => {
    const responseError = error?.response;

    // Check if the error is a token expiration (401 Unauthorized)
    if (responseError?.status === 401) {
      // If the token expired, clear the user session from Redux
      store.dispatch(logout()); // Dispatch the logout action to clear the auth state
    }

    return Promise.reject(error); // Reject the error if it's not handled
  }
);

export default apiInstance;
