import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { reducer } from '../reducer';
import { Action } from '../action';
import { browserHistory } from '../../browser-history';
import { AppRoute } from '../../const';

type Reducer = ReturnType<typeof reducer>;

// Пример из академии - с типизацией все ок
export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if(action.type === Action.REDIRECT) {
          browserHistory.push(AppRoute.PAGE_404);
        }

        return next(action);
      };

// // Мой вариант (почему-то кидает ошибки типизации)
// export default function redirect(): Middleware<unknown, Reducer> {
//   return function(next) {
//     return function(action: PayloadAction<string>) {
//       if(action.type === Action.REDIRECT) {
//         browserHistory.push(AppRoute.PAGE_404);
//       }

//       next(action);
//     };
//   };
// }
