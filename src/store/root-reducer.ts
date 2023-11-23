import { combineReducers } from '@reduxjs/toolkit';
import { NAMESPACE } from '../const';
import { userProcess } from './slices/user-process/user-process';
import { offersDataProcess } from './slices/offers-data-process/offers-data-process';
import { offerItemDataProcess } from './slices/offer-item-data-process/offer-item-data-process';
import { favoritesDataProcess } from './slices/favorites-data-process/favorites-data-process';
import { cityProcess } from './slices/city-process/city-process';

export const rootReducer = combineReducers({
  [NAMESPACE.CITY]: cityProcess.reducer,
  [NAMESPACE.USER]: userProcess.reducer,
  [NAMESPACE.OFFERS]: offersDataProcess.reducer,
  [NAMESPACE.OFFER]: offerItemDataProcess.reducer,
  [NAMESPACE.FAVORITES]: favoritesDataProcess.reducer,
});
