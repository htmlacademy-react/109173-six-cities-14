import { AuthorizationStatus, NAMESPACE } from '../../../const';
import { UserProcess } from '../../../types/state';
import { makeMockStore } from '../../../utils/mock';
import { checkAuthAction, loginAction, logoutAction } from '../../api-action';
import { userProcess } from './user-process';

describe('[User Process Slice]:', () => {
  let initialState: UserProcess;
  const mockStore = makeMockStore();

  beforeAll(() => {
    initialState = mockStore[NAMESPACE.USER];
  });

  it('Should return initial state with Empty Action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = initialState;

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  // CHECK AUTH
  // Тест падает, т.к. пока нер работы с токенами
  it('Should set "AUTH" status when checkAuthAction.fulfilled', () => {
    initialState.authorizationStatus = AuthorizationStatus.NO_AUTH;

    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.AUTH);
  });


  it('Should set "NO_AUTH" status when checkAuthAction.rejected', () => {
    initialState.authorizationStatus = AuthorizationStatus.UNKNOWN;

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NO_AUTH);
  });

  // LOGIN / LOGOUT
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
