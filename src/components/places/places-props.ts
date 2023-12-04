import { Offer, Offers } from '../../types/offer';

export type PlacesProps = {
  offers: Offers;
  onSelectPoint: (offer: Offer | null) => void;
};
