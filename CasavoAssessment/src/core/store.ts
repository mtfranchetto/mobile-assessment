import { configureStore } from '@reduxjs/toolkit'
import { todosReducer } from '../todos'
import { usersReducer } from '../users'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    todos: todosReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
