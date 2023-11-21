import { NAMESPACE } from '../const';
import { Offers } from '../types/offer';
import { State } from '../types/state';

type test = keyof typeof NAMESPACE;

// Временные общие селекторы (с кривой типизацией) для плавной миграции
// TODO: из за кривой типизации не выводится подсказка при написании конструкции
// вида state[NAMESPACE.something].
export function getCity(state: State): string {
  const curState = state[NAMESPACE.MAIN] as State;
  return curState.city;
}

export function getOffers(state: State): Offers {
  const curState = state[NAMESPACE.MAIN] as State;
  return curState.offers;
}

export function getFavorites(state: State): Offers {
  const curState = state[NAMESPACE.MAIN] as State;
  return curState.favorites;
}


// USER
export function getAuthStatus(state: State): string {
  const curState = state[NAMESPACE.USER] as State ;
  return curState.authorizationStatus;
}

export function getUserInfo(state: State): string {
  const curState = state[NAMESPACE.USER] as State ;
  return curState.userInfo;
}
