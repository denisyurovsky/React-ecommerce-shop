import PropTypes from 'prop-types';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { usePermission } from '../../hooks/usePermission/usePermission';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

export const ProtectedRoutes = ({ permissionLevel }) =>
  usePermission(permissionLevel) ? <Outlet /> : <NotFoundPage />;

ProtectedRoutes.propTypes = {
  permissionLevel: PropTypes.string,
};

ProtectedRoutes.defaultProps = {
  permissionLevel: '!guest',
};
