// MAIN
export const NEAREST_OFFERS_COUNT = 3;
export const FAVORITES_COUNT = 3;
export const REVIEW_TEXT_MIN_LENGTH = 50;

// MAP
export const PIN_ICON_URL = '../markup/img/pin.svg';
export const PIN_ACTIVE_ICON_URL = '../markup/img/pin-active.svg';
export const TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// ROUTES
export const AppRoute = {
  MAIN: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer',
  PAGE_404: '/page404',
};
export const APIRoute = {
  OFFERS: '/six-cities/offers',
  FAVORITE: '/six-cities/favorite',
  COMMENTS: '/six-cities/comments/',
  LOGIN: '/six-cities/login',
  LOGUOT: '/six-cities/logout',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const DateFormat = {
  MONTH_YEAR: 'MONTH_YEAR',
  DATE_TIME: 'DATE_TIME'
};

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
