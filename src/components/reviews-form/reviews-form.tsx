import { FormEvent, useState } from 'react';
import { REVIEW_TEXT_MIN_LENGTH } from '../../const';
import StarsRatingForm from '../stars-rating-form/stars-rating-form';


type ReviewState = {
  rating: number;
  text: string;
}

export default function ReviewsForm(): React.ReactNode {
  const reviewState: ReviewState = {
    rating: 0,
    text: '',
  };
  const [userReview, setUserReview] = useState(reviewState);

  function formSubmitHandler(evt: FormEvent<HTMLFormElement>) {
    const target = evt.target as HTMLFormElement;
    const formData = new FormData(target);

    const review: ReviewState = {
      rating: Number(formData.get('rating')),
      text: String(formData.get('review')),
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

      <StarsRatingForm rating={ userReview.rating } />

      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review" minLength={ REVIEW_TEXT_MIN_LENGTH }
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={ userReview.text }
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ REVIEW_TEXT_MIN_LENGTH } characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}
