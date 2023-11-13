import { Map, TileLayer } from 'leaflet';
import { useState, useRef, useEffect } from 'react';
import { City } from '../types/city';
import { MAP_COPYRIGHT, TILE_LAYER_URL } from '../const';

type MapProps = {
  city: City;
  mapRef: React.MutableRefObject<HTMLElement | null>;
};

export default function useMap({ city, mapRef }: MapProps): Map | null {
  const [currentCity, setCurrentCity] = useState('');
  const [map, setMap] = useState<Map | null>(null);
  const isMapRendered = useRef<boolean>(false);

  useEffect(() => {
    if(mapRef.current !== null && !isMapRendered.current) {
      const mapInstance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      const tileLayer = new TileLayer(TILE_LAYER_URL, {
        attribution: MAP_COPYRIGHT
      });

      mapInstance.addLayer(tileLayer);
      setMap(mapInstance);
      isMapRendered.current = true;
    }

    if(currentCity !== city.name && map) {
      const {latitude: lat, longitude: lng, zoom} = city.location;

      map.setView({lat, lng}, zoom);
      setCurrentCity(city.name);
    }
  }, [city, currentCity, map, mapRef]);

  return map;
}
