import React, { memo, useCallback, useEffect, useState } from 'react';
import { Button, Linking, ListRenderItemInfo, Text, TextInput } from 'react-native';
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
    <>
      <TextInput
        testID={'todo-input'}
        value={todoText}
        onChangeText={updateTodoText}
      />
      <Button title="Add todo" onPress={addTodo} />
    </>
  );
});

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
      ListFooterComponent={<AddTodoFooter userId={user!.id} />}
    />
  );
};
