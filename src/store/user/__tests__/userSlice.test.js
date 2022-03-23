import { REQUEST_STATUS } from '../../../constants/constants';
import {
  initialWishlistsDto,
  wishlistsDto,
} from '../../../test-utils/dto/wishlistsDto';
import reducer, {
  resetBlockedState,
  resetError,
  resetUpdateWishlistsStatus,
  updateWishlists,
} from '../userSlice';

const defaultState = {
  loginStatus: 'idle',
  user: {
    amountOfTries: 0,
  },
};

it('should reset locked state', () => {
  const previousState = {
    loginStatus: 'locked',
    user: {
      amountOfTries: 5,
    },
  };
  const newState = reducer(previousState, resetBlockedState());

  expect(newState).toEqual(defaultState);
});

it('should reset error state', () => {
  const previousState = {
    loginStatus: 'failure',
    user: {
      amountOfTries: 3,
    },
  };
  const newState = reducer(previousState, resetError());

  expect(newState).toEqual({
    loginStatus: 'idle',
    registerStatus: 'idle',
    user: {
      amountOfTries: 3,
    },
  });
});

const previousStateWishList = {
  updateWishlistsStatus: REQUEST_STATUS.IDLE,
  user: {
    wishlists: initialWishlistsDto,
  },
};

const expectedStateWishList = {
  updateWishlistsStatus: REQUEST_STATUS.FULFILLED,
  user: {
    wishlists: wishlistsDto,
  },
};

it('update wishlists request is load', () => {
  const newState = reducer(
    previousStateWishList,
    updateWishlists.pending({ wishlists: wishlistsDto })
  );

  expect(newState.updateWishlistsStatus).toEqual(REQUEST_STATUS.PENDING);
});

it('update wishlist request is success', () => {
  const newState = reducer(
    previousStateWishList,
    updateWishlists.fulfilled({ wishlists: wishlistsDto })
  );

  expect(newState).toEqual(expectedStateWishList);
});

it('update wishlists request is failure', () => {
  const newState = reducer(
    previousStateWishList,
    updateWishlists.rejected({ wishlists: wishlistsDto })
  );

  expect(newState.updateWishlistsStatus).toEqual(REQUEST_STATUS.REJECTED);
});

it('should reset update wishlists status', () => {
  const previousStateWishList = {
    updateWishlistsStatus: REQUEST_STATUS.FULFILLED,
  };
  const newState = reducer(previousStateWishList, resetUpdateWishlistsStatus());

  expect(newState.updateWishlistsStatus).toEqual(REQUEST_STATUS.IDLE);
});
