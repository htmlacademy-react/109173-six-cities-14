import { FormEvent, useEffect, useRef } from 'react';
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
  const addCommentStatus = useAppSelector(getAddCommentsStatus);

  const [rating, setRating] = useState(BASE_RATING);
  const [review, setReview] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  function resetForm() {
    setRating(BASE_RATING);
    setReview('');
    setIsFormValid(false);
  }

  function disableForm(state: boolean = false) {
    setFieldsDisabled(state);
    setSubmitDisabled(state);
  }

  function validateForm() {
    const reviewLength = userReview.current.length;

    console.log('REVIEW: ', reviewLength, '(', REVIEW_MIN_LENGTH, (reviewLength < REVIEW_MIN_LENGTH), ') RATING: ', userRate.current);

    if(!userReview.current.length || reviewLength < REVIEW_MIN_LENGTH) {
      return false;
    }

    if(userRate.current <= 0) {
      return false;
    }

    return true;
  }

  function handleTextareaInput(evt: FormEvent<HTMLTextAreaElement>) {
    const target = evt.target as HTMLTextAreaElement;
    userReview = target.value;

    setSubmitDisabled(!validateForm());

    if(userReview.length >= REVIEW_MAX_LENGTH) {
      return false;
    }
  }

  function handleRatingChange(rating: Rating) {
    userRate.current = rating;

    setSubmitDisabled(!validateForm());
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if(!userReview.current) {
      return false;
    }

    disableForm(true);

    dispatch(fetchCommentAction({
      offerId,
      rating: userRate.current,
      comment: userReview.current
    }));
  }

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      return;
    }

    switch(addCommentStatus) {
      case SEND_DATA_STATUS.LOADED: {
        resetForm();
        disableForm(false);
        break;
      }

      case SEND_DATA_STATUS.ERROR: {
        disableForm(false);
        break;
      }
    }

    return function() {
      isMounted = false;
    };
  });

  return (
    <form
      className="reviews__form form"
      action="#" method="post"
      onSubmit={ handleFormSubmit }
      ref={ form }
      data-testid="reviewsFormElem"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <StarsRatingForm rating={ userRate.current } onRatingChange={ handleRatingChange } disabledState={ fieldsDisabled }/>
setUserRate
      <textarea
        id="review"
        className="reviews__textarea form__textarea"
        name="review"
        minLength={ REVIEW_MIN_LENGTH }
        maxLength={ REVIEW_MAX_LENGTH }
        placeholder="Tell how was your stay, what you like and what can be improved"
        onInput={ handleTextareaInput }
        disabled={ fieldsDisabled }
        data-testid="reviewsTextElem"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ REVIEW_MIN_LENGTH } characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={ submitDisabled } >Submit</button>
      </div>
    </form>
  );
}
