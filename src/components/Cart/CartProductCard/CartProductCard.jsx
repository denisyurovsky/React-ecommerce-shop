import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardMedia, Checkbox, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import noImg from '../../../assets/images/noImg.png';
import { findProductIndexById } from '../../../helpers/utils/findProductIndexById';
import { formatPrice } from '../../../helpers/utils/formatData';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { selectCart, selectProduct } from '../../../store/cart/cartSlice';
import { AddToCartButton } from '../../AddToCartButton/AddToCartButton';

import styles from './CartProductCard.module.scss';

export const CartProductCard = ({ product, openModal, setModalProduct }) => {
  const size = useWindowSize();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const index = findProductIndexById(cart.products, product.id);
  const checboxHandler = () => {
    dispatch(selectProduct({ product }));
  };
  const { image = noImg, name, price } = product;

  return (
    <div className={styles.cardContainer}>
      <Checkbox
        checked={cart.products[index] ? cart.products[index].checked : true}
        onChange={checboxHandler}
        inputProps={{ 'aria-label': 'controlled' }}
        className={styles.checkbox}
      />
      <Card className={styles.card}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          className={styles.image}
        />
        <Typography gutterBottom className={styles.name}>
          {name}
        </Typography>
        <Typography variant="h5" component="p" className={styles.price}>
          {formatPrice(price)}
        </Typography>
        <AddToCartButton product={product} />
        {size.width > 500 && (
          <DeleteIcon
            data-testid="cartDeleteButton"
            className={styles.trashIcon}
            onClick={() => {
              setModalProduct(product);
              openModal();
            }}
          />
        )}
      </Card>
      {size.width < 500 && (
        <DeleteIcon
          data-testid="cartDeleteButton"
          className={styles.trashIcon}
          onClick={() => {
            setModalProduct(product);
            openModal();
          }}
        />
      )}
    </div>
  );
};

CartProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
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