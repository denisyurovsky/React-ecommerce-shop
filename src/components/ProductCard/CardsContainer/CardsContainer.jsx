import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { notificationError } from '../../../helpers/constants/constants';
import { pageView } from '../../../pages/ProductListPage/constants/constants';
import { getWishlist } from '../../../store/user/userSlice';
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
  const wishlist = useSelector(getWishlist);
  const isWished = (productId, wishlist) => new Set(wishlist).has(productId);

  useEffect(() => {
    if (errorOccurred) {
      toast.error(notificationError);
    }
  }, [errorOccurred]);

  if (isLoading) {
    return (
      <Box className={styles.wrapper}>
        <CircularProgress aria-label="Products preloader" />
      </Box>
    );
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
        <Card
          key={product.id}
          product={{
            ...product,
            isAddedToWishlist: isWished(product.id, wishlist),
          }}
          cardShape={cardShape}
        />
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
