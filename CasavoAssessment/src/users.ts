import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import haversine from 'haversine';
import { httpClient } from './core';
import { fetchUserPosition } from './gps';
import { Coordinates, User } from './types';

/**
 * TODO: 
 * - there's should a typing for data received from the backend and I/O validation,
 *  like `io-ts`
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
    return users.map<User>(user => {
      const { street, suite, city, zipcode, geo } = user.address;
      return {
        name: user.name,
        id: user.id,
        address: `${street}, ${suite}, ${city}, ${zipcode}`,
        phoneNumber: user.phone,
        location: {
          longitude: geo.lng,
          latitude: geo.lat,
        },
        distance: null,
      };
    });
  });

type UsersList = {
  loading: boolean;
  selectedUserId: number | null;
  list: User[];
  rejected: boolean;
  userPosition: Coordinates | null;
}

function addDistanceAndOrderUsers(users: User[], userPosition: Coordinates): User[] {
  return users.map(user => ({
      ...user,
      distance: haversine({
        latitude: userPosition.latitude, longitude: userPosition.longitude,
      }, {
        latitude: user.location.latitude,
        longitude: user.location.longitude,
      }),
  })).sort((a, b) => (a.distance as number) - (b.distance as number));
}

const { reducer, actions } = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    selectedUserId: null,
    list: [],
    rejected: false,
    userPosition: null,
  } as UsersList,
  reducers: {
    selectUser(state, action: PayloadAction<number>) {
      state.selectedUserId = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsersList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.rejected = false;
      state.list = state.userPosition
        ? addDistanceAndOrderUsers(action.payload, state.userPosition)
        : action.payload;
    });
    builder.addCase(fetchUsersList.rejected, (state) => {
      state.loading = false;
      state.rejected = true;
      state.list = [];
    });
    builder.addCase(fetchUserPosition.fulfilled, (state, action) => {
      state.userPosition = action.payload;
      state.list = addDistanceAndOrderUsers(state.list, state.userPosition);
    });
  },
});

export { reducer as usersReducer };
export const { selectUser } = actions;
