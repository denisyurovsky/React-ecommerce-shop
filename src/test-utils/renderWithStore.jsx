import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import cartReducer from '../store/cart/cartSlice';
import categoriesReducer from '../store/categories/categoriesSlice';
import feedbackReducer from '../store/feedback/feedbackSlice';
import productsReducer from '../store/products/productsSlice';
import userReducer from '../store/user/userSlice';

function render(component, { role = null, store } = {}) {
  let preloadedState;

  if (!store) {
    preloadedState = role
      ? {
          user: {
            user: {
              id: 5,
              role,
            },
          },
        }
      : {};
  }

  const storeWithState = store
    ? store
    : configureStore({
        reducer: {
          cart: cartReducer,
          products: productsReducer,
          categories: categoriesReducer,
          user: userReducer,
          feedback: feedbackReducer,
        },
        preloadedState,
      });

  function Wrapper({ children }) {
    return (
      <Provider store={storeWithState}>
        {children}
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
