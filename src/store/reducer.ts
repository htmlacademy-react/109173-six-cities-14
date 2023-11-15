import { createReducer } from '@reduxjs/toolkit';

import { Offer, Offers } from '../types/offer';

import {
  setCityAction,
  loadOffersAction,
  setOffersAction,
  loadNearbyAction,
  loadOfferItemAction,
  loadComments,
  setCommentsLoadedStatus,
  setAuthorizationStatus
} from './action';
import { Comments } from '../types/comment';
import { AuthorizationStatus } from '../const';

export const DEFAULT_CITY = 'Paris';

type initialState = {
  city: string;
  offers: Offers;
  comments: Comments;
  isCommentsLoaded: boolean;
  offer: Offer | null;
  nearbyOffers: Offers;
  authorizationStatus: string;
};

const initialState: initialState = {
  city: DEFAULT_CITY,
  offer: null,
  comments: [],
  isCommentsLoaded: false,
  offers: [],
  nearbyOffers: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
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
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload.comments;
    })
    .addCase(setCommentsLoadedStatus, (state, action) => {
      state.isCommentsLoaded = action.payload;
    })
    .addCase(loadNearbyAction, (state, action) => {
      state.nearbyOffers = action.payload.nearbyOffers;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
