import { useAppDispatch } from '.';
import { cities } from '../const';
import { setCityAction } from '../store/action';


export default function useCitySelection() {
  const dispatch = useAppDispatch();

  function handleCitySelect(evt: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = (evt.target as HTMLElement);
    const targetCity = target.textContent;
    const selectedCity = cities.find((city) => city === targetCity);

    if(selectedCity !== undefined) {
      dispatch(setCityAction({ city: selectedCity }));
    }
  }

  return handleCitySelect;
}