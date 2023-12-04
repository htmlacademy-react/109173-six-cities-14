import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import cn from 'classnames';

import { Offer } from '../../types/offer';

import MainEmpty from '../main-empty/main-empty';
import Places from '../../components/places/places';
import Map from '../../components/map/map';
import useCityOffers from '../../hooks/useCityOffers';

const CSSCLasses = {
  PlacesContainer: 'cities__places-container container',
  NoPlaces: 'cities__places-container--empty'
};

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
