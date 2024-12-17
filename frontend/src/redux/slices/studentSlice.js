import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setCurrentStudent: (state, action) => {
      state.currentStudent = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      state.currentStudent = { ...state.currentStudent, ...action.payload }; // Update student details in state
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.studentId !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setStudents,
  setCurrentStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  setLoading,
  setError,
} = studentSlice.actions;

export default studentSlice.reducer;
