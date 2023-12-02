import { DateFormat } from '../../const';
import { Comment } from '../../types/comment';
import { getFormattedDate } from '../../utils/common';
import StarsRating from '../stars-rating/stars-rating';

type ReviewsItemProps = {
  comment: Comment;
};

export default function ReviewsItem({ comment }: ReviewsItemProps): React.ReactElement {
  const { user, comment: commentText, date } = comment;
  const commentDate = new Date(Date.parse(date));
  const dateTime = getFormattedDate(commentDate, DateFormat.DATE_TIME);
  const monthYearDate = getFormattedDate(commentDate, DateFormat.MONTH_YEAR);

  return (
    <li className="reviews__item" data-testid="reviewsItem">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={ user.avatarUrl } width={ 54 } height={ 54 } alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          { user.name }
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars" data-testid="reviewsratingElem">
            <StarsRating rating={ comment.rating } />
          </div>
        </div>
        <p className="reviews__text">
          { commentText }
        </p>
        <time className="reviews__time" dateTime={ dateTime }>{ monthYearDate }</time>
      </div>
    </li>
  );
}
