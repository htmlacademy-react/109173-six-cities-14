import { createAPI } from '../services/api';
import { reducer } from './reducer';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
