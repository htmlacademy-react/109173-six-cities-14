import { Helmet } from 'react-helmet-async';

import { FavoritesProps } from '../../types/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoriteCards from '../../components/favorite-cards/favorite-cards';

export default function Favorites({ offers, isFavoritesEmpty }: FavoritesProps): JSX.Element {
  return (
    <div className="page__favorites-container container">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>

      {(isFavoritesEmpty
          && <FavoritesEmpty />)
          || <FavoriteCards offers={ offers } />}
    </div>
  );
}
