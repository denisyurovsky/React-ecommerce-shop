import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import { Role } from '../../../ts/enums/enums';
import { usePermission } from '../usePermission';

const oneOfRoles = PropTypes.oneOf(Object.values(Role));

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
    render(<TestApp store={newStore(Role.Consumer)} roles={[Role.Consumer]} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check "admin" permission', () => {
    render(<TestApp store={newStore(Role.Admin)} roles={Role.Seller} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check "default" case', () => {
    render(<TestApp store={newStore(Role.Consumer)} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check role from array', () => {
    const roles = [Role.Seller, Role.Consumer];

    render(<TestApp store={newStore(Role.Consumer)} roles={roles} />);
    expect(screen.getByText(/test page/i)).toBeInTheDocument();
  });

  it('should check protected permission', () => {
    const Test = () => usePermission([Role.Seller]) || <p>page not found</p>;

    render(
      <Provider store={newStore(Role.Guest)}>
        <Test />
      </Provider>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
