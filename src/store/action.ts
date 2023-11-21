import { createAction } from '@reduxjs/toolkit';
import { Offer, Offers } from '../types/offer';
import { Comment, Comments } from '../types/comment';
import { UserData } from '../types/user-data';

export const Action = {
  CHANGE_CITY: 'city/change',
  SET_OFFERS: 'offers/set',
  LOAD_OFFERS: 'offers/load',
  LOAD_OFFER: 'offerItem/load',
  LOAD_NEARBY: 'offerItem/loadNearby',
  LOAD_COMMENTS: 'offerItem/loadComments',
  SET_COMMENTS_STATUS: 'offerItem/setCommentsLoadedStatus',
  LOAD_FAVORITES: 'favorites/load',
  SET_FAVORITES: 'favorites/set',
  SET_AUTH_STATUS: 'user/setAuthorizationStatus',
  SET_USER_INFO: 'user/setUserInfo',
  ADD_COMMENT: 'comments/add',
  ADD_COMMENT_STATUS: 'comments/addStatus',
  REDIRECT: 'route/redirect',
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

// COMMENTS
export const addCommentAction = createAction<Comment>(Action.ADD_COMMENT);
export const setAddCommentStatusAction = createAction<string>(Action.ADD_COMMENT_STATUS);

// AUTH
export const setAuthorizationStatusAction = createAction<string>(Action.SET_AUTH_STATUS);
export const setUserInfoAction = createAction<UserData | null>(Action.SET_USER_INFO);

// ROUTING
export const redirectToRoute = createAction<string>(Action.REDIRECT);
