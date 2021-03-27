import { User } from '../types';
import { fetchUsersList, selectUser, usersReducer } from '../users';

const mockUsersList: User[] = [{
  address: 'street number 1',
  id: 1,
  name: 'Johnny',
  phoneNumber: '3882229',
}, {
  address: 'street number 2',
  id: 2,
  name: 'Jenny',
  phoneNumber: '7376293',
}];

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
      const state = subject(undefined, fetchUsersList.fulfilled(mockUsersList, undefined));

      expect(state.loading).toBe(false);
      expect(state.list).toEqual(mockUsersList);
    });

    describe.skip('when the current user location is known', () => {
      it('should set the distance of every user', () => {

      });
      it('should order the users by distance', () => {

      });
    });
  });

  describe.skip('when the user current location is acquired', () => {
    it('should order the users list by distance', () => {

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
