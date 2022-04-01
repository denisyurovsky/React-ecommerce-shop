import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import categoriesApi from '../../../api/categories';
import { notificationError } from '../../../constants/constants';
import { getProductsByUserId } from '../../../store/products/productsSlice';

const { deleteCategoryAndRelatedProducts } = categoriesApi;

export const DeleteCategoryButtonWithModal = ({ category, products }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const authorId = useSelector((state) => state.user.user.id);

  const onDeleteCategory = async () => {
    try {
      const response = await categoriesApi.deleteCategoryAndRelatedProducts(
        category
      );

      if (response.status === 200) {
        dispatch(getProductsByUserId(authorId));

        toast.success(
          'Category and related products were successfully deleted'
        );
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
          The next products are connected to the current category:
        </DialogTitle>
        <DialogContent>
          <List>
            {products.map((product) => (
              <MenuItem key={product.name}>{product.name}</MenuItem>
            ))}
          </List>
        </DialogContent>
        <DialogTitle>
          Are you sure you want to delete it and all the connected products?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => onDeleteCategory(category)}>
            Yes, remove all
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteCategoryButtonWithModal.propTypes = {
  category: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};
