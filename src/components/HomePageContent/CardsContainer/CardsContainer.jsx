import PropTypes from 'prop-types';
import React from 'react';

import { ProductCard } from '../ProductCard/ProductCard';

import styles from './CardsContainer.module.scss';

export const CardsContainer = ({ cards }) => {
  return (
    <div className={styles.container}>
      {cards.length == 0 ? (
        <h3>There is no products to display.</h3>
      ) : (
        cards.map((card) => <ProductCard key={card.id} card={card} />)
      )}
    </div>
  );
};

CardsContainer.propTypes = {
  cards: PropTypes.array,
};
