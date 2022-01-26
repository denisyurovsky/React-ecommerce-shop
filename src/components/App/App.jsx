import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { USER_ROLE } from '../../helpers/constants/constants';
import { CreateOrEditProductPage } from '../../pages/AdminPages/CreateOrEditProductPage/CreateOrEditProductPage';
import { CartPage } from '../../pages/CartPage/CartPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import { WishListPage } from '../../pages/WishListPage/WishListPage';
import { Layout } from '../Layout/Layout';
import { ProtectedRoutes } from '../ProtectedRoutes/ProtectedRoutes';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route exact path="/products/:id" element={<ProductDetailsPage />} />
        <Route exact path="/products" element={<ProductListPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route
          element={<ProtectedRoutes permissionLevel={USER_ROLE.CONSUMER} />}
        >
          <Route exact path="/profile/wishlist" element={<WishListPage />} />
        </Route>
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
