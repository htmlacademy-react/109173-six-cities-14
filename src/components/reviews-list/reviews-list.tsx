import { MAX_COMMENTS_COUNT } from '../../const';
import { Comment, Comments } from '../../types/comment';

import ReviewsItem from '../reviews-item/reviews-item';

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
      {/* Выводим comments.length вместо sortedComments.length т.к. того требует ТЗ
      (хотя без пагинации логичнее показывать отображаемое количество комментариев, ИМХО) */}
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ comments.length }</span></h2>
      <ul className="reviews__list">
        { slicedComments?.length > 0 &&
          slicedComments.map((comment) =>
            <ReviewsItem key={comment.id} comment={ comment } />) }
      </ul>
    </>
  );
}
