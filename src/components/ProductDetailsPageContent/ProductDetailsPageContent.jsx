import { Typography, Box, Container, Card, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import Description from '../../helpers/Description';
import { formatDate } from '../../helpers/utils/formatData';
import { getRatingByProductId } from '../../store/products/productsSlice';
import { getWishlist } from '../../store/user/userSlice';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import AddToWishListButton from '../AddToWishListButton/AddToWishListButton';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Carousel from '../Carousel/Carousel';
import { DiscountLabel } from '../DiscountLabel/DiscountLabel';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import Avatar from '../ui-kit/Avatar/Avatar';
import Link from '../ui-kit/Link/Link';

import Feedback from './Feedback/Feedback';

import styles from './ProductDetailsPageContent.module.scss';

const ProductDetailsPageContent = ({ product }) => {
  const {
    name,
    updatedAt,
    price,
    images,
    author,
    description,
    id,
    rating,
    userId,
    discountPrice,
  } = product;
  const updatedRating = useSelector((state) => getRatingByProductId(state, id));
  const wishlist = useSelector(getWishlist);
  const isWished = (productId, wishlist) => new Set(wishlist).has(productId);
  const links = [
    { url: '/', text: 'Home' },
    { url: '/products', text: 'Products' },
    {
      url: `/products/${id}`,
      text: `${name}`,
    },
  ];

  return (
    <Container>
      <Breadcrumbs links={links} />
      <Card className={styles.card}>
        <Box className={styles.title}>
          <Box className={styles.subTitle}>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {`date: ${formatDate(updatedAt)}`}
            </Typography>
          </Box>
          <Box className={styles.price}>
            <ProductPrice price={price} discountPrice={discountPrice} />
          </Box>
        </Box>
        <Box className={styles.info}>
          <Box className={styles.images}>
            <Carousel images={images} />
            <Box className={styles.labelContainer}>
              <DiscountLabel price={price} discountPrice={discountPrice} />
            </Box>
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
              sx={{ mt: 4, mb: 2 }}
              size="large"
              readOnly
              precision={0.5}
            />
            <AddToCartButton product={product} />
            <Box className={styles.seller}>
              <Link to={`/users/${userId}`}>
                <Typography variant="body1">
                  {`${author.firstName} ${author.lastName}`}
                </Typography>

                <Avatar avatar={author.avatar} />
              </Link>
            </Box>
          </Box>
        </Box>
        <Box className={styles.description}>
          <Description contentState={description} />
        </Box>
      </Card>
      <Feedback productId={id} />
    </Container>
  );
};

ProductDetailsPageContent.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    rating: PropTypes.number,
    name: PropTypes.string,
    updatedAt: PropTypes.string,
    discountPrice: PropTypes.number,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatar: PropTypes.string,
    }),
    description: PropTypes.object,
  }).isRequired,
};

export default ProductDetailsPageContent;
