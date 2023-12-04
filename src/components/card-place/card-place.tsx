import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';

import StarsRating from '../stars-rating/stars-rating';
import useFavorite from '../../hooks/useFavorite';

const CardImg = {
  WIDTH: 260,
  HEIGHT: 200,
} as const;

const FavoriteCardImg = {
  WIDTH: 150,
  HEIGHT: 110,
} as const;

const BokmarkText = {
  IN_BOOKMARKS: 'In bookmarks',
  TO_BOOKMARKS: 'To bookmarks',
} as const;

const CSSClasses = {
  FAVORITE_ACTIVE: 'place-card__bookmark-button--active',
  FAVORITE_CARD_: 'favorites__card',
  FAVORITE_CARD_IMG: 'favorites__image-wrapper',
  FAVORITE_CARD_INFO: 'favorites__card-info',
  NEARBY_CARD: 'near-places__card',
} as const;

type CardPlaceProps = {
  offerItem: Offer;
  isNearby?: boolean;
  isCompact?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}


export default function CardPlace({ offerItem, isNearby, isCompact, onMouseEnter, onMouseLeave }: CardPlaceProps): React.ReactNode {
  const {
    id,
    previewImage,
    title,
    type,
    price,
    rating,
    isPremium,
    isFavorite
  } = offerItem;

  const imgWidth = !isCompact
    ? CardImg.WIDTH
    : FavoriteCardImg.WIDTH;

  const imgHeight = !isCompact
    ? CardImg.HEIGHT
    : FavoriteCardImg.HEIGHT;

  const bookmarkText = !isCompact
    ? BokmarkText.TO_BOOKMARKS
    : BokmarkText.IN_BOOKMARKS;

  const handleFavoriteClick = useFavorite({ id, isFavorite });

  return (
    <article
      className={ cn(
        'cities__card place-card',
        {
          [CSSClasses.FAVORITE_CARD_]: isCompact,
          [CSSClasses.NEARBY_CARD]: isNearby,
        }
      ) }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
      data-testid="cardPlaceElem"
    >
      {
        isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div
        className={ cn(
          'cities__image-wrapper place-card__image-wrapper',
          {[CSSClasses.FAVORITE_CARD_IMG]: isCompact}
        ) }
      >
        <Link to={`${AppRoute.OFFER}/${ id }`}>
          <img
            className="place-card__image"
            src={ previewImage }
            width={ imgWidth }
            height={ imgHeight }
            alt="Place image"
            data-testid="cardPlaceImgElem"
          />
        </Link>
      </div>
      <div
        className={ cn(
          'place-card__info',
          { [CSSClasses.FAVORITE_CARD_INFO]: isCompact }
        ) }
      >
        <div className="place-card__price-wrapper" data-testid="cardPlacePriceElem">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={ cn(
              'place-card__bookmark-button button',
              { [CSSClasses.FAVORITE_ACTIVE]: isFavorite }
            ) }
            type="button"
            onClick={ handleFavoriteClick }
          >
            <svg className="place-card__bookmark-icon" width={ 18 } height={ 19 }>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{ bookmarkText }</span>
          </button>
        </div>
        <div className="place-card__rating rating" data-testid="cardPlaceRatingElem">
          <div className="place-card__stars rating__stars">
            <StarsRating rating={ rating } />
          </div>
        </div>
        <h2 className="place-card__name" data-testid="cardPlaceNameElem">
          <Link to={`${AppRoute.OFFER}/${ id }`}>{ title }</Link>
        </h2>
        <p className="place-card__type" data-testid="cardPlaceTypeElem">{ type }</p>
      </div>
    </article>
  );
}
