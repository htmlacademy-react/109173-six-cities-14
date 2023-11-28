import { NAMESPACE } from '../../../const';
import { Offers } from '../../../types/offer';
import { OffersNamespaceState } from '../../../types/selector';

// OFFERS
export function getOffers(state: OffersNamespaceState): Offers {
  return state[NAMESPACE.OFFERS].offers;
}

export function getOffersLoadingStatus(state: OffersNamespaceState): boolean {
  return state[NAMESPACE.OFFERS].isOffersLoading;
}
