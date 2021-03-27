import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpClient } from './core';
import { Todo } from './types';

export const fetchTodosForUser = createAsyncThunk(
  'todos/list',
  async (userId: number) => {
    const { data } = await httpClient.get(`/users/${userId}/todos`);
    const todos = (data || []) as any[];
    return todos.map<Todo>(todo => todo);
  },
);

export const addTodoForUser = createAsyncThunk(
  'todos/add',
  async (args: { userId: number; title: string }) => {
    const todo: Omit<Todo, 'id'> = {
      userId: args.userId,
      title: args.title,
      completed: false,
    };
    const { data } = await httpClient.post('/todos', todo);
    return data as Todo;
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id: number) => {
    const { data } = await httpClient.delete(`/todos/${id}`);
    return data;
  },
);

export const setTodoCompletion = createAsyncThunk(
  'todos/toggle',
  async (args: { id: number; completed: boolean }) => {
    const { data } = await httpClient.put(`/todos/${args.id}`, {
      completed: args.completed,
    });
    return data;
  },
);

type TodosList = {
  loading: boolean;
  rejected: boolean;
  list: Todo[];
}

/**
 *  I choose to store only a single todos list instead
 *  of a grouping todos by user just for simplicity
 */
const { reducer } = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    rejected: false,
    list: [],
  } as TodosList,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTodosForUser.pending, (state) => {
      state.loading = true;
      state.rejected = false;
    });
    builder.addCase(fetchTodosForUser.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.rejected = false;
      state.list = action.payload;
    });
    builder.addCase(fetchTodosForUser.rejected, (state) => {
      state.rejected = true;
      state.loading = false;
      state.list = [];
    });
    builder.addCase(addTodoForUser.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.list.push(action.payload);
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.meta.arg);
    });
    builder.addCase(setTodoCompletion.pending, (state, action) => {
      const { completed, id } = action.meta.arg;
      state.list = state.list.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      })
    });
  }
});

export { reducer as todosReducer };
