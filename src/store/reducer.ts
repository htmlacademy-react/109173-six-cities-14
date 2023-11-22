import { createReducer } from '@reduxjs/toolkit';

import {
  setCityAction,
} from './action';

const DEFAULT_CITY = 'Paris';

type initialState = {
  city: string;
};

const initialState: initialState = {
  city: DEFAULT_CITY,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    // CITY
    .addCase(setCityAction, (state, action) => {
      state.city = action.payload.city;
    });
});
