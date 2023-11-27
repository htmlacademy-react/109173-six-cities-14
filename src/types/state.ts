import { store } from '../store';
import { Comments } from './comment';
import { Offer, Offers } from './offer';
import { UserData } from './user-data';


export type UserProcess = {
  favorites: Offers;
  authorizationStatus: string;
  userInfo: UserData | null;
};

export type OffersDataProcess = {
  offers: Offers;
  isOffersLoading: boolean;
};

export type OfferItemDataProcess = {
  offer: Offer | null;
  comments: Comments;
  isCommentsLoaded: boolean;
  addCommentStatus: string;
  nearbyOffers: Offers;
};


export type FavoritesDataProcess = {
  favorites: Offers;
};

export type CityProcess = {
  city: string;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
