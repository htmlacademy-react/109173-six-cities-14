import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { APIRoute, AppRoute, AuthorizationStatus, SEND_DATA_STATUS } from '../const';

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
  addCommentAction,
  setAddCommentStatusAction,
  redirectToRoute,
} from './action';
import { Comment, Comments } from '../types/comment';
import { AuthData } from '../types/auth-data';
import { deleteToken, setToken } from '../services/token';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data';

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
  FETCH_COMMENT: 'data/fetchComment',
  FETCH_FAVORITES: 'data/fetchFavorites',
  USER_LOGIN: 'user/login',
  USER_LOGOUT: 'user/logout',
  USER_CHECK_AUTH: 'user/checkAuth',
};

const ERROR_TEXT = {
  ADD_COMMENT: 'Sorry! Can`t add you comment! Please, try again.',
};

const SUCCESS_TEXT = {
  ADD_COMMENT: 'Congratulations! Your commet successfully added!',
};

const CLEAR_COMMENT_STATUS_TIMEOUT = 3000;

// TODO: Много шаблонного кода - вынести во вспомогательную функцию

export const loginAction = createAsyncThunk<void, AuthData, AsyncOptions>(
  APIAction.USER_LOGIN,
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(
      APIRoute.LOGIN,
      { email, password }
    );
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
    try {
      const { data } = await api.get<Offer>(`${APIRoute.OFFERS}/${offerID}`);

      dispatch(setCommentsLoadedStatusAction(false));
      dispatch(loadOfferItemAction({ offer: data }));
    } catch(err) {
      console.log('тут блять');
      dispatch(redirectToRoute('/page404'));
    }
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

export const fetchCommentAction = createAsyncThunk<void, CommentData, AsyncOptions>(
  APIAction.FETCH_COMMENT,
  async ({ offerID, rating, comment }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Comment>(
        `${APIRoute.COMMENTS}/${offerID}`,
        {rating, comment}
      );

      toast.success(SUCCESS_TEXT.ADD_COMMENT);

      dispatch(addCommentAction(data));
      dispatch(setAddCommentStatusAction(SEND_DATA_STATUS.LOADED));

      setTimeout(() => dispatch(setAddCommentStatusAction(SEND_DATA_STATUS.NONE)), CLEAR_COMMENT_STATUS_TIMEOUT);
    } catch(err) {
      dispatch(setAddCommentStatusAction(SEND_DATA_STATUS.ERROR));

      toast.warn(ERROR_TEXT.ADD_COMMENT);

      setTimeout(() => dispatch(setAddCommentStatusAction(SEND_DATA_STATUS.NONE)), CLEAR_COMMENT_STATUS_TIMEOUT);
    }

  }
);
