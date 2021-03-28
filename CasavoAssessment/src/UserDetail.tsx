import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Button, Linking, ListRenderItemInfo,
  Text, TextInput, Platform, View, KeyboardAvoidingView,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { useAppDispatch, useAppSelector } from './core/hooks';
import { todosStyles, usersStyles } from './styles';
import { addTodoForUser, deleteTodo, fetchTodosForUser, setTodoCompletion } from './todos';
import { Todo } from './types';
import Loading from './Loading';

const TodoRow = ({ completed, id, title }: Todo) => {
  const dispatch = useAppDispatch();
  const toggleTodo = useCallback(() => {
    dispatch(setTodoCompletion({ id, completed: !completed }));
  }, [completed]);
  const deleteCallback = useCallback(() => {
    dispatch(deleteTodo(id));
  }, [id]);

  return (
    <View style={todosStyles.row}>
      <CheckBox value={completed} onValueChange={toggleTodo} />
      <Text style={todosStyles.title}>{title}</Text>
      <Button title={'X'} onPress={deleteCallback} />
    </View>
  )
}

const AddTodoFooter = memo(({ userId }: { userId: number }) => {
  const dispatch = useAppDispatch();
  const [todoText, setTodoText] = useState('');
  const addTodo = useCallback(() => {
    if (todoText) {
      dispatch(addTodoForUser({ userId, title: todoText }));
      setTodoText('');
    }
  }, [todoText, userId, setTodoText]);

  const updateTodoText = useCallback((newText: string) => {
    setTodoText(newText);
  }, [setTodoText]);

  return (
    <View style={todosStyles.addContainer}>
      <TextInput
        testID={'todo-input'}
        value={todoText}
        onChangeText={updateTodoText}
        style={todosStyles.input}
        placeholder="E.g. buy coffee"
      />
      <Button title="Add todo" onPress={addTodo} />
    </View>
  );
});

export const UserDetail = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => {
    const { list, selectedUserId } = state.users;
    return list.find(u => u.id === selectedUserId);
  });
  const { list: todos, loading } = useAppSelector(state => state.todos);
  useEffect(() => {
    dispatch(fetchTodosForUser(user!.id));
  }, [user]);

  const callUser = useCallback(() => Linking.openURL(`tel:${user!.phoneNumber}`), [user]);

  const openDirections = useCallback(() => {
    const scheme = Platform.OS === 'ios' ? 'maps' : 'geo';
    /**
     * simple approach, could be better a more robust solution like
     * https://github.com/brh55/react-native-open-maps
     */
    Linking.openURL(`${scheme}:${user!.location.latitude},${user!.location.longitude}`);
  }, [user]);

  const renderRow = useCallback(({ item }: ListRenderItemInfo<Todo>) => (
    <TodoRow {...item} />
  ), []);

  /**
   * TODO: handle UI when `rejected`
   */
  return loading ? <Loading /> : (
    <KeyboardAvoidingView behavior="padding" style={todosStyles.keyboard}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={() => ( // this should be extracted for proper memoization
          <>
            <Text style={usersStyles.detailName}>{user!.name}</Text>
            <Text style={usersStyles.detailAddress}>{user!.address}</Text>
            <Text style={usersStyles.detailPhone}>Phone: {user!.phoneNumber}</Text>
            <View style={usersStyles.actionsContainer}>
              <Button title="Call" onPress={callUser} />
              <Button title="Get directions" onPress={openDirections} />
            </View>
            <AddTodoFooter userId={user!.id} />
          </>
        )}
        contentContainerStyle={usersStyles.detailContainer}
        keyExtractor={todo => todo.id}
        data={todos}
        renderItem={renderRow}
      />
    </KeyboardAvoidingView>
  );
};
