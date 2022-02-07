import {
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from '@mui/material';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noImg from '../../../assets/images/noImg.png';
import { formatDate } from '../../../helpers/utils/formatData';
import { pageView } from '../../../pages/ProductListPage/constants/constants';
import { getRatingByProductId } from '../../../store/products/productsSlice';
import { AddToCartButton } from '../../AddToCartButton/AddToCartButton';
import AddToWishListButton from '../../AddToWishListButton/AddToWishListButton';

import stylesList from './CardList.module.scss';
import stylesModule from './CardModule.module.scss';

const CardItem = ({ product, cardShape = pageView.MODULE_VIEW }) => {
  const {
    id,
    name,
    createdAt,
    updatedAt,
    price,
    images,
    rating,
    category: { name: category },
    isAddedToWishlist,
  } = product;
  const styles = cardShape === pageView.MODULE_VIEW ? stylesModule : stylesList;

  const updatedRating = useSelector((state) => getRatingByProductId(state, id));

  return (
    <Card className={styles.container}>
      <AddToWishListButton
        productId={id}
        productName={name}
        cardShape={cardShape}
        isAddedToWishlist={isAddedToWishlist}
      />
      <CardMedia
        component="img"
        image={Array.isArray(images) && images.length ? images[0] : noImg}
        className={styles.image}
        alt={name}
      />
      <CardContent className={styles.description}>
        <Link to={`/products/${id}`} className={styles.title}>
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
        <Typography variant="h5" component="p">
          {parseInt(price)} $
        </Typography>
        <AddToCartButton product={product} viewMode={cardShape} />
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    name: PropTypes.string,
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
};

const areEqual = (prevProps, nextProps) =>
  prevProps.cardShape === nextProps.cardShape &&
  prevProps.product.isAddedToWishlist === nextProps.product.isAddedToWishlist;

export default React.memo(CardItem, areEqual);
