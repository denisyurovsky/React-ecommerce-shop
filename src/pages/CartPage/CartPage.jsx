import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { CartFooter } from '../../components/Cart/CartFooter/CartFooter';
import { CartHeader } from '../../components/Cart/CartHeader/CartHeader';
import { CartProductCards } from '../../components/Cart/CartProductCards/CartProductCards';
import Modal from '../../components/ui-kit/Modal/Modal';
import { MODAL_SIZES } from '../../helpers/constants/constants';
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
      <Modal
        isOpen={open}
        onClose={closeModal}
        onConfirm={handleConfirmation}
        cancelButtonLabel="No"
        actionButtonLabel="Yes"
        size={MODAL_SIZES.SMALL}
      >
        <Typography align="center">
          Are you sure you want to remove&nbsp;
          {modalProduct ? modalProduct.name : 'all products'} from the cart?
        </Typography>
      </Modal>
    </div>
  );
};
