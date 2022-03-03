import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { USER_ROLE } from '../../constants/constants';
import { pathNames } from '../../constants/pathNames';
import withAuthExpiration from '../../HOCs/withAuthExpiration';
import AddressBook from '../../pages/AddressBookPage/AddressBook';
import { AdminCategoriesPage } from '../../pages/AdminPages/AdminCategoriesPage/AdminCategoriesPage';
import { AdminProductsPage } from '../../pages/AdminPages/AdminProductsPage/AdminProductsPage';
import { CreateOrEditProductPage } from '../../pages/AdminPages/CreateOrEditProductPage/CreateOrEditProductPage';
import { CartPage } from '../../pages/CartPage/CartPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { OrdersPage } from '../../pages/OrdersPage/OrdersPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProfilePrivatePage from '../../pages/ProfilePrivatePage/ProfilePrivatePage';
import { WishListPage } from '../../pages/WishListPage/WishListPage';
import AuthExpirationModal from '../AuthExpirationModal/AuthExpirationModal';
import { Layout } from '../Layout/Layout';
import { ProtectedRoutes } from '../ProtectedRoutes/ProtectedRoutes';

const {
  PRODUCTS,
  PROFILE,
  ADDRESSBOOK,
  ADMIN,
  USERS,
  ORDERS,
  WISHLIST,
  CATEGORIES,
  CART,
  EDIT,
  CREATE,
} = pathNames;

const App = ({ handleClose, isOpenModal }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Layout>
      <Routes>
        <Route
          exact
          path={`${PRODUCTS}/:id`}
          element={<ProductDetailsPage />}
        />
        <Route exact path={`${PRODUCTS}`} element={<ProductListPage />} />
        <Route exact path={`${CART}`} element={<CartPage />} />
        <Route path={`${USERS}/:id`} element={<ProfilePage />} />
        <Route path={`${PROFILE}`} element={<ProfilePrivatePage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route
          element={<ProtectedRoutes permissionLevel={USER_ROLE.CONSUMER} />}
        >
          <Route
            exact
            path={`${PROFILE}${WISHLIST}`}
            element={<WishListPage />}
          />
          <Route exact path={`${PROFILE}${ORDERS}`} element={<OrdersPage />} />
        </Route>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route
            path={`${ADMIN}${PRODUCTS}${CREATE}`}
            element={<CreateOrEditProductPage />}
          />
          <Route
            path={`${ADMIN}${PRODUCTS}/:id${EDIT}`}
            element={<CreateOrEditProductPage />}
          />
        </Route>
        <Route
          path={`/`}
          element={<ProtectedRoutes permissionLevel={USER_ROLE.SELLER} />}
        >
          <Route path={`${ADMIN}${PRODUCTS}`} element={<AdminProductsPage />} />
          <Route
            path={`${ADMIN}${CATEGORIES}`}
            element={<AdminCategoriesPage />}
          />
        </Route>
        <Route path={`${PROFILE}${ADDRESSBOOK}`} element={<AddressBook />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AuthExpirationModal
        handleClose={handleClose}
        isOpenModal={isOpenModal}
      />
    </Layout>
  );
};

App.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withAuthExpiration(App);
