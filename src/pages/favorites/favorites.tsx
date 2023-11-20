import { Helmet } from 'react-helmet-async';

import { FAVORITES_COUNT } from '../../const';
import { FavoritesProps } from './favorites-props';
import CardPlace from '../../components/card-place/card-place';
import { Offers } from '../../types/offer';

type FavoriteLocationProps = {
  city: string;
  offers: Offers;
};

function FavoriteLocation({ city, offers }: FavoriteLocationProps): React.ReactElement {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{ city }</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers .map((offer): React.ReactElement =>
            <CardPlace key={ offer.id } offerItem={ offer } isCompact/>
          )
        }
      </div>
    </li>
  );
}

function FavoriteCards({ offers }: FavoritesProps): React.ReactElement {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        <FavoriteLocation city="Amsterdam" offers={ offers.slice(0, FAVORITES_COUNT - 1) } />
        <FavoriteLocation city="Cologne" offers={ offers.slice(FAVORITES_COUNT - 1, FAVORITES_COUNT) } />
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
