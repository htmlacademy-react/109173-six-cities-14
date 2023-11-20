import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { reducer } from '../reducer';
import { Action } from '../action';
import { browserHistory } from '../../browser-history';
import { AppRoute } from '../../const';

type Reducer = ReturnType<typeof reducer>;

export default function redirect(): Middleware<unknown, Reducer> {
  return function() {
    return function(next) {
      return function(action: PayloadAction<string>) {
        if(action.type === Action.REDIRECT) {
          browserHistory.push(AppRoute.PAGE_404);
        }

        next(action);
      };
    };
  };
}
