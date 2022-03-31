import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import addressApi from '../../api/addresses';
import { Address } from '../../ts/models/addresses.model';
import { User } from '../../ts/models/user.model';
import { RootState } from '../store';
import { updateUser } from '../user/userSlice';

import initialState from './initialState';

interface UserWithAddress {
  address: Address;
  user: User;
}
interface SomeAddresses {
  data: Address[];
}
interface SomeAddress {
  data: Address;
}

export const getAddressesByIds = createAsyncThunk(
  'addresses/getAddressesByIds',
  async (ids: number[]) => {
    const { data }: SomeAddresses = ids.length
      ? await addressApi.getAddresses(ids)
      : { data: [] };

    return data;
  }
);

export const addAddress = createAsyncThunk(
  'addresses/addAddress',
  async ({ address, user }: UserWithAddress, thunkAPI) => {
    const { data }: SomeAddress = await addressApi.add(address);

    const newUser = {
      ...user,
      addresses: [...user.addresses, data.id],
    };

    thunkAPI.dispatch(updateUser(newUser));

    return data;
  }
);

export const editAddress = createAsyncThunk(
  'addresses/editAddress',
  async (address: Address) => {
    const { data }: SomeAddress = await addressApi.edit(address);

    return data;
  }
);

export const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddressesByIds.pending, (state) => {
        state.isLoading = true;
        state.errorOccurred = false;
      })
      .addCase(getAddressesByIds.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          data: action.payload,
        };

        return newState;
      })
      .addCase(getAddressesByIds.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.errorOccurred = false;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          data: [...state.data, action.payload],
        };

        return newState;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
        state.errorOccurred = false;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        const newData = state.data.map((d) =>
          d.id === action.payload.id ? action.payload : d
        );
        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          data: newData,
        };

        return newState;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

export const selectAddresses = (state: RootState) => state.addresses;
export default addressesSlice.reducer;
