import React from 'react';
import configureStore from 'redux-mock-store';
import { Linking, Platform } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { fireEvent, render } from '@testing-library/react-native';
import { mockUsersList } from '../__fixtures__/users';
import { UserDetail } from '../UserDetail';

Linking.openURL = jest.fn();
Platform.OS = 'ios';

const mockStore = configureStore([thunk]);
const store = mockStore({
  users: {
    loading: false,
    rejected: false,
    list: mockUsersList,
    selectedUserId: 1,
  },
  todos: {
    list: [],
  },
});


describe('Given a UserDetail component', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  describe('when asking directions to reach the user', () => {
    it('should open the map pointing to that address', () => {
      const { getByText } = render(<Provider store={store}><UserDetail /></Provider>);
      fireEvent.press(getByText('Get directions'));

      expect(Linking.openURL).toHaveBeenCalledWith('maps:1,1');
    });
  });

  describe('when tapping on the phone button', () => {
    it('should call the user', () => {
      const { getByText } = render(<Provider store={store}><UserDetail /></Provider>);
      fireEvent.press(getByText('Call'));

      expect(Linking.openURL).toHaveBeenCalledWith('tel:3882229');
    });
  });

  describe('when adding a todo', () => {
    describe('when some text has been filled', () => {
      it('should save the todo', () => {
        const { getByTestId, getByText } = render(<Provider store={store}><UserDetail /></Provider>);
        fireEvent.changeText(getByTestId('todo-input'), 'example todo');
        fireEvent.press(getByText('Add todo'));

        expect(store.dispatch).toHaveBeenCalledTimes(2);
      });

      it('should reset the input field', () => {
        const { getByTestId, getByText } = render(<Provider store={store}><UserDetail /></Provider>);
        fireEvent.changeText(getByTestId('todo-input'), 'example todo');
        fireEvent.press(getByText('Add todo'));

        expect(() => getByText('example todo')).toThrowError();
      });
    });

    describe('when no text has been filled', () => {
      it('should not do anything', () => {
        const { getByText } = render(<Provider store={store}><UserDetail /></Provider>);
        fireEvent.press(getByText('Add todo'));

        expect(store.dispatch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
