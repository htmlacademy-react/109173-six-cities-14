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

  it('Should return initial state with empty initialState and action', () => {
    const emptyAction = {type: '', payload: ''};

    const result = offersDataProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should set Offers to state when "loadOffersAction"', () => {
    const offer = makeFakeOffer();
    const expectedState = [ offer ];

    const result = offersDataProcess.reducer(undefined, loadOffersAction(expectedState));

    expect(result.offers).toEqual(expectedState);
  });

  it('Should set "Offers loading" status when "setOffersLoadingStatus"', () => {
    const isOffersLoading = true;

    const result = offersDataProcess.reducer(undefined, setOffersLoadingStatus(isOffersLoading));

    expect(result.isOffersLoading).toBe(isOffersLoading);
  });

  it('Should update old offer to new when "updateOffersListAction"', () => {
    const offer = makeFakeOffer();
    initialState.offers = [ offer ];
    offer.title = 'New title';

    const result = offersDataProcess.reducer(initialState, updateOffersListAction(offer));

    expect(result.offers.at(0)).toEqual(offer);
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
