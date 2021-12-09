import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { indigo } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './ProductCard.module.scss';

export const ProductCard = ({ card }) => {
  const { image, name, creationDate, updateDate, price, type } = card;

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        image={image}
        alt={name}
        className={styles.cardImage}
      />
      <CardContent>
        <Typography color={indigo[500]} gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography variant="overline">{type}</Typography>
        <Typography variant="body2" color="text.secondary">
          Created:{creationDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated: {updateDate}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Typography variant="h5" component="p">
          {price}
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
    image: PropTypes.string,
    name: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    price: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
