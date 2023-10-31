import { Offer } from '../../types/offer';
import { Points } from '../../types/point';

export type AppProps = {
  locations: string[];
  mapPoints: Points;
  offers: Offer[];
  offersCount: number;
};
