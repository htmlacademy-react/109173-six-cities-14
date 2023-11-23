import { NAMESPACE } from '../../../const';
import { Offers } from '../../../types/offer';
import { State } from '../../../types/state';

type FavoritesNamespace = typeof NAMESPACE.FAVORITES

export function getFavorites(state: Pick<State, FavoritesNamespace>): Offers {
  return state[NAMESPACE.FAVORITES].favorites;
}
