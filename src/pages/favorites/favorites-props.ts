import { Offer, Offers } from '../../types/offer';

export type FavoritesProps = {
  offers: Offers;
  isFavoritesEmpty?: boolean;
};

export type OfferItem = {
  offerItem: Offer;
}
