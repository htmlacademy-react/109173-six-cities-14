import { store } from '../store';
import { Offer, Offers } from './offer';
import { UserData } from './user-data';


export type UserProcess = {
  favorites: Offers;
  authorizationStatus: string;
  userInfo: UserData | null;
};

export type OffersDataProcess = {
  offers: Offers;
  offer: Offer | null;
  nearbyOffers: Offers;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
