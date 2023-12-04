// MAIN
export const DEFAULT_CITY = 'Paris';
export const NEARBY_OFFERS_COUNT = 3;
export const FAVORITES_COUNT = 3;
export const GALLERY_IMAGES_MAX_COUNT = 6;

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
} as const;
export const APIRoute = {
  OFFERS: '/six-cities/offers',
  NEAREST: '/nearby',
  FAVORITE: '/six-cities/favorite',
  COMMENTS: '/six-cities/comments',
  LOGIN: '/six-cities/login',
  LOGOUT: '/six-cities/logout',
};

export const Namespace = {
  MAIN: 'MAIN',
  CITY: 'CITY',
  OFFERS: 'OFFERS',
  OFFER: 'OFFER',
  FAVORITES: 'FAVORITES',
  USER: 'USER',
} as const;

// STATUSES
export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
} as const;
export const SEND_DATA_STATUS = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
} as const;

// OTHERS
export const DateFormat = {
  MONTH_YEAR: 'MONTH_YEAR',
  DATE_TIME: 'DATE_TIME'
} as const;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

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
