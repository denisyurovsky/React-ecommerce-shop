import { authStatus } from '../../helpers/constants/authConstants';
import { REQUEST_STATUS, USER_ROLE } from '../../helpers/constants/constants';

export default {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    amountOfTries: 0,
    role: USER_ROLE.GUEST,
    wishlist: [],
  },
  loginStatus: authStatus.IDLE,
  registerStatus: authStatus.IDLE,
  updateWishlistStatus: REQUEST_STATUS.IDLE,
  loginError: '',
  registerError: '',
};
