export const OFFERS_COUNT = 6;
export const NEAREST_OFFERS_COUNT = 3;
export const FAVORITES_COUNT = 3;
export const REVIEW_TEXT_MIN_LENGTH = 50;
export const PIN_ICON_URL = '../markup/img/pin.svg';
export const PIN_ACTIVE_ICON_URL = '../markup/img/pin-active.svg';
export const TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
export enum AppRoutes {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  Page404 = '/page404',
}
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
