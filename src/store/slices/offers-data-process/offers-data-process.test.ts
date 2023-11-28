import { OffersDataProcess } from '../../../types/state';
import { makeFakeOffer } from '../../../utils/mock';
import { fetchOffersAction } from '../../api-action';
import { loadOffersAction, offersDataProcess, setOffersLoadingStatus, updateOffersListAction } from './offers-data-process';

describe('[Offers data process Slice]:', () => {
  let initialState: OffersDataProcess;

  beforeAll(() => {
    initialState = {
      offers: [],
      isOffersLoading: false,
    };
  });

  it('Should return initial state with Empty Action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = initialState;

    const result = offersDataProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should set Offers to state when "loadOffersAction"', () => {
    const offer = makeFakeOffer();
    const expectedState = [ offer ];

    const result = offersDataProcess.reducer(initialState, loadOffersAction(expectedState));

    expect(result.offers).toEqual(expectedState);
  });

  it('Should set "Offers loading" status when "setOffersLoadingStatus"', () => {
    const isOffersLoading = true;

    const result = offersDataProcess.reducer(initialState, setOffersLoadingStatus(isOffersLoading));

    expect(result.isOffersLoading).toBe(isOffersLoading);
  });

  it('Should update old offer to new when "updateOffersListAction"', () => {
    const offerOne = makeFakeOffer();
    const offerTwo = makeFakeOffer();
    const offerThree = makeFakeOffer();
    initialState.offers = [offerOne, offerTwo, offerThree];
    offerTwo.title = 'New title';

    const result = offersDataProcess.reducer(initialState, updateOffersListAction(offerTwo));

    expect(result.offers.at(1)).toEqual(offerTwo);
  });

  it('Should change "isOffersLoading" statue to "true" when "fetchOffersAction.pending"', () => {
    initialState.isOffersLoading = false;

    const result = offersDataProcess.reducer(initialState, fetchOffersAction.pending);

    expect(result.isOffersLoading).toBe(true);
  });

  it('Should change "isOffersLoading" statue to "false" when "fetchOffersAction.fulfilled"', () => {
    initialState.isOffersLoading = true;

    const result = offersDataProcess.reducer(initialState, fetchOffersAction.fulfilled);

    expect(result.isOffersLoading).toBe(false);
  });

  it('Should change "isOffersLoading" statue to "false" when "fetchOffersAction.rejected"', () => {
    initialState.isOffersLoading = true;

    const result = offersDataProcess.reducer(initialState, fetchOffersAction.rejected);

    expect(result.isOffersLoading).toBe(false);
  });
});
