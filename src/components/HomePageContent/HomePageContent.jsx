import React, { useState } from 'react';

import { CardArea } from './CardArea/CardArea';
import { CardsContainer } from './CardsContainer/CardsContainer';
import { SearchArea } from './SearchArea/SearchArea';

import styles from './HomePageContent.module.scss';

export const initialCards = [
  {
    image: 'url',
    name: 'name11',
    type: 'First category',
    creationDate: '000',
    updateDate: '111',
    price: '300$',
    id: 1,
  },
  {
    image: 'url',
    name: 'name1',
    type: 'First category',
    creationDate: '000',
    updateDate: '111',
    price: '300$',
    id: 2,
  },
  {
    image: 'url',
    name: 'name2',
    type: 'Second category',
    creationDate: '000',
    updateDate: '111',
    price: '300$',
    id: 3,
  },
  {
    image: 'url',
    name: 'name3',
    type: 'Third category',
    creationDate: '000',
    updateDate: '111',
    price: '300$',
    id: 4,
  },
  {
    image: 'url',
    name: 'ebyb',
    type: 'Third category',
    creationDate: '000',
    updateDate: '111',
    price: '300$',
    id: 5,
  },
];

export const HomePageContent = () => {
  const [cards, setCards] = useState(initialCards);

  return (
    <section className={styles.container}>
      <h2 data-testid="title" className={styles.header}>
        Welcome to Born2Die Market!
      </h2>
      <SearchArea setCards={setCards} initialCards={initialCards}></SearchArea>
      <CardArea>
        <CardsContainer cards={cards}></CardsContainer>
      </CardArea>
    </section>
  );
};
