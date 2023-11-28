import { NAMESPACE } from '../../../const';
import { Comments } from '../../../types/comment';
import { Offer, Offers } from '../../../types/offer';
import { OfferNamespaceState } from '../../../types/selector';

export function getOffer(state: OfferNamespaceState): Offer | null {
  return state[NAMESPACE.OFFER].offer;
}

export function getComments(state: OfferNamespaceState): Comments {
  return state[NAMESPACE.OFFER].comments;
}

export function getAddCommentsStatus(state: OfferNamespaceState): string {
  return state[NAMESPACE.OFFER].addCommentStatus;
}

export function getIsCommentsLoadedStatus(state: OfferNamespaceState): boolean {
  return state[NAMESPACE.OFFER].isCommentsLoaded;
}

export function getNearby(state: OfferNamespaceState): Offers {
  return state[NAMESPACE.OFFER].nearbyOffers;
}
