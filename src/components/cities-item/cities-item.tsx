import cn from 'classnames';

const CSSCLasses = {
  CITY_TAB_ITEM: 'tabs__item tabs__item--active',
} as const;

type CitiesItemProps = {
  city: string;
  isSelectedCity?: boolean;
  onSelectCity: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

export default function CitiesItem({ city, isSelectedCity, onSelectCity }: CitiesItemProps): React.ReactNode {

  function handleLocationclock(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    evt.preventDefault();

    onSelectCity(evt);
  }

  return (
    <li className="locations__item" onClick={ handleLocationclock } data-testid="citiesItemElement">
      <a className={cn(
        'locations__item-link tabs__item',
        {[CSSCLasses.CITY_TAB_ITEM]: isSelectedCity}
      )} href="#"
      data-testid="citiesItemLinkElement"
      >
        <span>{ city }</span>
      </a>
    </li>
  );
}
