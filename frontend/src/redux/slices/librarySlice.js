// src/store/slices/librarySlice.js

import { createSlice } from "@reduxjs/toolkit";
import { addBook as addBookApi } from "../../api/book"; // Import the addBook API

const initialState = {
  books: [],
  transactions: [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateBookStatus: (state, action) => {
      const bookIndex = state.books.findIndex(
        (book) => book.bookId === action.payload.bookId
      );
      if (bookIndex !== -1) {
        state.books[bookIndex].status = action.payload.status;
      }
    },
    addBook: (state, action) => {
      state.books.push(action.payload); // Add book to the state
    },
  },
});

export const {
  setBooks,
  setTransactions,
  addTransaction,
  updateBookStatus,
  addBook,
} = librarySlice.actions;

export default librarySlice.reducer;
