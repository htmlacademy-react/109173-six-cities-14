import { NAMESPACE } from '../const';
import { Offers } from '../types/offer';
import { State } from '../types/state';
import { UserData } from '../types/user-data';

// Временные общие селекторы (с кривой типизацией) для плавной миграции
export function getCity(state: State): string {
  return state[NAMESPACE.MAIN].city;
}

export function getOffers(state: State): Offers {
  return state[NAMESPACE.MAIN].offers;
}

export function getFavorites(state: State): Offers {
  return state[NAMESPACE.MAIN].favorites;
}


// USER
export function getAuthStatus(state: State): string {
  return state[NAMESPACE.USER].authorizationStatus;
}

export function getUserInfo(state: State): UserData | null {
  return state[NAMESPACE.USER].userInfo;
}
