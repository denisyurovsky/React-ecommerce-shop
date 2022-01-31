import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getUser } from '../../api/user';
import { USER_ROLE } from '../../helpers/constants/constants';
import getDecodedAccessToken from '../../helpers/getDecodedAccessToken';
import { CreateOrEditProductPage } from '../../pages/AdminPages/CreateOrEditProductPage/CreateOrEditProductPage';
import { CartPage } from '../../pages/CartPage/CartPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import { WishListPage } from '../../pages/WishListPage/WishListPage';
import { setUser } from '../../store/user/userSlice';
import { Layout } from '../Layout/Layout';
import { ProtectedRoutes } from '../ProtectedRoutes/ProtectedRoutes';

export const App = () => {
  const decodedAccessToken = getDecodedAccessToken();
  const dispatch = useDispatch();
  const setUserToStore = useCallback(
    async (userId) => {
      const user = await getUser(userId);

      dispatch(setUser(user.data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (decodedAccessToken) {
      setUserToStore(decodedAccessToken.sub);
    }
  }, [decodedAccessToken, setUserToStore]);

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
