// import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Navigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../..';

import { Offer, Offers } from '../../types/offer';
import { Comments } from '../../types/comment';

import Spinner from '../../components/spinner/spinner';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import NearbyOffers from '../../components/nearby-offers/nearby-offers';
import Gallery from '../../components/gallery/gallery';
import StarsRating from '../../components/stars-rating/stars-rating';
import Map from '../../components/map/map';
import useOfferItem from '../../hooks/useOfferItem';
import useReview from '../../hooks/useReview';
import useNearbyOffer from '../../hooks/useNearbyOffer';

type CurrentOfferPtops = {
  offer: Offer;
  comments: Comments;
  nearby: Offers;
};

function CurrentOffer({ offer, comments, nearby }: CurrentOfferPtops): React.ReactElement {
  const [selectedPoint, setSelectedPoint] = useState<Offer | null>(null);
  const isUserLoggedIn = useContext(AuthContext);
  const itHasNearbyOffers = (nearby?.length > 0);

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
              { <ReviewsList comments={ comments }/> }

              {/* Форма написания отзыва */}
              {isUserLoggedIn && <ReviewsForm />}
            </section>
          </div>
        </div>
        {/* Карта */}
        { itHasNearbyOffers && <Map offers={ nearby } selectedPoint={ selectedPoint }/> }
      </section>
      <div className="container">
        {/* Места поблизости */}
        { itHasNearbyOffers && <NearbyOffers offers={ nearby } onSelectPoint={ setSelectedPoint }/> }
      </div>
    </>
  );
}

export default function OfferItem(): React.ReactElement {
  const offerID = String(useParams().id);
  const currentOffer = useOfferItem({ offerID });
  const comments = useReview({ offerID });
  const nearbyOffers = useNearbyOffer({ offerID });

  if(!currentOffer) {
    return <Spinner />;
  }

  return <CurrentOffer offer={ currentOffer } comments={ comments } nearby={ nearbyOffers }/>;
}
