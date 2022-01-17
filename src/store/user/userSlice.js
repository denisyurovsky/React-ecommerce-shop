import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register } from '../../api/user';
import {
  ERROR,
  authStatus,
  LOCK_TIMEOUT,
  MAX_LOGIN_ATTEMPTS,
} from '../../helpers/constants/authConstants';

import initialState from './initialState';

const { LOCKED, FULFILLED, PENDING, REJECTED, IDLE } = authStatus;

export const removeLockAfterTimeout = () => (dispatch) => {
  const { resetBlockedState } = userSlice.actions;

  setTimeout(() => {
    dispatch(resetBlockedState());
  }, LOCK_TIMEOUT);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = PENDING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = FULFILLED;
        state.user.amountOfTries = 0;
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
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerStatus = REJECTED;
        state.registerError = ERROR.REGISTER;
      });
  },
});

export const { resetBlockedState, resetError } = userSlice.actions;
export default userSlice.reducer;
export const getLoginState = (state) => state.user.loginStatus;
export const getRegisterState = (state) => state.user.registerStatus;
export const getCurrentUser = (state) => state.user;
