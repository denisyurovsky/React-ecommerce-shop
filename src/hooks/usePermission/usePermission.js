import { useSelector } from 'react-redux';

import { USER_ROLE } from '../../helpers/constants/constants';

export function usePermission(role = '!guest') {
  const registredRole = useSelector((state) => state.user.user.role);

  return role === '!guest'
    ? registredRole !== USER_ROLE.GUEST
    : registredRole === role || registredRole === USER_ROLE.ADMIN;
}
