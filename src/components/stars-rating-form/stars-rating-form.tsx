import { Fragment } from 'react';

type StartRatingProps = {
  rating: number;
};

export default function StarsRatingForm({ rating }: StartRatingProps): React.ReactElement {
  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="reviews__rating-form form__rating">
      {
        stars.map((star) => (
          <Fragment key={ star } >
            <input
              className="form__rating-input visually-hidden"
              name="rating" defaultValue={ star }
              id={`${ star }-stars`}
              type="radio"
              defaultChecked={star <= rating}
            />
            <label htmlFor={`${ star }-stars`} className="reviews__rating-label form__rating-label" title="perfect">
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
