import { authStatus } from '../../helpers/constants/authConstants';
import { REQUEST_STATUS, USER_ROLE } from '../../helpers/constants/constants';

export default {
  user: {
    id: null,
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: null,
    email: '',
    avatar: '',
    amountOfTries: 0,
    role: USER_ROLE.GUEST,
    wishlist: [],
  },
  loginStatus: authStatus.IDLE,
  registerStatus: authStatus.IDLE,
  updateWishlistStatus: REQUEST_STATUS.IDLE,
  loginError: '',
  registerError: '',
  isLoading: false,
  errorOccurred: false,
};
