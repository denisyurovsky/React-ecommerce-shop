import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register, setWishlist } from '../../api/user';
import {
  ERROR,
  authStatus,
  LOCK_TIMEOUT,
  MAX_LOGIN_ATTEMPTS,
} from '../../helpers/constants/authConstants';
import { REQUEST_STATUS } from '../../helpers/constants/constants';

import initialState from './initialState';
const { LOCKED, FULFILLED, PENDING, REJECTED, IDLE } = authStatus;

export const removeLockAfterTimeout = () => (dispatch) => {
  const { resetBlockedState } = userSlice.actions;

  setTimeout(() => {
    dispatch(resetBlockedState());
  }, LOCK_TIMEOUT);
};

export const resetUpdateWishlistStatusAfterTimeout = () => (dispatch) => {
  const { resetUpdateWishlistStatus } = userSlice.actions;

  setTimeout(() => {
    dispatch(resetUpdateWishlistStatus());
  });
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ password, email }) => {
    const response = await login({ email, password });

    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, firstName, lastName }) => {
    const response = await register({ email, password, firstName, lastName });

    return response.data;
  }
);

export const updateWishList = createAsyncThunk(
  'user/updateWishList',
  async (productId, { getState }) => {
    const { user } = getState();
    const { id: userId, wishlist } = user.user;
    const wishlistSet = new Set(wishlist);

    wishlistSet.has(productId)
      ? wishlistSet.delete(productId)
      : wishlistSet.add(productId);

    const response = await setWishlist({
      currentUserId: userId,
      wishlist: Array.from(wishlistSet),
    });

    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetBlockedState(state) {
      state.loginStatus = IDLE;
      state.user.amountOfTries = 0;
    },
    resetError(state) {
      if (state.loginStatus === REJECTED || state.registerStatus === REJECTED) {
        state.loginStatus = IDLE;
        state.registerStatus = IDLE;
      }
    },
    resetUpdateWishlistStatus(state) {
      if (
        state.updateWishlistStatus === REQUEST_STATUS.REJECTED ||
        state.updateWishlistStatus === REQUEST_STATUS.FULFILLED
      ) {
        state.updateWishlistStatus = REQUEST_STATUS.IDLE;
      }
    },
    setUser(state, action) {
      state.loginStatus = FULFILLED;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = PENDING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = FULFILLED;
        state.user.amountOfTries = 0;
        state.user.id = action.payload.user.id;
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
      })
      .addCase(loginUser.rejected, (state) => {
        state.user.amountOfTries++;

        if (state.user.amountOfTries >= MAX_LOGIN_ATTEMPTS) {
          state.loginStatus = LOCKED;
          state.loginError = ERROR.LOCK;
        } else {
          state.loginStatus = REJECTED;
          state.loginError = ERROR.LOGIN;
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = PENDING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = FULFILLED;
        state.user.id = action.payload.user.id;
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerStatus = REJECTED;
        state.registerError = ERROR.REGISTER;
      })
      .addCase(updateWishList.pending, (state) => {
        state.updateWishlistStatus = REQUEST_STATUS.PENDING;
      })
      .addCase(updateWishList.fulfilled, (state, action) => {
        state.updateWishlistStatus = REQUEST_STATUS.FULFILLED;
        state.user.wishlist = action.payload.wishlist;
      })
      .addCase(updateWishList.rejected, (state) => {
        state.updateWishlistStatus = REQUEST_STATUS.REJECTED;
      });
  },
});

export const {
  resetBlockedState,
  resetError,
  resetUpdateWishlistStatus,
  setUser,
} = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state) => state.user;
export const getLoginState = (state) => state.user.loginStatus;
export const getRegisterState = (state) => state.user.registerStatus;
export const getCurrentUser = (state) => state.user;
export const getWishlist = (state) => state.user.user.wishlist;
export const getWishlistStatus = (state) => state.user.updateWishlistStatus;
