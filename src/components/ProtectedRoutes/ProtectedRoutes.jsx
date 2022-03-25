import PropTypes from 'prop-types';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { usePermission } from '../../hooks/usePermission/usePermission';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Role } from '../../ts/enums/enums';

const oneOfRoles = PropTypes.oneOf([
  Role.Admin,
  Role.Consumer,
  Role.Guest,
  Role.Seller,
]);

export const ProtectedRoutes = ({ permissionLevels }) =>
  usePermission(permissionLevels) ? <Outlet /> : <NotFoundPage />;

ProtectedRoutes.propTypes = {
  permissionLevels: PropTypes.oneOfType([
    oneOfRoles,
    PropTypes.arrayOf(oneOfRoles),
  ]),
};
