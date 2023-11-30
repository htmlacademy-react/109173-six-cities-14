import cn from 'classnames';

type CitiesItemProps = {
  city: string;
  isSelectedCity?: boolean;
  onSelectCity: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

export default function CitiesItem({ city, isSelectedCity, onSelectCity }: CitiesItemProps): React.ReactNode {
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
      data-testid="citiesItemLinkElement"
      >
        <span>{ city }</span>
      </a>
    </li>
  );
}
