import { Cities } from '../../types/city';
import { Comments } from '../../types/comment';

export type AppProps = {
  cities: Cities;
  offersCount: number;
  comments: Comments;
};
