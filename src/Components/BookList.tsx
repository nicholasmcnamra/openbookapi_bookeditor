import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/reducers/index";
import { Book } from "../types";
import { Divider, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import AddNewBook from "./AddNewBook";
import EditBookModal from "./EditBookModal";
import { editBook } from "../Redux/reducers/bookReducer";

const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [orderBy, setOrderBy] = useState<"added" | "titleAsc" | "titleDesc" | "">("");

  const sortedBooks = orderBy
  ? [...books].sort((a, b) => {
      if (orderBy === "added") {
        // Sort by order added
        return books.indexOf(a) - books.indexOf(b);
      } 
      else if (orderBy === "titleAsc") {
        // Sort by title ascending
        return a.title.toString().localeCompare(b.title.toString());
      } 
      else {
        // Sort by title descending
        return b.title.toString().localeCompare(a.title.toString());
      }
    })
  : books;

  const handleSortChange = (event: SelectChangeEvent<"added" | "titleAsc" | "titleDesc">) => {
    const value = event.target.value as "added" | "titleAsc" | "titleDesc";
    setOrderBy(value);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSave = (updatedBook: Book) => {
    dispatch(editBook(updatedBook));
    console.log('Dispatching updated book:', updatedBook);
    handleCloseModal();
  };

    return (
      <div className="booklist-container">
      <AddNewBook />
      <Typography variant="h4" className="header">Book Manager</Typography>
      <div className="sort">
        <Select value={orderBy || ""} onChange={handleSortChange} title="Sort Books" className="sort-box" displayEmpty >
          <MenuItem value="added">Order Added</MenuItem>
          <MenuItem value="titleAsc">Title Asc</MenuItem>
          <MenuItem value="titleDesc">Title Desc</MenuItem>
        </Select>
      </div>
      {sortedBooks.map((book: Book, index: number) => (
        <div className="book-item" key={index} onClick={() => handleBookClick(book)}>
          <div className="title-year">
            <div>
              <Typography variant="h6" className="title">
                {book.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {book.publishedYear}
              </Typography>
            </div>
            <div className="author">
              <Typography variant="body2" color="textSecondary">
                {book.author}
              </Typography>
            </div>
          </div>
          <Typography variant="body1" className="description">
            {book.description}
          </Typography>
          <div className="divider">
          <Divider />
          </div>
        </div>
      ))}
      <EditBookModal
        open={isModalOpen}
        onClose={handleCloseModal}
        book={selectedBook}
        onSave={handleSave}
      />
    </div>
    )
}


export default BookList;
