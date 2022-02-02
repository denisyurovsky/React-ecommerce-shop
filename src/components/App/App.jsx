import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getUser } from '../../api/user';
import { authStatus } from '../../helpers/constants/authConstants';
import { USER_ROLE } from '../../helpers/constants/constants';
import getDecodedAccessToken from '../../helpers/getDecodedAccessToken';
import { CreateOrEditProductPage } from '../../pages/AdminPages/CreateOrEditProductPage/CreateOrEditProductPage';
import { CartPage } from '../../pages/CartPage/CartPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProfilePrivatePage from '../../pages/ProfilePrivatePage/ProfilePrivatePage';
import { WishListPage } from '../../pages/WishListPage/WishListPage';
import { setUser, getLoginState } from '../../store/user/userSlice';
import { Layout } from '../Layout/Layout';
import { ProtectedRoutes } from '../ProtectedRoutes/ProtectedRoutes';
import Spinner from '../ui-kit/Spinner';

export const App = () => {
  const loginStatus = useSelector(getLoginState);
  const decodedAccessToken = getDecodedAccessToken();
  const isMustBeLogged =
    loginStatus === authStatus.FULFILLED || !decodedAccessToken;
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

  if (!isMustBeLogged) {
    return <Spinner height="100vh" />;
  }

  return (
    <Layout>
      <Routes>
        <Route exact path="/products/:id" element={<ProductDetailsPage />} />
        <Route exact path="/products" element={<ProductListPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route path="/users/:id" element={<ProfilePage />} />
        <Route path="/profile" element={<ProfilePrivatePage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route
          element={<ProtectedRoutes permissionLevel={USER_ROLE.CONSUMER} />}
        >
          <Route exact path="/profile/wishlist" element={<WishListPage />} />
        </Route>
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
