import { render, renderHook } from '@testing-library/react';
import { makeMockCity } from '../utils/mock';
import { useRef } from 'react';
import useMap from './useMap';

describe('[Hook: useMap]:', () => {
  it('Should return "Map"', () => {
    const cityInfo = makeMockCity();
    const mapRef = useRef(null);
    const mapContainer = <section ref={ mapRef }></section>;

    const { result } = renderHook(() => useMap({ cityInfo, mapRef }));
    render(mapContainer);

    console.log('--------------------- MAP: ', result.current);

    // expect(typeof result.current).toBe('function');
  });
});
