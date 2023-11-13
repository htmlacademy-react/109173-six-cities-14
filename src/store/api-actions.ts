import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { Offers } from '../types/offer';

import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { loadOffersAction } from './action';

type AsyncOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

const APIAction = {
  DATA_FETCH_OFFERS: 'data/fetchOffers',
};

export const fetchOffersAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.DATA_FETCH_OFFERS,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.OFFERS);

    dispatch(loadOffersAction({ offers: data }));
  }
);
