// import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ReviewsForm from '../../components/reviews/reviews-form';

import { ReviewsProps, OffersProps } from './offer.props';

import OffersList from '../../components/offers-list/offers-list';
import { useParams } from 'react-router-dom';
// import { AppRoutes } from '../../const';

type GalleryProps = {
  images?: string[];
};

function Gallery({ images }: GalleryProps): React.ReactElement {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((imageSrc) => (
          <div className="offer__image-wrapper" key={crypto.randomUUID()}>
            <img className="offer__image" src={`${ imageSrc }`} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Reviews({ isUserLoggedIn }: ReviewsProps): React.ReactElement {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        <li className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width={ 54 } height={ 54 } alt="Reviews avatar" />
            </div>
            <span className="reviews__user-name">
              Max
            </span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
            </p>
            <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
          </div>
        </li>
      </ul>

      {/* Форма написания отзыва */}
      {isUserLoggedIn && <ReviewsForm />}
    </section>
  );
}

function NearestOffers({ offers }: OffersProps): React.ReactElement {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList offers={ offers } ></OffersList>
      </div>
    </section>
  );
}

// TODO: currentOffer?.something - ? т.к. нет тайпгарда и проверки на существование оффера. Поправить и убрать ?
export default function Offer({ offers }: OffersProps): React.ReactElement {
  const offerID = Number(useParams().id);
  const currentOffer = offers.find((item) => offerID === item.id);

  // if(!currentOffer)
  //   return <Navigate to={AppRoutes.Page404} />;
  // };

  return (
    <>
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        {/* Галерея */}
        {currentOffer?.images && (
          <Gallery images={ currentOffer?.images }></Gallery>
        )}

        <div className="offer__container container">
          <div className="offer__wrapper">
            {(currentOffer?.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            ))}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                { currentOffer?.title }
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
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{ currentOffer?.rating }</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                Apartment
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                3 Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max { currentOffer?.maxAdults } adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{ currentOffer?.price }</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {/* Удобства в номере */}
                {
                  currentOffer?.goods.map((offerItem) => <li className="offer__inside-item" key={ offerItem }>{ offerItem }</li>)
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
                  {currentOffer?.host.name}
                </span>

                {currentOffer?.host.isPro && (
                  <span className="offer__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  { currentOffer?.description }
                </p>
              </div>
            </div>

            {/* Отзывы */}
            <Reviews isUserLoggedIn></Reviews>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        {/* Места поблизости */}
        <NearestOffers offers={ offers } />
      </div>
    </>
  );
}
