import { authStatus } from '../../helpers/constants/authConstants';
import { USER_ROLE } from '../../helpers/constants/constants';

export default {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    isAdmin: false,
    amountOfTries: 0,
    role: USER_ROLE.GUEST,
  },
  loginStatus: authStatus.IDLE,
  registerStatus: authStatus.IDLE,
  loginError: '',
  registerError: '',
};
