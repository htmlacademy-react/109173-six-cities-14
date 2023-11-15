import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';

import { Offer, Offers } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { OffersData } from '../types/offers-data';

import {
  loadOffersAction,
  loadNearbyAction,
  loadOfferItemAction,
  loadComments,
  setCommentsLoadedStatus,
  setAuthorizationStatus,
} from './action';
import { Comments } from '../types/comment';
import { AuthData } from '../types/auth-data';
import { deleteToken, setToken } from '../services/token';
import { UserData } from '../types/user-data';

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
  USER_LOGIN: 'user/login',
  USER_LOGOUT: 'user/logout',
  USER_CHECK_AUTH: 'user/checkAuth',
};

// TODO: Много шаблонного кода - вынести во вспомогательную функцию

export const loginAction = createAsyncThunk<void, AuthData, AsyncOptions>(
  APIAction.USER_LOGIN,
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.LOGIN, { email, password });
    const { token } = data;

    if(token) {
      setToken(token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
    }
  }
);

export const logoutAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_LOGOUT,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.LOGOUT);
    deleteToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
  }
);

export const checkAuthAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get<UserData>(APIRoute.LOGIN);
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
    } catch(error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    }
  }
);

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
