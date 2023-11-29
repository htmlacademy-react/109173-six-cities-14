import cn from 'classnames';

import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/slices/city-process/selectors';

type CitiesItemProps = {
  city: string;
  onSelectCity: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

export default function CitiesItem({ city, onSelectCity }: CitiesItemProps): React.ReactNode {
  const selectedCity = useAppSelector(getCity);
  const isSelectedCity = (selectedCity === city);

  return (
    <li className="locations__item" onClick={ (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      evt.preventDefault();

      onSelectCity(evt);
    }}
    data-testid="citiesItemElement"
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
