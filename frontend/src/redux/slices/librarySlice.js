import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  libraryHistory: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setLibraryHistory: (state, action) => {
      state.libraryHistory = action.payload;
    },
    addLibraryRecord: (state, action) => {
      state.libraryHistory.push(action.payload);
    },
    updateLibraryRecord: (state, action) => {
      const index = state.libraryHistory.findIndex((record) => record.id === action.payload.id);
      if (index !== -1) {
        state.libraryHistory[index] = action.payload;
      }
    },
    deleteLibraryRecord: (state, action) => {
      state.libraryHistory = state.libraryHistory.filter((record) => record.id !== action.payload);
    },
  },
});

export const { setLibraryHistory, addLibraryRecord, updateLibraryRecord, deleteLibraryRecord } = librarySlice.actions;

export default librarySlice.reducer;
