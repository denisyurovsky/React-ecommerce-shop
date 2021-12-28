import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { notificationError } from '../../helpers/constants/constants';
import { findProductIndexById } from '../../helpers/utils/findProductIndexById';
import {
  selectCart,
  addProduct,
  decreaseProduct,
} from '../../store/cart/cartSlice';

import styles from './AddToCartButton.module.scss';

export const AddToCartButton = ({ product }) => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const index = findProductIndexById(cart.products, product.id);

  const addHandler = () => {
    dispatch(addProduct({ product })).then(() => {
      if (cart.errorOccurred) {
        toast.error(notificationError);
      }
    });
  };

  const decreaseHandler = () => {
    dispatch(decreaseProduct({ product })).then(() => {
      if (cart.errorOccurred) {
        toast.error(notificationError);
      }
    });
  };

  return cart.products[index] ? (
    <div className={styles.container}>
      <Button
        variant="contained"
        className={styles.button + ' ' + styles.leftButton}
        onClick={decreaseHandler}
      >
        -
      </Button>
      <p className={styles.counter}>{cart.products[index].quantity}</p>
      <Button
        variant="contained"
        className={styles.button + ' ' + styles.rightButton}
        onClick={addHandler}
      >
        +
      </Button>
    </div>
  ) : (
    <Button
      variant="contained"
      className={styles.bigButton}
      onClick={addHandler}
    >
      + add to cart
    </Button>
  );
};

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    quantity: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};
