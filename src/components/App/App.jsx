import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export const HomePage = () => <h2>Home Page</h2>;
