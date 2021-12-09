import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import categoriesReducer from '../store/categories/categoriesSlice';
import productsReducer from '../store/products/productsSlice';
import userReducer from '../store/user/userSlice';

function render(
  component,
  {
    store = configureStore({
      reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        user: userReducer,
      },
    }),
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.object,
  };

  return rtlRender(component, { wrapper: Wrapper });
}

export * from '@testing-library/react';
export default render;
