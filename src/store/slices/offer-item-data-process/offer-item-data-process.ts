import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NAMESPACE, SEND_DATA_STATUS } from '../../../const';
import { OfferItemDataProcess } from '../../../types/state';
import { Offer, Offers } from '../../../types/offer';
import { Comment, Comments } from '../../../types/comment';

const initialState: OfferItemDataProcess = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  isCommentsLoaded: false,
  addCommentStatus: SEND_DATA_STATUS.NONE,
};

export const offerItemDataProcess = createSlice({
  name: NAMESPACE.OFFER,
  initialState,
  reducers: {
    // OFFER
    loadOfferItemAction: (state, action: PayloadAction<{ offer: Offer }>) => {
      state.offer = action.payload.offer;
    },

    // COMMENTS
    loadCommentsAction: (state, action: PayloadAction<{ comments: Comments }>) => {
      state.comments = action.payload.comments;
    },
    setCommentsLoadedStatusAction: (state, action: PayloadAction<boolean>) => {
      state.isCommentsLoaded = action.payload;
    },
    addCommentAction: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    setAddCommentStatusAction: (state, action: PayloadAction<string>) => {
      state.addCommentStatus = action.payload;
    },

    // NEARBY
    loadNearbyAction: (state, action: PayloadAction<{ nearbyOffers: Offers }>) => {
      state.nearbyOffers = action.payload.nearbyOffers;
    },
  }
});

export const {
  loadOfferItemAction,
  loadCommentsAction,
  setCommentsLoadedStatusAction,
  addCommentAction,
  setAddCommentStatusAction,
  loadNearbyAction
} = offerItemDataProcess.actions;
