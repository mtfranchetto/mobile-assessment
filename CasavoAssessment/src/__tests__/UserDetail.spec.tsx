import React from 'react';
import configureStore from 'redux-mock-store';
import { Linking } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { fireEvent, render } from '@testing-library/react-native';
import { mockUsersList } from '../__fixtures__/users';
import { UserDetail } from '../UserDetail';

Linking.openURL = jest.fn();

const mockStore = configureStore([thunk]);
const store = mockStore({
  users: {
    loading: false,
    rejected: false,
    list: mockUsersList,
    selectedUserId: 1,
  }
});

describe('Given a UserDetail component', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  describe.skip('when asking directions to reach the user', () => {
    it('should open the map pointing to that address', () => {

    });
  });

  describe('when tapping on the phone button', () => {
    it('should call the user', () => {
      const { getByText } = render(<Provider store={store}><UserDetail /></Provider>);
      fireEvent.press(getByText('Call'));

      expect(Linking.openURL).toHaveBeenCalledWith('tel:3882229');
    });
  });
});
