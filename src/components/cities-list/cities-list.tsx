import { cities } from '../../const';
import CitiesItem from '../cities-item/cities-item';
import useCitySelection from '../../hooks/useCitySelection';

export default function CitiesList(): React.ReactElement {
  const handleCitySelect = useCitySelection();

  return (
    <ul className="locations__list tabs__list" data-testid="citiesListElement">
      {
        cities && cities.slice()
          .map((city: string) => <CitiesItem key={ city } city={ city } onSelectCity={ handleCitySelect } />)
      }
    </ul>
  );
}
