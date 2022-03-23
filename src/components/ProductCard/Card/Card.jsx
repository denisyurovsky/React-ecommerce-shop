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

import noImg from '../../../assets/images/noImg.png';
import { pathNames } from '../../../constants/pathNames';
import { formatDate } from '../../../helpers/formatData';
import { pageView } from '../../../pages/ProductListPage/constants/constants';
import { getRatingByProductId } from '../../../store/products/productsSlice';
import { AddToCartButton } from '../../AddToCartButton/AddToCartButton';
import AddToWishListButton from '../../AddToWishListButton/AddToWishListButton';
import { DiscountLabel } from '../../DiscountLabel/DiscountLabel';
import { ProductPrice } from '../../ProductPrice/ProductPrice';
import Link from '../../ui-kit/Link/Link';

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
  } = product;
  const styles = cardShape === pageView.MODULE_VIEW ? stylesModule : stylesList;
  const updatedRating = useSelector((state) => getRatingByProductId(state, id));
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.profileContainer]: isProfile,
  });

  return (
    <Card className={containerClasses}>
      <CardActions className={styles.price}>
        <AddToWishListButton
          productId={id}
          productName={name}
          cardShape={cardShape}
        />
      </CardActions>
      <Link to={`${pathNames.PRODUCTS}/${id}`}>
        <div className={styles.link}>
          <Box className={styles.imageContainer}>
            <CardMedia
              component="img"
              image={Array.isArray(images) && images.length ? images[0] : noImg}
              className={styles.image}
              alt={name}
            />
            <Box className={styles.discountLabel}>
              <DiscountLabel price={price} discountPrice={discountPrice} />
            </Box>
          </Box>
          <CardContent className={styles.description}>
            <div className={styles.title}>{name}</div>
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
          </CardActions>
        </div>
      </Link>
      <CardActions className={styles.addButton}>
        <AddToCartButton
          product={product}
          viewMode={cardShape}
          productName={name}
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
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  cardShape: PropTypes.oneOf([pageView.LIST_VIEW, pageView.MODULE_VIEW]),
  isProfile: PropTypes.bool,
};

const areEqual = (prevProps, nextProps) =>
  prevProps.cardShape === nextProps.cardShape;

export default React.memo(CardItem, areEqual);
