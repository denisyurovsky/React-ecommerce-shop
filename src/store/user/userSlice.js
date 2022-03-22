import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register, setWishlists, updateProfile } from '../../api/user';
import {
  ERROR,
  authStatus,
  LOCK_TIMEOUT,
  MAX_LOGIN_ATTEMPTS,
} from '../../constants/authConstants';
import { UPDATE_WISHLIST_TYPE } from '../../constants/wishlists/wishlists';
import { FetchStatus } from '../../ts/enums/enums';

import {
  checkIsProductWished,
  checkWishlistsForSpecificProduct,
  changeWishlistName,
  updateWishlistsForSpecificProduct,
} from './helpers/wishlistsHelpers';
import initialState from './initialState';
const { LOCKED, FULFILLED, PENDING, REJECTED, IDLE } = authStatus;

export const removeLockAfterTimeout = () => (dispatch) => {
  const { resetBlockedState } = userSlice.actions;

  setTimeout(() => {
    dispatch(resetBlockedState());
  }, LOCK_TIMEOUT);
};

export const resetUpdateWishlistsStatusAfterTimeout = () => (dispatch) => {
  const { resetUpdateWishlistsStatus } = userSlice.actions;

  setTimeout(() => {
    dispatch(resetUpdateWishlistsStatus());
  });
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ password, email, isKeep }) => {
    const response = await login({ email, password });

    return { data: response.data, isKeep };
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, firstName, lastName }) => {
    const response = await register({ email, password, firstName, lastName });

    return response.data;
  }
);

export const updateWishlists = createAsyncThunk(
  'user/updateWishlists',
  async (action, { getState }) => {
    const { user } = getState();
    const { id: userId, wishlists } = user.user;
    let newWishlists;

    switch (action.type) {
      case UPDATE_WISHLIST_TYPE.NEW:
        newWishlists = [...wishlists, action.argument];
        break;
      case UPDATE_WISHLIST_TYPE.DELETE:
        newWishlists = wishlists.filter(
          (wishlist) => wishlist.name !== action.argument
        );
        break;
      case UPDATE_WISHLIST_TYPE.RENAME:
        newWishlists = changeWishlistName(
          action.argument.id,
          action.argument.newName,
          wishlists
        );
        break;
      case UPDATE_WISHLIST_TYPE.CHECK_PRODUCT:
        newWishlists = updateWishlistsForSpecificProduct(
          action.argument.productId,
          action.argument.wishlistName,
          wishlists
        );
        break;
      default:
        break;
    }
    const response = await setWishlists({
      currentUserId: userId,
      wishlists: newWishlists,
    });

    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (profile) => {
    const response = await updateProfile(profile);

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
    resetUpdateWishlistsStatus(state) {
      if (
        state.updateWishlistsStatus === FetchStatus.Rejected ||
        state.updateWishlistsStatus === FetchStatus.Fulfilled
      ) {
        state.updateWishlistsStatus = FetchStatus.Idle;
      }
    },
    setUser(state, action) {
      state.loginStatus = FULFILLED;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = PENDING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = FULFILLED;
        state.user.amountOfTries = 0;
        state.user.id = action.payload.data.user.id;
        if (action.payload.isKeep) {
          localStorage.setItem('accessToken', action.payload.data.accessToken);
        } else {
          sessionStorage.setItem(
            'accessToken',
            action.payload.data.accessToken
          );
        }
        state.user = {
          ...state.user,
          ...action.payload.data.user,
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
      // register
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
      // updateWishList
      .addCase(updateWishlists.pending, (state) => {
        state.updateWishlistsStatus = FetchStatus.Pending;
      })
      .addCase(updateWishlists.fulfilled, (state, action) => {
        state.updateWishlistsStatus = FetchStatus.Fulfilled;
        state.user.wishlists = action.payload.wishlists;
      })
      .addCase(updateWishlists.rejected, (state) => {
        state.updateWishlistsStatus = FetchStatus.Rejected;
      })
      // update
      .addCase(updateUser.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorOccurred: false,
          user: action.payload,
        };

        return newState;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

export const {
  resetBlockedState,
  resetError,
  resetUpdateWishlistsStatus,
  setUser,
  setLoginStatus,
} = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state) => state.user;
export const getUserRole = (state) => state.user.user.role;
export const getUserId = (state) => state.user.user.id;
export const getLoginState = (state) => state.user.loginStatus;
export const getRegisterState = (state) => state.user.registerStatus;
export const getCurrentUser = (state) => state.user;
export const getWishlists = (state) => state.user.user.wishlists;
export const getWishlistsStatus = (state) => state.user.updateWishlistsStatus;
export const getUser = (state) => state.user.user;
export const getIsWished = (state, productId) =>
  checkIsProductWished(productId, state.user.user.wishlists);
export const getCheckedWishlists = (state, productId) =>
  checkWishlistsForSpecificProduct(productId, state.user.user.wishlists);
