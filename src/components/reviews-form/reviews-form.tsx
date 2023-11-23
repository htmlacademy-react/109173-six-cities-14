import { FormEvent, useEffect, useRef, useState } from 'react';
import StarsRatingForm from '../stars-rating-form/stars-rating-form';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentAction } from '../../store/api-action';
import { getAddCommentsStatus } from '../../store/slices/offer-item-data-process/selectors';

import { SEND_DATA_STATUS } from '../../const';

const BASE_RATING = 1;
const REVIEW_MIN_LENGTH = 50;
const REVIEW_MAX_LENGTH = 300;

export default function ReviewsForm(): React.ReactNode {
  const dispatch = useAppDispatch();
  const offerID = String(useParams().id);

  const form = useRef<HTMLFormElement>(null);
  const userReview = useRef<HTMLTextAreaElement>(null);

  const [userRate, setUserRate] = useState(BASE_RATING);
  const [starsDisabled, setStarsDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [textareaDisabled, setTextareaDisabled] = useState(false);

  const addCommentStatus = useAppSelector(getAddCommentsStatus);

  function disableForm(state: boolean = false) {
    setStarsDisabled(state);
    setTextareaDisabled(state);
    setSubmitDisabled(state);
  }

  function handleTextareaChange(evt: FormEvent<HTMLTextAreaElement>) {
    const target = evt.target as HTMLTextAreaElement;
    const reviewLength = target.value.length;

    if(reviewLength >= REVIEW_MIN_LENGTH && reviewLength <= REVIEW_MAX_LENGTH) {
      setSubmitDisabled(false);
      return null;
    }

    setSubmitDisabled(true);
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if(!userReview.current) {
      return false;
    }

    disableForm(true);

    const review = {
      offerID,
      rating: userRate,
      comment: userReview.current.value
    };

    dispatch(fetchCommentAction(review));
  }

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      switch(addCommentStatus) {
        case SEND_DATA_STATUS.LOADED: {
          form.current?.reset();
          disableForm(false);
          break;
        }

        case SEND_DATA_STATUS.ERROR: {
          disableForm(false);
          break;
        }
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
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <StarsRatingForm rating={ userRate } onRatingChange={ setUserRate } disabledState={ starsDisabled }/>

      <textarea
        id="review"
        className="reviews__textarea form__textarea"
        name="review"
        minLength={ REVIEW_MIN_LENGTH }
        maxLength={ REVIEW_MAX_LENGTH }
        placeholder="Tell how was your stay, what you like and what can be improved"
        onInput={ handleTextareaChange }
        ref={ userReview }
        disabled={ textareaDisabled }
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
