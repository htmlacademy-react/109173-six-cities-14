import { useRef, useEffect } from 'react';
import { Marker, Icon, layerGroup } from 'leaflet';
import useMap from '../../hooks/useMap';
import { PIN_ACTIVE_ICON_URL, PIN_ICON_URL } from '../../const';
import { City } from '../../types/city';
import 'leaflet/dist/leaflet.css';
import { Points } from '../../types/point';
import { Offer } from '../../types/offer';

type MapProps = {
  city: City;
  mapPoints: Points;
  selectedPoint: Offer | null;
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
        marker.addTo(markerLayer);
      });
    }
  });

  return (
    <section className="cities__map map" ref={ mapRef } />
  );
}
