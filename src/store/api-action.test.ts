import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';

import { APIRoute } from '../const';
import { AppThunkDispatch, extractActionsTypes } from '../utils/mock';
import { createAPI } from '../services/api';
import { checkAuthAction, fetchNeabyOffers, fetchOfferItemAction, fetchOffersAction, loginAction, logoutAction } from './api-action';
import { setUserInfoAction } from './slices/user-process/user-process';
import * as tokenStorage from '../services/token';
import { loadOffersAction } from './slices/offers-data-process/offers-data-process';
import { setNearbyAction, setOfferItemAction } from './slices/offer-item-data-process/offer-item-data-process';
import { redirectToRoute } from './action';

vi.mock('../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    },
    back() {
      this.location.pathname = '';
    }
  }
}));

describe('[API async actions]:', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('Auth actions:', () => {
    it('Should dispatch "loginAction.pending" & "loginAction.fulfilled" & "setUserInfoAction" when "loginAction"', async () => {
      const mockUser = { email: 'test@test.me', password: 'Af2egf24t4' };
      const mockServerReply = { token: 'some_secret_token' };
      const mockSaveToken = vi.spyOn(tokenStorage, 'setToken');
      mockAxiosAdapter.onPost(APIRoute.LOGIN).reply(200, mockServerReply);
      const expectedActions = [
        loginAction.pending.type,
        setUserInfoAction.type,
        loginAction.fulfilled.type,
      ];

      await store.dispatch(loginAction(mockUser));
      const actions = extractActionsTypes(store.getActions());

      // Возможно, стоит разбить на несолько тестов
      expect(actions).toEqual(expectedActions);
      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(mockServerReply.token);
    });

    it('Should remove token from localStorage and setUserInfo to null when "logoutAction"', async () => {
      const mockDeleteToken = vi.spyOn(tokenStorage, 'deleteToken');
      mockAxiosAdapter.onDelete(APIRoute.LOGOUT).reply(204);

      await store.dispatch(logoutAction());

      expect(mockDeleteToken).toBeCalledTimes(1);
      expect(tokenStorage.getToken()).toBe('');
    });

    it('Should dispatch "setUserInfoAction" when "checkAuthAction.fulfilled"', async () => {
      const mockServerReply = { token: 'some_secret_token' };
      mockAxiosAdapter.onGet(APIRoute.LOGIN).reply(200, mockServerReply);
      const expectedActions = [
        checkAuthAction.pending.type,
        setUserInfoAction.type,
        checkAuthAction.fulfilled.type,
      ];

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

    it('Should dispatch "setUserInfoAction" and "deleteToken" when "checkAuthAction.fulfilled" but user not auth', async () => {
      const mockDeleteToken = vi.spyOn(tokenStorage, 'deleteToken');
      mockAxiosAdapter.onGet(APIRoute.LOGIN).reply(401);
      const expectedActions = [
        checkAuthAction.pending.type,
        setUserInfoAction.type,
        checkAuthAction.fulfilled.type,
      ];

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
      expect(mockDeleteToken).toBeCalledTimes(1);
    });
  });

  describe('Offers actions:', () => {
    it('Should dispatch "loadOffersAction" when "fetchOffersAction.fulfilled"', async () => {
      mockAxiosAdapter.onGet(APIRoute.OFFERS).reply(200);
      const expectedActions = [
        fetchOffersAction.pending.type,
        loadOffersAction.type,
        fetchOffersAction.fulfilled.type,
      ];

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

    it('Should dispatch "setOfferItemAction" when "fetchOfferItemAction.pending" and  "setOfferItemAction" when "fetchOfferItemAction.fulfilled"', async () => {
      const offerId = 'be7380d9-95b4-4cef-ae28-0ac71e1ebce6';
      mockAxiosAdapter.onGet(`${ APIRoute.OFFERS}/${ offerId }`).reply(200);
      const expectedActions = [
        fetchOfferItemAction.pending.type,
        setOfferItemAction.type,
        setOfferItemAction.type,
        fetchOfferItemAction.fulfilled.type,
      ];

      await store.dispatch(fetchOfferItemAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

    it('Should dispatch "redirectToRoute" when "fetchOfferItemAction.fulfilled", but server response !== 200 status', async () => {
      const offerId = 'be7380d9-95b4-4cef-ae28-0ac71e1ebce6';
      mockAxiosAdapter.onGet(`${ APIRoute.OFFERS}/${ offerId }`).reply(404);
      const expectedActions = [
        fetchOfferItemAction.pending.type,
        setOfferItemAction.type,
        redirectToRoute.type,
        fetchOfferItemAction.fulfilled.type,
      ];

      await store.dispatch(fetchOfferItemAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

  });

  describe('Nearby offers actions:', () => {
    it('Should dispatch "setNearbyAction" when "fetchNeabyOffers.fulfilled"', async () => {
      const offerId = 'be7380d9-95b4-4cef-ae28-0ac71e1ebce6';
      mockAxiosAdapter.onGet(`${ APIRoute.OFFERS }/${ offerId }${ APIRoute.NEAREST }`).reply(200);
      const expectedActions = [
        fetchNeabyOffers.pending.type,
        setNearbyAction.type,
        fetchNeabyOffers.fulfilled.type,
      ];

      await store.dispatch(fetchNeabyOffers(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });
  });
  // it('', () => {});
});
