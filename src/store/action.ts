import { createAction } from '@reduxjs/toolkit';
import { Offer, Offers } from '../types/offer';
import { Comments } from '../types/comment';

export const Action = {
  CHANGE_CITY: 'city/change',
  SET_OFFERS: 'offers/set',
  LOAD_OFFERS: 'data/offers',
  LOAD_OFFER: 'data/offerItem',
  LOAD_NEARBY: 'data/offerItem/nearby',
  LOAD_COMMENTS: 'data/offerItem/comments',
  SET_COMMENTS_STATUS: 'data/offerItem/setCommentsLoadedStatus'
};

export const setCityAction = createAction<{ city: string }>(Action.CHANGE_CITY);
export const setOffersAction = createAction<{ offers: Offers }>(Action.SET_OFFERS);
export const loadOffersAction = createAction<{ offers: Offers }>(Action.LOAD_OFFERS);
export const loadOfferItemAction = createAction<{ offer: Offer }>(Action.LOAD_OFFER);
export const loadNearbyAction = createAction<{ nearbyOffers: Offers }>(Action.LOAD_NEARBY);
export const loadComments = createAction<{ comments: Comments }>(Action.LOAD_COMMENTS);
export const setCommentsLoadedStatus = createAction<boolean>(Action.SET_COMMENTS_STATUS);
