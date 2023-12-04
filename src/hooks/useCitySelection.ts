import { useAppDispatch } from '.';
import { setCityAction } from '../store/slices/city-process/city-process';

import { cities } from '../const';

export default function useCitySelection() {
  const dispatch = useAppDispatch();

  function handleCitySelect(evt: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = (evt.target as HTMLElement);
    const targetCity = target.textContent;
    const selectedCity = cities.find((city) => city === targetCity);

    if(selectedCity !== undefined) {
      dispatch(setCityAction(selectedCity));
    }
  }

  return handleCitySelect;
}
