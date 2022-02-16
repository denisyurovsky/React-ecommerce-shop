import { useSelector } from 'react-redux';

import { USER_ROLE } from '../../helpers/constants/constants';
import { getUserRole } from '../../store/user/userSlice';

const defaultRoles = [USER_ROLE.CONSUMER, USER_ROLE.SELLER, USER_ROLE.ADMIN];

export function usePermission(roles = defaultRoles) {
  const registredRole = useSelector(getUserRole);

  if (typeof roles === 'string') {
    return roles === registredRole;
  }

  return roles.some((role) => role === registredRole);
}
