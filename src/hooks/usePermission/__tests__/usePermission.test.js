import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import { USER_ROLE } from '../../../helpers/constants/constants';
import { usePermission } from '../usePermission';

const Test = ({ role }) => usePermission(role) && <p>test page</p>;

Test.propTypes = { role: PropTypes.string };

const TestApp = ({ store, role }) => (
  <Provider store={store}>
    <Test role={role} />
  </Provider>
);

TestApp.propTypes = {
  store: PropTypes.object.isRequired,
  role: PropTypes.string,
};

const newStore = (role) =>
  configureStore({
    reducer: {
      user: createSlice({
        name: 'user',
        initialState: { user: { role: role } },
      }).reducer,
    },
  });

describe('usePermission', () => {
  it('should check the equality of roles', () => {
    const role = USER_ROLE.CONSUMER;

    render(<TestApp store={newStore(role)} role={role} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check "admin" permission', () => {
    render(
      <TestApp store={newStore(USER_ROLE.ADMIN)} role={USER_ROLE.SELLER} />
    );
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check "default" case', () => {
    render(<TestApp store={newStore(USER_ROLE.CONSUMER)} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check protected permission', () => {
    const Test = () => usePermission(USER_ROLE.SELLER) || <p>page not found</p>;

    render(
      <Provider store={newStore(USER_ROLE.GUEST)}>
        <Test />
      </Provider>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
