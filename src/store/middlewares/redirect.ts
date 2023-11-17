import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export default function redirect(): Middleware<unknown, Reducer> {
  return function() {
    return function(next) {
      return function(action: PayloadAction<string>) {
        return next(action);
      };
    };
  };
}
