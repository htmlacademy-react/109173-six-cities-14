import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { FavoritesProps, OfferItem } from './favorites.props';
import { AppRoutes, FAVORITES_COUNT } from '../../const';

function FavoriteCardPlace({ offerItem }: OfferItem): React.ReactElement {
  const { id, previewImage, price, rating } = offerItem;
  const currentRatingPercent = (100 / 5) * rating;

  return (
    <article className="favorites__card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoutes.Favorites}/${ id }`}>
          <img className="place-card__image" src={ previewImage } width={ 150 } height={ 110 } alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width={ 18 } height={ 19 }>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: currentRatingPercent }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Favorites}/${ id }`}>Nice, cozy, warm big bed apartment</Link>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
}

function FavoriteCards({ offers }: FavoritesProps): React.ReactElement {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        <li className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {
              offers.slice(0, FAVORITES_COUNT - 1).map((offer): React.ReactElement => {
                const offerId: number = offer.id;

                return <FavoriteCardPlace key={ offerId } offerItem={ offer }></FavoriteCardPlace>;
              })
            }
          </div>
        </li>

        <li className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Cologne</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {
              offers.slice(FAVORITES_COUNT - 1, FAVORITES_COUNT).map((offer): React.ReactElement => {
                const offerId: number = offer.id;

                return <FavoriteCardPlace key={ offerId } offerItem={ offer }></FavoriteCardPlace>;
              })
            }
          </div>
        </li>
      </ul>
    </section>
  );
}

function FavoritesEmpty(): React.ReactElement {
  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
      </div>
    </section>
  );
}

export default function Favorites({ offers, isFavoritesEmpty }: FavoritesProps): JSX.Element {
  return (
    <div className="page__favorites-container container">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>

      {(isFavoritesEmpty && <FavoritesEmpty />) || <FavoriteCards offers={ offers } />}
    </div>
  );
}
