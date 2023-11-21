import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NAMESPACE } from '../../const';
import { OffersDataProcess } from '../../types/state';
import { Offer, Offers } from '../../types/offer';

const initialState: OffersDataProcess = {
  offer: null,
  offers: [],
  nearbyOffers: [],
};

export const offersDataProcess = createSlice({
  name: NAMESPACE.OFFERS,
  initialState,
  reducers: {
    setOffersAction: (state, action: PayloadAction<{ offers: Offers }>) => {
      state.offers = action.payload.offers;
    },
    loadOffersAction: (state, action: PayloadAction<{ offers: Offers }>) => {
      state.offers = action.payload.offers;
      state.offer = null;
    },
    loadOfferItemAction: (state, action: PayloadAction<{ offer: Offer }>) => {
      state.offer = action.payload.offer;
    },
  },
  extraReducers(builder) {
    console.log(builder);
  }
});
