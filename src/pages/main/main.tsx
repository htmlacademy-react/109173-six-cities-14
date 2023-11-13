
/**
 * TODO:
 * Сортировка работает, но с запазданием на 1 действие
 * (т.е. при нажатии на фильтр, срабатывет предыдущий выбранны фильтр) - поправить
 * При наведении на карточку - сбрасывается вся сортировка
 * (т.к. весь компонент main перерисовывается, а отсортированные офферы хранятся в его детях) - поправить
 */

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useSort from '../../hooks/useSort';

import { MainProps, PlacesProps } from './main-props';
import { setCityAction } from '../../store/action';
import { getRightPluralForm } from '../../utils/common';
import { Offer } from '../../types/offer';

import OffersList from '../../components/offers-list/offers-list';
import CitiesList from '../../components/cities-list/cities-list';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import { cities } from '../../const';

const DEFAULT_SORT = 'POPULAR';

const CSSCLasses = {
  PlacesContainer: 'cities__places-container container',
  NoPlaces: 'cities__places-container--empty'
};

function MainEmpty(): React.ReactNode {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
      </div>
    </section>
  );
}

function Places({ city, offers, onSelectPoint }: PlacesProps): React.ReactNode {
  const [currentSort, setCurrentSort] = useState(DEFAULT_SORT);
  const sortedOffers = useSort(offers, currentSort);

  function sortChangeHandler(selectedSort: string) {
    if(selectedSort && selectedSort !== currentSort) {
      setCurrentSort(selectedSort);
    }
  }

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{ offers.length } { getRightPluralForm('place', offers.length) } to stay in { city }</b>

      <Sort onSortChange={ sortChangeHandler } />

      <div className="cities__places-list places__list tabs__content">
        <OffersList offers={ sortedOffers } onSelectPoint={ onSelectPoint } />
      </div>
    </section>
  );
}

export default function Main({
  mapPoints,
  offers,
  isMainEmpty
}: MainProps): React.ReactNode {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const cityInfo = offers[0]?.city;
  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);

  function selectCityHandler(evt: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = (evt.target as HTMLElement);
    const targetCity = target.textContent;
    const selectedCity = cities.find((city) => city === targetCity);

    if(selectedCity !== undefined) {
      dispatch(setCityAction({ city: selectedCity }));
    }
  }

  return (
    <>
      <Helmet>
        <title>6 cities - Main</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          { cities && <CitiesList onSelectCity={ selectCityHandler } /> }
        </section>
      </div>
      <div className="cities">
        <div className={ cn(
          CSSCLasses.PlacesContainer,
          {[CSSCLasses.NoPlaces]: isMainEmpty}
        ) }
        >
          { (isMainEmpty && <MainEmpty />)
            || (cityInfo && <Places city={ currentCity } offers={ offers } onSelectPoint={ setSelectedPoint }/>) }

          <div className="cities__right-section">
            { !isMainEmpty && cityInfo &&
              <Map cityInfo={ cityInfo } mapPoints={ mapPoints } selectedPoint={ selectedPoint }/>}
          </div>
        </div>
      </div>
    </>
  );
}
