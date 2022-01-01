import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import React from 'react';

import noImg from '../../../assets/images/noImg.png';
import { formatDate } from '../../../helpers/dateUtils';
import { pageView } from '../../../pages/ProductListPage/constants/constants';

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
    category: { name: category },
  } = product;
  const styles = cardShape === pageView.MODULE_VIEW ? stylesModule : stylesList;

  return (
    <Card className={styles.container}>
      <CardMedia
        component="img"
        image={Array.isArray(images) && images.length ? images[0] : noImg}
        className={styles.image}
        alt={name}
      />
      <CardContent className={styles.description}>
        <Link
          href={`/products/${id}`}
          className={styles.title}
          gutterBottom
          variant="h6"
        >
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
      </CardContent>
      <CardActions className={styles.price}>
        <Typography variant="h5" component="p">
          {parseInt(price)} $
        </Typography>
        <Button
          className={styles.button}
          variant="contained"
          sx={{ padding: '6px 20px' }}
        >
          <span>+ ADD TO CART</span>
        </Button>
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    price: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  cardShape: PropTypes.oneOf([pageView.LIST_VIEW, pageView.MODULE_VIEW]),
};

export default CardItem;
