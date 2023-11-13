import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offers } from '../types/offer';

export const Action = {
  'CHANGE_CITY': 'CHANGE_CITY',
  'SET_OFFERS': 'SET_OFFERS'
};

export const changeCityAction = createAction<{ city: City }>(Action.CHANGE_CITY);
export const setOffersAction = createAction<{ offers: Offers }>(Action.SET_OFFERS);
