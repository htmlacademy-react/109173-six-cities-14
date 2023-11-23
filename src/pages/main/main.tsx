import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/slices/city-process/selectors';
import { getOffers } from '../../store/slices/offers-data-process/selectors';

import { MainProps } from './main-props';

import { cities } from '../../const';
import { getOffersByCity } from '../../utils/offer';
import { Offer } from '../../types/offer';

import MainEmpty from '../main-empty/main-empty';
import CitiesList from '../../components/cities-list/cities-list';
import Places from '../../components/places/places';
import Map from '../../components/map/map';

const CSSCLasses = {
  PlacesContainer: 'cities__places-container container',
  NoPlaces: 'cities__places-container--empty'
};

export default function Main({
  isMainEmpty
}: MainProps): React.ReactNode {
  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);

  const currentCity = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const cityOffers = getOffersByCity(currentCity, offers);


  return (
    <>
      <Helmet>
        <title>6 cities - Main</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          { cities && <CitiesList /> }
        </section>
      </div>
      <div className="cities">
        <div className={ cn(
          CSSCLasses.PlacesContainer,
          {[CSSCLasses.NoPlaces]: isMainEmpty}
        ) }
        >
          { (isMainEmpty && <MainEmpty />)
            || <Places offers={ cityOffers } onSelectPoint={ setSelectedPoint } /> }

          <div className="cities__right-section">
            { !isMainEmpty &&
              <Map offers={ cityOffers } selectedPoint={ selectedPoint }/>}
          </div>
        </div>
      </div>
    </>
  );
}
