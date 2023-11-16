import { Comment, Comments } from '../../types/comment';

import ReviewsItem from '../reviews-item/reviews-item';

const MAX_COMMENTS_COUNT = 10;

type ReviewListProps = {
  comments: Comments;
};

function sortComments(commentA: Comment, commentB: Comment) {
  const commentADate = Date.parse(commentA.date);
  const commentBDate = Date.parse(commentB.date);

  return commentBDate - commentADate;
}

export default function ReviewsList({ comments }: ReviewListProps): React.ReactElement {
  const sortedComments = comments.slice().sort(sortComments);
  const slicedComments = (sortedComments.length >= MAX_COMMENTS_COUNT)
    ? sortedComments.slice(0, MAX_COMMENTS_COUNT)
    : sortedComments;

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ slicedComments.length }</span></h2>
      <ul className="reviews__list">
        { slicedComments &&
          slicedComments.map((comment) => <ReviewsItem key={comment.id} comment={ comment } />) }
      </ul>
    </>
  );
}
