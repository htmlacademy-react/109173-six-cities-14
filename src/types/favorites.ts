import { Offer, Offers } from './offer';

export type FavoritesProps = {
  offers: Map<string, Offers>;
  isFavoritesEmpty?: boolean;
};

export type OfferItem = {
  offerItem: Offer;
}
