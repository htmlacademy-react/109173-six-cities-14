import { renderHook } from '@testing-library/react';
import { ReduxProviderWrapper } from '../components/redux-provider/redux-provider';
import useFavorite from './useFavorite';
import { extractActionsTypes, getFakeStore, makeMockOffer, makeMockStoreState } from '../utils/mock';
import * as navigate from 'react-router';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../const';
import { act } from 'react-dom/test-utils';
import { getHookStoreWrapper } from '../utils/mock-components';

describe('[Hook: useFavorite]:', () => {
  let useNavigateFunc;
  let initialMockHistory: MemoryHistory;

  beforeAll(() => {
    initialMockHistory = createMemoryHistory();
    useNavigateFunc = (route: string) => initialMockHistory.push(route);
    vi.spyOn(navigate, 'useNavigate').mockReturnValue(useNavigateFunc);
  });

  beforeEach(() => {
    initialMockHistory.push('/basepage');
  });

  it('Should return "handleFavoriteClick" callback', () => {
    const offer = makeMockOffer();
    const wrapper = ReduxProviderWrapper;
    const { result } = renderHook(() => useFavorite({ id: offer.id, isFavorite: offer.isFavorite }), { wrapper });

    expect(typeof result.current).toBe('function');
  });

  it('Should redirect to Login page if user isn`t authorized', () => {
    const offer = makeMockOffer();
    const initialMockStore = makeMockStoreState({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userInfo: null,
      },
    });
    const { mockStoreCreator } = getFakeStore();
    const store = mockStoreCreator(initialMockStore);
    const wrapper = getHookStoreWrapper(store);

    const { result } = renderHook(() => useFavorite({ id: offer.id, isFavorite: offer.isFavorite }), { wrapper });
    const handleFavoriteClick = result.current;

    act(handleFavoriteClick);

    expect(initialMockHistory.location.pathname).toBe(AppRoute.LOGIN);
  });

  it('Should change Offer`s isFavorite status when user is authorized', () => {
    const offer = makeMockOffer();
    const initialMockStore = makeMockStoreState({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: null,
      },
      OFFERS: {
        offers: [ offer ],
        isOffersLoading: false,
      }
    });
    const { mockStoreCreator } = getFakeStore();
    const store = mockStoreCreator(initialMockStore);
    const wrapper = getHookStoreWrapper(store);
    const expectedAction = [ 'data/toggleFavorite/pending' ];

    const { result } = renderHook(() => useFavorite({ id: offer.id, isFavorite: offer.isFavorite }), { wrapper });
    const handleFavoriteClick = result.current;
    act(handleFavoriteClick);
    const actions = extractActionsTypes(store.getActions());

    expect(initialMockHistory.location.pathname).toBe('/basepage');
    expect(actions).toEqual(expectedAction);
  });
});
