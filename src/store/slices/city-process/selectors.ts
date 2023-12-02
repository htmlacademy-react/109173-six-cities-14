import { Namespace } from '../../../const';
import { CityNamespaceState } from '../../../types/selector';

// CITY
export function getCity(state: CityNamespaceState): string {
  return state[Namespace.CITY].city;
}
