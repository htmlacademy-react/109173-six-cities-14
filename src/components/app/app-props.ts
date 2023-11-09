import { Cities } from '../../types/city';
import { Comments } from '../../types/comment';
import { Offer } from '../../types/offer';
import { Points } from '../../types/point';

export type AppProps = {
  cities: Cities;
  mapPoints: Points;
  offers: Offer[];
  offersCount: number;
  comments: Comments;
};
