import { renderHook } from '@testing-library/react';
import { ReduxProviderWrapper } from '../components/redux-provider/redux-provider';
import useFavorite from './useFavorite';
import { makeMockOffer } from '../utils/mock';

describe('[Hook: useFavorite]:', () => {
  it('Should return "handleFavoriteClick" callback', () => {
    const offer = makeMockOffer();
    const wrapper = ReduxProviderWrapper;
    const { result } = renderHook(() => useFavorite({ id: offer.id, isFavorite: offer.isFavorite }), { wrapper });

    expect(typeof result.current).toBe('function');
  });
});
