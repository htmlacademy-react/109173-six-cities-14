import { renderHook } from '@testing-library/react';
import { makeMockCity } from '../utils/mock';
import useMap from './useMap';

describe('[Hook: useMap]:', () => {
  it('Should return "null" if Ref = null', () => {
    const cityInfo = makeMockCity();
    const mapRef = { current: null };

    const { result } = renderHook(() => useMap({ cityInfo, mapRef }));

    expect(result.current).toBe(null);
  });

  it('Should return Map-instance if Ref = HTMLElement', () => {
    const cityInfo = makeMockCity();
    const mapRef = { current: document.createElement('section') };

    const { result } = renderHook(() => useMap({ cityInfo, mapRef }));

    expect(result.current).not.toBe(null);
    expect(result.current).toBeDefined();
  });
});
