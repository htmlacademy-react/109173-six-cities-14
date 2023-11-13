import { createReducer } from '@reduxjs/toolkit';

import { setCityAction, loadOffersAction, setOffersAction } from './action';
import { cities } from '../const';
import { Cities } from '../types/city';
import { Offers } from '../types/offer';


type initialState = {
  city: string;
  cities: Cities;
  offers: Offers;
};

const initialState: initialState = {
  city: cities[0],
  cities: [],
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityAction, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    });
});
