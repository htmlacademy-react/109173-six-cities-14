import { NAMESPACE } from '../const';
import { Comments } from '../types/comment';
import { Offer, Offers } from '../types/offer';
import { State } from '../types/state';
import { UserData } from '../types/user-data';

// CITY
export function getCity(state: State): string {
  return state[NAMESPACE.CITY].city;
}

// OFFERS
export function getOffers(state: State): Offers {
  return state[NAMESPACE.OFFERS].offers;
}

// OFFER
export function getOffer(state: State): Offer | null {
  return state[NAMESPACE.OFFER].offer;
}

export function getComments(state: State): Comments {
  return state[NAMESPACE.OFFER].comments;
}

export function getNearby(state: State): Offers {
  return state[NAMESPACE.OFFER].nearbyOffers;
}


// FAVORITES
export function getFavorites(state: State): Offers {
  return state[NAMESPACE.FAVORITES].favorites;
}


// USER
export function getAuthStatus(state: State): string {
  return state[NAMESPACE.USER].authorizationStatus;
}

export function getUserInfo(state: State): UserData | null {
  return state[NAMESPACE.USER].userInfo;
}
