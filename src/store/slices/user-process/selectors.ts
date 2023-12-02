import { Namespace } from '../../../const';
import { UserNamespaceState } from '../../../types/selector';
import { UserData } from '../../../types/user-data';

export function getAuthStatus(state: UserNamespaceState): string {
  return state[Namespace.USER].authorizationStatus;
}

export function getUserInfo(state: UserNamespaceState): UserData | null {
  return state[Namespace.USER].userInfo;
}

