import {
  addTodoForUser, deleteTodo, fetchTodosForUser,
  todosReducer, setTodoCompletion,
} from '../todos';
import { mockTodosList } from '../__fixtures__/todos';

describe('Given a todosReducer', () => {
  const subject = todosReducer;
  describe('when retrieving the list of todos', () => {
    it('should set a loading state', () => {
      const state = subject(undefined, fetchTodosForUser.pending('', 1));

      expect(state.loading).toBe(true);
    });
  });

  describe('when the list of todos is retrieved', () => {
    it('should be saved', () => {
      const state = subject(undefined, fetchTodosForUser.fulfilled(mockTodosList, '', 1));

      expect(state.loading).toBe(false);
      expect(state.rejected).toBe(false);
      expect(state.list).toEqual(mockTodosList);
    });
  });

  describe('when the list of todos fails to load', () => {
    it('should set an error state', () => {
      const state = subject(undefined, fetchTodosForUser.rejected(new Error(), '', 1));

      expect(state.loading).toBe(false);
      expect(state.rejected).toBe(true);
      expect(state.list).toEqual([]);
    });
  });

  describe('when adding a new todo', () => {
    it('should add it to the bottom of the list', () => {
      const state = subject({
        loading: false,
        rejected: false,
        list: mockTodosList,
      }, addTodoForUser.fulfilled({
        completed: false,
        userId: 1,
        id: 4,
        title: 'Third todo',
      }, '', { userId: 1, title: 'Third todo' }));

      expect(state.list).toHaveLength(3);
      expect(state.list[2]).toEqual({
        completed: false,
        userId: 1,
        id: 4,
        title: 'Third todo',
      });
    });
  });

  describe('when deleting a todo', () => {
    it('should remove it from the list', () => {
      const state = subject({
        loading: false,
        rejected: false,
        list: mockTodosList,
      }, deleteTodo.pending('', 1));

      expect(state.list).toHaveLength(1);
      expect(state.list[0].id).toBe(2);
    });
  });

  describe('when toggling a todo', () => {
    it('should update the completion state accordingly', () => {
      const state = subject({
        loading: false,
        rejected: false,
        list: mockTodosList,
      }, setTodoCompletion.pending('', { completed: true, id: 1 }));

      expect(state.list[0].completed).toBe(true);
    });
  });
});
