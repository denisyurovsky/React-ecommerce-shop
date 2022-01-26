import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProductsByIds } from '../../../api/products';
import { notificationError } from '../../../helpers/constants/constants';
import { getCart, selectCart } from '../../../store/cart/cartSlice';
import { getCurrentUser } from '../../../store/user/userSlice';
import { CartProductCard } from '../CartProductCard/CartProductCard';

import styles from './CartProductCards.module.scss';

export const CartProductCards = ({ openModal, setModalProduct }) => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const cart = useSelector(selectCart);
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    let isMounted = true;

    const ids = cart.products.map((item) => {
      return item.productId;
    });

    const getCartProducts = async (ids) => {
      try {
        const response = await getProductsByIds(ids);

        if (isMounted) {
          setProducts(response.data);
        }
      } catch (err) {
        toast(notificationError);
      }
    };

    if (ids.length != 0) {
      getCartProducts(ids);
    } else {
      setProducts([]);
    }

    return () => {
      isMounted = false;
    };
  }, [cart.products]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, user.user.id]);

  return (
    <div className={styles.cards}>
      {products.length === 0 ? (
        <Typography className={styles.noProducts}>
          No one product has been added to the cart yet :( <br />
          Start <Link to={'/products'}>searching</Link>
        </Typography>
      ) : (
        products.map((product) => (
          <CartProductCard
            key={product.id}
            product={product}
            openModal={openModal}
            setModalProduct={setModalProduct}
          />
        ))
      )}
    </div>
  );
};

CartProductCards.propTypes = {
  setModalProduct: PropTypes.func,
  openModal: PropTypes.func,
};
