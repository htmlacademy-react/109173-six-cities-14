import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NAMESPACE } from '../../const';
import { UserData } from '../../types/user-data';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { current } from '@reduxjs/toolkit';
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        // не всегда тут при удачном выполнении запроса пользователь должен быть авторизован
        // нужно продумать систему, основываясь на статусах, возвращаемых от сервера
        // state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(loginAction.rejected || logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  },
});

/* extraReducers(builder) {
  builder
    .addCase(checkAuthAction.fulfilled || loginAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.AUTH;
    })
    .addCase(
      checkAuthAction.rejected
      || loginAction.rejected
      || logoutAction.fulfilled,
      (state) => {
        console.log('Попали на разавторизацию');
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
}, */

export const { setUserInfoAction } = userProcess.actions;
