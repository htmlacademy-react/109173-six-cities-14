import { CityNamespace, FavoritesNamespace, OfferNamespace, OffersNamespace, UserNamespace } from './namespace';
import { State } from './state';

export type CityNamespaceState = Pick<State, CityNamespace>;
export type OfferNamespaceState = Pick<State, OfferNamespace>;
export type OffersNamespaceState = Pick<State, OffersNamespace>;
export type FavoritesNamespaceState = Pick<State, FavoritesNamespace>;
export type UserNamespaceState = Pick<State, UserNamespace>;
