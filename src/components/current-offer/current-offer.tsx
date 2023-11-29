import { useState } from 'react';
import { Navigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';

import { AppRoute, AuthorizationStatus } from '../../const';

import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/slices/user-process/selectors';

import { Offer, Offers } from '../../types/offer';
import { Comments } from '../../types/comment';

import Gallery from '../gallery/gallery';
import StarsRating from '../stars-rating/stars-rating';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';
import Map from '../map/map';
import NearbyOffers from '../nearby-offers/nearby-offers';
import useFavorite from '../../hooks/useFavorite';

const CSSClasses = {
  FAVORITE_ACTIVE: 'offer__bookmark-button--active',
};

const BOOKMARK_TEXT = {
  IN_BOOKMARKS: 'In bookmarks',
  TO_BOOKMARKS: 'To bookmarks',
};

type CurrentOfferProps = {
  offer: Offer;
  comments: Comments;
  nearby: Offers;
};

export default function CurrentOffer({ offer, comments, nearby }: CurrentOfferProps): React.ReactElement {
  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);
  const id = offer.id;
  const authStatus = useAppSelector(getAuthStatus);
  const currentOfferPoint = {id: offer.id, lat: offer.location.latitude, long: offer.location.longitude,};
  const isUserLoggedIn = (authStatus === AuthorizationStatus.AUTH);
  const itHasNearbyOffers = (nearby?.length > 0);
  const isFavorite = offer.isFavorite;

  const handleFavoriteClick = useFavorite({ id, isFavorite });

  const bookmarkText = !isFavorite
    ? BOOKMARK_TEXT.TO_BOOKMARKS
    : BOOKMARK_TEXT.IN_BOOKMARKS;

  if(!offer) {
    return <Navigate to={AppRoute.PAGE_404} />;
  }

  const {
    title,
    description,
    rating,
    price,
    images,
    goods,
    isPremium,
    maxAdults,
    host
  } = offer;

  return (
    <>
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        {/* Галерея */}
        {images?.length > 0 && (
          <Gallery images={ images }></Gallery>
        )}

        <div className="offer__container container">
          <div className="offer__wrapper">
            {(isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            ))}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                { title }
              </h1>
              <button
                className={ cn(
                  'offer__bookmark-button button',
                  { [CSSClasses.FAVORITE_ACTIVE]: isFavorite }
                ) }
                type="button"
                onClick={ handleFavoriteClick }
              >
                <svg className="offer__bookmark-icon" width={ 31 } height={ 33 }>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">{ bookmarkText }</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <StarsRating rating={ rating } />
              </div>
              <span className="offer__rating-value rating__value">{ rating }</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                Apartment
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                3 Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max { maxAdults } adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{ price }</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {/* Удобства в номере */}
                {
                  goods.map((offerItem) => <li className="offer__inside-item" key={ offerItem }>{ offerItem }</li>)
                }
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width={ 74 } height={ 74 } alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  { host.name }
                </span>

                {host.isPro && (
                  <span className="offer__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  { description }
                </p>
              </div>
            </div>

            {/* Отзывы */}
            <section className="offer__reviews reviews">
              { <ReviewsList comments={ comments }/> }

              {/* Форма написания отзыва */}
              {isUserLoggedIn && <ReviewsForm />}
            </section>
          </div>
        </div>
        {/* Карта */}
        { itHasNearbyOffers && <Map offers={ nearby } selectedPoint={ selectedPoint } currentOfferPoint={ currentOfferPoint }/> }
      </section>
      <div className="container">
        {/* Места поблизости */}
        { itHasNearbyOffers && <NearbyOffers offers={ nearby } onSelectPoint={ setSelectedPoint }/> }
      </div>
    </>
  );
}
