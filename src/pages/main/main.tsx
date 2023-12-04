import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import cn from 'classnames';

import { Offer } from '../../types/offer';

import MainEmpty from '../main-empty/main-empty';
import Places from '../../components/places/places';
import Map from '../../components/map/map';
import useCityOffers from '../../hooks/useCityOffers';

const CSSCLasses = {
  PLACES_CONTAINER: 'cities__places-container container',
  NO_PLACES: 'cities__places-container--empty'
} as const;

export default function Main(): React.ReactNode {
  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);
  const cityOffers = useCityOffers();
  const isMainEmpty = (cityOffers.length <= 0);

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <div className="cities">
        <div className={ cn(
          CSSCLasses.PLACES_CONTAINER,
          {[CSSCLasses.NO_PLACES]: isMainEmpty}
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
