import { Offer, Offers } from '../../types/offer';

export type NearbyOffersProps = {
  offers: Offers;
  onSelectPoint: (offer: Offer | null) => void;
};
