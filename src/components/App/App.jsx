import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Footer } from '../Layout/Footer/Footer';
import { Header } from '../Layout/Header/Header';

import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
