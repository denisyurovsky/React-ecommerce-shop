import PropTypes from 'prop-types';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { USER_ROLE } from '../../constants/constants';
import { usePermission } from '../../hooks/usePermission/usePermission';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

const { ADMIN, SELLER, CONSUMER, GUEST } = USER_ROLE;
const oneOfRoles = PropTypes.oneOf([ADMIN, SELLER, CONSUMER, GUEST]);

export const ProtectedRoutes = ({ permissionLevels }) =>
  usePermission(permissionLevels) ? <Outlet /> : <NotFoundPage />;

ProtectedRoutes.propTypes = {
  permissionLevels: PropTypes.oneOfType([
    oneOfRoles,
    PropTypes.arrayOf(oneOfRoles),
  ]),
};
