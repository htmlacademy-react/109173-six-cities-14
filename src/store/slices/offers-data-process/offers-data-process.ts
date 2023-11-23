import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NAMESPACE } from '../../../const';
import { OffersDataProcess } from '../../../types/state';
import { Offers } from '../../../types/offer';
import { fetchOffersAction } from '../../api-action';

const initialState: OffersDataProcess = {
  offers: [],
  isOffersLoading: false,
};

export const offersDataProcess = createSlice({
  name: NAMESPACE.OFFERS,
  initialState,
  reducers: {
    loadOffersAction: (state, action: PayloadAction<{ offers: Offers }>) => {
      state.offers = action.payload.offers;
    },
    setOffersLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersLoading = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      });
  }
});

export const { loadOffersAction, setOffersLoadingStatus } = offersDataProcess.actions;
