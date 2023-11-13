import { Cities } from '../../types/city';
import { Comments } from '../../types/comment';
import { Offer } from '../../types/offer';

export type AppProps = {
  cities: Cities;
  offers: Offer[];
  offersCount: number;
  comments: Comments;
};
