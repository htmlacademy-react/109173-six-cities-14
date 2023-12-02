import { renderHook } from '@testing-library/react';
import { ReduxProviderWrapper } from '../components/redux-provider/redux-provider';
import useReview from './useReview';
import { makeMockComment } from '../utils/mock';
import * as selectors from '.';

describe('[Hook: useReview]:', () => {
  it('Should return empty array', () => {
    const offerId = '';
    const wrapper = ReduxProviderWrapper;
    const { result } = renderHook(() => useReview({ offerId }), { wrapper });

    expect(result.current).toEqual([]);
  });

  it('Should call useAppSelector and return Comments array', () => {
    const offerId = '';
    const comment = makeMockComment();
    const expectedValue = [ comment ];
    const wrapper = ReduxProviderWrapper;
    vi.spyOn(selectors, 'useAppSelector').mockReturnValue(expectedValue);

    const { result } = renderHook(() => useReview({ offerId }), { wrapper });

    expect(selectors.useAppSelector).toBeCalled();
    expect(result.current).toEqual(expectedValue);
  });
});
