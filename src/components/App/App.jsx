import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { CreateOrEditProductPage } from '../../pages/AdminPages/CreateOrEditProductPage/CreateOrEditProductPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import { Layout } from '../Layout/Layout';
import { ProtectedRoutes } from '../ProtectedRoutes/ProtectedRoutes';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route exact path="/products/:id" element={<ProductDetailsPage />} />
        <Route exact path="/products" element={<ProductListPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route
            path="/admin/products/create"
            element={<CreateOrEditProductPage />}
          />
          <Route
            path="/admin/products/:id/edit"
            element={<CreateOrEditProductPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};
