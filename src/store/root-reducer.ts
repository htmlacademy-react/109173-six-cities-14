import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';
import { userProcess } from './slices/user-process/user-process';
import { offersDataProcess } from './slices/offers-data-process/offers-data-process';
import { offerItemDataProcess } from './slices/offer-item-data-process/offer-item-data-process';
import { favoritesDataProcess } from './slices/favorites-data-process/favorites-data-process';
import { cityProcess } from './slices/city-process/city-process';

export const rootReducer = combineReducers({
  [Namespace.CITY]: cityProcess.reducer,
  [Namespace.USER]: userProcess.reducer,
  [Namespace.OFFERS]: offersDataProcess.reducer,
  [Namespace.OFFER]: offerItemDataProcess.reducer,
  [Namespace.FAVORITES]: favoritesDataProcess.reducer,
});
