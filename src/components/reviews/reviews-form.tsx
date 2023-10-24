import { FormEvent, useState } from 'react';
import { REVIEW_TEXT_MIN_LENGTH } from '../../const';

type StartRatingProps = {
  rating: number;
};

function StarsRating({ rating }: StartRatingProps): React.ReactElement {
  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="reviews__rating-form form__rating">
      {
        stars.map((star) => (
          <>
            <input
              className="form__rating-input visually-hidden"
              name="rating" defaultValue={ star }
              id={`${ star }-stars`}
              type="radio"
              checked={(star <= rating) ? true : false}
            />
            <label htmlFor={`${ star }-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width={ 37 } height={ 33 }>
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </>
        ))
      }
    </div>
  );
}

type ReviewProps = {
  rating: number;
  text: string;
}

export default function ReviewsForm(): React.ReactNode {
  const reviewState: ReviewProps = {
    rating: 0,
    text: '',
  };
  const [userReview, setUserReview] = useState(reviewState);

  function formSubmitHandler(evt: FormEvent<HTMLFormElement>) {
    const target = evt.target;
    const formData = new FormData(target); // TODO: Не совсем понятно, что тут не так с таргетом?

    const review: ReviewProps = {
      rating: Number(formData.get('rating')), // TODO: Костыль с преобразованием - поправить
      text: String(formData.get('review')), // TODO: Костыль с преобразованием - поправить
    };

    setUserReview(review);
  }

  return (
    <form
      className="reviews__form form"
      action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        formSubmitHandler(evt);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <StarsRating rating={ userReview.rating }></StarsRating>

      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review" minLength={ REVIEW_TEXT_MIN_LENGTH }
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={ userReview.text }
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ REVIEW_TEXT_MIN_LENGTH } characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}
