import { authStatus } from '../../constants/authConstants';
import { REQUEST_STATUS, USER_ROLE } from '../../constants/constants';
import { defaultWishlists } from '../../constants/wishlists/wishlists';

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
    addresses: [],
    role: USER_ROLE.GUEST,
    wishlists: defaultWishlists,
  },
  loginStatus: authStatus.IDLE,
  registerStatus: authStatus.IDLE,
  updateWishlistsStatus: REQUEST_STATUS.IDLE,
  loginError: '',
  registerError: '',
  isLoading: false,
  errorOccurred: false,
};
