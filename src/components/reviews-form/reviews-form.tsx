import { FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarsRatingForm from '../stars-rating-form/stars-rating-form';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAddCommentsStatus } from '../../store/slices/offer-item-data-process/selectors';

import { BASE_RATING, REVIEW_MAX_LENGTH, REVIEW_MIN_LENGTH, SEND_DATA_STATUS } from '../../const';
import { fetchCommentAction } from '../../store/api-action';

type Rating = number;

export default function ReviewsForm(): React.ReactNode {
  const dispatch = useAppDispatch();
  const offerId = String(useParams().id);

  const [rating, setRating] = useState(BASE_RATING);
  const [review, setReview] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const addCommentStatus = useAppSelector(getAddCommentsStatus);
  const isFieldDisabled = (addCommentStatus === SEND_DATA_STATUS.LOADING);
  const isSubmitDisabled = (!isFormValid || (addCommentStatus === SEND_DATA_STATUS.LOADING));

  function handleTextareaInput(evt: FormEvent<HTMLTextAreaElement>) {
    const target = evt.target as HTMLTextAreaElement;
    const userReview = target.value;

    if(userReview.length >= REVIEW_MAX_LENGTH) {
      return false;
    }

    setReview(userReview);
  }

  function handleRatingChange(ratingValue: Rating) {
    setRating(ratingValue);
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if(!isFormValid) {
      return false;
    }

    dispatch(fetchCommentAction({
      offerId,
      rating: rating,
      comment: review
    }));
  }

  // Validation
  useEffect(() => {
    const ratingIsValid = rating > 0;
    const reviewIsValid = review.length >= REVIEW_MIN_LENGTH
      && review.length <= REVIEW_MAX_LENGTH;

    setIsFormValid((ratingIsValid && reviewIsValid));
  }, [rating, review]);

  // Clearing form
  useEffect(() => {
    if(addCommentStatus === SEND_DATA_STATUS.LOADED) {
      setRating(BASE_RATING);
      setReview('');
      setIsFormValid(false);
    }
  }, [addCommentStatus]);

  return (
    <form
      className="reviews__form form"
      action="#" method="post"
      onSubmit={ handleFormSubmit }
      data-testid="reviewsFormElem"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <StarsRatingForm rating={ rating } onRatingChange={ handleRatingChange } disabledState={ isFieldDisabled }/>

      <textarea
        id="review"
        className="reviews__textarea form__textarea"
        name="review"
        value={ review }
        minLength={ REVIEW_MIN_LENGTH }
        maxLength={ REVIEW_MAX_LENGTH }
        placeholder="Tell how was your stay, what you like and what can be improved"
        onInput={ handleTextareaInput }
        disabled={ isFieldDisabled }
        data-testid="reviewsTextElem"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ REVIEW_MIN_LENGTH } characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={ isSubmitDisabled } >Submit</button>
      </div>
    </form>
  );
}
