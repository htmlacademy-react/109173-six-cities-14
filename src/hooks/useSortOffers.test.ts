import { renderHook } from '@testing-library/react';
import useSortOffers from './useSortOffers';
import { makeMockOffer } from '../utils/mock';
import { act } from 'react-dom/test-utils';

describe('[Hook: useSortOffers]:', () => {
  it('Should return array with length = 3', () => {
    const offer = makeMockOffer();
    const offers = [ offer ];

    const { result } = renderHook(() => useSortOffers(offers));

    expect(result.current.length).toBe(3);
    expect(result.current).toBeInstanceOf(Array);
    expect(typeof result.current.at(2)).toBe('function');
  });

  it('Should sort Offers. At first place to be third offer', () => {
    const offerOne = makeMockOffer();
    offerOne.rating = 4;
    const offerTwo = makeMockOffer();
    offerTwo.rating = 1;
    const offerThree = makeMockOffer();
    offerThree.rating = 5;
    const offers = [ offerOne, offerTwo, offerThree ];

    const { result } = renderHook(() => useSortOffers(offers));
    const [, , handleSortChange] = result.current;

    act(() => handleSortChange('Top rated first'));
    const [sortedOffers] = result.current;

    expect(sortedOffers).not.toEqual(offers);
    expect(sortedOffers.at(0)).toEqual(offerThree);
    expect(sortedOffers.at(1)).toEqual(offerOne);
    expect(sortedOffers.at(2)).toEqual(offerTwo);
  });
});
