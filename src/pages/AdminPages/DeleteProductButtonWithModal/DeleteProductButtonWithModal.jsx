import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { deleteProduct } from '../../../api/product';
import { notificationError } from '../../../helpers/constants/constants';
import { getProductsByUserId } from '../../../store/products/productsSlice';

export const DeleteProductButtonWithModal = ({ productName, id }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const authorId = useSelector((state) => state.user.user.id);

  const onDeleteProduct = async () => {
    try {
      const response = await deleteProduct(id);

      if (response.status === 200) {
        dispatch(getProductsByUserId(authorId));

        toast.success('Product was successfully deleted');
      }
    } catch (e) {
      toast.error(notificationError);
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Delete</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to delete current product?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{productName}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={onDeleteProduct}>Yes, remove</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteProductButtonWithModal.propTypes = {
  id: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};
