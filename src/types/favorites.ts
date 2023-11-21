import { Offer, Offers } from './offer';

export type FavoritesProps = {
  offers: Offers;
  isFavoritesEmpty?: boolean;
};

export type OfferItem = {
  offerItem: Offer;
}
