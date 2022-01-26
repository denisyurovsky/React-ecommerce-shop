import { REQUEST_STATUS } from '../../../helpers/constants/constants';
import reducer, {
  resetBlockedState,
  resetError,
  resetUpdateWishlistStatus,
  updateWishList,
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
  updateWishlistStatus: REQUEST_STATUS.IDLE,
  user: {
    wishlist: [0],
  },
};

const expectedStateWishList = {
  updateWishlistStatus: REQUEST_STATUS.FULFILLED,
  user: {
    wishlist: [3],
  },
};

it('update wishlist reques is load', () => {
  const newState = reducer(
    previousStateWishList,
    updateWishList.pending({ wishlist: [3] })
  );

  expect(newState.updateWishlistStatus).toEqual(REQUEST_STATUS.PENDING);
});

it('update wishlist reques is success', () => {
  const newState = reducer(
    previousStateWishList,
    updateWishList.fulfilled({ wishlist: [3] })
  );

  expect(newState).toEqual(expectedStateWishList);
});

it('update wishlist reques is failure', () => {
  const newState = reducer(
    previousStateWishList,
    updateWishList.rejected({ wishlist: [3] })
  );

  expect(newState.updateWishlistStatus).toEqual(REQUEST_STATUS.REJECTED);
});

it('should reset updatewishlist status', () => {
  const previousStateWishList = {
    updateWishlistStatus: REQUEST_STATUS.FULFILLED,
  };
  const newState = reducer(previousStateWishList, resetUpdateWishlistStatus());

  expect(newState.updateWishlistStatus).toEqual(REQUEST_STATUS.IDLE);
});
