import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardMedia, Checkbox, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import noImg from '../../../assets/images/noImg.png';
import { findProductIndexById } from '../../../helpers/utils/findProductIndexById';
import { selectCart, selectProduct } from '../../../store/cart/cartSlice';
import { AddToCartButton } from '../../AddToCartButton/AddToCartButton';
import { ProductPrice } from '../../ProductPrice/ProductPrice';

import styles from './CartProductCard.module.scss';

export const CartProductCard = ({ product, openModal, setModalProduct }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const products = cart.sellers[product.userId]
    ? cart.sellers[product.userId].products
    : [];

  const index = findProductIndexById(products, product.id);

  const checboxHandler = () => {
    dispatch(selectProduct({ product }));
  };

  const confirmationHandler = () => {
    setModalProduct(product);
    openModal();
  };

  const { images, name, price, discountPrice } = product;

  return (
    <div className={styles.cardContainer}>
      <Checkbox
        checked={products[index] ? products[index].checked : true}
        onChange={checboxHandler}
        inputProps={{ 'aria-label': 'controlled' }}
        className={styles.checkbox}
      />
      <Card className={styles.card}>
        <CardMedia
          component="img"
          image={images?.length ? images[0] : noImg}
          alt={name}
          className={styles.image}
        />
        <Typography gutterBottom className={styles.name}>
          {name}
        </Typography>
        <Box className={styles.priceContainer}>
          <ProductPrice discountPrice={discountPrice} price={price} />
        </Box>
        <AddToCartButton product={product} />
      </Card>
      <DeleteIcon
        data-testid="cartDeleteButton"
        className={styles.trashIcon}
        onClick={confirmationHandler}
      />
    </div>
  );
};

CartProductCard.propTypes = {
  product: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    discountPrice: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  openModal: PropTypes.func,
  setModalProduct: PropTypes.func,
};
