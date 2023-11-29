import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { Action } from '../action';
// import { AppRoute } from '../../const';
import { rootReducer } from '../root-reducer';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof rootReducer>;

// Просто скопировано с примера академии, т.к. вариант на обычных функциях работать отказался
export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if(action.type === Action.REDIRECT) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
