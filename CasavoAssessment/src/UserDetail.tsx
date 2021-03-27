import React, { useCallback, useEffect } from 'react';
import { Button, Linking, ListRenderItemInfo, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { useAppDispatch, useAppSelector } from './core/hooks';
import { todosStyles } from './styles';
import { addTodoForUser, deleteTodo, fetchTodosForUser, setTodoCompletion } from './todos';
import { Todo } from './types';

const TodoRow = ({ completed, id, title, userId }: Todo) => {
  const dispatch = useAppDispatch();
  const toggleTodo = useCallback(() => {
    dispatch(setTodoCompletion({ id, completed: !completed }));
  }, [completed]);
  const deleteCallback = useCallback(() => {
    dispatch(deleteTodo(id));
  }, [id]);

  return (
    <>
      <Text style={todosStyles.title}>{title}</Text>
      <CheckBox value={completed} onValueChange={toggleTodo} />
      <Button title={'X'} onPress={deleteCallback} />
    </>
  )
}

export const UserDetail = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => {
    const { list, selectedUserId } = state.users;
    return list.find(u => u.id === selectedUserId);
  });
  const { list: todos } = useAppSelector(state => state.todos);
  useEffect(() => {
    dispatch(fetchTodosForUser(user!.id));
  }, [user]);

  const callUser = useCallback(() => Linking.openURL(`tel:${user!.phoneNumber}`), [user]);
  const renderRow = useCallback(({ item }: ListRenderItemInfo<Todo>) => (
    <TodoRow {...item} />
  ), []);

  return (
    <FlatList
      ListHeaderComponent={() => ( // this should be extracted for proper memoization
        <Button title="Call" onPress={callUser} />
      )}
      keyExtractor={todo => todo.id}
      data={todos}
      renderItem={renderRow}
    />
  )
};
