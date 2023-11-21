import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { Action } from '../action';
import { browserHistory } from '../../browser-history';
import { AppRoute } from '../../const';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

// Просто скопировано с примера академии, т.к. вариант на обычных функциях работать отказался
export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if(action.type === Action.REDIRECT) {
          browserHistory.push(AppRoute.PAGE_404);
        }

        return next(action);
      };
