import { Offer, Offers } from '../../types/offer';

export type MainProps = {
  isMainEmpty?: boolean;
};

export type PlacesProps = {
  offers: Offers;
  onSelectPoint: (offer: Offer | null) => void;
};
