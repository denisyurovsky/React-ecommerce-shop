import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import userReducer from '../store/user/userSlice';

const defaultStore = configureStore({ reducer: { user: userReducer } });

const render = (component, storage = defaultStore) => {
  const AllProviders = ({ children }) => (
    <Provider store={storage}>{children}</Provider>
  );

  AllProviders.propTypes = {
    children: PropTypes.node,
  };

  return rtlRender(component, { wrapper: AllProviders });
};

render.propTypes = {
  component: PropTypes.node.isRequired,
  storage: PropTypes.object,
};

export * from '@testing-library/react';
export default render;
