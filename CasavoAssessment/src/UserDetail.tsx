import React, { useCallback } from 'react';
import { Button, Linking } from 'react-native';
import { useAppSelector } from './core/hooks';

export const UserDetail = () => {
  const user = useAppSelector(state => {
    const { list, selectedUserId } = state.users;
    return list.find(u => u.id === selectedUserId);
  });
  const callUser = useCallback(() => Linking.openURL(`tel:${user!.phoneNumber}`), [user]);
  
  return (
    <Button title="Call" onPress={callUser} />
  )
};
