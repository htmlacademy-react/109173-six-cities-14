import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { CardPlaceProps } from './card-place-props';
import StarsRating from '../stars-rating/stars-rating';

export default function CardPlace({ onMouseEnter, onMouseLeave, offerItem }: CardPlaceProps): React.ReactNode {
  const { id, previewImage, price, rating } = offerItem;

  return (
    <article className="cities__card place-card" onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave }>
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.OFFER}/${ id }`}>
          <img className="place-card__image" src={ previewImage } width={ 260 } height={ 200 } alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width={ 18 } height={ 19 }>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <StarsRating rating={ rating } />
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${ id }`}>Beautiful &amp; luxurious apartment at great location</Link>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
}
