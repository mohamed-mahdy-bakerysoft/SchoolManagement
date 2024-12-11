import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  currentStudent: null,
};

const studentSlice = createSlice({
  name: 'student',
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
      const index = state.students.findIndex((student) => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter((student) => student.id !== action.payload);
    },
  },
});

export const { setStudents, setCurrentStudent, addStudent, updateStudent, deleteStudent } = studentSlice.actions;

export default studentSlice.reducer;
