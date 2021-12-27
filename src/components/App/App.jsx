import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import { Layout } from '../Layout/Layout';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route exact path="/products/:id" element={<ProductDetailsPage />} />
        <Route exact path="/products" element={<ProductListPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};
