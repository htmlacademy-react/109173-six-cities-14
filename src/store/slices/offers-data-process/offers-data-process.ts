import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NAMESPACE } from '../../../const';
import { OffersDataProcess } from '../../../types/state';
import { Offers } from '../../../types/offer';

const initialState: OffersDataProcess = {
  offers: [],
};

export const offersDataProcess = createSlice({
  name: NAMESPACE.OFFERS,
  initialState,
  reducers: {
    loadOffersAction: (state, action: PayloadAction<{ offers: Offers }>) => {
      state.offers = action.payload.offers;
    },
  },
});

export const { loadOffersAction } = offersDataProcess.actions;
