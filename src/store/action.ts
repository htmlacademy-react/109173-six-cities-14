import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offers } from '../types/offer';

export const Action = {
  'CHANGE_CITY': 'city/change',
  'SET_OFFERS': 'offers/set'
};

export const changeCityAction = createAction<{ city: City }>(Action.CHANGE_CITY);
export const setOffersAction = createAction<{ offers: Offers }>(Action.SET_OFFERS);
