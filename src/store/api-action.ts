import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';

import { Offer, Offers } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { OffersData } from '../types/offers-data';

import {
  loadOffersAction,
  loadNearbyAction,
  loadOfferItemAction,
  loadComments,
  setCommentsLoadedStatus,
} from './action';
import { Comments } from '../types/comment';

type AsyncOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

const APIAction = {
  DATA_FETCH_OFFERS: 'data/fetchOffers',
  DATA_FETCH_OFFER_ITEM: 'data/fetchOfferItem',
  DATA_FETCH_NEARBY: 'data/fetchNearbyOffers',
  DATA_FETCH_COMMENTS: 'data/fetchComments',
};

// TODO: Много шаблонного кода - вынести во вспомогательную функцию

export const fetchOffersAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.DATA_FETCH_OFFERS,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.OFFERS);

    dispatch(loadOffersAction({ offers: data }));
  }
);

export const fetchOfferItemAction = createAsyncThunk<void, OffersData, AsyncOptions>(
  APIAction.DATA_FETCH_OFFER_ITEM,
  async ({ offerID }, {dispatch, extra: api}) => {
    const { data } = await api.get<Offer>(`${APIRoute.OFFERS}/${offerID}`);

    dispatch(setCommentsLoadedStatus(false));
    dispatch(loadOfferItemAction({ offer: data }));
  }
);

export const fetchNeabyOffers = createAsyncThunk<void, OffersData, AsyncOptions>(
  APIAction.DATA_FETCH_NEARBY,
  async ({ offerID }, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.OFFERS}/${offerID}${APIRoute.NEAREST}`);

    dispatch(loadNearbyAction({ nearbyOffers: data }));
  }
);

export const fetchComments = createAsyncThunk<void, OffersData, AsyncOptions>(
  APIAction.DATA_FETCH_COMMENTS,
  async ({ offerID }, { dispatch, extra: api }) => {
    dispatch(setCommentsLoadedStatus(false));

    const { data } = await api.get<Comments>(`${APIRoute.COMMENTS }/${offerID}`);

    dispatch(setCommentsLoadedStatus(true));
    dispatch(loadComments({ comments: data }));
  }
);
