import { useAppSelector } from '../../hooks';
import cn from 'classnames';

import { cities } from '../../const';

type CitiesListProps = {
  onSelectCity: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

type CityProps = {
  city: string;
} & Pick<CitiesListProps, 'onSelectCity'>;

function CityItem({ city, onSelectCity }: CityProps): React.ReactNode {
  const selectedCity = useAppSelector((state) => state.city);
  const isSelectedCity = (selectedCity === city);

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
        <span>{ city }</span>
      </a>
    </li>
  );
}

export default function CitiesList({ onSelectCity }: CitiesListProps): React.ReactElement {
  return (
    <ul className="locations__list tabs__list">
      {
        cities && cities.slice()
          .map((city: string) => <CityItem key={ city } city={ city } onSelectCity={ onSelectCity }/>)
      }
    </ul>
  );
}
