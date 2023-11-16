import { createReducer } from '@reduxjs/toolkit';

import { Offer, Offers } from '../types/offer';
import { Comments } from '../types/comment';
import { AuthorizationStatus, SEND_DATA_STATUS } from '../const';
import { UserData } from '../types/user-data';

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
  loadFavoritesAction,
  addCommentAction,
  setAddCommentStatusAction,
} from './action';

const DEFAULT_CITY = 'Paris';

// type AddCommentStatus = keyof typeof SEND_DATA_STATUS;

type initialState = {
  city: string;
  offers: Offers;
  comments: Comments;
  isCommentsLoaded: boolean;
  // addCommentStatus: AddCommentStatus;
  addCommentStatus: string;
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
  // addCommentStatus: SEND_DATA_STATUS.NONE,
  addCommentStatus: SEND_DATA_STATUS.NONE,
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
    .addCase(addCommentAction, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(setAddCommentStatusAction, (state, action) => {
      state.addCommentStatus = action.payload;
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
