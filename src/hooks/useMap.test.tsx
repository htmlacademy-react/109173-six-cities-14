import { renderHook } from '@testing-library/react';
import { makeMockCity } from '../utils/mock';
import useMap from './useMap';

describe('[Hook: useMap]:', () => {
  it('Should return "Map"', () => {
    const cityInfo = makeMockCity();
    const mapRef = { current: null };

    const { result } = renderHook(() => useMap({ cityInfo, mapRef }));

    console.log('--------------------- MAP: ', result);

    // expect(typeof result.current).toBe('function');
  });
});
