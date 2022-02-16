import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import { USER_ROLE } from '../../../helpers/constants/constants';
import { usePermission } from '../usePermission';

const { ADMIN, SELLER, CONSUMER, GUEST } = USER_ROLE;
const oneOfRoles = PropTypes.oneOf([ADMIN, SELLER, CONSUMER, GUEST]);

const Test = ({ roles }) => usePermission(roles) && <p>test page</p>;

Test.propTypes = {
  roles: PropTypes.oneOfType([oneOfRoles, PropTypes.arrayOf(oneOfRoles)]),
};

const TestApp = ({ store, roles }) => (
  <Provider store={store}>
    <Test role={roles} />
  </Provider>
);

TestApp.propTypes = {
  store: PropTypes.object.isRequired,
  roles: PropTypes.oneOfType([oneOfRoles, PropTypes.arrayOf(oneOfRoles)]),
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
    render(
      <TestApp
        store={newStore(USER_ROLE.CONSUMER)}
        roles={[USER_ROLE.CONSUMER]}
      />
    );
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check "admin" permission', () => {
    render(
      <TestApp store={newStore(USER_ROLE.ADMIN)} roles={USER_ROLE.SELLER} />
    );
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check "default" case', () => {
    render(<TestApp store={newStore(USER_ROLE.CONSUMER)} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check role from array', () => {
    const roles = [USER_ROLE.SELLER, USER_ROLE.CONSUMER];

    render(<TestApp store={newStore(USER_ROLE.CONSUMER)} roles={roles} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check protected permission', () => {
    const Test = () =>
      usePermission([USER_ROLE.SELLER]) || <p>page not found</p>;

    render(
      <Provider store={newStore(USER_ROLE.GUEST)}>
        <Test />
      </Provider>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
