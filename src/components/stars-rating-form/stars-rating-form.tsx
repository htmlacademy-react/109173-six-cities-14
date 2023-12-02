import { Fragment } from 'react';
import { getStarTextByNum } from '../../utils/common';

type StartRatingProps = {
  rating: number;
  disabledState?: boolean;
  onRatingChange: React.Dispatch<React.SetStateAction<number>>;
};

export default function StarsRatingForm({ rating, disabledState, onRatingChange }: StartRatingProps): React.ReactElement {
  const stars = [5, 4, 3, 2, 1];

  function handleRatingChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const target = evt.target;

    onRatingChange(Number(target.value));
  }

  return (
    <div className="reviews__rating-form form__rating" data-testid="starsRatingElem">
      {
        stars.map((star) => (
          <Fragment key={ star } >
            <input
              className="form__rating-input visually-hidden"
              name="rating" defaultValue={ star }
              id={`${ star }-stars`}
              type="radio"
              defaultChecked={star <= rating}
              onChange={ handleRatingChange }
              disabled={ disabledState }
              data-testid="starsRatingInputElem"
            />
            <label htmlFor={`${ star }-stars`} className="reviews__rating-label form__rating-label" title={ getStarTextByNum(star) } data-testid="starsRatingLabelElem">
              <svg className="form__star-image" width={ 37 } height={ 33 }>
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))
      }
    </div>
  );
}
