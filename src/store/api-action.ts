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
  loadCommentsAction,
  setCommentsLoadedStatusAction,
  setAuthorizationStatusAction,
  setUserInfoAction,
  loadFavoritesAction,
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
  FETCH_OFFERS: 'data/fetchOffers',
  FETCH_OFFER_ITEM: 'data/fetchOfferItem',
  FETCH_NEARBY: 'data/fetchNearbyOffers',
  FETCH_COMMENTS: 'data/fetchComments',
  FETCH_FAVORITES: 'data/fetchFavorites',
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
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.AUTH));
    }
  }
);

export const logoutAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_LOGOUT,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.LOGOUT);
    deleteToken();
    dispatch(setAuthorizationStatusAction(AuthorizationStatus.NO_AUTH));
  }
);

export const checkAuthAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.LOGIN);
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.AUTH));
      dispatch(setUserInfoAction(data));
    } catch(error) {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.NO_AUTH));
      dispatch(setUserInfoAction(null));
    }
  }
);

export const fetchOffersAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.FETCH_OFFERS,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.OFFERS);

    dispatch(loadOffersAction({ offers: data }));
  }
);

export const fetchOfferItemAction = createAsyncThunk<void, OffersData, AsyncOptions>(
  APIAction.FETCH_OFFER_ITEM,
  async ({ offerID }, {dispatch, extra: api}) => {
    const { data } = await api.get<Offer>(`${APIRoute.OFFERS}/${offerID}`);

    dispatch(setCommentsLoadedStatusAction(false));
    dispatch(loadOfferItemAction({ offer: data }));
  }
);

export const fetchNeabyOffers = createAsyncThunk<void, OffersData, AsyncOptions>(
  APIAction.FETCH_NEARBY,
  async ({ offerID }, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.OFFERS}/${offerID}${APIRoute.NEAREST}`);

    dispatch(loadNearbyAction({ nearbyOffers: data }));
  }
);

export const fetchComments = createAsyncThunk<void, OffersData, AsyncOptions>(
  APIAction.FETCH_COMMENTS,
  async ({ offerID }, { dispatch, extra: api }) => {
    dispatch(setCommentsLoadedStatusAction(false));

    const { data } = await api.get<Comments>(`${APIRoute.COMMENTS }/${offerID}`);

    dispatch(setCommentsLoadedStatusAction(true));
    dispatch(loadCommentsAction({ comments: data }));
  }
);

export const fetchFavoritesAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.FETCH_FAVORITES,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.FAVORITE);

    dispatch(loadFavoritesAction({ offers: data }));
  }
);
