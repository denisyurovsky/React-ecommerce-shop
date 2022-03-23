import { useSelector } from 'react-redux';

import { USER_ROLE } from '../../constants/constants';
import { getUserRole } from '../../store/user/userSlice';

const defaultRoles = [USER_ROLE.CONSUMER, USER_ROLE.SELLER, USER_ROLE.ADMIN];

export function usePermission(roles = defaultRoles) {
  const registeredRole = useSelector(getUserRole);

  if (typeof roles === 'string') {
    return roles === registeredRole;
  }

  return roles.some((role) => role === registeredRole);
}
