import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { notificationError } from '../../../helpers/constants/constants';
import { selectProducts } from '../../../store/products/productsSlice';
import { ProductCard } from '../ProductCard/ProductCard';

import styles from './CardsContainer.module.scss';

export const CardsContainer = ({ displayedCards }) => {
  const cards = useSelector(selectProducts);

  useEffect(() => {
    if (cards.errorOccurred) {
      toast.error(notificationError);
    }
  }, [cards.errorOccurred]);

  return (
    <div className={styles.container}>
      {cards.isLoading ? (
        <CircularProgress />
      ) : displayedCards.length == 0 ? (
        <h3>There is no products to display.</h3>
      ) : (
        displayedCards.map((card) => <ProductCard key={card.id} card={card} />)
      )}
    </div>
  );
};

CardsContainer.propTypes = {
  displayedCards: PropTypes.array,
};
