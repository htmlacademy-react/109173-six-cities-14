import { createReducer } from '@reduxjs/toolkit';

import { loadOffersAction, setOffersAction } from './action';
import { Offers } from '../types/offer';

export const DEFAULT_CITY = 'Paris';

type initialState = {
  city: string;
  offers: Offers;
};

const initialState: initialState = {
  city: DEFAULT_CITY,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    });
});
