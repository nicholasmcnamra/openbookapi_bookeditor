import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types';
import { act } from 'react';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.books = [...state.books, action.payload];
    },
    editBook(state, action: PayloadAction<Book>) {
      const { payload } = action; 
      const bookIndex = state.books.findIndex(book => book.openLibraryid === payload.openLibraryid);
      if (bookIndex !== -1) {
        state.books[bookIndex] = payload;
        console.log('Book updated in slice:', state.books[bookIndex]);
      } else {
        console.log('Book not found for update:', payload);
      }
    },
    deleteBook(state, action: PayloadAction<String>) {
      const bookIndex = state.books.findIndex(book => book.openLibraryid === action.payload);
      if (bookIndex !== -1) {
        state.books.splice(bookIndex, 1);
        console.log(`Book with id: ${action.payload} deleted.`);
      }
      else {
        console.log(`Book not found with id: ${action.payload}.`);
      }
    }
  },
});

export const { addBook, editBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;