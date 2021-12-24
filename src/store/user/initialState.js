import { authStatus } from '../../helpers/constants/authConstants';

export default {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    isAdmin: false,
    amountOfTries: 0,
  },
  loginStatus: authStatus.IDLE,
  registerStatus: authStatus.IDLE,
  loginError: '',
  registerError: '',
};
