import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import addressesReducer from '../store/addresses/addressesSlice';
import cartReducer from '../store/cart/cartSlice';
import categoriesReducer from '../store/categories/categoriesSlice';
import citiesReducer from '../store/cities/citiesSlice';
import countriesReducer from '../store/countries/countriesSlice';
import feedbackReducer from '../store/feedback/feedbackSlice';
import ordersReducer from '../store/orders/ordersSlice';
import productsReducer from '../store/products/productsSlice';
import userReducer from '../store/user/userSlice';

import RouterConnected from './RouterConnected';

function render(
  component,
  preloadedState = {},
  path = '/',
  initialPaths = ['/']
) {
  const store = configureStore({
    reducer: {
      orders: ordersReducer,
      cart: cartReducer,
      products: productsReducer,
      categories: categoriesReducer,
      user: userReducer,
      feedback: feedbackReducer,
      countries: countriesReducer,
      cities: citiesReducer,
      addresses: addressesReducer,
    },
    preloadedState,
  });

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <RouterConnected
          component={children}
          path={path}
          initialPaths={initialPaths}
        />
        <ToastContainer />
      </Provider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.object,
  };

  return rtlRender(component, { wrapper: Wrapper });
}

export * from '@testing-library/react';
export default render;
