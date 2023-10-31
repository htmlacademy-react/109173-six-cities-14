import { Offer } from '../../types/offer';

export type AppProps = {
  locations: string[];
  offers: Offer[];
  offersCount: number;
};
