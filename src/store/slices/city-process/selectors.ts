import { NAMESPACE } from '../../../const';
import { State } from '../../../types/state';

type CityNamespace = typeof NAMESPACE.CITY

// CITY
export function getCity(state: Pick<State, CityNamespace>): string {
  return state[NAMESPACE.CITY].city;
}
