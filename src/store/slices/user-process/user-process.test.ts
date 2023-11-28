import { AuthorizationStatus, NAMESPACE } from '../../../const';
import { makeMockStore } from '../../../utils/mock';
import { checkAuthAction } from '../../api-action';
import { userProcess } from './user-process';

describe('User-Process Slice', () => {
  const mockStore = makeMockStore();

  it('Should return initial state with Empty Action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = mockStore[NAMESPACE.USER];

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should set "AUTH" status when checkAuthAction.fulfilled', () => {
    const initialState = mockStore[NAMESPACE.USER];
    initialState.authorizationStatus = AuthorizationStatus.NO_AUTH;
    const expectedState = mockStore[NAMESPACE.USER];

    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled);

    expect(result).toEqual(expectedState);
  });


  it('Should set "NO_AUTH" status when checkAuthAction.rejected', () => {
    const initialState = mockStore[NAMESPACE.USER];
    initialState.authorizationStatus = AuthorizationStatus.UNKNOWN;
    const expectedState = mockStore[NAMESPACE.USER];
    expectedState.authorizationStatus = AuthorizationStatus.NO_AUTH;

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
