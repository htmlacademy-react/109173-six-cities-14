import { useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import cn from 'classnames';
import { AppRoute, PIN_ACTIVE_ICON_URL, PIN_ICON_URL } from '../../const';

import { City } from '../../types/city';
import { Points } from '../../types/point';
import { Offer } from '../../types/offer';

import { Marker, Icon, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  mapPoints: Points;
  selectedPoint: Offer | null;
};

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

export default function Map({ city, mapPoints, selectedPoint }: MapProps): React.ReactElement {
  const location = useLocation().pathname;
  const isMainPage = (location === AppRoute.MAIN);
  const isNotMainPage = !isMainPage;
  const mapRef = useRef(null);
  const map = useMap({ city, mapRef });

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);

      mapPoints.forEach((point) => {
        const iconType = (selectedPoint && selectedPoint.id === point.id)
          ? pinActiveIcon
          : pinIcon;
        const marker = new Marker({
          lat: point.lat,
          lng: point.long
        });

        marker.setIcon(iconType);
        marker.addTo(markerLayer); // TODO: Возникает ошибка при переключении городов
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
