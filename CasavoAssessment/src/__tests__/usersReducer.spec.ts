import { fetchUserPosition } from '../gps';
import { fetchUsersList, selectUser, usersReducer } from '../users';
import { mockUsersList } from '../__fixtures__/users';

describe('Given a usersReducer', () => {
  const subject = usersReducer;

  describe('when retrieving the list of users', () => {
    it('should set a loading state', () => {
      const state = subject(undefined, fetchUsersList.pending('', undefined));

      expect(state.loading).toBe(true);
    });
  });

  describe('when the list of users is retrieved', () => {
    it('should save it', () => {
      const state = subject(undefined, fetchUsersList.fulfilled(mockUsersList, ''));

      expect(state.loading).toBe(false);
      expect(state.list).toEqual(mockUsersList);
    });

    describe('when the current user location is known', () => {
      /**
       * a lot of other tests should be added here,
       * like ensuring that nothing happens is the location is acquired
       * but no users list has been loaded yet
       */
      it('should set the distance of every user', () => {
        const state = subject({
          list: mockUsersList,
          loading: false,
          rejected: false,
          selectedUserId: null,
          userPosition: null,
        }, fetchUserPosition.fulfilled({
          latitude: 40,
          longitude: 50,
        }, ''));

        const distances = state.list.map(user => user.distance).filter(Boolean);
        expect(distances).toHaveLength(2);
      });
      it('should order the users by distance', () => {
        const state = subject({
          list: mockUsersList,
          loading: false,
          rejected: false,
          selectedUserId: null,
          userPosition: null,
        }, fetchUserPosition.fulfilled({
          latitude: 40,
          longitude: 50,
        }, ''));

        expect(state.list[0].id).toBe(2);
        expect(state.list[1].id).toBe(1);
      });
    });
  });

  describe('when the user current location is acquired before the list of users', () => {
    it('should order the users list by distance', () => {
      const state = subject({
        list: [],
        loading: false,
        rejected: false,
        selectedUserId: null,
        userPosition: {
          latitude: 40,
          longitude: 50,
        },
      }, fetchUsersList.fulfilled(mockUsersList, ''));
      
      expect(state.list[0].id).toBe(2);
      expect(state.list[1].id).toBe(1);
    });
  });

  describe('when failing to retrieve the list of users', () => {
    it('should set an error state', () => {
      const loadingError = new Error('An error happened');
      const state = subject(undefined, fetchUsersList.rejected(loadingError, ''));

      expect(state.loading).toBe(false);
      expect(state.rejected).toBe(true);
      expect(state.list).toEqual([]);
    });
  });

  describe('when a user is selected', () => {
    it('should save the user id', () => {
      const state = subject(undefined, selectUser(2));

      expect(state.selectedUserId).toBe(2);
    });
  });
});
