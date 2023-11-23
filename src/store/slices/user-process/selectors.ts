import { NAMESPACE } from '../../../const';
import { State } from '../../../types/state';
import { UserData } from '../../../types/user-data';

type userNamespace = typeof NAMESPACE.USER

export function getAuthStatus(state: Pick<State, userNamespace>): string {
  return state[NAMESPACE.USER].authorizationStatus;
}

export function getUserInfo(state: Pick<State, userNamespace>): UserData | null {
  return state[NAMESPACE.USER].userInfo;
}

