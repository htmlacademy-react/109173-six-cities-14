import { SEND_DATA_STATUS } from '../../../const';
import { OfferItemDataProcess } from '../../../types/state';
import { makeMockComment, makeMockOffer } from '../../../utils/mock';
import { addCommentAction, offerItemDataProcess, setAddCommentStatusAction, setCommentsAction, setCommentsLoadedStatusAction, setNearbyAction, setOfferItemAction, updateOfferItemFavoriteAction } from './offer-item-data-process';

describe('[Offer item data process Slice]:', () => {
  let initialState: OfferItemDataProcess;

  beforeEach(() => {
    initialState = {
      offer: null,
      nearbyOffers: [],
      comments: [],
      isCommentsLoaded: false,
      addCommentStatus: SEND_DATA_STATUS.NONE,
    };
  });

  describe('Offer item actions:', () => {
    it('Should return initial state with empty initialState and action', () => {
      const emptyAction = {type: '', payload: ''};
      const expectedState = initialState;

      const result = offerItemDataProcess.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('Should set Offer item to state when "setOfferItemAction"', () => {
      const offer = makeMockOffer();

      const result = offerItemDataProcess.reducer(undefined, setOfferItemAction(offer));

      expect(result.offer).toEqual(offer);
    });

    it('Should update Offer item favorite status when "updateOfferItemFavoriteAction"', () => {
      const isFavorite = false;
      const offer = makeMockOffer();
      initialState.offer = offer;

      const result = offerItemDataProcess.reducer(initialState, updateOfferItemFavoriteAction(isFavorite));

      expect(result.offer?.isFavorite).toBe(isFavorite);
    });
  });

  describe('Comments actions:', () => {
    it('Should set comments to offer when "setCommentsAction"', () => {
      const comment = makeMockComment();
      const expectedState = [ comment ];

      const result = offerItemDataProcess.reducer(undefined, setCommentsAction(expectedState));

      expect(result.comments).toEqual(expectedState);
    });

    it('Should change "Comments loaded" status when "setCommentsLoadedStatusAction"', () => {
      const isCommentsLoaded = true;

      const result = offerItemDataProcess.reducer(undefined, setCommentsLoadedStatusAction(isCommentsLoaded));

      expect(result.isCommentsLoaded).toBe(isCommentsLoaded);
    });


    it('Should add Comment to other Comments in state when "addCommentAction"', () => {
      const comment = makeMockComment();
      const expectedState = [ comment ];

      const result = offerItemDataProcess.reducer(undefined, addCommentAction(comment));

      expect(result.comments).toEqual(expectedState);
    });

    it('Should change "Add comment status" when "setAddCommentStatusAction"', () => {
      const addCommentStatus = SEND_DATA_STATUS.LOADED;

      const result = offerItemDataProcess.reducer(undefined, setAddCommentStatusAction(addCommentStatus));

      expect(result.addCommentStatus).toBe(SEND_DATA_STATUS.LOADED);
    });
  });

  describe('Nearby offers actions:', () => {
    it('Should set "Nearby offers" to state when "setNearbyAction"', () => {
      const nearbyOffer = makeMockOffer();
      const expectedState = [ nearbyOffer ];

      const result = offerItemDataProcess.reducer(undefined, setNearbyAction(expectedState));

      expect(result.nearbyOffers).toEqual(expectedState);
    });
  });
});
