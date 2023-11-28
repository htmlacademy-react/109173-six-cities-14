import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NAMESPACE } from '../../../const';
import { FavoritesDataProcess } from '../../../types/state';
import { Offer, Offers } from '../../../types/offer';

const initialState: FavoritesDataProcess = {
  favorites: [],
};

export const favoritesDataProcess = createSlice({
  name: NAMESPACE.FAVORITES,
  initialState,
  reducers: {
    loadFavoritesAction: (state, action: PayloadAction<Offers>) => {
      state.favorites = action.payload;
    },

    // FAVORITE
    addFavoriteItemAction: (state, action: PayloadAction<Offer>) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteItemAction: (state, action: PayloadAction<Offer>) => {
      const offerId = action.payload.id;

      state.favorites = state.favorites.filter((item) => item.id !== offerId);
    }
  },
});

export const { loadFavoritesAction, addFavoriteItemAction, removeFavoriteItemAction } = favoritesDataProcess.actions;
