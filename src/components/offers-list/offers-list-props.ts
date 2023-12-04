import { Offer, Offers } from '../../types/offer';

export type OffersListProps = {
  offers: Offers;
  isNearby?: boolean;
  onSelectPoint: (offer: Offer | null) => void;
};
