import { NAMESPACE } from '../../../const';
import { Offers } from '../../../types/offer';
import { State } from '../../../types/state';

type OffersNamespace = typeof NAMESPACE.OFFERS

// OFFERS
export function getOffers(state: Pick<State, OffersNamespace>): Offers {
  return state[NAMESPACE.OFFERS].offers;
}
