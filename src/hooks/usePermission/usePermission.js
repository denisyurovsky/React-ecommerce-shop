import { useSelector } from 'react-redux';

import { getUserRole } from '../../store/user/userSlice';
import { Role } from '../../ts/enums/enums';

const defaultRoles = [Role.Admin, Role.Seller, Role.Consumer];

export function usePermission(roles = defaultRoles) {
  const registeredRole = useSelector(getUserRole);

  if (typeof roles === 'string') {
    return roles === registeredRole;
  }

  return roles.some((role) => role === registeredRole);
}
