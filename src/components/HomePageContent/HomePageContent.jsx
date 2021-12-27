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
import { Title } from '../Title/Title';

import { CardArea } from './CardArea/CardArea';
import { CardsContainer } from './CardsContainer/CardsContainer';
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
      <Title>Welcome to Born2Die Market!</Title>
      <SearchArea
        setDisplayedCards={setDisplayedCards}
        categories={categories}
        cards={cards.data}
      />
      <CardArea>
        <CardsContainer displayedCards={displayedCards} />
      </CardArea>
    </section>
  );
};
