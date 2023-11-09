import { Offer } from '../../types/offer';
import { Points } from '../../types/point';

export type MainProps = {
  locations: string[];
  mapPoints: Points;
  offers: Offer[];
  offersCount: number;
  isMainEmpty?: boolean;
};

type Places = Pick<MainProps, 'offers' | 'offersCount'>;

export type PlacesProps = {
  onSelectPoint: (offer: Offer | null) => void;
} & Places;

export type LocationItemProps = {
  itemName: string;
};
