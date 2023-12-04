import { renderHook } from '@testing-library/react';
import { ReduxProviderWrapper } from '../components/redux-provider/redux-provider';
import { makeMockOffer } from '../utils/mock';
import * as selectors from '.';
import useOfferItem from './useOfferItem';

describe('[Hook: useOffer]:', () => {
  it('Should return null', () => {
    const offerId = '';
    const wrapper = ReduxProviderWrapper;
    const { result } = renderHook(() => useOfferItem({ offerId }), { wrapper });

    expect(result.current).toBeNull();
  });

  it('Should call useAppSelector and return Offer', () => {
    const offerId = '';
    const offer = makeMockOffer();
    const wrapper = ReduxProviderWrapper;
    vi.spyOn(selectors, 'useAppSelector').mockReturnValue(offer);

    const { result } = renderHook(() => useOfferItem({ offerId }), { wrapper });

    expect(selectors.useAppSelector).toBeCalled();
    expect(result.current).toEqual(offer);
  });
});
