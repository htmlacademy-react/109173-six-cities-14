import { createAction } from '@reduxjs/toolkit';
import { Offer, Offers } from '../types/offer';
import { Comments } from '../types/comment';
import { UserData } from '../types/user-data';

export const Action = {
  CHANGE_CITY: 'city/change',
  SET_OFFERS: '/offers/set',
  LOAD_OFFERS: '/offers',
  LOAD_OFFER: '/offerItem',
  LOAD_NEARBY: '/offerItem/nearby',
  LOAD_COMMENTS: '/offerItem/comments',
  LOAD_FAVORITES: '/favorites',
  SET_FAVORITES: '/favorites/set',
  SET_COMMENTS_STATUS: '/offerItem/setCommentsLoadedStatus',
  SET_AUTH_STATUS: 'user/setAuthorizationStatus',
  SET_USER_INFO: 'user/setUserInfo',
};

// INIT
export const setCityAction = createAction<{ city: string }>(Action.CHANGE_CITY);
export const setOffersAction = createAction<{ offers: Offers }>(Action.SET_OFFERS);

// OFFERS
export const loadOffersAction = createAction<{ offers: Offers }>(Action.LOAD_OFFERS);
export const loadOfferItemAction = createAction<{ offer: Offer }>(Action.LOAD_OFFER);
export const loadNearbyAction = createAction<{ nearbyOffers: Offers }>(Action.LOAD_NEARBY);
export const loadCommentsAction = createAction<{ comments: Comments }>(Action.LOAD_COMMENTS);
export const setCommentsLoadedStatusAction = createAction<boolean>(Action.SET_COMMENTS_STATUS);

// FAVORITES
export const loadFavoritesAction = createAction<{ offers: Offers }>(Action.LOAD_FAVORITES);

// AUTH
export const setAuthorizationStatusAction = createAction<string>(Action.SET_AUTH_STATUS);
export const setUserInfoAction = createAction<UserData | null>(Action.SET_USER_INFO);
