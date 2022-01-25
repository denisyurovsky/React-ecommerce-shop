import CloseIcon from '@mui/icons-material/Close';
import { Button, Modal, Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { CartFooter } from '../../components/Cart/CartFooter/CartFooter';
import { CartHeader } from '../../components/Cart/CartHeader/CartHeader';
import { CartProductCards } from '../../components/Cart/CartProductCards/CartProductCards';
import {
  deleteAllProducts,
  deleteProduct,
  getCart,
} from '../../store/cart/cartSlice';
import { getCurrentUser } from '../../store/user/userSlice';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, user.user.id]);

  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(undefined);

  const removeAllProducts = () => {
    dispatch(deleteAllProducts());
  };

  const handleConfirmation = () => {
    if (modalProduct) {
      dispatch(deleteProduct({ product: modalProduct }));
    } else {
      removeAllProducts();
    }
    closeModal();
  };

  const closeModal = () => {
    setOpen(false);
    setModalProduct(undefined);
  };

  const openModal = () => {
    setOpen(true);
  };

  const buyHandler = () => {
    alert('Possibility to buy products will be later!');
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs
        links={[
          { text: 'Home', url: '/' },
          { text: 'Cart', url: '' },
        ]}
      />
      <CartHeader openModal={openModal} />
      <CartProductCards
        openModal={openModal}
        setModalProduct={setModalProduct}
      />
      <CartFooter buyHandler={buyHandler} />
      <Modal open={open} onClose={closeModal} className={styles.modal}>
        <Box className={styles.modalInner}>
          <CloseIcon className={styles.closeIcon} onClick={closeModal} />
          <Typography align="center" className={styles.modalText}>
            Are you sure you whant to remove{' '}
            {modalProduct ? modalProduct.name : 'all products'} from the cart?
          </Typography>
          <Box className={styles.modalButtons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmation}
            >
              Yes
            </Button>
            <Button variant="outlined" color="primary" onClick={closeModal}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
