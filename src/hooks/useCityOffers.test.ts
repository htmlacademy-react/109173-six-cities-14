
import { renderHook } from '@testing-library/react';
import useCityOffers from './useCityOffers';
import { getFakeStore, makeMockOffer, makeMockStoreState } from '../utils/mock';
import { getHookStoreWrapper } from '../utils/mock-components';
import { Offers } from '../types/offer';

describe('[Hook: useCityOffers]:', () => {
  let offer;
  let offers: Offers;

  beforeAll(() => {
    offer = makeMockOffer();
    offer.city.name = 'Amsterdam';
    offers = [ offer ];
  });

  it('Should return empty array when Incorrect city-name set in state', () => {
    const { mockStoreCreator } = getFakeStore();
    const initialMockState = makeMockStoreState({
      CITY: {
        city: 'Sheldon Cooper',
      },
      OFFERS: {
        offers: offers,
        isOffersLoading: false,
      }
    });
    const store = mockStoreCreator(initialMockState);
    const wrapper = getHookStoreWrapper(store);
    const { result } = renderHook(() => useCityOffers(), { wrapper });

    expect(result.current).toEqual([]);
  });

  it('Should return Array with 1 element  when correct city-name set in state', () => {
    const { mockStoreCreator } = getFakeStore();
    const initialMockState = makeMockStoreState({
      CITY: {
        city: 'Amsterdam',
      },
      OFFERS: {
        offers: offers,
        isOffersLoading: false,
      }
    });
    const store = mockStoreCreator(initialMockState);
    const wrapper = getHookStoreWrapper(store);
    const { result } = renderHook(() => useCityOffers(), { wrapper });

    expect(result.current).toEqual(offers);
  });
});
