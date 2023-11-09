import { Offer, Offers } from '../../types/offer';

export type OffersListProps = {
  offers: Offers;
  onSelectPoint: (offer: Offer | null) => void;
};
