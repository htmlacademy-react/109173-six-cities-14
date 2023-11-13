import { Cities } from '../types/city';

const BASE_ZOOM_VALUE = 13;

export const cities: Cities = [
  {name: 'Paris', location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: BASE_ZOOM_VALUE,
  }},
  {name: 'Cologne', location: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: BASE_ZOOM_VALUE,
  }},
  {name: 'Brussels', location: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: BASE_ZOOM_VALUE
  }},
  {name: 'Amsterdam', location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: BASE_ZOOM_VALUE
  }},
  {name: 'Hamburg', location: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: BASE_ZOOM_VALUE
  }},
  {name: 'Dusseldorf', location: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: BASE_ZOOM_VALUE
  }},
];
