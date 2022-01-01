import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import noImg from '../../../assets/images/noImg.png';
import { formatDate } from '../../../helpers/dateUtils';

import styles from './ProductCard.module.scss';

export const ProductCard = ({ card }) => {
  const {
    name,
    image = noImg,
    createdAt,
    updatedAt,
    price,
    category: { name: type },
  } = card;

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        image={image}
        alt={name}
        className={styles.cardImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" className={styles.name}>
          {name}
        </Typography>
        <Typography variant="overline">{type}</Typography>
        <Typography variant="body2" color="text.secondary">
          Created: {formatDate(createdAt)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated: {formatDate(updatedAt)}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Typography variant="h5" component="p">
          {Number(price).toFixed()} $
        </Typography>
        <Button variant="contained" className={styles.button}>
          + add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  card: PropTypes.shape({
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    author: PropTypes.shape({
      firstName: PropTypes.string,
      id: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
};
