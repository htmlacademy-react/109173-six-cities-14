import { APIRoute } from '../const';
import { extractActionsTypes, getFakeStore, makeMockComment, setMockBrowserHistory } from '../utils/mock';
import { checkAuthAction, fetchCommentAction, fetchComments, fetchFavoritesAction, fetchNeabyOffers, fetchOfferItemAction, fetchOffersAction, loginAction, logoutAction, toggleFavoriteAction } from './api-action';
import { setUserInfoAction } from './slices/user-process/user-process';
import * as tokenStorage from '../services/token';
import { clearOffersFavoriteStatus, loadOffersAction, updateOffersListAction } from './slices/offers-data-process/offers-data-process';
import { addCommentAction, setAddCommentStatusAction, setCommentsAction, setCommentsLoadedStatusAction, setNearbyAction, setOfferItemAction, updateOfferItemFavoriteAction } from './slices/offer-item-data-process/offer-item-data-process';
import { redirectToRoute } from './action';
import { addFavoriteItemAction, clearFavoritesAction, loadFavoritesAction, removeFavoriteItemAction } from './slices/favorites-data-process/favorites-data-process';
import browserHistory from '../browser-history';

setMockBrowserHistory();

describe('[API async actions]:', () => {
  const { mockAxiosAdapter, mockStoreCreator } = getFakeStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('[Auth actions]:', () => {
    it('Should dispatch "loginAction.pending" & "loginAction.fulfilled" & "setUserInfoAction" and redirect to previous page (back) when "loginAction"', async () => {
      const mockUser = { email: 'test@test.me', password: 'Af2egf24t4' };
      const mockServerReply = { token: 'some_secret_token' };
      const mockSaveToken = vi.spyOn(tokenStorage, 'setToken');
      mockAxiosAdapter.onPost(APIRoute.LOGIN).reply(200, mockServerReply);
      const expectedActions = [
        loginAction.pending.type,
        fetchFavoritesAction.pending.type,
        setUserInfoAction.type,
        loginAction.fulfilled.type,
      ];
      browserHistory.push('/login');

      await store.dispatch(loginAction(mockUser));
      const actions = extractActionsTypes(store.getActions());

      // Возможно, стоит разбить на несолько тестов
      expect(actions).toEqual(expectedActions);
      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(mockServerReply.token);
      expect(browserHistory.location.pathname).toBe('');
    });

    it('Should remove token from localStorage, setUserInfo to "null" and dispatch "clearFavoritesAction" when "logoutAction"', async () => {
      const mockDeleteToken = vi.spyOn(tokenStorage, 'deleteToken');
      mockAxiosAdapter.onDelete(APIRoute.LOGOUT).reply(204);
      const expectedActions = [
        logoutAction.pending.type,
        setUserInfoAction.type,
        clearFavoritesAction.type,
        clearOffersFavoriteStatus.type,
        updateOfferItemFavoriteAction.type,
        logoutAction.fulfilled.type
      ];
      vi.spyOn(browserHistory, 'push');

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(mockDeleteToken).toBeCalledTimes(1);
      expect(tokenStorage.getToken()).toBe('');
      expect(actions).toEqual(expectedActions);
      expect(browserHistory.push).toBeCalled();
    });

    it('Should dispatch "setUserInfoAction" when "checkAuthAction.fulfilled"', async () => {
      const mockServerReply = { token: 'some_secret_token' };
      mockAxiosAdapter.onGet(APIRoute.LOGIN).reply(200, mockServerReply);
      const expectedActions = [
        checkAuthAction.pending.type,
        setUserInfoAction.type,
        fetchFavoritesAction.pending.type,
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

  const offerId = 'be7380d9-95b4-4cef-ae28-0ac71e1ebce6';

  describe('[Offers actions]:', () => {
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

  describe('[Nearby offers actions]:', () => {
    it('Should dispatch "setNearbyAction" when "fetchNeabyOffers.fulfilled"', async () => {
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

  describe('[Favorites offers actions]:', () => {
    it('Should dispatch "loadFavoritesAction" when "fetchFavoritesAction.fulfilled"', async () => {
      mockAxiosAdapter.onGet(APIRoute.FAVORITE).reply(200);
      const expectedActions = [
        fetchFavoritesAction.pending.type,
        loadFavoritesAction.type,
        fetchFavoritesAction.fulfilled.type,
      ];

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

    it('Should dispatch "addFavoriteItemAction", "updateOffersListAction" and "updateOfferItemFavoriteAction" when "toggleFavoriteAction.fulfilled" and status = 1', async () => {
      const status = 1;
      mockAxiosAdapter.onPost(`${ APIRoute.FAVORITE }/${ offerId }/${ status }`).reply(200);
      const expectedActions = [
        toggleFavoriteAction.pending.type,
        addFavoriteItemAction.type,
        updateOffersListAction.type,
        updateOfferItemFavoriteAction.type,
        toggleFavoriteAction.fulfilled.type,
      ];

      await store.dispatch(toggleFavoriteAction({ offerId, status: Boolean(status) }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

    it('Should dispatch "removeFavoriteItemAction", -//-//-//- and status = 0', async () => {
      const status = 0;
      mockAxiosAdapter.onPost(`${ APIRoute.FAVORITE }/${ offerId }/${ status }`).reply(200);
      const expectedActions = [
        toggleFavoriteAction.pending.type,
        removeFavoriteItemAction.type,
        updateOffersListAction.type,
        updateOfferItemFavoriteAction.type,
        toggleFavoriteAction.fulfilled.type,
      ];

      await store.dispatch(toggleFavoriteAction({ offerId, status: Boolean(status) }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });
  });

  describe('[Comments actions]:', () => {
    it('Should dispatch "setCommentsLoadedStatusAction" twice and "setCommentsAction" when "fetchComments.fulfilled"', async () => {
      mockAxiosAdapter.onGet(`${ APIRoute.COMMENTS }/${ offerId }`).reply(200);
      const expectedActions = [
        fetchComments.pending.type,
        setCommentsLoadedStatusAction.type,
        setCommentsLoadedStatusAction.type,
        setCommentsAction.type,
        fetchComments.fulfilled.type,
      ];

      await store.dispatch(fetchComments(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

    it('Should dispatch "addCommentAction" and "setAddCommentStatusAction" when "fetchCommentAction.fulfilled"', async () => {
      const { rating, comment } = makeMockComment();
      mockAxiosAdapter.onPost(`${ APIRoute.COMMENTS }/${ offerId }`).reply(200);
      const expectedActions = [
        fetchCommentAction.pending.type,
        setAddCommentStatusAction.type,
        setAddCommentStatusAction.type,
        addCommentAction.type,
        fetchCommentAction.fulfilled.type,
      ];

      await store.dispatch(fetchCommentAction({ offerId, rating, comment }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

    it('Should dispatch "setAddCommentStatusAction" when "fetchCommentAction.fulfilled", but server response !== 200 status', async () => {
      const { rating, comment } = makeMockComment();
      mockAxiosAdapter.onPost(`${ APIRoute.COMMENTS }/${ offerId }`).reply(400);
      const expectedActions = [
        fetchCommentAction.pending.type,
        setAddCommentStatusAction.type,
        setAddCommentStatusAction.type,
        fetchCommentAction.fulfilled.type,
      ];

      await store.dispatch(fetchCommentAction({ offerId, rating, comment }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });
  });
});
