import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getCategories,
  selectCategories,
} from '../../store/categories/categoriesSlice';
import {
  selectProducts,
  getHomePageProducts,
} from '../../store/products/productsSlice';
import CardsContainer from '../ProductCard/CardsContainer/CardsContainer';

import { CardArea } from './CardArea/CardArea';
import { SearchArea } from './SearchArea/SearchArea';

import styles from './HomePageContent.module.scss';

export const HomePageContent = () => {
  const dispatch = useDispatch();
  const [displayedCards, setDisplayedCards] = useState([]);
  const cards = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getHomePageProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedCards(cards.data);
  }, [cards]);

  return (
    <section className={styles.container}>
      <Typography sx={{ m: '20px 0' }} variant={'h2'} className={styles.title}>
        Welcome to Born2Die Market!
      </Typography>
      <SearchArea
        setDisplayedCards={setDisplayedCards}
        categories={categories}
        cards={cards.data}
      />
      <CardArea>
        <CardsContainer
          products={displayedCards}
          isLoading={cards.isLoading}
          errorOccurred={cards.errorOccurred}
        />
      </CardArea>
    </section>
  );
};
