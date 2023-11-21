import { cities } from '../../const';
import CityItem from '../city-item/city-item';
import useCitySelection from '../../hooks/useCitySelection';

export default function CitiesList(): React.ReactElement {
  const handleCitySelect = useCitySelection();

  return (
    <ul className="locations__list tabs__list">
      {
        cities && cities.slice()
          .map((city: string) => <CityItem key={ city } city={ city } onSelectCity={ handleCitySelect }/>)
      }
    </ul>
  );
}
