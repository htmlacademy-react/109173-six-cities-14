import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';

export const Action = {
  CHANGE_CITY: 'city/change',
  SET_OFFERS: 'offers/set',
  LOAD_OFFERS: 'offers/load',
};

export const setCityAction = createAction<{ city: string }>(Action.CHANGE_CITY);
export const setOffersAction = createAction<{ offers: Offers }>(Action.SET_OFFERS);
export const loadOffersAction = createAction<{ offers: Offers }>(Action.LOAD_OFFERS);
