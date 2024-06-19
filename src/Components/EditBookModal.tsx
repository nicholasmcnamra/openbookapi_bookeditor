import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Book } from '../types';
import EditBookForm from './EditBook';

interface Props {
  open: boolean;
  onClose: () => void;
  book: Book | null;
  onSave: (updatedBook: Book) => void;
}

const EditBookModal: React.FC<Props> = ({ open, onClose, book, onSave }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle >Edit Book</DialogTitle>
      <DialogContent>
        {book && <EditBookForm book={book} onSave={onSave} />} 
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;