import { Card, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

import noImg from '../../../assets/images/noImg.png';

import styles from './OrderCard.module.scss';

const OrderCard = ({ images, name, price, discountPrice, quantity }) => {
  return (
    <Card data-cy="orderCard" className={styles.card}>
      <CardMedia
        component="img"
        image={images.length ? images[0] : noImg}
        alt={name}
        className={styles.image}
      />
      <Typography gutterBottom className={styles.name}>
        {name}
      </Typography>
      <Box className={styles.priceContainer}>
        <Typography>qty: {quantity}</Typography>
        <Typography>{discountPrice && <s>{price} $</s>}</Typography>
        <Typography>{discountPrice ? discountPrice : price} $</Typography>
      </Box>
    </Card>
  );
};

OrderCard.propTypes = {
  images: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  discountPrice: PropTypes.number,
};

export default OrderCard;
