import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes } from '../utils/mock';

import { createAPI } from '../services/api';
import { APIRoute } from '../const';
import { loginAction } from './api-action';
import { setUserInfoAction } from './slices/user-process/user-process';

vi.mock('../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('[API async actions]:', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  // let store: ReturnType<typeof mockStoreCreator>;
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  it(`Should dispatch
    "loginAction.pending" &
    "loginAction.fulfilled" &
    "setUserInfoAction"
    when "loginAction"`, async () => {

    const mockUser = {
      email: 'test@test.me',
      password: 'Af2egf24t4'
    };
    const mockServerReply = { token: 'some_secret_token' };
    mockAxiosAdapter.onPost(APIRoute.LOGIN).reply(200, mockServerReply);
    const expectedActions = [
      loginAction.pending.type,
      loginAction.fulfilled.type,
      setUserInfoAction.type,
    ];

    await store.dispatch(loginAction(mockUser));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual(expectedActions);
    // expect(setUserInfoAction).toBeCalledTimes(1);
  });
  // it('', () => {});
});
