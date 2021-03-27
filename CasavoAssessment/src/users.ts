import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpClient } from './core';
import { User } from './types';

/**
 * TODO: 
 * - address parsing is done in a really poor way
 *    a real case would also handle missing parts and different types of address
 * - test this function by passing an mocked http client to the function as parameter
 *    I haven't done this for the sake of brevity (as well as other action creators)
 */
export const fetchUsersList = createAsyncThunk(
  'users/list',
  async () => {
    const { data } = await httpClient.get('/users');
    const users = (data || []) as any[];
    return users.map<User>(user => ({
      name: user.name,
      id: user.id,
      address: `${user.street}, ${user.suite}, ${user.city}, ${user.zipcode}`,
      phoneNumber: user.phone,
    }));
  });

type UsersList = {
  loading: boolean;
  selectedUserId: number;
  list: User[];
  rejected: boolean;
}

const { reducer, actions } = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    selectedUserId: 0,
    list: [],
    rejected: false,
  } as UsersList,
  reducers: {
    selectUser(state, action: PayloadAction<number>) {
      state.selectedUserId = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsersList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.rejected = false;
      state.list = action.payload;
    });
    builder.addCase(fetchUsersList.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.list = [];
    });
  },
});

export { reducer as usersReducer };
export const { selectUser } = actions;
