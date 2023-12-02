
import { renderHook } from '@testing-library/react';
import useCitySelection from './useCitySelection';
import { ReduxProviderWrapper } from '../components/redux-provider/redux-provider';

describe('[Hook: useCitySelection]:', () => {
  it('Should return "handleCitySelect" callback', () => {
    const wrapper = ReduxProviderWrapper;
    const { result } = renderHook(() => useCitySelection(), { wrapper });

    expect(typeof result.current).toBe('function');
  });
});
