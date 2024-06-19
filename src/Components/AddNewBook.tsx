import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import bookReducer, { addBook } from '../Redux/reducers/bookReducer';
import { Book } from '../types'
import { fetchBookData } from '../openBookapi';
import { Button, Grid, TextField } from '@mui/material';

const AddNewBook: React.FC = () => {
    const [openLibraryId, setOpenLibraryId] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const bookData = await fetchBookData(openLibraryId); 
        if (bookData) {
            console.log(bookData);
            // Add book data to Redux store
            dispatch(addBook(bookData)); 
        }
        setOpenLibraryId("");
    }

    return (
        <div className='submit-form'>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            label="Enter Open Library ID"
                            value={openLibraryId}
                            onChange={(e) => setOpenLibraryId(e.target.value)}
                            className='submit-text'
                        />
                        </Grid>
                        <Grid item xs={3}>
                        <Button type="submit" variant="contained" color="primary" size="medium" fullWidth className='submit-button'>
                            Add Book
                        </Button>
                    </Grid>
            </Grid>
            </form>
        </div>
    )
}

export default AddNewBook;