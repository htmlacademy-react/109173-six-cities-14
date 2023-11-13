import { Offer, Offers } from '../../types/offer';
import { Points } from '../../types/point';

export type MainProps = {
  mapPoints: Points;
  offers: Offers;
  isMainEmpty?: boolean;
};

type Places = Pick<MainProps, 'offers'>;

export type PlacesProps = {
  city: string;
  onSelectPoint: (offer: Offer | null) => void;
} & Places;
