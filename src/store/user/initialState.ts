import { authStatus } from '../../constants/authConstants';
import { defaultWishlists } from '../../constants/wishlists/wishlists';
import { FetchStatus, Role } from '../../ts/enums/enums';
import { Wishlist } from '../../ts/models/wishlist.model';

export default {
  user: {
    id: null as number | null,
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: null as Date | null,
    email: '',
    avatar: '' as string,
    amountOfTries: 0,
    addresses: [1],
    role: Role.Guest,
    wishlists: defaultWishlists as Wishlist[],
  },
  loginStatus: authStatus.IDLE,
  registerStatus: authStatus.IDLE,
  updateWishlistsStatus: FetchStatus.Idle,
  loginError: '',
  registerError: '',
  isLoading: false,
  errorOccurred: false,
};
