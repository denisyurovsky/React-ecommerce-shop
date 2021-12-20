import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register } from '../../api/user';
import {
  ERROR,
  authStatus,
  LOCK_TIMEOUT,
  MAX_LOGIN_ATTEMPTS,
} from '../../helpers/constants/authConstants';

import initialState from './initialState';

const delay = (time) =>
  new Promise((res) => {
    setTimeout(res, time);
  });

export const removeLockAfterTimeout = () => async (dispatch) => {
  const { resetBlockedState } = userSlice.actions;

  await delay(LOCK_TIMEOUT);
  dispatch(resetBlockedState());
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ password, email }) => {
    const response = await login(email, password);

    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ password, email, firstName, lastName }) => {
    const response = await register(email, password, firstName, lastName);

    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetBlockedState(state) {
      state.loginStatus = authStatus.IDLE;
      state.user.amountOfTries = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = authStatus.PENDING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = authStatus.FULFILLED;
        state.user.amountOfTries = 0;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state) => {
        state.user.amountOfTries++;

        if (state.user.amountOfTries >= MAX_LOGIN_ATTEMPTS) {
          state.loginStatus = authStatus.LOCKED;
          state.error = ERROR.LOCK;
        } else {
          state.loginStatus = authStatus.REJECTED;
          // state.error = action.error.message
          state.error = ERROR.LOGIN;
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = authStatus.PENDING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = authStatus.FULFILLED;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerStatus = authStatus.REJECTED;
        // state.error = action.error.message
        state.error = ERROR.REGISTER;
      });
  },
});

export const { resetBlockedState } = userSlice.actions;
export default userSlice.reducer;
export const getLoginState = (state) => state.user.loginStatus;
export const getRegisterState = (state) => state.user.registerStatus;
