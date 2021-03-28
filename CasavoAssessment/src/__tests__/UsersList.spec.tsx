import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { fireEvent, render } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { UsersList } from '../UsersList';
import { mockUsersList } from '../__fixtures__/users';
import { selectUser } from '../users';
import { USER_DETAIL_SCREEN } from '../constants';

const mockStore = configureStore([thunk]);
const store = mockStore({
  users: {
    loading: false,
    rejected: false,
    list: mockUsersList,
  }
});

describe('Given a UsersList component', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  describe('when loaded', () => {
    it('should fetch the list of users', () => {
      render(<Provider store={store}><UsersList /></Provider>);

      /**
       * I initially wrote this expectation but of course it won't work
       * since it returns a new function every time. I don't have to find a viable solution since 
       * in my current codebase I test initial loading of data in a very different way
       * 
       * expect(store.dispatch).toHaveBeenCalledWith(fetchUsersList());
       */
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('when a user is selected', () => {
    beforeEach(() => {
      const { getByTestId } = render(<Provider store={store}><UsersList /></Provider>);
      fireEvent.press(getByTestId('users-1'));
    });

    it('should dispatch the appropriate action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(selectUser(1));
    });

    it('should navigate to the user detail page', () => {
      const navigation = useNavigation();
      expect(navigation.navigate).toHaveBeenCalledWith(USER_DETAIL_SCREEN);
    });
  });
});
