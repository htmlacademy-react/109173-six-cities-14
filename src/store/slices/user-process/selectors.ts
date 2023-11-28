import { NAMESPACE } from '../../../const';
import { UserNamespaceState } from '../../../types/selector';
import { UserData } from '../../../types/user-data';

export function getAuthStatus(state: UserNamespaceState): string {
  return state[NAMESPACE.USER].authorizationStatus;
}

export function getUserInfo(state: UserNamespaceState): UserData | null {
  return state[NAMESPACE.USER].userInfo;
}

