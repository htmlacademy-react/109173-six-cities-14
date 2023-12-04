import { setMockBrowserHistory } from '../../utils/mock';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { State } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

setMockBrowserHistory();

describe('[Middleware Redirect]:', () => {
  let mockStore: MockStore;

  beforeAll(() => {
    const middleware = [ redirect ];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    mockStore = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('Should redirect to Page-404 when "redirectToRoute(AppRoute.PAGE_404)" action', () => {
    const redirectAction = redirectToRoute(AppRoute.PAGE_404);

    mockStore.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.PAGE_404);
  });

  it('Should redirect to "Main" when "redirectToRoute(AppRoute.MAIN)" action', () => {
    const redirectAction = redirectToRoute(AppRoute.MAIN);

    mockStore.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.MAIN);
  });

  it('Should not redirect to "Login" page route when passed empty type', () => {
    const emptyAction = { type: '', payload: AppRoute.LOGIN };

    mockStore.dispatch(emptyAction);

    expect(browserHistory.location.pathname).not.toBe(AppRoute.LOGIN);
  });

  it('Should not redirect to any route when passed empty action', () => {
    const emptyAction = { type: '', payload: '' };

    mockStore.dispatch(emptyAction);

    expect(browserHistory.location.pathname).toBe('');
  });
});
