import { Offer, Offers } from '../../types/offer';

export type MainProps = {
  isMainEmpty?: boolean;
};

export type PlacesProps = {
  city: string;
  offers: Offers;
  onSelectPoint: (offer: Offer | null) => void;
  onSortChange: (currentSort: string) => void;
};
