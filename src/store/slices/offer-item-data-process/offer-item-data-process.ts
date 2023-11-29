import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NAMESPACE, SEND_DATA_STATUS } from '../../../const';
import { OfferItemDataProcess } from '../../../types/state';
import { Offer, Offers } from '../../../types/offer';
import { Comment, Comments } from '../../../types/comment';

const CLEAR_COMMENT_STATUS_TIMEOUT = 3000;

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
    setOfferItemAction: (state, action: PayloadAction<Offer | null>) => {
      state.offer = action.payload;
    },
    updateOfferItemFavoriteAction: (state, action: PayloadAction<boolean>) => {
      if(state.offer) {
        state.offer.isFavorite = action.payload;
      }
    },

    // COMMENTS
    setCommentsAction: (state, action: PayloadAction<Comments>) => {
      state.comments = action.payload;
    },
    setCommentsLoadedStatusAction: (state, action: PayloadAction<boolean>) => {
      state.isCommentsLoaded = action.payload;
    },
    addCommentAction: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    setAddCommentStatusAction: (state, action: PayloadAction<string>) => {
      state.addCommentStatus = action.payload;

      const timeoutId = setTimeout(() => {
        state.addCommentStatus = SEND_DATA_STATUS.NONE;
        clearTimeout(timeoutId);
      }, CLEAR_COMMENT_STATUS_TIMEOUT);
    },

    // NEARBY
    setNearbyAction: (state, action: PayloadAction<Offers>) => {
      state.nearbyOffers = action.payload;
    },
  }
});

export const {
  setOfferItemAction,
  updateOfferItemFavoriteAction,
  setCommentsAction,
  setCommentsLoadedStatusAction,
  addCommentAction,
  setAddCommentStatusAction,
  setNearbyAction
} = offerItemDataProcess.actions;
