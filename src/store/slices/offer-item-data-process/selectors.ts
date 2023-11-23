import { NAMESPACE } from '../../../const';
import { Comments } from '../../../types/comment';
import { Offer, Offers } from '../../../types/offer';
import { State } from '../../../types/state';

type OfferNamespace = typeof NAMESPACE.OFFER

export function getOffer(state: Pick<State, OfferNamespace>): Offer | null {
  return state[NAMESPACE.OFFER].offer;
}

export function getComments(state: Pick<State, OfferNamespace>): Comments {
  return state[NAMESPACE.OFFER].comments;
}

export function getAddCommentsStatus(state: Pick<State, OfferNamespace>): string {
  return state[NAMESPACE.OFFER].addCommentStatus;
}

export function getIsCommentsLoadedStatus(state: Pick<State, OfferNamespace>): boolean {
  return state[NAMESPACE.OFFER].isCommentsLoaded;
}

export function getNearby(state: Pick<State, OfferNamespace>): Offers {
  return state[NAMESPACE.OFFER].nearbyOffers;
}
