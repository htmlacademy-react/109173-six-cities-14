import { Offer } from '../../types/offer';

export type OffersListProps = {
  offers: Offer[];
  onSelectPoint: (offer: Offer | null) => void;
};

export type OfferItemProps = Offer;
