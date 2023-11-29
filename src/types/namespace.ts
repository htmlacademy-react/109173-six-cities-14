import { NAMESPACE } from '../const';

export type Namespace = keyof [keyof typeof NAMESPACE];
export type CityNamespace = typeof NAMESPACE.CITY
export type OfferNamespace = typeof NAMESPACE.OFFER
export type OffersNamespace = typeof NAMESPACE.OFFERS;
export type FavoritesNamespace = typeof NAMESPACE.FAVORITES
export type UserNamespace = typeof NAMESPACE.USER;
