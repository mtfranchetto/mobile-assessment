import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { USERS_LIST_SCREEN, USER_DETAIL_SCREEN } from './constants';
import { UserDetail } from './UserDetail';
import { UsersList } from './UsersList';

const Stack = createStackNavigator();

const usersListOptions = {
  title: 'Users',
};
const userDetailOptions = {
  title: 'Detail',
};

export function Navigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={USERS_LIST_SCREEN}>
        <Stack.Screen name={USERS_LIST_SCREEN} component={UsersList} options={usersListOptions} />
        <Stack.Screen name={USER_DETAIL_SCREEN} component={UserDetail} options={userDetailOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
