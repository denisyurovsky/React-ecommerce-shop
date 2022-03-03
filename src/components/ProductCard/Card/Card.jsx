import {
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
} from '@mui/material';
import Card from '@mui/material/Card';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noImg from '../../../assets/images/noImg.png';
import { pathNames } from '../../../constants/pathNames';
import { formatDate } from '../../../helpers/formatData';
import { pageView } from '../../../pages/ProductListPage/constants/constants';
import { getRatingByProductId } from '../../../store/products/productsSlice';
import { AddToCartButton } from '../../AddToCartButton/AddToCartButton';
import AddToWishListButton from '../../AddToWishListButton/AddToWishListButton';
import { DiscountLabel } from '../../DiscountLabel/DiscountLabel';
import { ProductPrice } from '../../ProductPrice/ProductPrice';

import stylesList from './CardList.module.scss';
import stylesModule from './CardModule.module.scss';

const CardItem = ({ product, cardShape = pageView.MODULE_VIEW, isProfile }) => {
  const {
    id,
    name,
    createdAt,
    updatedAt,
    price,
    images,
    discountPrice,
    rating,
    category: { name: category },
    isAddedToWishlist,
  } = product;
  const styles = cardShape === pageView.MODULE_VIEW ? stylesModule : stylesList;
  const updatedRating = useSelector((state) => getRatingByProductId(state, id));

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.profileContainer]: isProfile,
  });

  return (
    <Card className={containerClasses}>
      <Box className={styles.imageContainer}>
        <CardMedia
          component="img"
          image={Array.isArray(images) && images.length ? images[0] : noImg}
          className={styles.image}
          alt={name}
        />
        {discountPrice && (
          <Box className={styles.discountLabel}>
            <DiscountLabel price={price} discountPrice={discountPrice} />
          </Box>
        )}
      </Box>
      <CardContent className={styles.description}>
        <Link to={`${pathNames.PRODUCTS}/${id}`} className={styles.title}>
          {name}
        </Link>
        <Typography
          className={styles.category}
          variant="subtitle2"
          color="text.secondary"
        >
          {category.toUpperCase()}
        </Typography>
        <Typography
          className={styles.date}
          variant="body2"
          color="text.secondary"
        >
          Created: {formatDate(createdAt)}
        </Typography>
        <Typography
          className={styles.date}
          variant="body2"
          color="text.secondary"
        >
          Updated: {formatDate(updatedAt)}
        </Typography>
        <Rating
          className={styles.rating}
          data-testid="total-rating"
          value={updatedRating ?? rating}
          readOnly
          precision={0.5}
        />
      </CardContent>
      <CardActions className={styles.price}>
        <ProductPrice discountPrice={discountPrice} price={price} />
        <AddToCartButton product={product} viewMode={cardShape} />
        <AddToWishListButton
          productId={id}
          productName={name}
          cardShape={cardShape}
          isAddedToWishlist={isAddedToWishlist}
        />
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    name: PropTypes.string,
    discountPrice: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    isAddedToWishlist: PropTypes.bool,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  cardShape: PropTypes.oneOf([pageView.LIST_VIEW, pageView.MODULE_VIEW]),
  isProfile: PropTypes.bool,
};

const areEqual = (prevProps, nextProps) =>
  prevProps.cardShape === nextProps.cardShape &&
  prevProps.product.isAddedToWishlist === nextProps.product.isAddedToWishlist;

export default React.memo(CardItem, areEqual);
