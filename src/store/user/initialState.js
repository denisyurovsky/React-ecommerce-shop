import { authStatus } from '../../constants/authConstants';
import { defaultWishlists } from '../../constants/wishlists/wishlists';
import { FetchStatus, Role } from '../../ts/enums/enums';

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
    role: Role.Guest,
    wishlists: defaultWishlists,
  },
  loginStatus: authStatus.IDLE,
  registerStatus: authStatus.IDLE,
  updateWishlistsStatus: FetchStatus.Idle,
  loginError: '',
  registerError: '',
  isLoading: false,
  errorOccurred: false,
};
