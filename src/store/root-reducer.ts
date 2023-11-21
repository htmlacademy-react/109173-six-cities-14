import { combineReducers } from '@reduxjs/toolkit';
import { NAMESPACE } from '../const';
import { reducer } from './reducer';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NAMESPACE.MAIN]: reducer,
  [NAMESPACE.USER]: userProcess.reducer,
});
