import { Cities } from '../../types/city';
import { Offer, Offers } from '../../types/offer';
import { Points } from '../../types/point';

export type MainProps = {
  cities: Cities;
  mapPoints: Points;
  offers: Offers;
  offersCount: number;
  isMainEmpty?: boolean;
};

type Places = Pick<MainProps, 'offers' | 'offersCount'>;

export type PlacesProps = {
  onSelectPoint: (offer: Offer | null) => void;
} & Places;
