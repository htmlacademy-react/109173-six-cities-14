import { Offer } from '../../types/offer';

export type FavoritesProps = {
  offers: Offer[];
  isFavoritesEmpty?: boolean;
};

export type OfferItem = {
  offerItem: Offer;
}
