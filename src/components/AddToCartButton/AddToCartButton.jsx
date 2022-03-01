import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { notificationError } from '../../constants/constants';
import { findProductIndexById } from '../../helpers/findProductIndexById';
import { pageView } from '../../pages/ProductListPage/constants/constants';
import {
  selectCart,
  addProduct,
  decreaseProduct,
} from '../../store/cart/cartSlice';
import LoadingButton from '../ui-kit/buttons/LoadingButton';

import listStyles from './AddToCartButtonList.module.scss';
import moduleStyles from './AddToCartButtonModule.module.scss';

export const AddToCartButton = ({
  product,
  viewMode = pageView.MODULE_VIEW,
}) => {
  const cart = useSelector(selectCart);
  const products = cart.sellers[product.userId]
    ? cart.sellers[product.userId].products
    : [];

  const dispatch = useDispatch();
  const index = findProductIndexById(products, product.id);
  const [isLoading, setIsLoading] = useState(false);

  const addHandler = () => {
    setIsLoading(true);
    dispatch(addProduct({ product })).then(() => {
      setIsLoading(false);
      if (cart.errorOccurred) {
        toast.error(notificationError);
      }
    });
  };

  const decreaseHandler = () => {
    setIsLoading(true);
    dispatch(decreaseProduct({ product })).then(() => {
      setIsLoading(false);
      if (cart.errorOccurred) {
        toast.error(notificationError);
      }
    });
  };

  const styles = viewMode === pageView.MODULE_VIEW ? moduleStyles : listStyles;

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoadingButton label="" isFullWidth={true} />
      </div>
    );
  }

  return products[index] ? (
    <div className={styles.container}>
      <Button
        variant="contained"
        className={styles.button + ' ' + styles.leftButton}
        onClick={decreaseHandler}
      >
        -
      </Button>
      <p className={styles.counter}>{products[index].quantity}</p>
      <Button
        variant="contained"
        className={styles.button + ' ' + styles.rightButton}
        onClick={addHandler}
      >
        +
      </Button>
    </div>
  ) : (
    <div className={styles.bigButtonContainer}>
      <Button
        variant="contained"
        className={styles.bigButton}
        onClick={addHandler}
      >
        + add to cart
      </Button>
    </div>
  );
};

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    userId: PropTypes.number,
    quantity: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    name: PropTypes.string,
    discountPrice: PropTypes.number,
    price: PropTypes.number,
    id: PropTypes.number,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  viewMode: PropTypes.oneOf([pageView.LIST_VIEW, pageView.MODULE_VIEW]),
};
