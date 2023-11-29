import { AuthorizationStatus, NAMESPACE } from '../../../const';
import { setToken } from '../../../services/token';
import { UserProcess } from '../../../types/state';
import { makeFakeUser, makeMockStore } from '../../../utils/mock';
import { checkAuthAction, loginAction, logoutAction } from '../../api-action';
import { setUserInfoAction, userProcess } from './user-process';

describe('[User Process Slice]:', () => {
  let initialState: UserProcess;
  const mockStore = makeMockStore();

  beforeAll(() => {
    initialState = mockStore[NAMESPACE.USER];
  });

  it('Should return initial state with empty initialState and action', () => {
    const emptyAction = {type: '', payload: ''};

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should set "User info" when "setUserInfoAction"', () => {
    const user = makeFakeUser();

    const result = userProcess.reducer(undefined, setUserInfoAction(user));

    expect(result.userInfo).toEqual(user);
  });

  // CHECK AUTH
  describe('Check auth action:', () => {
    it('Should set "AUTH" status when checkAuthAction.fulfilled', () => {
      initialState.authorizationStatus = AuthorizationStatus.NO_AUTH;
      setToken(crypto.randomUUID());

      const result = userProcess.reducer(initialState, checkAuthAction.fulfilled);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.AUTH);
    });


    it('Should set "NO_AUTH" status when checkAuthAction.rejected', () => {
      initialState.authorizationStatus = AuthorizationStatus.UNKNOWN;

      const result = userProcess.reducer(initialState, checkAuthAction.rejected);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NO_AUTH);
    });
  });

  // LOGIN / LOGOUT
  describe('Login/Logout actions:', () => {
    it('Should set "AUTH" status when loginAction.fulfilled', () => {
      initialState.authorizationStatus = AuthorizationStatus.NO_AUTH;

      const result = userProcess.reducer(initialState, loginAction.fulfilled);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.AUTH);
    });

    it('Should set "NO_AUTH" status when loginAction.rejected', () => {
      initialState.authorizationStatus = AuthorizationStatus.AUTH;

      const result = userProcess.reducer(initialState, loginAction.rejected);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NO_AUTH);
    });

    it('Should set "NO_AUTH" status when logoutAction.fulfilled', () => {
      initialState.authorizationStatus = AuthorizationStatus.AUTH;

      const result = userProcess.reducer(initialState, logoutAction.fulfilled);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NO_AUTH);
    });
  });
});
