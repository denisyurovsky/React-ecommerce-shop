import PropTypes from 'prop-types';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { USER_ROLE } from '../../helpers/constants/constants';
import withAuthExpiration from '../../HOCs/withAuthExpiration';
import AddressBook from '../../pages/AddressBookPage/AddressBook';
import { AdminCategoriesPage } from '../../pages/AdminPages/AdminCategoriesPage/AdminCategoriesPage';
import { AdminProductsPage } from '../../pages/AdminPages/AdminProductsPage/AdminProductsPage';
import { CreateOrEditProductPage } from '../../pages/AdminPages/CreateOrEditProductPage/CreateOrEditProductPage';
import { CartPage } from '../../pages/CartPage/CartPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProfilePrivatePage from '../../pages/ProfilePrivatePage/ProfilePrivatePage';
import { WishListPage } from '../../pages/WishListPage/WishListPage';
import AuthExpirationModal from '../AuthExpirationModal/AuthExpirationModal';
import { Layout } from '../Layout/Layout';
import { ProtectedRoutes } from '../ProtectedRoutes/ProtectedRoutes';

const App = ({ handleClose, isOpenModal }) => (
  <Layout>
    <Routes>
      <Route exact path="/products/:id" element={<ProductDetailsPage />} />
      <Route exact path="/products" element={<ProductListPage />} />
      <Route exact path="/cart" element={<CartPage />} />
      <Route path="/users/:id" element={<ProfilePage />} />
      <Route path="/profile" element={<ProfilePrivatePage />} />
      <Route exact path="/" element={<HomePage />} />
      <Route element={<ProtectedRoutes permissionLevel={USER_ROLE.CONSUMER} />}>
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
      <Route
        path="/admin"
        element={<ProtectedRoutes permissionLevel={USER_ROLE.SELLER} />}
      >
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
      </Route>
      <Route path="/profile/address-book" element={<AddressBook />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <AuthExpirationModal handleClose={handleClose} isOpenModal={isOpenModal} />
  </Layout>
);

App.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withAuthExpiration(App);
