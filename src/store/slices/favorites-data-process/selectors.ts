import { Namespace } from '../../../const';
import { Offers } from '../../../types/offer';
import { FavoritesNamespaceState } from '../../../types/selector';

export function getFavorites(state: FavoritesNamespaceState): Offers {
  return state[Namespace.FAVORITES].favorites;
}
