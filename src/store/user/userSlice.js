import { createSlice } from '@reduxjs/toolkit';

import initialState from './initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      return action.payload;
    },
    signOut: () => {
      return initialState;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
