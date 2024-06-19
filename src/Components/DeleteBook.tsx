import { useDispatch, useSelector } from 'react-redux';
import { Button  } from '@mui/material';
import { deleteBook } from '../Redux/reducers/bookReducer';
import React from 'react';

interface DeleteBookProps {
    openLibraryid: String;
}

const DeleteBook: React.FC<DeleteBookProps> = ({ openLibraryid }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteBook(openLibraryid));
    }


    return (
            <Button type="submit" variant="contained" color="primary"onClick={handleDelete} className="delete-book">Delete</Button>
    )
}

export default DeleteBook;