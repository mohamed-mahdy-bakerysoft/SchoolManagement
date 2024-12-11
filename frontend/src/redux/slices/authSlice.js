// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Retrieve user from localStorage
  token: localStorage.getItem('authToken') || null, // Retrieve token from localStorage
  isAuthenticated: !!localStorage.getItem('authToken'), // Check if token exists
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('Payload received in login action:', action.payload); // Log the payload

      state.user = action.payload.user; // Set user (contains role)
      state.token = action.payload.token; // Set token
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
