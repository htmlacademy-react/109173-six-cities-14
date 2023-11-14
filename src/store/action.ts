import { createAction } from '@reduxjs/toolkit';
import { Offer, Offers } from '../types/offer';

export const Action = {
  CHANGE_CITY: 'city/change',
  SET_OFFERS: 'offers/set',
  LOAD_OFFERS: 'offers/load',
  LOAD_OFFER: 'offers/item',
  LOAD_NEARBY: 'offers/nearby',
};

export const setCityAction = createAction<{ city: string }>(Action.CHANGE_CITY);
export const setOffersAction = createAction<{ offers: Offers }>(Action.SET_OFFERS);
export const loadOffersAction = createAction<{ offers: Offers }>(Action.LOAD_OFFERS);
export const loadOfferItemAction = createAction<{ offer: Offer }>(Action.LOAD_OFFER);
export const loadNearbyAction = createAction<{ nearbyOffers: Offers }>(Action.LOAD_NEARBY);
