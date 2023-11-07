import { Comment } from '../../types/comment';
import ReviewsItem from '../reviews-item/reviews-item';

type ReviewListProps = {
  comments: Comment[];
};

export default function ReviewsList({ comments }: ReviewListProps): React.ReactElement {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ comments.length }</span></h2>
      <ul className="reviews__list">
        {
          comments.map((comment) => <ReviewsItem key={comment.id} comment={ comment } />)
        }
      </ul>
    </>
  );
}