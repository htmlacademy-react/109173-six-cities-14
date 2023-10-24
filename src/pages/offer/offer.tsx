// import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ReviewsForm from '../../components/reviews/reviews-form';

import { ReviewsProps, OffersProps } from './offer.props';

import OffersList from '../../components/offers-list/offers-list';

function Gallery(): React.ReactElement {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {
          [
            'room.jpg',
            'apartment-01.jpg',
            'apartment-02.jpg',
            'apartment-03.jpg',
            'studio-01.jpg',
            'apartment-01.jpg',
          ].map((galleryItem) => (
            <div className="offer__image-wrapper" key={crypto.randomUUID()}>
              <img className="offer__image" src={`img/${ galleryItem }`} alt="Photo studio" />
            </div>
          ))
        }
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
  // const offerItems = offers.slice(NEAREST_OFFERS_COUNT);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList offers={ offers } ></OffersList>
      </div>
    </section>
  );
}

export default function Offer({ offers }: OffersProps): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>
      <section className="offer">
        {/* Галерея */}
        <Gallery></Gallery>

        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>Premium</span>
            </div>
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                Beautiful &amp; luxurious studio at great location
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
              <span className="offer__rating-value rating__value">4.8</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                Apartment
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                3 Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max 4 adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;120</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {/* Удобства в номере */}
                {
                  [
                    'Wi-Fi',
                    'Washing machine',
                    'Towels',
                    'Heating',
                    'Coffee machine',
                    'Baby seat',
                    'Kitchen',
                    'Dishwasher',
                    'Cabel TV',
                    'Fridge'].map((offerItem) => <li className="offer__inside-item" key={ offerItem }>{ offerItem }</li>)
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
                  Angelina
                </span>
                <span className="offer__user-status">
                  Pro
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                </p>
                <p className="offer__text">
                  An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
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
        <NearestOffers offers={ offers } ></NearestOffers>
      </div>
    </>
  );
}
