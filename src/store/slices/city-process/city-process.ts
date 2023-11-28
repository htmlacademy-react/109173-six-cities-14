import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NAMESPACE } from '../../../const';
import { CityProcess } from '../../../types/state';

const initialState: CityProcess = {
  city: DEFAULT_CITY,
};

export const cityProcess = createSlice({
  name: NAMESPACE.CITY,
  initialState,
  reducers: {
    setCityAction: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    }
  },
});

export const { setCityAction } = cityProcess.actions;
