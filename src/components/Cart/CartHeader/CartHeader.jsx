import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectCart } from '../../../store/cart/cartSlice';
import { Title } from '../../Title/Title';

import styles from './CartHeader.module.scss';

export const CartHeader = ({ openModal }) => {
  const cart = useSelector(selectCart);

  return (
    <div className={styles.header}>
      <Title>Cart</Title>
      {(cart.sellers && Object.keys(cart.sellers).length) !== 0 && (
        <Button
          variant="outlined"
          className={styles.emptyButton}
          onClick={openModal}
        >
          Empty cart
        </Button>
      )}
    </div>
  );
};

CartHeader.propTypes = {
  openModal: PropTypes.func,
};
