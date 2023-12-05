import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { APIRoute, AppRoute, SEND_DATA_STATUS } from '../const';
import { deleteToken, setToken } from '../services/token';

import { Offer, Offers } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { OfferId } from '../types/offers-data';
import { Comment, Comments } from '../types/comment';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data';

import { redirectToRoute } from './action';

// SLICES
import { setUserInfoAction } from './slices/user-process/user-process';
import {
  clearOffersFavoriteStatus,
  loadOffersAction,
  updateOffersListAction
} from './slices/offers-data-process/offers-data-process';
import {
  setOfferItemAction,
  setCommentsAction,
  setCommentsLoadedStatusAction,
  addCommentAction,
  setAddCommentStatusAction,
  setNearbyAction,
  updateOfferItemFavoriteAction
} from './slices/offer-item-data-process/offer-item-data-process';
import {
  loadFavoritesAction,
  addFavoriteItemAction,
  removeFavoriteItemAction,
  clearFavoritesAction
} from './slices/favorites-data-process/favorites-data-process';
import browserHistory from '../browser-history';
import { FavoriteData } from '../types/favorite-data';

// CODE
const APIAction = {
  FETCH_OFFERS: 'data/fetchOffers',
  FETCH_OFFER_ITEM: 'data/fetchOfferItem',
  FETCH_NEARBY: 'data/fetchNearbyOffers',
  FETCH_COMMENTS: 'data/fetchComments',
  FETCH_COMMENT: 'data/fetchComment',
  FETCH_FAVORITES: 'data/fetchFavorites',
  TOGGLE_FAVORITE: 'data/toggleFavorite',
  USER_LOGIN: 'user/login',
  USER_LOGOUT: 'user/logout',
  USER_CHECK_AUTH: 'user/checkAuth',
} as const;

const SUCCESS_TEXT = {
  ADD_COMMENT: 'Thank you for opinion! Your comment successfully added!',
} as const;

const ERROR_TEXT = {
  ADD_COMMENT: 'Sorry! Can`t add you comment! Please, try again.',
  ADD_FAVORITE: 'Sorry! Can`t add this offer to favorites. Please, try again later.',
} as const;

type AsyncOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

// FAVORITES
export const fetchFavoritesAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.FETCH_FAVORITES,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.FAVORITE);

    dispatch(loadFavoritesAction(data));
  }
);

export const toggleFavoriteAction = createAsyncThunk<void, FavoriteData, AsyncOptions>(
  APIAction.TOGGLE_FAVORITE,
  async (
    { offerId, status },
    { dispatch, extra: api }
  ) => {
    try {
      const favoriteStatus = Number(status);
      const { data } = await api.post<Offer>(`${ APIRoute.FAVORITE }/${ offerId }/${ favoriteStatus }`);

      switch(favoriteStatus) {
        case 1: {
          // 1. Обновить список "Избранного" у пользователя
          dispatch(addFavoriteItemAction(data));
          break;
        }
        case 0: {
          dispatch(removeFavoriteItemAction(data));
          break;
        }
      }

      // 2. Обновить список офферов, а точнее - конкретный оффер и его статус избранного
      dispatch(updateOffersListAction(data));

      // 3. Если у нас открыт какой-то конкретней оффер - надо обновить и его,
      // т.к. он в отдельном стейте и дергается отдельным запросом
      dispatch(updateOfferItemFavoriteAction(status));
    } catch(error) {
      toast.warn(ERROR_TEXT.ADD_FAVORITE);
    }
  }
);

// AUTH
export const loginAction = createAsyncThunk<void, AuthData, AsyncOptions>(
  APIAction.USER_LOGIN,
  async (
    { email, password },
    { dispatch, extra: api }
  ) => {
    const { data } = await api.post<UserData>(
      APIRoute.LOGIN,
      { email, password }
    );
    const { token } = data;

    if(token) {
      setToken(token);
    }

    dispatch(fetchFavoritesAction());
    dispatch(setUserInfoAction(data));
    browserHistory.back(); // Реализуем возврат на страницу, с которой пришли авторизоваться
  }
);

export const logoutAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_LOGOUT,
  async (_arg, { dispatch, extra: api }) => {
    const currentPage = browserHistory.location.pathname;

    await api.delete(APIRoute.LOGOUT);
    deleteToken();

    dispatch(setUserInfoAction(null));
    dispatch(clearFavoritesAction());
    dispatch(clearOffersFavoriteStatus());
    dispatch(updateOfferItemFavoriteAction(false));

    /* Сделано чисто для ТЗ (чтобы при log-out, если мы на закрытой страничке,
      нас редиректило на Login-page вместо главной) */
    if(currentPage !== AppRoute.LOGIN) {
      browserHistory.push(currentPage);
    }

  }
);

export const checkAuthAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.LOGIN);
      dispatch(setUserInfoAction(data));
      dispatch(fetchFavoritesAction());
    } catch(error) {
      deleteToken();
      dispatch(setUserInfoAction(null));
    }
  }
);

// OFFERS
export const fetchOffersAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.FETCH_OFFERS,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.OFFERS);

    dispatch(loadOffersAction(data));
  }
);

export const fetchOfferItemAction = createAsyncThunk<void, OfferId, AsyncOptions>(
  APIAction.FETCH_OFFER_ITEM,
  async (
    offerId,
    {dispatch, extra: api}
  ) => {
    try {
      // Временно решаем проблему, когда в момент открытия очередного оффера
      // пользователь может увидеть ненадолго предыдущий открытый оффер
      dispatch(setOfferItemAction(null));

      const { data } = await api.get<Offer>(`${ APIRoute.OFFERS }/${ offerId }`);

      dispatch(setOfferItemAction(data));
    } catch(err) {
      dispatch(redirectToRoute(AppRoute.PAGE_404));
    }
  }
);

// NEARBY
export const fetchNeabyOffers = createAsyncThunk<void, OfferId, AsyncOptions>(
  APIAction.FETCH_NEARBY,
  async (
    offerId,
    { dispatch, extra: api }
  ) => {
    const { data } = await api.get<Offers>(`${ APIRoute.OFFERS }/${ offerId }${ APIRoute.NEAREST }`);

    dispatch(setNearbyAction(data));
  }
);

// COMMENTS
export const fetchComments = createAsyncThunk<void, OfferId, AsyncOptions>(
  APIAction.FETCH_COMMENTS,
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setCommentsLoadedStatusAction(false));

    const { data } = await api.get<Comments>(`${ APIRoute.COMMENTS }/${ offerId }`);

    dispatch(setCommentsLoadedStatusAction(true));
    dispatch(setCommentsAction(data));
  }
);

export const fetchCommentAction = createAsyncThunk<void, CommentData, AsyncOptions>(
  APIAction.FETCH_COMMENT,
  async ({ offerId, rating, comment }, { dispatch, extra: api }) => {
    dispatch(setAddCommentStatusAction(SEND_DATA_STATUS.LOADING));

    try {
      const { data } = await api.post<Comment>(
        `${APIRoute.COMMENTS}/${offerId}`,
        {rating, comment}
      );

      dispatch(setAddCommentStatusAction(SEND_DATA_STATUS.LOADED));
      dispatch(addCommentAction(data));

      toast.success(SUCCESS_TEXT.ADD_COMMENT);
    } catch(err) {
      dispatch(setAddCommentStatusAction(SEND_DATA_STATUS.ERROR));

      toast.warn(ERROR_TEXT.ADD_COMMENT);
    }

  }
);
