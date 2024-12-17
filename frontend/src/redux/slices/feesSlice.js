import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feesHistory: [],
};

const feesSlice = createSlice({
  name: "fees",
  initialState,
  reducers: {
    setFeesHistory: (state, action) => {
      state.feesHistory = action.payload;
    },
    addFeesRecord: (state, action) => {
      state.feesHistory.push(action.payload);
    },
    updateFeesRecord: (state, action) => {
      const index = state.feesHistory.findIndex(
        (record) => record.id === action.payload.id
      );
      if (index !== -1) {
        state.feesHistory[index] = action.payload;
      }
    },
    deleteFeesRecord: (state, action) => {
      state.feesHistory = state.feesHistory.filter(
        (record) => record.id !== action.payload
      );
    },
  },
});

export const {
  setFeesHistory,
  addFeesRecord,
  updateFeesRecord,
  deleteFeesRecord,
} = feesSlice.actions;

export default feesSlice.reducer;
