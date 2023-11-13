import { useAppSelector } from '../../hooks';
import { City, Cities } from '../../types/city';
import cn from 'classnames';

type CitiesListProps = {
  cities: Cities;
  onSelectCity: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

type CityProps = {
  cityName: string;
} & Pick<CitiesListProps, 'onSelectCity'>;

function CityItem({ cityName, onSelectCity }: CityProps): React.ReactNode {
  const selectedCity = useAppSelector((state) => state.city);
  const isSelectedCity = (selectedCity.name === cityName);

  return (
    <li className="locations__item" onClick={ (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      evt.preventDefault();

      onSelectCity(evt);
    }}
    >
      <a className={cn(
        'locations__item-link tabs__item',
        {'tabs__item tabs__item--active': isSelectedCity}
      )} href="#"
      >
        <span>{ cityName }</span>
      </a>
    </li>
  );
}

export default function CitiesList({ cities, onSelectCity }: CitiesListProps): React.ReactElement {
  return (
    <ul className="locations__list tabs__list">
      {
        cities && cities.slice()
          .map((city: City) => <CityItem key={ city.name } cityName={ city.name } onSelectCity={ onSelectCity }/>)
      }
    </ul>
  );
}
