import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, Namespace } from '../../../const';
import { UserData } from '../../../types/user-data';
import { UserProcess } from '../../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../../api-action';
import { getToken } from '../../../services/token';

const initialState: UserProcess = {
  favorites: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userInfo: null,
};

export const userProcess = createSlice({
  name: Namespace.USER,
  initialState,
  reducers: {
    setUserInfoAction: (state, action: PayloadAction<UserData | null>) => {
      state.userInfo = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        if(getToken() !== '') {
          state.authorizationStatus = AuthorizationStatus.AUTH;
          return;
        }

        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
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
