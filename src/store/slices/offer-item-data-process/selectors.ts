import { Namespace } from '../../../const';
import { Comments } from '../../../types/comment';
import { Offer, Offers } from '../../../types/offer';
import { OfferNamespaceState } from '../../../types/selector';

export function getOffer(state: OfferNamespaceState): Offer | null {
  return state[Namespace.OFFER].offer;
}

export function getComments(state: OfferNamespaceState): Comments {
  return state[Namespace.OFFER].comments;
}

export function getAddCommentsStatus(state: OfferNamespaceState): string {
  return state[Namespace.OFFER].addCommentStatus;
}

export function getIsCommentsLoadedStatus(state: OfferNamespaceState): boolean {
  return state[Namespace.OFFER].isCommentsLoaded;
}

export function getNearby(state: OfferNamespaceState): Offers {
  return state[Namespace.OFFER].nearbyOffers;
}
