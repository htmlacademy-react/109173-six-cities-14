import { NAMESPACE } from '../../../const';
import { CityNamespaceState } from '../../../types/selector';

// CITY
export function getCity(state: CityNamespaceState): string {
  return state[NAMESPACE.CITY].city;
}
