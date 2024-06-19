import React, { useEffect, useState } from 'react';
import { Book, RootState } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import DeleteBook from './DeleteBook';

interface Props{
    book: Book;
    onSave: (updatedBook: Book) => void;
}

const EditBookForm: React.FC<Props> = ({ book, onSave }) => {
    const { bookId } = useParams<{ bookId: string }>();
    const books = useSelector((state: RootState) => state.books.books);
    const [editedBook, setEditedBook] = useState<Book>(book);
    const dispatch = useDispatch();

    useEffect(() => {
        const selectedBook = books.find((b) => b.openLibraryid === bookId);
        if (selectedBook) {
          setEditedBook(selectedBook);
        }
      }, [books, bookId]);
    
      if (!editedBook) {
        return <div>Loading...</div>;
      }
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedBook((prevEditedBook) => ({
            ...prevEditedBook, 
            [name]: value, 
        }));
    };
      
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Submitting edited book:', editedBook);
      onSave(editedBook); 
    };


    return (
        <div className='edit-book-container'>
    <form onSubmit={handleSubmit} >
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={editedBook.title || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Published Year"
            name="publishedYear"
            type="number"
            value={editedBook.publishedYear || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={editedBook.author || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={editedBook.description || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} className='edit-delete-container'>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <DeleteBook openLibraryid={editedBook.openLibraryid}></DeleteBook>
          </Grid>
      </Grid>
            </form>
        </div>
    )
}

export default EditBookForm;