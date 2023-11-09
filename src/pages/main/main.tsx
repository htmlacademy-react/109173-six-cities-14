import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { MainProps, PlacesProps } from './main-props';
import { Offer } from '../../types/offer';

import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { changeCityAction } from '../../store/action';

const enum CSSCLasses {
  PlacesContainer = 'cities__places-container container',
  NoPlaces = 'cities__places-container--empty'
}

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

function Places({ offers, offersCount, onSelectPoint }: PlacesProps): React.ReactNode {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{ offersCount } places to stay in Amsterdam</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={ 0 }>
          Popular
          <svg className="places__sorting-arrow" width={ 7 } height={ 4 }>
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={ 0 }>Popular</li>
          <li className="places__option" tabIndex={ 0 }>Price: low to high</li>
          <li className="places__option" tabIndex={ 0 }>Price: high to low</li>
          <li className="places__option" tabIndex={ 0 }>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        <OffersList offers={ offers } onSelectPoint={ onSelectPoint }></OffersList>
      </div>
    </section>
  );
}

export default function Main({
  cities,
  mapPoints,
  offers,
  offersCount,
  isMainEmpty
}: MainProps): React.ReactNode {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);
  const placesClassName = (!isMainEmpty)
    ? CSSCLasses.PlacesContainer
    : `${CSSCLasses.PlacesContainer} ${CSSCLasses.NoPlaces}`;

  function selectCityHandler(evt: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target: HTMLElement = evt.target;
    const targetCity = target.textContent;
    const selectedCity = cities.find((city) => city.name === targetCity);

    if(selectedCity !== undefined) {
      dispatch(changeCityAction({ city: selectedCity }));
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
          { cities && <CitiesList cities={ cities } onSelectCity={ selectCityHandler } /> }
        </section>
      </div>
      <div className="cities">
        <div className={ placesClassName }>
          { (isMainEmpty && <MainEmpty />) || <Places offers={ offers } offersCount={ offersCount } onSelectPoint={ setSelectedPoint }/>}

          <div className="cities__right-section">
            { !isMainEmpty && <Map city={ currentCity } mapPoints={ mapPoints } selectedPoint={ selectedPoint }/>}
          </div>
        </div>
      </div>
    </>
  );
}
