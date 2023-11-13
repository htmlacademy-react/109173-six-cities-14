import { createReducer } from '@reduxjs/toolkit';

import { changeCityAction, loadOffersAction, setOffersAction } from './action';
import { cities } from '../mocks/cities';
import { City } from '../types/city';
import { Offers } from '../types/offer';


type initialState = {
  city: City;
  offers: Offers;
};

const initialState: initialState = {
  city: cities[0],
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    });
});
