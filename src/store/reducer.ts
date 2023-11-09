import { createReducer } from '@reduxjs/toolkit';

import { changeCityAction, setOffersAction } from './action';
import { cities } from '../mocks/cities';
import { offers } from '../mocks/offers';

const initialState = {
  city: cities[3],
  offers: offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    });
});
