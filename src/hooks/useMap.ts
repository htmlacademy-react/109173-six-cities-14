import { Map, TileLayer } from 'leaflet';
import { useState, useRef, useEffect } from 'react';
import { City } from '../types/city';
import { MAP_COPYRIGHT, TILE_LAYER_URL } from '../const';

type MapProps = {
  cityInfo: City;
  mapRef: React.MutableRefObject<HTMLElement | null>;
};

export default function useMap({ cityInfo, mapRef }: MapProps): Map | null {
  const [currentCity, setCurrentCity] = useState('');
  const [map, setMap] = useState<Map | null>(null);
  const isMapRendered = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      if(mapRef.current !== null && !isMapRendered.current) {
        const mapInstance = new Map(mapRef.current, {
          center: {
            lat: cityInfo.location.latitude,
            lng: cityInfo.location.longitude
          },
          zoom: cityInfo.location.zoom
        });

        const tileLayer = new TileLayer(TILE_LAYER_URL, {
          attribution: MAP_COPYRIGHT
        });

        mapInstance.addLayer(tileLayer);
        setMap(mapInstance);
        isMapRendered.current = true;
      }

      if(currentCity !== cityInfo.name && map) {
        const {latitude: lat, longitude: lng, zoom} = cityInfo.location;

        map.setView({lat, lng}, zoom);
        setCurrentCity(cityInfo.name);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [cityInfo, currentCity, map, mapRef]);

  return map;
}
