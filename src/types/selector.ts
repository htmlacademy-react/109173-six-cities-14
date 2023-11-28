import { NAMESPACE } from '../const';
import { State } from './state';

type CityNamespace = typeof NAMESPACE.CITY
type OfferNamespace = typeof NAMESPACE.OFFER
type OffersNamespace = typeof NAMESPACE.OFFERS;
type FavoritesNamespace = typeof NAMESPACE.FAVORITES
type UserNamespace = typeof NAMESPACE.USER

export type CityNamespaceState = Pick<State, CityNamespace>;
export type OfferNamespaceState = Pick<State, OfferNamespace>;
export type OffersNamespaceState = Pick<State, OffersNamespace>;
export type FavoritesNamespaceState = Pick<State, FavoritesNamespace>;
export type UserNamespaceState = Pick<State, UserNamespace>;
