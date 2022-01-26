import PersonIcon from '@mui/icons-material/Person';
import {
  IconButton,
  Typography,
  Box,
  Button,
  Container,
  Card,
  Rating,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { formatDate, formatPrice } from '../../helpers/utils/formatData';
import { getRatingByProductId } from '../../store/products/productsSlice';
import { getWishlist } from '../../store/user/userSlice';
import AddToWishListButton from '../AddToWishListButton/AddToWishListButton';
import Carousel from '../Carousel/Carousel';

import Feedback from './Feedback/Feedback';

import styles from './ProductDetailsPageContent.module.scss';

const ProductDetailsPageContent = ({ product }) => {
  const { name, updatedAt, price, images, author, description, id, rating } =
    product;
  const updatedRating = useSelector((state) => getRatingByProductId(state, id));
  const wishlist = useSelector(getWishlist);
  const isWished = (productId, wishlist) => new Set(wishlist).has(productId);

  return (
    <Container>
      <Card className={styles.card}>
        <Box className={styles.title}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {`date: ${formatDate(updatedAt)}`}
          </Typography>
        </Box>
        <Typography variant="h4" className={styles.price}>
          {formatPrice(price)}
        </Typography>
        <Box className={styles.images}>
          <Carousel images={images} />
          <AddToWishListButton
            productId={id}
            productName={name}
            isAddedToWishlist={isWished(id, wishlist)}
          />
        </Box>
        <Box className={styles.buy}>
          <Rating
            data-testid="total-rating"
            value={updatedRating ?? rating}
            sx={{ mt: 4 }}
            size="large"
            readOnly
            precision={0.5}
          />
          <Button variant="contained" sx={{ mt: 3, mb: 4 }}>
            + ADD TO CART
          </Button>
          <Box className={styles.seller}>
            <Typography variant="body1">
              {`${author.firstName} ${author.lastName}`}
            </Typography>
            <IconButton className={styles.personIcon}>
              <PersonIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={styles.description}>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Card>
      <Feedback productId={id} />
    </Container>
  );
};

ProductDetailsPageContent.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number,
    name: PropTypes.string,
    updatedAt: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    description: PropTypes.string,
  }).isRequired,
};

export default ProductDetailsPageContent;
