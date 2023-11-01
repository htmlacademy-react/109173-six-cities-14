import { Comment } from '../../types/comment';
import { Offer } from '../../types/offer';
import { Points } from '../../types/point';

export type OffersProps = {
  offers: Offer[];
  comments: Comment[];
  mapPoints: Points;
};
