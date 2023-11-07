// import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute, NEAREST_OFFERS_COUNT } from '../../const';
import { Navigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../..';

import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import NearestOffers from '../../components/nearest-offers/nearest-offers';
import Gallery from '../../components/gallery/gallery';
import StarsRating from '../../components/stars-rating/stars-rating';
import Map from '../../components/map/map';

import { Offer } from '../../types/offer';
import { OffersProps } from './offers-item-props';


export default function OffersItem({ offers, comments, mapPoints }: OffersProps) {
  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);
  const offerID = Number(useParams().id);
  const currentOffer = offers.find((item) => offerID === item.id);
  const isUserLoggedIn = useContext(AuthContext);

  if(!currentOffer) {
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
  } = currentOffer;

  return (
    <>
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        {/* Галерея */}
        {images && (
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
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width={ 31 } height={ 33 }>
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
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
              { comments && <ReviewsList comments={ comments }/>}

              {/* Форма написания отзыва */}
              {isUserLoggedIn && <ReviewsForm />}
            </section>
          </div>
        </div>
        {/* Карта */}
        { <Map city={ offers[1].city } mapPoints={ mapPoints.slice(0, NEAREST_OFFERS_COUNT) } selectedPoint={ selectedPoint }/> }
      </section>
      <div className="container">
        {/* Места поблизости */}
        <NearestOffers offers={ offers } onSelectPoint={ setSelectedPoint }/>
      </div>
    </>
  );
}