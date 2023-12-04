import { Offer, Offers } from '../../types/offer';

export type NearbyOffersProps = {
  offers: Offers;
  isNearby?: boolean;
  onSelectPoint: (offer: Offer | null) => void;
};
