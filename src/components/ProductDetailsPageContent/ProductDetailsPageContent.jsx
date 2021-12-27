import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { formatDate, formatPrice } from '../../helpers/utils/formatData';
import Carousel from '../Carousel/Carousel';

import styles from './ProductDetailsPageContent.module.scss';

const ProductDetailsPageContent = ({ product }) => {
  const { name, updatedAt, price, images, author, description } = product;

  return (
    <div className={styles.container}>
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
      </Box>
      <Box className={styles.buy}>
        <Button variant="contained">+ ADD TO CART</Button>
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
    </div>
  );
};

ProductDetailsPageContent.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    updatedAt: PropTypes.string,
    price: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    description: PropTypes.string,
  }).isRequired,
};

export default ProductDetailsPageContent;
