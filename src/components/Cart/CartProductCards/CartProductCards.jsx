import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { pathNames } from '../../../helpers/constants/pathNames/pathNames';
import { getCart, selectCart } from '../../../store/cart/cartSlice';
import { getCurrentUser } from '../../../store/user/userSlice';
import { CartSellerWrapper } from '../CartSellerWrapper/CartSellerWrapper';

import styles from './CartProductCards.module.scss';

export const CartProductCards = ({ openModal, setModalProduct }) => {
  const { PRODUCTS } = pathNames;

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(getCurrentUser);

  const [sellers, setSellers] = useState({});

  useEffect(() => {
    if (cart.sellers) {
      setSellers(cart.sellers);
    }
  }, [cart.sellers]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, user.user.id]);

  const isCartEmpty = (sellers) => {
    return Object.keys(sellers).length === 0;
  };

  return (
    <div className={styles.cards}>
      {isCartEmpty(sellers) ? (
        <Typography className={styles.noProducts}>
          No one product has been added to the cart yet :( <br />
          Start <Link to={PRODUCTS}>searching</Link>
        </Typography>
      ) : (
        Object.keys(sellers).map((userId) => {
          return (
            <CartSellerWrapper
              key={userId}
              userId={Number(userId)}
              products={sellers[userId].products}
              openModal={openModal}
              setModalProduct={setModalProduct}
            />
          );
        })
      )}
    </div>
  );
};

CartProductCards.propTypes = {
  setModalProduct: PropTypes.func,
  openModal: PropTypes.func,
};
