import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, ListRenderItemInfo } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from './core/hooks';
import { User } from './types';
import { fetchUsersList, selectUser } from './users';
import { USER_DETAIL_SCREEN } from './constants';
import { fetchUserPosition } from './gps';
import { usersStyles } from './styles';
import Loading from './Loading';

type UserRowProps = { user: User, onPress: (user: User) => void };

const UserRow = ({ user, onPress }: UserRowProps) => {
  const cb = useCallback(() => {
    onPress(user);
  }, [onPress, user]);
  return (
    <TouchableOpacity onPress={cb} testID={`users-${user.id}`} style={usersStyles.listRow}>
      <Text style={usersStyles.listName}>{user.name}</Text>
      <Text style={usersStyles.listAddress}>{user.address}</Text>
      <Text style={usersStyles.listDistance}>
        Distance: {user.distance ? `${user.distance.toFixed(2)} km` : 'N/A'}
      </Text>
    </TouchableOpacity>
  );
}

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { list, loading } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsersList());
    dispatch(fetchUserPosition());
  }, []);

  const onUserPress = useCallback((user: User) => {
    dispatch(selectUser(user.id));
    navigation.navigate(USER_DETAIL_SCREEN)
  }, []);

  const renderUser = useCallback(({ item }: ListRenderItemInfo<User>) => (
    <UserRow user={item} onPress={onUserPress} />
  ), []);

  const keyExtractor = useCallback((user: User) => user.id.toString(), []);

  /**
   * TODO: handle UI when `rejected`
   */
  return loading ? <Loading /> : (
    <FlatList
      data={list}
      keyExtractor={keyExtractor}
      renderItem={renderUser}
    />
  );
};
