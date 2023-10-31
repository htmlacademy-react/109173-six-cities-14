import { Offer } from '../../types/offer';
import { Points } from '../../types/point';

export type MainProps = {
  locations: string[];
  mapPoints: Points;
  offers: Offer[];
  offersCount: number;
  isMainEmpty?: boolean;
};

export type PlacesProps = {
  offers: Offer[];
  offersCount: number;
  onSelectPoint: (offer: Offer | null) => void;
};

export type LocationItemProps = {
  itemName: string;
};
