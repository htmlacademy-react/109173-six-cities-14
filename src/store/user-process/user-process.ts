import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NAMESPACE } from '../../const';
import { UserData } from '../../types/user-data';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';

const initialState: UserProcess = {
  favorites: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userInfo: null,
};


export const userProcess = createSlice({
  name: NAMESPACE.USER,
  initialState,
  reducers: {
    setUserInfoAction: (state, action: PayloadAction<UserData | null>) => {
      state.userInfo = action.payload;
      state.authorizationStatus = AuthorizationStatus.AUTH;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  },
});

export const { setUserInfoAction } = userProcess.actions;
