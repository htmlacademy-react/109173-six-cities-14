import { useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import cn from 'classnames';
import { AppRoute, NEARBY_OFFERS_COUNT, PIN_ACTIVE_ICON_URL, PIN_ICON_URL } from '../../const';
import { Offer, Offers } from '../../types/offer';

import { Marker, Icon, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { adaptOffersToPoints } from '../../utils/offer';

const CSSClasses = {
  'CITIES_MAP': 'cities__map',
  'OFFER_MAP': 'offer__map'
};

const pinIcon = new Icon({
  iconUrl: PIN_ICON_URL,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const pinActiveIcon = new Icon({
  iconUrl: PIN_ACTIVE_ICON_URL,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  offers: Offers;
  selectedPoint: Offer | null;
};

export default function Map({ offers, selectedPoint }: MapProps): React.ReactElement {
  const location = useLocation().pathname;
  const isMainPage = (location === AppRoute.MAIN);
  const isNotMainPage = !isMainPage;
  const pointsToShowCount = isMainPage ? offers.length : NEARBY_OFFERS_COUNT;

  const cityInfo = offers[0].city;
  const mapPoints = adaptOffersToPoints(offers);
  const slicedMapPoints = mapPoints.slice(0, pointsToShowCount);

  const mapRef = useRef(null);
  const map = useMap({ cityInfo, mapRef });

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);

      slicedMapPoints.forEach((point) => {
        const iconType = (selectedPoint && selectedPoint.id === point.id)
          ? pinActiveIcon
          : pinIcon;
        const marker = new Marker({
          lat: point.lat,
          lng: point.long
        });

        marker.setIcon(iconType);
        marker.addTo(markerLayer);
      });

      return function() {
        markerLayer.remove();
      };
    }
  });

  return (
    <section
      className={ cn(
        'map',
        {[CSSClasses.CITIES_MAP]: isMainPage},
        {[CSSClasses.OFFER_MAP]: isNotMainPage}
      ) }
      ref={ mapRef }
    />
  );
}
