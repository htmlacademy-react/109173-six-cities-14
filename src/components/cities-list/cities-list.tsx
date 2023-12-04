import useCitySelection from '../../hooks/useCitySelection';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/slices/city-process/selectors';

import { cities } from '../../const';
import CitiesItem from '../cities-item/cities-item';

export default function CitiesList(): React.ReactElement {
  const handleCitySelect = useCitySelection();
  const selectedCity = useAppSelector(getCity);

  return (
    <ul className="locations__list tabs__list" data-testid="citiesListElement">
      {
        cities && cities.slice()
          .map((city: string) => <CitiesItem key={ city } city={ city } isSelectedCity={ selectedCity === city } onSelectCity={ handleCitySelect } />)
      }
    </ul>
  );
}
