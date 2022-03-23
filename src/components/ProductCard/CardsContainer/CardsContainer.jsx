import { Typography } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { notificationError } from '../../../constants/constants';
import { pageView } from '../../../pages/ProductListPage/constants/constants';
import {
  resetUpdateWishlistsStatusAfterTimeout,
  getWishlistsStatus,
} from '../../../store/user/userSlice';
import Spinner from '../../ui-kit/Spinner/Spinner';
import Card from '../Card/Card';

import styles from './CardsContainer.module.scss';

export default function CardsContainer({
  products,
  isLoading,
  cardShape = pageView.MODULE_VIEW,
  errorOccurred,
}) {
  const classes = classNames({
    [styles.container]: true,
    [styles.column]: cardShape === pageView.LIST_VIEW,
    [styles.row]: cardShape === pageView.MODULE_VIEW,
  });
  const wishlistsStatus = useSelector(getWishlistsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUpdateWishlistsStatusAfterTimeout());
  }, [wishlistsStatus, dispatch]);

  useEffect(() => {
    if (errorOccurred) {
      toast.error(notificationError);
    }
  }, [errorOccurred]);

  if (isLoading) {
    return <Spinner label="Products preloader" />;
  }
  if (!products || products.length === 0)
    return (
      <Typography variant="h4" className={styles.title}>
        There are no products
      </Typography>
    );

  return (
    <div className={classes}>
      {products.map((product) => (
        <Card key={product.id} product={product} cardShape={cardShape} />
      ))}
    </div>
  );
}

CardsContainer.propTypes = {
  isLoading: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  errors: PropTypes.array,
  products: PropTypes.array,
  cardShape: PropTypes.oneOf([pageView.LIST_VIEW, pageView.MODULE_VIEW]),
};
