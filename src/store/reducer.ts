import { createReducer } from '@reduxjs/toolkit';

import { Offer, Offers } from '../types/offer';

import {
  setCityAction,
  loadOffersAction,
  setOffersAction,
  loadNearbyAction,
  loadOfferItemAction,
  loadCommentsAction,
  setCommentsLoadedStatusAction,
  setAuthorizationStatusAction,
  setUserInfoAction,
  loadFavoritesAction
} from './action';
import { Comments } from '../types/comment';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

export const DEFAULT_CITY = 'Paris';

type initialState = {
  city: string;
  offers: Offers;
  comments: Comments;
  isCommentsLoaded: boolean;
  offer: Offer | null;
  nearbyOffers: Offers;
  favorites: Offers;
  authorizationStatus: string;
  userInfo: UserData | null;
};

const initialState: initialState = {
  city: DEFAULT_CITY,
  offer: null,
  comments: [],
  isCommentsLoaded: false,
  offers: [],
  favorites: [],
  nearbyOffers: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userInfo: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityAction, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffersAction, (state, action) => {
      state.offers = action.payload.offers;
      // TODO: Возможно - стоит перенести в отдельный экшен обнуление или не обнулять вобще (Смысл?)
      state.offer = null;
      state.comments = [];
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(loadOfferItemAction, (state, action) => {
      state.offer = action.payload.offer;
    })
    .addCase(loadCommentsAction, (state, action) => {
      state.comments = action.payload.comments;
    })
    .addCase(setCommentsLoadedStatusAction, (state, action) => {
      state.isCommentsLoaded = action.payload;
    })
    .addCase(loadNearbyAction, (state, action) => {
      state.nearbyOffers = action.payload.nearbyOffers;
    })
    .addCase(loadFavoritesAction, (state, action) => {
      state.favorites = action.payload.offers;
    })
    .addCase(setAuthorizationStatusAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfoAction, (state, action) => {
      state.userInfo = action.payload;
    });
});
