import { renderHook } from '@testing-library/react';
import { ReduxProviderWrapper } from '../components/redux-provider/redux-provider';
import useNearbyOffer from './useNearbyOffer';
import { makeMockOffer } from '../utils/mock';
import * as selectors from '.';

describe('[Hook: useNearbyOffers]:', () => {
  it('Should return empty array', () => {
    const offerId = '';
    const wrapper = ReduxProviderWrapper;
    const { result } = renderHook(() => useNearbyOffer({ offerId }), { wrapper });

    expect(result.current).toEqual([]);
  });

  it('Should call useAppSelector and return array with 2 offers', () => {
    const offerId = '';
    const offer = makeMockOffer();
    const wrapper = ReduxProviderWrapper;
    const expectedValue = [ offer, offer ];
    vi.spyOn(selectors, 'useAppSelector').mockReturnValue(expectedValue);

    const { result } = renderHook(() => useNearbyOffer({ offerId }), { wrapper });

    expect(selectors.useAppSelector).toBeCalled();
    expect(result.current).toEqual(expectedValue);
  });
});
