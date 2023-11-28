import { SEND_DATA_STATUS } from '../../../const';
import { OfferItemDataProcess } from '../../../types/state';
import { makeFakeComment, makeFakeOffer } from '../../../utils/mock';
import { addCommentAction, offerItemDataProcess, setAddCommentStatusAction, setCommentsAction, setCommentsLoadedStatusAction, setNearbyAction, setOfferItemAction, updateOfferItemFavoriteAction } from './offer-item-data-process';

describe('[Offer item data process Slice]:', () => {
  let initialState: OfferItemDataProcess | undefined = undefined;

  beforeEach(() => {
    initialState = {
      offer: null,
      nearbyOffers: [],
      comments: [],
      isCommentsLoaded: false,
      addCommentStatus: SEND_DATA_STATUS.NONE,
    };
  });

  it('Should return initial state with empty action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = initialState;

    const result = offerItemDataProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should set Offer item to state when "setOfferItemAction"', () => {
    const offer = makeFakeOffer();

    const result = offerItemDataProcess.reducer(initialState, setOfferItemAction(offer));

    expect(result.offer).toEqual(offer);
  });

  it('Should update Offer item favorite status when "updateOfferItemFavoriteAction"', () => {
    const isFavorite = false;
    const offer = makeFakeOffer();

    if(initialState) {
      initialState.offer = offer;

      const result = offerItemDataProcess.reducer(initialState, updateOfferItemFavoriteAction(isFavorite));

      expect(result.offer?.isFavorite).toBe(isFavorite);
    }
  });

  // TODO: Возможно, при рефакторинге, стоит вынести комментарии в отдельный слайс
  it('Should set comments to offer when "setCommentsAction"', () => {
    const comment = makeFakeComment();
    const expectedState = [ comment ];

    const result = offerItemDataProcess.reducer(initialState, setCommentsAction(expectedState));

    expect(result.comments).toEqual(expectedState);
  });

  it('Should change "Comments loaded" status when "setCommentsLoadedStatusAction"', () => {
    const isCommentsLoaded = true;

    const result = offerItemDataProcess.reducer(initialState, setCommentsLoadedStatusAction(isCommentsLoaded));

    expect(result.isCommentsLoaded).toBe(isCommentsLoaded);
  });


  it('Should add Comment to other Comments in state when "addCommentAction"', () => {
    const commentOne = makeFakeComment();
    const commentTwo = makeFakeComment();
    const expectedState = [ commentOne, commentTwo ];

    if(initialState) {
      initialState.comments = [ commentOne ];

      const result = offerItemDataProcess.reducer(initialState, addCommentAction(commentTwo));

      expect(result.comments).toEqual(expectedState);
    }
  });

  it('Should change "Add comment status" when "setAddCommentStatusAction"', () => {
    const addCommentStatus = SEND_DATA_STATUS.LOADED;

    const result = offerItemDataProcess.reducer(initialState, setAddCommentStatusAction(addCommentStatus));

    expect(result.addCommentStatus).toBe(SEND_DATA_STATUS.LOADED);
  });

  // TODO: Возможно, при рефакторинге, стоит вынести предложения по-близости в отдельный слайс
  it('Should set "Nearby offers" to state when "setNearbyAction"', () => {
    const nearbyOffer = makeFakeOffer();
    const expectedState = [ nearbyOffer ];

    const result = offerItemDataProcess.reducer(initialState, setNearbyAction(expectedState));

    expect(result.nearbyOffers).toEqual(expectedState);
  });
});
