import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { formatPrice } from '../../helpers/utils/formatData';

import styles from './ProductPrice.module.scss';

export const ProductPrice = ({ discountPrice, price }) => {
  return (
    <>
      {discountPrice ? (
        <>
          <Typography
            variant="h5"
            component="p"
            className={styles.discountPrice}
          >
            {formatPrice(discountPrice)}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            className={styles.crossedPrice}
          >
            {formatPrice(price)}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" component="p">
          {formatPrice(price)}
        </Typography>
      )}
    </>
  );
};

ProductPrice.propTypes = {
  discountPrice: PropTypes.number,
  price: PropTypes.number,
};
