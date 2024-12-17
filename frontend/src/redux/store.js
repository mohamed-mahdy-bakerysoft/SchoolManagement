import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import studentReducer from "./slices/studentSlice";
import libraryReducer from "./slices/librarySlice";
import feesReducer from "./slices/feesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    library: libraryReducer,
    fees: feesReducer,
  },
});

export default store;
