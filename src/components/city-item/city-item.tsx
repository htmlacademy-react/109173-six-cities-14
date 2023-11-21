import { useAppSelector } from '../../hooks';
import cn from 'classnames';

type CityProps = {
  city: string;
  onSelectCity: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

export default function CityItem({ city, onSelectCity }: CityProps): React.ReactNode {
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
