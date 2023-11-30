import { Namespace } from '../const';

export type Namespace = keyof [keyof typeof Namespace];
export type CityNamespace = typeof Namespace.CITY
export type OfferNamespace = typeof Namespace.OFFER
export type OffersNamespace = typeof Namespace.OFFERS;
export type FavoritesNamespace = typeof Namespace.FAVORITES
export type UserNamespace = typeof Namespace.USER;
