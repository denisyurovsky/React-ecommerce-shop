import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Routes } from 'react-router-dom';

import { USER_ROLE } from '../../../helpers/constants/constants';
import { ProtectedRoutes } from '../ProtectedRoutes';

const store = configureStore({
  reducer: {
    user: createSlice({
      name: 'user',
      initialState: { user: { role: USER_ROLE.SELLER } },
    }).reducer,
  },
});

const TestApp = ({ role }) => {
  const history = createMemoryHistory();

  return (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/" element={<ProtectedRoutes permissionLevel={role} />}>
            <Route path="/" element={<p>test page</p>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

TestApp.propTypes = { role: PropTypes.string };

describe('ProtectedRoute', () => {
  it('should show protected component', () => {
    render(<TestApp role={USER_ROLE.SELLER} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should show "NotFoundPage"', () => {
    render(<TestApp role={USER_ROLE.GUEST} />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
