import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NAMESPACE } from '../../../const';
import { FavoritesDataProcess } from '../../../types/state';
import { Offers } from '../../../types/offer';

const initialState: FavoritesDataProcess = {
  favorites: [],
};

export const favoritesDataProcess = createSlice({
  name: NAMESPACE.FAVORITES,
  initialState,
  reducers: {
    loadFavoritesAction: (state, action: PayloadAction<{ offers: Offers }>) => {
      state.favorites = action.payload.offers;
    },
  },
});

export const { loadFavoritesAction } = favoritesDataProcess.actions;
